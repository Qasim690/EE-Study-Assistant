import { useState } from 'react';

// --- LIGHTWEIGHT MARKDOWN FORMATTER ---
const formatResponse = (text: string) => {
  const cleanText = text.replace(/\$\$/g, '').replace(/(?<!\$)\$(?!\$)/g, '');
  const lines = cleanText.split('\n');
  
  return lines.map((line, i) => {
    if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-slate-800 mt-6 mb-3">{parseBold(line.replace('### ', ''))}</h3>;
    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">{parseBold(line.replace('## ', ''))}</h2>;
    if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-extrabold text-slate-900 mt-8 mb-4">{parseBold(line.replace('# ', ''))}</h1>;
    
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      return <li key={i} className="ml-6 list-disc mt-2 text-slate-700 leading-relaxed">{parseBold(line.substring(2))}</li>;
    }
    
    if (line.trim() === '') return <div key={i} className="h-4"></div>;
    
    return <p key={i} className="mt-3 text-slate-700 leading-relaxed">{parseBold(line)}</p>;
  });
};

const parseBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? 
      <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong> : part
  );
};

// --- MAIN COMPONENT ---
export default function AiAssistant() {
  // --- TUTOR STATE ONLY ---
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const suggestedQuestions = [
    "Explain Ohm's Law.",
    "What is Power Factor?",
    "Difference between DC and AC Motor.",
    "Explain Transformer Losses.",
    "Explain Kirchhoff's Current Law."
  ];

  // --- AI FETCH LOGIC (TUTOR) ---
  const handleAsk = async (questionToAsk: string = prompt) => {
    if (!questionToAsk.trim()) return;

    const rawKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const apiKey = rawKey.trim();

    if (!apiKey || apiKey.includes('your_api_key_here')) {
      setError("API Key is missing. Please add your actual VITE_GEMINI_API_KEY to the root .env file and restart the server.");
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');
    setPrompt(questionToAsk);

    try {
      const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!modelsRes.ok) throw new Error("Invalid API Key. Please verify your VITE_GEMINI_API_KEY in Google AI Studio.");
      const modelsData = await modelsRes.json();
      
      let validModels = (modelsData.models || []).filter((m: any) => 
        m.supportedGenerationMethods?.includes("generateContent") && m.name.includes("gemini")
      );
      validModels.sort((a: any, b: any) => b.name.localeCompare(a.name));

      if (validModels.length === 0) throw new Error("Your API key does not currently have access to any text-generation models.");

      const requestBody = {
        contents: [{
          parts: [{
            text: "You are an expert Electrical Engineering professor. Always answer at the undergraduate level. Explain concepts in simple English. Use practical engineering examples. Provide comprehensive, step-by-step mathematical breakdowns for all calculations and derivations. Never skip intermediate steps. STRICT RULE: NEVER use LaTeX formatting. Do NOT use $ or $$ signs. Format all mathematical formulas using plain text and Unicode characters (e.g., Ω, π, θ, √, ², μ), such as: F = N * I or Φ = F / R. If assumptions are required, clearly state them. Never answer unrelated topics.\n\nUser Question: " + questionToAsk
          }]
        }]
      };

      let aiText = "";
      let lastError = "";

      for (const model of validModels) {
        if (model.name.includes("2.5-flash")) continue;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/${model.name}:generateContent?key=${apiKey}`;
        
        try {
          const res = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody) });
          if (!res.ok) {
            const errData = await res.json().catch(() => null);
            lastError = errData?.error?.message || `HTTP Status ${res.status}`;
            continue; 
          }
          const data = await res.json();
          aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) break; 
        } catch (err: any) {
          lastError = err.message;
          continue; 
        }
      }

      if (!aiText) throw new Error(`All available models failed. Last Google API Error: ${lastError}`);
      setResponse(aiText);

    } catch (err: any) {
      setError(err.message || "A network error occurred. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <textarea
          className="w-full h-32 p-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400"
          placeholder="e.g., Explain synchronous motor operation, or solve a V=IR problem..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleAsk(q)}
                disabled={loading}
                className="text-xs font-medium px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-purple-100 hover:text-purple-700 rounded-full transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={() => { setPrompt(''); setResponse(''); setError(''); }}
              disabled={loading || (!prompt && !response)}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              Clear
            </button>
            <button
              onClick={() => handleAsk()}
              disabled={loading || !prompt.trim()}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Ask Tutor'
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-start space-x-3 mt-8">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {response && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-purple-100/50 relative overflow-hidden mt-8">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-100 rounded-full opacity-50 blur-2xl pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
            <div className="bg-purple-600 text-white p-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2.02 2.02 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Tutor Response</h3>
          </div>
          <div className="prose prose-slate max-w-none text-slate-800">
            {formatResponse(response)}
          </div>
        </div>
      )}
    </div>
  );
}