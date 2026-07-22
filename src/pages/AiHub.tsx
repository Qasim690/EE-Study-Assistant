import { useState } from 'react';
import AiAssistant from './AiAssistant';
import AiQuiz from './AiQuiz';

export default function AiHub() {
  // This state controls which component is visible
  const [activeTab, setActiveTab] = useState<'tutor' | 'quiz'>('tutor');

  return (
    <div className="max-w-5xl mx-auto w-full px-4 animate-in fade-in duration-500 pb-12 pt-6">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">EE AI Study Hub</h1>
        <p className="text-slate-500 mb-8">Choose between your personal engineering tutor or the interactive examination system.</p>
        
        {/* The Toggle Switch */}
        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('tutor')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'tutor' 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            AI Tutor
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'quiz' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Interactive Quiz
          </button>
        </div>
      </div>

      {/* Dynamic Conditional Rendering */}
      <div className="w-full mt-4 transition-all duration-300">
        {activeTab === 'tutor' ? (
          <div className="animate-in slide-in-from-left-4 fade-in duration-300">
            <AiAssistant />
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <AiQuiz />
          </div>
        )}
      </div>

    </div>
  );
}