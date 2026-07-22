import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans animate-in fade-in duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 pointer-events-none -z-10" />
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            EE Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Assistant</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            Your ultimate digital companion for Electrical Engineering. Master concepts, perform fast calculations, reference core formulas, and test your knowledge with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all text-center"
            >
              Get Started
            </Link>
            <Link 
              to="/calculators" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all text-center"
            >
              Explore Calculators
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURE CARDS */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Platform Features</h2>
            <p className="text-slate-500 mt-2">Everything you need to succeed in your engineering coursework.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Calculator Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Electrical Calculators</h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow">Perform complex engineering calculations instantly with our purpose-built tools.</p>
              <Link to="/calculators" className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700 mt-auto">
                Open Calculators <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* Formula Library Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group flex flex-col h-full">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Formula Library</h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow">A searchable database of critical equations and derivations for easy reference.</p>
              <Link to="/formulas" className="text-emerald-600 font-semibold text-sm flex items-center hover:text-emerald-700 mt-auto">
                Open Library <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* AI Tutor Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group flex flex-col h-full">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Electrical Tutor</h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow">Get instant, step-by-step explanations for complex theoretical concepts.</p>
              <Link to="/ai" className="text-purple-600 font-semibold text-sm flex items-center hover:text-purple-700 mt-auto">
                Open Tutor <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* AI Quiz Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group flex flex-col h-full">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Quiz Generator</h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow">Test your knowledge with dynamic, interactive examinations on any topic.</p>
              <Link to="/ai" className="text-indigo-600 font-semibold text-sm flex items-center hover:text-indigo-700 mt-auto">
                Open Generator <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE THIS APP */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose This App?</h2>
            <p className="text-slate-600 text-lg">
              Built specifically for the rigorous demands of engineering coursework, combining raw calculation power with intelligent study tools.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                'Designed for Electrical Engineering students',
                'Fast engineering calculations',
                'AI-powered learning',
                'Formula reference',
                'Interactive quizzes',
                'Responsive design'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex items-center justify-center">
             <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Engineering Excellence</h3>
                <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">Providing the tools required to excel in modern electrical engineering studies.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. LEARNING JOURNEY */}
      <section className="py-20 px-4 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">The Learning Journey</h2>
            <p className="text-slate-400 mt-2">A simple, effective flow for academic mastery.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 relative">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2"></div>
            
            {/* Steps */}
            {[
              { step: '1', title: 'Learn Concepts', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { step: '2', title: 'Practice Calculations', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
              { step: '3', title: 'Revise Formulas', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
              { step: '4', title: 'Take AI Quiz', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
              { step: '5', title: 'Improve Skills', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center relative w-full md:w-auto">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center mb-4 text-purple-400 z-10 shadow-xl">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-1">{item.title}</h4>
                
                {/* Mobile downward arrow indicator */}
                {index < 4 && (
                  <svg className="w-6 h-6 text-slate-700 mt-4 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATISTICS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="p-8 text-center bg-purple-50 rounded-3xl border border-purple-100">
              <div className="text-4xl font-extrabold text-purple-600 mb-2">40+</div>
              <div className="text-slate-700 font-medium">Engineering Formulas</div>
            </div>
            <div className="p-8 text-center bg-blue-50 rounded-3xl border border-blue-100">
              <div className="text-4xl font-extrabold text-blue-600 mb-2">6</div>
              <div className="text-slate-700 font-medium">Core Calculators</div>
            </div>
            <div className="p-8 text-center bg-indigo-50 rounded-3xl border border-indigo-100">
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">24/7</div>
              <div className="text-slate-700 font-medium">AI Tutor Access</div>
            </div>
            <div className="p-8 text-center bg-emerald-50 rounded-3xl border border-emerald-100">
              <div className="text-4xl font-extrabold text-emerald-600 mb-2">100%</div>
              <div className="text-slate-700 font-medium">Dynamic AI Quizzes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROFESSIONAL FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              EE Study Assistant
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              A comprehensive toolkit tailored to simplify complex academic requirements for Electrical Engineering students.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/calculators" className="hover:text-white transition-colors">Calculators</Link></li>
              <li><Link to="/formulas" className="hover:text-white transition-colors">Formula Library</Link></li>
              <li><Link to="/ai" className="hover:text-white transition-colors">AI Study Hub</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Project Information</h4>
            <ul className="space-y-2 text-sm">
              <li>Developed by: <span className="text-white">Engineer Muhammad Qasim Raza</span></li>
              <li>Profession: <span className="text-white">Electrical Engineer</span></li>
              <li>Academic Status: <span className="text-white">Proud Student of University of Gujrat, Main Hafiz Hayat Campus</span></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EE Study Assistant. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}