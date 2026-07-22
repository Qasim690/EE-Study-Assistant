import { useState, useEffect } from 'react';

// --- INTERFACES ---
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string; // Used to track strengths and weaknesses
}

type QuizStep = 'setup' | 'loading' | 'quiz' | 'result';

// --- MAIN COMPONENT ---
export default function InteractiveQuiz() {
  // Setup State
  const [step, setStep] = useState<QuizStep>('setup');
  const [topic, setTopic] = useState('Power Electronics'); // Defaulting to core EE subject
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [error, setError] = useState('');

  // Quiz State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // --- API CALL & GENERATION ---
  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    const rawKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const apiKey = rawKey.trim();

    if (!apiKey || apiKey.includes('your_api_key_here')) {
      setError("API Key is missing. Please check your .env file.");
      return;
    }

    setStep('loading');
    setError('');

    try {
      // 1. Smart Model Discovery Loop
      const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!modelsRes.ok) throw new Error("Invalid API Key.");
      
      const modelsData = await modelsRes.json();
      let validModels = (modelsData.models || []).filter((m: any) => 
        m.supportedGenerationMethods?.includes("generateContent") && m.name.includes("gemini")
      );
      validModels.sort((a: any, b: any) => b.name.localeCompare(a.name));

      if (validModels.length === 0) throw new Error("No text-generation models available.");

      // Ensure explicit step-by-step logic in explanations based on user preference
      const systemPrompt = `You are an expert Electrical Engineering professor. 
      Generate ONLY undergraduate-level Electrical Engineering MCQs.
      Topic: ${topic}. Difficulty: ${difficulty}. Number of questions: ${numQuestions}.
      Generate unique questions every time. Never repeat questions. Randomize option order.
      
      Return ONLY a valid JSON array. Do NOT include markdown formatting, backticks, or code blocks.
      
      Format strictly as:
      [
        {
          "question": "Question text here...",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 1, 
          "explanation": "Detailed explanation showing step-by-step logic why the correct option is right and others are wrong.",
          "concept": "Brief 2-3 word concept tag (e.g., 'Buck Converters' or 'Routh-Hurwitz')"
        }
      ]`;

      const requestBody = {
        contents: [{ parts: [{ text: systemPrompt }] }]
      };

      let jsonText = "";
      let lastError = "";

      // 2. Fetch from Gemini
      for (const model of validModels) {
        if (model.name.includes("2.5-flash")) continue; // Skip deprecated

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/${model.name}:generateContent?key=${apiKey}`;
        try {
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });

          if (!res.ok) {
             const errData = await res.json().catch(() => null);
             lastError = errData?.error?.message || `Status ${res.status}`;
             continue;
          }

          const data = await res.json();
          jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) break;
        } catch (err: any) {
          lastError = err.message;
          continue;
        }
      }

      if (!jsonText) throw new Error(`All models failed. Last Error: ${lastError}`);

      // 3. Clean and Parse JSON
      const cleanedJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedQuestions: QuizQuestion[] = JSON.parse(cleanedJson);

      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        throw new Error("The AI did not return a valid question array.");
      }

      // Initialize Quiz
      setQuestions(parsedQuestions);
      setUserAnswers({});
      setCurrentIndex(0);
      setTimeLeft(numQuestions * 60); // 1 minute per question
      setStep('quiz');

    } catch (err: any) {
      setError(err.message || "An error occurred while generating the quiz.");
      setStep('setup');
    }
  };

  // --- TIMER LOGIC ---
  useEffect(() => {
    if (step !== 'quiz' || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  useEffect(() => {
    if (step === 'quiz' && timeLeft === 0) {
      setStep('result'); // Auto-submit when time is up
    }
  }, [timeLeft, step]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- HANDLERS ---
  const handleOptionSelect = (optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) correct++;
    });
    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);
    let performance = "Needs Improvement";
    if (percentage >= 90) performance = "Excellent";
    else if (percentage >= 75) performance = "Very Good";
    else if (percentage >= 60) performance = "Good";

    // Extract concepts for summary
    const strengths = new Set<string>();
    const weaknesses = new Set<string>();
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) strengths.add(q.concept);
      else weaknesses.add(q.concept);
    });

    return { correct, total, percentage, performance, strengths: Array.from(strengths), weaknesses: Array.from(weaknesses) };
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setTimeLeft(questions.length * 60);
    setStep('quiz');
  };

  // --- RENDER VIEWS ---

  if (step === 'setup') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12 pt-8">
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-2xl mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Interactive Quiz System</h1>
          <p className="text-slate-500 mb-8">Generate a custom examination environment tailored to your current study material.</p>

          <div className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Topic</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Power Systems, Microprocessors..." />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Difficulty</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Questions</label>
                <select value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))} className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value={5}>5 Questions (5 Mins)</option>
                  <option value={10}>10 Questions (10 Mins)</option>
                  <option value={15}>15 Questions (15 Mins)</option>
                  <option value={20}>20 Questions (20 Mins)</option>
                </select>
              </div>
            </div>

            {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">{error}</div>}

            <button onClick={handleGenerateQuiz} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors mt-4">
              Generate Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="max-w-2xl mx-auto text-center py-24">
        <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Compiling Examination...</h2>
        <p className="text-slate-500">The AI professor is generating {numQuestions} unique questions on {topic}.</p>
      </div>
    );
  }

  if (step === 'quiz') {
    const currentQ = questions[currentIndex];
    const isAnswered = userAnswers[currentIndex] !== undefined;

    return (
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 pt-4">
        
        {/* Left Sidebar: Palette & Timer */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 text-center">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Time Remaining</h3>
            <div className={`text-3xl font-mono font-bold ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIndex;
                const hasAnswer = userAnswers[idx] !== undefined;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center transition-colors
                      ${isCurrent ? 'ring-2 ring-blue-600 ring-offset-2' : ''}
                      ${hasAnswer ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
                    `}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Quiz Area */}
        <div className="md:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <button onClick={() => setStep('result')} className="text-sm font-bold text-red-600 hover:text-red-700">
                Submit Early
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-6">
              {currentQ.question}
            </h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center space-x-3
                    ${userAnswers[currentIndex] === idx 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${userAnswers[currentIndex] === idx ? 'border-blue-600' : 'border-slate-300'}`}>
                    {userAnswers[currentIndex] === idx && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                  </div>
                  <span className={`text-slate-700 ${userAnswers[currentIndex] === idx ? 'font-semibold' : ''}`}>{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-auto flex justify-between pt-6 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-6 py-2.5 font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-50"
            >
              Previous
            </button>
            
            {currentIndex === questions.length - 1 ? (
              <button
                onClick={() => setStep('result')}
                className="px-8 py-2.5 font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-6 py-2.5 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
              >
                Next
              </button>
            )}
          </div>
        </div>

      </div>
    );
  }

  if (step === 'result') {
    const res = calculateResults();

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12 pt-4">
        
        {/* Score Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Examination Results</h1>
          <p className="text-slate-500 mb-8">Topic: {topic} | Level: {difficulty}</p>
          
          <div className="flex justify-center items-center space-x-12 mb-8">
            <div>
              <div className="text-6xl font-black text-blue-600">{res.percentage}%</div>
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-2">Score</div>
            </div>
            <div className="h-16 w-px bg-slate-200"></div>
            <div className="text-left space-y-2">
              <p className="text-lg font-medium text-slate-700"><span className="font-bold text-slate-900">{res.correct} / {res.total}</span> Correct Answers</p>
              <p className="text-lg font-medium text-slate-700">Performance: <span className="font-bold text-blue-600">{res.performance}</span></p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button onClick={handleRetake} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
              Retake Quiz
            </button>
            <button onClick={() => setStep('setup')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors">
              Generate New Quiz
            </button>
          </div>
        </div>

        {/* Diagnostic Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <h3 className="font-bold text-green-800 mb-3 flex items-center"><span className="mr-2">📈</span> Strengths</h3>
            <ul className="list-disc pl-5 text-green-700 space-y-1 text-sm">
              {res.strengths.length > 0 ? res.strengths.map((s, i) => <li key={i}>{s}</li>) : <li>No specific strengths identified.</li>}
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h3 className="font-bold text-red-800 mb-3 flex items-center"><span className="mr-2">📉</span> Topics You Need To Revise</h3>
            <ul className="list-disc pl-5 text-red-700 space-y-1 text-sm">
              {res.weaknesses.length > 0 ? res.weaknesses.map((w, i) => <li key={i}>{w}</li>) : <li>Perfect score! No revisions needed.</li>}
            </ul>
          </div>
        </div>

        {/* Question Review */}
        <div className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-slate-900">Detailed Review</h2>
          {questions.map((q, idx) => {
            const userAnswer = userAnswers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            const isUnanswered = userAnswer === undefined;

            return (
              <div key={idx} className={`p-6 rounded-2xl border-2 ${isCorrect ? 'border-green-200 bg-white' : 'border-red-200 bg-white'}`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-xs">Question {idx + 1}</span>
                  {isCorrect ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Correct</span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{isUnanswered ? 'Skipped' : 'Incorrect'}</span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-6">{q.question}</h3>
                
                <div className="space-y-2 mb-6">
                  {q.options.map((opt, optIdx) => {
                    let style = "border-slate-100 bg-slate-50 text-slate-500"; // Default
                    if (optIdx === q.correctAnswer) style = "border-green-500 bg-green-50 text-green-800 font-bold ring-1 ring-green-500"; // The real answer
                    else if (optIdx === userAnswer && !isCorrect) style = "border-red-300 bg-red-50 text-red-700 line-through"; // Wrong chosen answer

                    return (
                      <div key={optIdx} className={`p-3 rounded-xl border ${style} flex items-center`}>
                        <span className="w-6 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                <div className={`p-4 rounded-xl text-sm leading-relaxed ${isCorrect ? 'bg-green-50/50 text-green-900' : 'bg-red-50/50 text-red-900'}`}>
                  <span className="font-bold block mb-1">Explanation:</span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    );
  }

  return null;
}