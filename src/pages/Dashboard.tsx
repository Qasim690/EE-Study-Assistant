import { Link } from 'react-router-dom';

export default function Dashboard() {
  // 1. Statistic Cards Data
  const stats = [
    { title: 'Total Calculators', value: '12', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { title: 'Total Formulas', value: '45', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z M13 2v7h7' },
    { title: 'AI Assistant Status', value: 'Online', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'text-green-600' },
    { title: 'Saved Calculations', value: '8', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
    { title: 'Study Progress', value: '65%', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { title: 'Quick Access', value: 'Active', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  ];

  // 2. Quick Actions Data
  const quickActions = [
    { name: 'Open Calculators', path: '/calculators', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Browse Formula Library', path: '/formulas', color: 'bg-indigo-600 hover:bg-indigo-700' },
    { name: 'Open AI Assistant', path: '/ai', color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  // 3. Recently Added Features Data
  const recentFeatures = [
    "Ohm's Law Calculator",
    "Power Calculator",
    "Formula Library",
    "AI Assistant (Coming Soon)"
  ];

  // 4. Tips Data
  const tips = [
    "Revise formulas daily.",
    "Practice numerical problems.",
    "Understand concepts before memorizing equations.",
    "Use the AI Assistant for difficult topics."
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here is an overview of your academic resources.</p>
      </div>

      {/* 1. Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <svg className={`w-6 h-6 ${stat.color || 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Quick Actions & Recent Features) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className={`${action.color} text-white text-center px-4 py-3 rounded-xl font-medium transition-colors shadow-sm`}
                >
                  {action.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Recently Added Features */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recently Added Features</h2>
            <ul className="divide-y divide-slate-100">
              {recentFeatures.map((feature, index) => (
                <li key={index} className="py-3 flex items-center space-x-3 text-slate-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column (Tips for Students) */}
        <div className="lg:col-span-1">
          {/* 4. Tips for Students Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 h-full">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h2 className="text-xl font-bold text-slate-900">Tips for Students</h2>
            </div>
            <ul className="space-y-4">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3 text-slate-700 bg-white/60 p-3 rounded-lg shadow-sm border border-blue-50/50">
                  <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}