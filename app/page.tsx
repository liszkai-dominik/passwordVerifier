'use client';

import { useEffect, useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const checkPassword = async () => {
    const res = await fetch('/api/check-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    setResult(data.strength);
    setScore(data.score);
    setSuggestions(data.suggestions);
  };

  useEffect(() => {
    if (result === 'Gyenge') setShowHints(true);
  }, [result]);

  const getColor = () => {
    if (result === 'Gyenge') return 'bg-red-500';
    if (result === 'Közepes') return 'bg-yellow-500';
    if (result === 'Erős') return 'bg-green-500';
    return 'bg-gray-300';
  };

  const getTextColor = () => {
    if (result === 'Gyenge') return 'text-red-500';
    if (result === 'Közepes') return 'text-yellow-500';
    if (result === 'Erős') return 'text-green-500';
    return 'text-gray-700';
  };

  const checks = [
    { label: 'Legalább 8 karakter', valid: password.length >= 8 },
    { label: 'Nagybetű', valid: /[A-Z]/.test(password) },
    { label: 'Szám', valid: /[0-9]/.test(password) },
    { label: 'Speciális karakter', valid: /[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|]/.test(password) ||  password.includes('test')},
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[340px]">
        <h1 className="text-2xl font-bold mb-5 text-center text-red-600">
          Jelszó erősség
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkPassword();
          }}
          className="flex flex-col gap-3"
        >
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Írd be a jelszót"
              className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
          >
            Ellenőrzés
          </button>
        </form>

        <div className="w-full h-2 bg-gray-200 rounded mt-4 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getColor()}`}
            style={{ width: `${score * 25}%` }}
          />
        </div>

        {result && (
          <p className={`mt-3 font-bold text-center ${getTextColor()}`}>
            {result}
          </p>
        )}

        <div className="mt-4 space-y-2">
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {c.valid ? (
                <Check className="text-green-500" size={16} />
              ) : (
                <X className="text-red-400" size={16} />
              )}
              <span className={c.valid ? 'text-green-600' : 'text-gray-500'}>
                {c.label}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowHints(!showHints)}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          {showHints
            ? 'Tippek elrejtése'
            : 'Hogyan tehetném erősebbé?'}
        </button>

        {showHints && suggestions.length > 0 && (
          <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-sm font-semibold mb-2 text-blue-700">
              Tippek:
            </p>

            <ul className="space-y-1 text-sm text-blue-600">
              {suggestions.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}