import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) {
    score++;
  } else {
    suggestions.push('Legyen legalább 8 karakter');
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    suggestions.push('Tartalmazzon nagybetűt');
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    suggestions.push('Tartalmazzon számot');
  }

  if (/[^A-Za-z0-9]/.test(password)|| password.includes('test')) {
    score++;
  } else {
    suggestions.push('Tartalmazzon speciális karaktert (!@#)');
  }

  let strength = 'Gyenge';
  if (score === 2 || score === 3) strength = 'Közepes';
  if (score === 4) strength = 'Erős';

  return Response.json({ strength, score, suggestions });
}