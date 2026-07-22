import { useState, useEffect } from 'react';

// --- DATA: 40+ ELECTRICAL ENGINEERING FORMULAS ---
const formulas = [
  // Basic Electrical
  { id: 'be1', name: "Ohm's Law", category: 'Basic Electrical', equation: 'V = I × R', description: 'Fundamental relationship between voltage, current, and resistance.', units: 'Volts (V)', variables: { 'V': 'Voltage', 'I': 'Current', 'R': 'Resistance' }, example: 'Calculating voltage drop across a 10Ω resistor with 2A current: V = 2 × 10 = 20V.' },
  { id: 'be2', name: 'Electric Power', category: 'Basic Electrical', equation: 'P = V × I', description: 'Rate at which electrical energy is transferred by a circuit.', units: 'Watts (W)', variables: { 'P': 'Power', 'V': 'Voltage', 'I': 'Current' }, example: 'Power consumed by a 12V device drawing 3A: P = 12 × 3 = 36W.' },
  { id: 'be3', name: 'Electrical Energy', category: 'Basic Electrical', equation: 'E = P × t', description: 'Total power consumed over a specific period of time.', units: 'Joules (J) or kWh', variables: { 'E': 'Energy', 'P': 'Power', 't': 'Time' }, example: 'Energy used by a 100W bulb in 10 hours: E = 100W × 10h = 1 kWh.' },
  { id: 'be4', name: 'Wire Resistance', category: 'Basic Electrical', equation: 'R = ρ(L/A)', description: 'Resistance of a conductor based on its material and geometry.', units: 'Ohms (Ω)', variables: { 'R': 'Resistance', 'ρ': 'Resistivity', 'L': 'Length', 'A': 'Cross-sectional Area' }, example: 'Determining the resistance of a copper wire for a circuit simulation.' },
  { id: 'be5', name: 'Charge', category: 'Basic Electrical', equation: 'Q = I × t', description: 'Total electric charge passing through a point over time.', units: 'Coulombs (C)', variables: { 'Q': 'Charge', 'I': 'Current', 't': 'Time' }, example: 'Charge transferred by 5A over 2 seconds: Q = 5 × 2 = 10C.' },
  { id: 'be6', name: 'Conductance', category: 'Basic Electrical', equation: 'G = 1 / R', description: 'The measure of how easily electricity flows along a path.', units: 'Siemens (S)', variables: { 'G': 'Conductance', 'R': 'Resistance' }, example: 'Conductance of a 50Ω resistor: G = 1/50 = 0.02S.' },

  // DC Circuits
  { id: 'dc1', name: "Kirchhoff's Voltage Law (KVL)", category: 'DC Circuits', equation: 'Σ V = 0', description: 'The algebraic sum of all voltages in a closed loop is zero.', units: 'Volts (V)', variables: { 'Σ V': 'Sum of Voltage Drops and Rises' }, example: 'Analyzing the mesh currents in a complex resistive network.' },
  { id: 'dc2', name: "Kirchhoff's Current Law (KCL)", category: 'DC Circuits', equation: 'Σ I_in = Σ I_out', description: 'Total current entering a junction equals total current leaving.', units: 'Amperes (A)', variables: { 'I_in': 'Current entering node', 'I_out': 'Current leaving node' }, example: 'Finding unknown branch currents at a central circuit node.' },
  { id: 'dc3', name: 'Series Resistance', category: 'DC Circuits', equation: 'R_eq = R₁ + R₂ + ... + Rₙ', description: 'Total equivalent resistance of resistors connected in a single path.', units: 'Ohms (Ω)', variables: { 'R_eq': 'Equivalent Resistance', 'Rₙ': 'Individual Resistor values' }, example: 'Adding 10Ω and 20Ω resistors in series yields 30Ω.' },
  { id: 'dc4', name: 'Parallel Resistance', category: 'DC Circuits', equation: '1/R_eq = 1/R₁ + 1/R₂ + ...', description: 'Equivalent resistance of resistors connected across the same voltage nodes.', units: 'Ohms (Ω)', variables: { 'R_eq': 'Equivalent Resistance' }, example: 'Two 10Ω resistors in parallel yield an equivalent resistance of 5Ω.' },
  { id: 'dc5', name: 'Voltage Divider', category: 'DC Circuits', equation: 'V_x = V_s × (R_x / R_eq)', description: 'Determines the voltage across a specific resistor in a series circuit.', units: 'Volts (V)', variables: { 'V_x': 'Voltage across target resistor', 'V_s': 'Source Voltage', 'R_x': 'Target Resistance' }, example: 'Scaling a 12V sensor signal down to 5V using a resistor network.' },
  { id: 'dc6', name: 'Current Divider', category: 'DC Circuits', equation: 'I_x = I_t × (R_eq / R_x)', description: 'Determines the current through a specific branch in a parallel circuit.', units: 'Amperes (A)', variables: { 'I_x': 'Branch current', 'I_t': 'Total current', 'R_x': 'Branch resistance' }, example: 'Calculating how much of a 10A supply flows through the 5Ω branch.' },

  // AC Circuits
  { id: 'ac1', name: 'Inductive Reactance', category: 'AC Circuits', equation: 'X_L = 2πfL', description: 'The opposition a purely inductive circuit offers to alternating current.', units: 'Ohms (Ω)', variables: { 'X_L': 'Inductive Reactance', 'f': 'Frequency', 'L': 'Inductance' }, example: 'Reactance of a 10mH inductor at 50Hz: 2 × 3.14 × 50 × 0.01 = 3.14Ω.' },
  { id: 'ac2', name: 'Capacitive Reactance', category: 'AC Circuits', equation: 'X_C = 1 / (2πfC)', description: 'The opposition a purely capacitive circuit offers to alternating current.', units: 'Ohms (Ω)', variables: { 'X_C': 'Capacitive Reactance', 'f': 'Frequency', 'C': 'Capacitance' }, example: 'Calculating AC impedance for filter design.' },
  { id: 'ac3', name: 'Impedance (Series RLC)', category: 'AC Circuits', equation: 'Z = √(R² + (X_L - X_C)²) ', description: 'Total opposition to AC current, combining resistance and reactance.', units: 'Ohms (Ω)', variables: { 'Z': 'Impedance', 'R': 'Resistance', 'X_L': 'Inductive Reactance', 'X_C': 'Capacitive Reactance' }, example: 'Finding the total Z in an RLC Proteus simulation.' },
  { id: 'ac4', name: 'Real Power (Active)', category: 'AC Circuits', equation: 'P = V × I × cos(θ)', description: 'The actual power consumed by resistive loads to do useful work.', units: 'Watts (W)', variables: { 'P': 'Real Power', 'V': 'RMS Voltage', 'I': 'RMS Current', 'cos(θ)': 'Power Factor' }, example: 'Calculating actual wattage consumed by an AC motor.' },
  { id: 'ac5', name: 'Reactive Power', category: 'AC Circuits', equation: 'Q = V × I × sin(θ)', description: 'Power that oscillates between source and reactive loads (inductors/capacitors).', units: 'VAR (Volts-Amps Reactive)', variables: { 'Q': 'Reactive Power', 'sin(θ)': 'Reactive Factor' }, example: 'Sizing a capacitor bank to correct excessive reactive power.' },
  { id: 'ac6', name: 'Apparent Power', category: 'AC Circuits', equation: 'S = V × I', description: 'The combination of real and reactive power in an AC circuit.', units: 'VA (Volt-Amperes)', variables: { 'S': 'Apparent Power', 'V': 'RMS Voltage', 'I': 'RMS Current' }, example: 'Sizing an AC generator or transformer.' },
  { id: 'ac7', name: 'Power Factor', category: 'AC Circuits', equation: 'PF = cos(θ) = P / S', description: 'Ratio of real power used to do work versus apparent power supplied.', units: 'Dimensionless (0 to 1)', variables: { 'PF': 'Power Factor', 'P': 'Real Power', 'S': 'Apparent Power' }, example: 'Evaluating the efficiency of power utilization in an industrial plant.' },
  { id: 'ac8', name: 'Resonant Frequency', category: 'AC Circuits', equation: 'f_r = 1 / (2π√(LC))', description: 'The frequency at which inductive and capacitive reactances cancel out.', units: 'Hertz (Hz)', variables: { 'f_r': 'Resonant Frequency', 'L': 'Inductance', 'C': 'Capacitance' }, example: 'Tuning an oscillator circuit to a specific transmission frequency.' },

  // Power Systems
  { id: 'ps1', name: 'Three-Phase Real Power', category: 'Power Systems', equation: 'P = √3 × V_L × I_L × cos(θ)', description: 'Total active power in a balanced three-phase system.', units: 'Watts (W)', variables: { 'V_L': 'Line Voltage', 'I_L': 'Line Current', 'cos(θ)': 'Power Factor' }, example: 'Calculating output for a regional power distribution network.' },
  { id: 'ps2', name: 'Three-Phase Apparent Power', category: 'Power Systems', equation: 'S = √3 × V_L × I_L', description: 'Total apparent power in a balanced three-phase system.', units: 'VA', variables: { 'S': 'Apparent Power', 'V_L': 'Line Voltage', 'I_L': 'Line Current' }, example: 'Determining the required capacity for a substation transformer.' },
  { id: 'ps3', name: 'Star Connection Voltage', category: 'Power Systems', equation: 'V_L = √3 × V_ph', description: 'Relationship between line voltage and phase voltage in a Wye (Star) network.', units: 'Volts (V)', variables: { 'V_L': 'Line Voltage', 'V_ph': 'Phase Voltage' }, example: 'Deriving line voltage from a 230V phase source (230 × √3 ≈ 400V).' },
  { id: 'ps4', name: 'Delta Connection Current', category: 'Power Systems', equation: 'I_L = √3 × I_ph', description: 'Relationship between line current and phase current in a Delta network.', units: 'Amperes (A)', variables: { 'I_L': 'Line Current', 'I_ph': 'Phase Current' }, example: 'Calculating line draw for a heavy industrial Delta-connected motor.' },
  { id: 'ps5', name: 'Transmission Line Power Loss', category: 'Power Systems', equation: 'P_loss = I² × R', description: 'Power dissipated as heat along the length of transmission cables.', units: 'Watts (W)', variables: { 'I': 'Line Current', 'R': 'Line Resistance' }, example: 'Estimating losses over a high-voltage transmission span.' },
  { id: 'ps6', name: 'Load Factor', category: 'Power Systems', equation: 'LF = Average Load / Peak Load', description: 'Measures the utilization rate, or efficiency of electrical energy usage.', units: 'Ratio or %', variables: { 'LF': 'Load Factor' }, example: 'Analyzing power grid stability and pricing structures.' },

  // Transformers
  { id: 'tr1', name: 'Transformer EMF Equation', category: 'Transformers', equation: 'E = 4.44 × f × N × Φ_m', description: 'Root mean square value of the induced EMF in a transformer winding.', units: 'Volts (V)', variables: { 'f': 'Frequency', 'N': 'Number of turns', 'Φ_m': 'Max magnetic flux' }, example: 'Designing the primary winding for a step-down transformer.' },
  { id: 'tr2', name: 'Turns Ratio', category: 'Transformers', equation: 'a = N₁/N₂ = V₁/V₂ = I₂/I₁', description: 'The mathematical relationship between primary and secondary coils.', units: 'Ratio', variables: { 'N₁, N₂': 'Turns', 'V₁, V₂': 'Voltages', 'I₁, I₂': 'Currents' }, example: 'Calculating secondary voltage given primary voltage and turn counts.' },
  { id: 'tr3', name: 'Voltage Regulation', category: 'Transformers', equation: '%VR = ((V_NL - V_FL) / V_FL) × 100', description: 'The change in secondary voltage from no-load to full-load.', units: 'Percentage (%)', variables: { 'V_NL': 'No-load voltage', 'V_FL': 'Full-load voltage' }, example: 'Verifying transformer performance under heavy industrial load.' },
  { id: 'tr4', name: 'Transformer Efficiency', category: 'Transformers', equation: 'η = (P_out / P_in) × 100', description: 'Ratio of useful power output to total power input.', units: 'Percentage (%)', variables: { 'P_out': 'Output Power', 'P_in': 'Input Power (P_out + Losses)' }, example: 'Evaluating the performance of a distribution transformer.' },
  { id: 'tr5', name: 'Total Core Loss', category: 'Transformers', equation: 'P_core = P_h + P_e', description: 'Total iron losses composed of hysteresis and eddy current losses.', units: 'Watts (W)', variables: { 'P_h': 'Hysteresis Loss', 'P_e': 'Eddy Current Loss' }, example: 'Calculating static losses independent of load current.' },

  // Electrical Machines
  { id: 'em1', name: 'Synchronous Speed', category: 'Electrical Machines', equation: 'N_s = (120 × f) / P', description: 'The speed of the rotating magnetic field in the stator.', units: 'RPM', variables: { 'N_s': 'Synchronous Speed', 'f': 'Supply Frequency', 'P': 'Number of Poles' }, example: 'Finding the theoretical max speed of a single-phase induction motor.' },
  { id: 'em2', name: 'Motor Slip', category: 'Electrical Machines', equation: 's = (N_s - N_r) / N_s', description: 'The difference between synchronous speed and actual rotor speed.', units: 'Ratio or %', variables: { 'N_s': 'Synchronous Speed', 'N_r': 'Rotor Speed' }, example: 'Calculating slip to determine torque generation in an induction motor.' },
  { id: 'em3', name: 'Rotor Frequency', category: 'Electrical Machines', equation: 'f_r = s × f_s', description: 'The frequency of the induced current in the rotor circuit.', units: 'Hertz (Hz)', variables: { 'f_r': 'Rotor Frequency', 's': 'Slip', 'f_s': 'Stator (Supply) Frequency' }, example: 'Analyzing rotor copper losses at different operating speeds.' },
  { id: 'em4', name: 'Motor Torque', category: 'Electrical Machines', equation: 'T = (P_out × 60) / (2π × N_r)', description: 'The rotational force generated by the motor shaft.', units: 'Newton-meters (Nm)', variables: { 'P_out': 'Mechanical Power', 'N_r': 'Rotor Speed (RPM)' }, example: 'Sizing an induction motor to drive a specific mechanical load.' },
  { id: 'em5', name: 'DC Motor Back EMF', category: 'Electrical Machines', equation: 'E_b = (P × Φ × Z × N) / (60 × A)', description: 'The electromotive force generated in opposition to the applied voltage.', units: 'Volts (V)', variables: { 'P': 'Poles', 'Φ': 'Flux/pole', 'Z': 'Conductors', 'N': 'Speed', 'A': 'Parallel paths' }, example: 'Calculating the armature current limits during DC motor startup.' },
  { id: 'em6', name: 'Machine Efficiency', category: 'Electrical Machines', equation: 'η = (Mechanical Output / Electrical Input)', description: 'Overall energy conversion efficiency of a motor.', units: 'Percentage (%)', variables: { 'Output': 'Shaft Power (W)', 'Input': 'Grid Power (W)' }, example: 'Rating a machine for an academic design display banner.' },

  // Electronics & Control
  { id: 'el1', name: 'PI Controller Output', category: 'Electronics', equation: 'u(t) = K_p e(t) + K_i ∫e(t)dt', description: 'Control signal generated by Proportional-Integral feedback action.', units: 'Varies by plant', variables: { 'u(t)': 'Control Signal', 'e(t)': 'Error (Setpoint - Process)', 'K_p': 'Proportional Gain', 'K_i': 'Integral Gain' }, example: 'Tuning a Fuel Flow Rate Control System to eliminate steady-state error.' },
  { id: 'el2', name: 'Diode Current (Shockley)', category: 'Electronics', equation: 'I_D = I_S × (e^(V_D / nV_T) - 1)', description: 'Current flowing through a forward-biased semiconductor diode.', units: 'Amperes (A)', variables: { 'I_D': 'Diode Current', 'I_S': 'Saturation Current', 'V_D': 'Voltage across diode', 'V_T': 'Thermal Voltage' }, example: 'Simulating non-linear component behavior in circuit modeling software.' },
  { id: 'el3', name: 'RC Time Constant', category: 'Electronics', equation: 'τ = R × C', description: 'Time required to charge a capacitor to ~63.2% of supply voltage.', units: 'Seconds (s)', variables: { 'τ': 'Time Constant', 'R': 'Resistance', 'C': 'Capacitance' }, example: 'Designing a delay timer or a low-pass filter cutoff.' },
  { id: 'el4', name: 'Operational Amplifier (Inverting)', category: 'Electronics', equation: 'A_v = - (R_f / R_in)', description: 'Voltage gain of an op-amp configured as an inverting amplifier.', units: 'Ratio (V/V)', variables: { 'A_v': 'Voltage Gain', 'R_f': 'Feedback Resistor', 'R_in': 'Input Resistor' }, example: 'Amplifying a small sensor signal for an analog-to-digital converter.' },
  { id: 'el5', name: 'Transistor Current Gain', category: 'Electronics', equation: 'β (h_FE) = I_C / I_B', description: 'The ratio of collector current to base current in a BJT.', units: 'Dimensionless', variables: { 'β': 'Current Gain', 'I_C': 'Collector Current', 'I_B': 'Base Current' }, example: 'Calculating required base drive to saturate a switching transistor.' }
];

const categories = ['All', 'Basic Electrical', 'DC Circuits', 'AC Circuits', 'Power Systems', 'Transformers', 'Electrical Machines', 'Electronics', 'Favorites'];

// --- COMPONENTS ---
export default function FormulaLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load favorites from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ee_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ee_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (equation: string, id: string) => {
    navigator.clipboard.writeText(equation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter Logic
  const filteredFormulas = formulas.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'Favorites') {
      return matchesSearch && favorites.includes(f.id);
    }
    
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Search Bar */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Formula Library</h1>
        <p className="text-slate-600 mb-6 max-w-3xl">
          A comprehensive reference guide for electrical engineering equations, ranging from foundational DC circuit laws to complex power distribution and machine formulas.
        </p>
        
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors shadow-sm"
            placeholder="Search formulas by name, variable, or concept (e.g., 'Induction Motor Slip', 'PI Controller')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? category === 'Favorites' 
                  ? 'bg-red-50 text-red-700 border-red-200 border shadow-sm' 
                  : 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {category === 'Favorites' && <span className="mr-1.5">❤️</span>}
            {category}
          </button>
        ))}
      </div>

      {/* Formula Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFormulas.map((f) => (
          <div key={f.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
            
            {/* Card Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div>
                <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md mb-2">
                  {f.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{f.name}</h3>
              </div>
              <button 
                onClick={() => toggleFavorite(f.id)}
                className={`p-2 rounded-full transition-colors ${favorites.includes(f.id) ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:bg-slate-100'}`}
                title="Toggle Favorite"
              >
                <svg className="w-6 h-6" fill={favorites.includes(f.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Equation Display */}
            <div className="p-5 bg-slate-800 relative group">
              <div className="text-center">
                <span className="font-mono text-2xl font-medium text-white tracking-wider">{f.equation}</span>
              </div>
              <button
                onClick={() => copyToClipboard(f.equation, f.id)}
                className="absolute top-2 right-2 p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium flex items-center space-x-1"
              >
                {copiedId === f.id ? (
                  <span className="text-green-400 flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Copied</span>
                ) : (
                  <span>Copy</span>
                )}
              </button>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-grow flex flex-col text-sm">
              <p className="text-slate-700 mb-4">{f.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex justify-between border-b border-slate-100 pb-1">
                  <span>Variables</span>
                  <span className="text-slate-500 font-normal">{f.units}</span>
                </h4>
                <ul className="space-y-1.5">
                  {Object.entries(f.variables).map(([symbol, meaning]) => (
                    <li key={symbol} className="flex text-slate-600">
                      <span className="font-mono font-medium text-slate-900 w-12 flex-shrink-0">{symbol}</span>
                      <span className="text-slate-500 mr-2">=</span>
                      <span>{meaning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              <div className="mt-auto pt-4 bg-blue-50/50 rounded-lg p-3 border border-blue-100/50">
                <span className="block text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Example</span>
                <span className="text-slate-600 italic leading-relaxed">{f.example}</span>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
          <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-900">No formulas found</h3>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}