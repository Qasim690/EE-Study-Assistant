import { useState } from 'react';

// --- SHARED UI COMPONENTS ---
const Card = ({ title, children, icon }: { title: string, children: React.ReactNode, icon: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
    <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
    </div>
    <div className="flex-grow flex flex-col space-y-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder: string }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      type="number"
      className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

// --- CALCULATOR COMPONENTS ---

const OhmsLaw = () => {
  const [v, setV] = useState('');
  const [i, setI] = useState('');
  const [r, setR] = useState('');
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const vVal = parseFloat(v);
    const iVal = parseFloat(i);
    const rVal = parseFloat(r);
    const vNaN = isNaN(vVal);
    const iNaN = isNaN(iVal);
    const rNaN = isNaN(rVal);

    if (vNaN && !iNaN && !rNaN) setV((iVal * rVal).toFixed(2));
    else if (!vNaN && iNaN && !rNaN) setI((vVal / rVal).toFixed(4));
    else if (!vNaN && !iNaN && rNaN) setR((vVal / iVal).toFixed(2));
    else setError('Enter exactly 2 values to calculate the 3rd.');
  };

  const reset = () => { setV(''); setI(''); setR(''); setError(''); };

  return (
    <Card title="Ohm's Law (V = IR)" icon="M13 10V3L4 14h7v7l9-11h-7z">
      <Input label="Voltage (V)" value={v} onChange={setV} placeholder="Volts" />
      <Input label="Current (I)" value={i} onChange={setI} placeholder="Amperes" />
      <Input label="Resistance (R)" value={r} onChange={setR} placeholder="Ohms" />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div className="mt-auto pt-4 flex space-x-2">
        <button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Calculate</button>
        <button onClick={reset} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">Reset</button>
      </div>
    </Card>
  );
};

const ElectricPower = () => {
  const [v, setV] = useState('');
  const [i, setI] = useState('');
  const [p, setP] = useState<number | null>(null);

  const calculate = () => {
    if (v && i) setP(parseFloat(v) * parseFloat(i));
  };
  const reset = () => { setV(''); setI(''); setP(null); };

  return (
    <Card title="Electric Power (P = VI)" icon="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
      <Input label="Voltage (V)" value={v} onChange={setV} placeholder="Volts" />
      <Input label="Current (I)" value={i} onChange={setI} placeholder="Amperes" />
      
      {p !== null && (
        <div className="bg-green-50 text-green-800 p-3 rounded-lg text-center font-bold">
          Power = {p.toFixed(2)} W
        </div>
      )}
      
      <div className="mt-auto pt-4 flex space-x-2">
        <button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Calculate</button>
        <button onClick={reset} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">Reset</button>
      </div>
    </Card>
  );
};

const ElectricalEnergy = () => {
  const [p, setP] = useState('');
  const [t, setT] = useState('');
  const [energy, setEnergy] = useState<{wh: number, kwh: number} | null>(null);

  const calculate = () => {
    if (p && t) {
      const wh = parseFloat(p) * parseFloat(t);
      setEnergy({ wh, kwh: wh / 1000 });
    }
  };
  const reset = () => { setP(''); setT(''); setEnergy(null); };

  return (
    <Card title="Energy (E = P × t)" icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
      <Input label="Power (W)" value={p} onChange={setP} placeholder="Watts" />
      <Input label="Time (Hours)" value={t} onChange={setT} placeholder="Hours" />
      
      {energy !== null && (
        <div className="bg-green-50 text-green-800 p-3 rounded-lg text-sm font-bold text-center flex flex-col">
          <span>{energy.wh.toFixed(2)} Wh</span>
          <span className="text-xs font-medium text-green-600">({energy.kwh.toFixed(4)} kWh)</span>
        </div>
      )}
      
      <div className="mt-auto pt-4 flex space-x-2">
        <button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Calculate</button>
        <button onClick={reset} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">Reset</button>
      </div>
    </Card>
  );
};

const MaterialResistance = () => {
  const [rho, setRho] = useState('');
  const [l, setL] = useState('');
  const [a, setA] = useState('');
  const [r, setR] = useState<number | null>(null);

  const calculate = () => {
    if (rho && l && a && parseFloat(a) !== 0) {
      setR((parseFloat(rho) * parseFloat(l)) / parseFloat(a));
    }
  };
  const reset = () => { setRho(''); setL(''); setA(''); setR(null); };

  return (
    <Card title="Wire Resistance (R = ρL/A)" icon="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4">
      <Input label="Resistivity (ρ)" value={rho} onChange={setRho} placeholder="Ω·m" />
      <Input label="Length (L)" value={l} onChange={setL} placeholder="Meters" />
      <Input label="Area (A)" value={a} onChange={setA} placeholder="Sq. Meters" />
      
      {r !== null && (
        <div className="bg-green-50 text-green-800 p-3 rounded-lg text-center font-bold">
          Resistance = {r.toExponential(4)} Ω
        </div>
      )}
      
      <div className="mt-auto pt-4 flex space-x-2">
        <button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Calculate</button>
        <button onClick={reset} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">Reset</button>
      </div>
    </Card>
  );
};

const DynamicResistors = ({ type }: { type: 'Series' | 'Parallel' }) => {
  const [resistors, setResistors] = useState<string[]>(['', '']);
  const [total, setTotal] = useState<number | null>(null);

  const add = () => setResistors([...resistors, '']);
  const remove = (index: number) => {
    const newR = [...resistors];
    newR.splice(index, 1);
    setResistors(newR);
  };
  const update = (index: number, val: string) => {
    const newR = [...resistors];
    newR[index] = val;
    setResistors(newR);
  };

  const calculate = () => {
    const vals = resistors.map(v => parseFloat(v)).filter(v => !isNaN(v) && v > 0);
    if (vals.length === 0) return;

    if (type === 'Series') {
      setTotal(vals.reduce((acc, curr) => acc + curr, 0));
    } else {
      const sumOfInverses = vals.reduce((acc, curr) => acc + (1 / curr), 0);
      setTotal(1 / sumOfInverses);
    }
  };

  const reset = () => { setResistors(['', '']); setTotal(null); };

  return (
    <Card 
      title={`${type} Resistance`} 
      icon={type === 'Series' ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M4 6h16M4 12h16M4 18h16"}
    >
      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
        {resistors.map((r, i) => (
          <div key={i} className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-500 w-6">R{i + 1}</span>
            <input
              type="number"
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={r}
              onChange={(e) => update(i, e.target.value)}
              placeholder="Ohms"
            />
            {resistors.length > 2 && (
              <button onClick={() => remove(i)} className="p-1.5 text-slate-400 hover:text-red-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        ))}
      </div>
      
      <button onClick={add} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center py-2 border border-dashed border-blue-200 rounded-lg bg-blue-50/50">
        + Add Resistor
      </button>

      {total !== null && (
        <div className="bg-green-50 text-green-800 p-3 rounded-lg text-center font-bold mt-2">
          Total Req = {total.toFixed(2)} Ω
        </div>
      )}
      
      <div className="mt-auto pt-4 flex space-x-2">
        <button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Calculate</button>
        <button onClick={reset} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">Reset</button>
      </div>
    </Card>
  );
};

// --- MAIN PAGE LAYOUT ---
export default function Calculators() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Engineering Calculators</h1>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Core electrical engineering computation tools. Input your values and calculate the results instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <OhmsLaw />
        <ElectricPower />
        <ElectricalEnergy />
        <MaterialResistance />
        <DynamicResistors type="Series" />
        <DynamicResistors type="Parallel" />
      </div>
    </div>
  );
}