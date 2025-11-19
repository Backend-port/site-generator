export async function handler(event) {
  try {
    const { image } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        input_image: image,
        prompt: "Analisa gambar secara detail dan jelaskan isinya dalam format JSON berbahasa Indonesia."
      })
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", detail: err.toString() })
    };
  }
}
