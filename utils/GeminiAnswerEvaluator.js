import { GoogleGenAI } from '@google/genai';

export async function evaluateAnswer({ question, userAnswer }) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const prompt = `
  You are an interview evaluator.
  Question: ${question}
  User Answer: ${userAnswer}

  Task: Based on the question and user’s answer, provide feedback strictly in valid JSON format with the following fields:
  - rating: A number from 1 to 10 representing the quality of the answer.
  - feedback: 3 to 5 lines suggesting improvements or strengths.

  Return only JSON. Example:
  {
    "rating": 7,
    "feedback": "Your answer is good, but add more details and examples."
  }
  `;

  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({ model, contents });
  const candidate = response.candidates[0];
  const textContent = candidate.content.parts[0].text;

  // clean up formatting if Gemini wraps in ```json ... ```
  const feedbackJson = textContent.replace('```json', '').replace('```', '');
  
  return feedbackJson;
}
