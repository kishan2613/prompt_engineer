import axios from "axios";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `
You are PromptForge.

Your job is to help developers build software.

Always:
- Gradually build a complete software specification.
- Keep responses concise.
`;

export async function sendMessage(messages) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...messages,
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message;
  } catch (err) {
    console.error(err);

    return {
      role: "assistant",
      content: "Something went wrong.",
    };
  }
}