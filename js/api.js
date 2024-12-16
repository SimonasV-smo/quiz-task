const API_URL = "https://testapi.io/api/SimonasV/resource/players";

export async function submitScore(name, score) {
  try {
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

    if (!response.ok) {
      console.error("Nepavyko pateikti rezultato:", response.statusText);
      throw new Error("Nepavyko pateikti rezultato");
    }

    console.log("Rezultatas pateiktas sėkmingai");
    return await response.json();
  } catch (error) {
    console.error("Klaida pateikiant rezultatą:", error);
    throw error;
  }
}

export async function fetchTopScores() {
  try {
    const response = await fetch(
      `${API_URL}?_sort=score&_order=desc&_limit=10`
    );

    if (!response.ok) {
      console.error("Nepavyko gauti rezultatų sąrašo:", response.statusText);
      throw new Error("Nepavyko gauti rezultatų sąrašo");
    }

    const result = await response.json();
    console.log("Gauti rezultatai:", result.data);
    return result.data;
  } catch (error) {
    console.error("Klaida gaunant rezultatus:", error);
    throw error;
  }
}
