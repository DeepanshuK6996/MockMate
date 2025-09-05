import { GoogleGenAI } from '@google/genai';

export async function generateInterviewQuestions({ jobPosition, jobDescription, jobExperience }) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const prompt = `You are an AI interview simulator. 
                Job Role: ${jobPosition}, Tech Stack: ${jobDescription}, 
                Experience: ${jobExperience} years. 
                Generate 10 interview questions with answers in pure JSON format only:
                [
                    { "question": "string", "answer": "string" },
                    ...
                ]
                Do not include any explanation outside the JSON.`;

  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({ model, contents });
  // console.log("Gemini raw response:", response);
  // console.log("Gemini candidates:", response.candidates[0]);
  const candidate = response.candidates[0];
  const textContent = candidate.content.parts[0].text;
  const mockJsonResponse = (textContent).replace('```json','').replace("```",'');
  // console.log(mockJsonResponse);
  return mockJsonResponse;

}
