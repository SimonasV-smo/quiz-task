const API_URL = "https://testapi.io/api/SimonasV/resource/players";

export async function submitScore(name, score) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      score,
      date: new Date().toISOString(),
    }),
  });

  if (!response.ok) throw new Error("Nepavyko pateikti rezultato");
  return response.json();
}

export async function fetchTopScores() {
  const response = await fetch(`${API_URL}?_sort=score&_order=desc&_limit=10`);
  if (!response.ok) throw new Error("Nepavyko gauti rezultatų sąrašo");
  return response.json();
}
