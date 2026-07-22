import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans animate-in fade-in duration-500 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden px-4 bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-purple-100 text-purple-600 rounded-3xl shadow-sm mb-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            About EE Study Assistant
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            A modern AI-powered learning platform designed specifically for Electrical Engineering students.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 space-y-16 mt-12">

        {/* 2. THE PROBLEM */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl pointer-events-none -z-10"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mr-3 text-sm font-extrabold">01</span>
            The Problem
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed">
            Electrical Engineering students often struggle because engineering formulas, calculators, AI explanations, and quizzes are scattered across different websites and platforms.
          </p>
          <p className="text-slate-600 mt-4 leading-relaxed">
            This application combines all these learning resources into one easy-to-use platform, allowing students to learn, practice, revise, and test their knowledge efficiently.
          </p>
        </section>

        {/* 3. OUR SOLUTION */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl pointer-events-none -z-10"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mr-3 text-sm font-extrabold">02</span>
            Our Solution
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            The platform provides an all-in-one learning experience for Electrical Engineering students by seamlessly integrating core academic resources.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'AI Tutor',
              'Interactive AI Quiz',
              'Formula Library',
              'Electrical Calculators',
              'Responsive Design'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                <span className="font-semibold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MAIN FEATURES */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Main Features</h2>
            <p className="text-slate-500 mt-2">Comprehensive core utilities built for modern academics.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Electrical Calculators', desc: 'Instant computational tools for fundamental and advanced circuit parameters.', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'bg-blue-100 text-blue-600' },
              { name: 'Formula Library', desc: 'A structured collection of crucial engineering formulas and standard derivations.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'bg-emerald-100 text-emerald-600' },
              { name: 'AI Tutor', desc: 'On-demand expert explanations tailored explicitly to undergraduate electrical topics.', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'bg-purple-100 text-purple-600' },
              { name: 'AI Quiz Generator', desc: 'Dynamic multiple-choice testing complete with instant validation and performance evaluation.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', color: 'bg-indigo-100 text-indigo-600' },
              { name: 'Responsive Interface', desc: 'Fluid layout structures optimized for seamless operation across all devices and screen sizes.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'bg-amber-100 text-amber-600' }
            ].map((feat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feat.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feat.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TECHNOLOGIES USED */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Technologies Used</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              'React',
              'TypeScript',
              'Vite',
              'Tailwind CSS'
            ].map((tech, i) => (
              <div key={i} className="p-4 bg-slate-50 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-slate-200 rounded-2xl font-semibold text-slate-700 transition-all text-center shadow-sm">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* 6. AI FEATURES */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-purple-50 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mr-3 text-sm font-extrabold">AI</span>
            Advanced AI Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">AI Tutor</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Provides easy-to-understand explanations for Electrical Engineering concepts, helping students understand difficult topics with clear and structured responses.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Interactive AI Quiz Generator</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Generates Electrical Engineering quizzes based on the selected topic and difficulty level. Students can answer the quiz, receive automatic grading, review their answers, and learn from detailed explanations for both correct and incorrect responses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. DEVELOPER SECTION */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Developer & Acknowledgements</h2>
          </div>

          {/* Developer Profile Card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase tracking-wider">Lead Developer</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Muhammad Qasim Raza</h3>
                <p className="text-purple-600 font-semibold mt-1">Electrical Engineer</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1 text-sm">
                <p className="text-slate-600"><strong className="text-slate-900">University:</strong> University of Gujrat</p>
                <p className="text-slate-600"><strong className="text-slate-900">Campus:</strong> Main Hafiz Hayat Campus</p>
                <p className="text-slate-600"><strong className="text-slate-900">Department:</strong> Electrical Engineering</p>
              </div>
            </div>

            <p className="text-slate-700 text-lg leading-relaxed italic bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              "Muhammad Qasim Raza is a proud Electrical Engineering student at the University of Gujrat, Main Hafiz Hayat Campus. With a strong interest in Artificial Intelligence and modern web technologies, he is passionate about building practical applications that help students learn Electrical Engineering in a smarter and more interactive way. This AI-powered platform represents his dedication to continuous learning, innovation, and applying technology to solve real educational challenges."
            </p>
          </div>

          {/* Acknowledgement Card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">Acknowledgement</h3>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                "All praise and thanks belong to Allah Almighty, whose endless blessings, guidance, mercy, and countless favors made it possible for me to design, develop, and successfully complete my very first AI-powered web application. Every step of this journey has been possible only through His will and blessings. Alhamdulillah for granting me the opportunity, knowledge, patience, and strength to transform an idea into a complete working application."
              </p>
              <p>
                "I would also like to express my heartfelt gratitude to my respected teachers, the Department of Electrical Engineering, and the University of Gujrat, Main Hafiz Hayat Campus, for providing an excellent learning environment, valuable guidance, and continuous encouragement throughout my academic journey. Their support has played a significant role in developing my technical skills and inspiring me to explore modern technologies."
              </p>
            </div>
          </div>

          {/* My Mission Card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">My Mission</h3>
            <p className="text-slate-700 text-lg leading-relaxed">
              "My goal is to combine Artificial Intelligence with Electrical Engineering education to develop practical, user-friendly learning tools that simplify complex engineering concepts, improve students' understanding, and make learning more interactive, efficient, and enjoyable."
            </p>
          </div>
        </section>

      </div>

      {/* 8. PROFESSIONAL FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800 mt-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h3 className="text-white text-xl font-bold flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              EE Study Assistant
            </h3>
            <p className="text-sm leading-relaxed">
              Thank you for using EE Study Assistant. Designed especially for Electrical Engineering students.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end space-y-3 text-sm">
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link to="/calculators" className="hover:text-white transition-colors">Calculators</Link>
              <Link to="/ai" className="hover:text-white transition-colors">AI Study Hub</Link>
            </div>
            <p className="text-slate-500">© 2026 EE Study Assistant | Developed by Muhammad Qasim Raza</p>
          </div>
        </div>
      </footer>

    </div>
  );
}