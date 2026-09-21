import { GoogleGenAI } from "@google/genai";
import {z} from "zod";

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

async function InvokeGeminiAI() {
    const response = await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:"Hello Gemini ! Explain what is interview ?"
    })

    console.log(response.text)
}

const interviewReportSchema = z.object({
    matchScore:z.number().describe("The score between 0 to 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical Questions asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind this question"),
        answer: z.string().describe("How to answer the question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview and their intention and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral Questions asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind this question"),
        answer: z.string().describe("How to answer the question, what points to cover, what approach to take etc.")
    })).describe("Behavior questions that can be asked in the interview and their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill in which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in preparartion plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan e.g data structures, mock interviews"),
        tasks: z.array(z.string()).describe("List of Tasks to be done on this days to follow the preparation plan")
    })).length(7).describe("A day-wise preparation plan for candidate to follow in order to prepare for interview effectively"),

    title: z.string().describe("The title of the job for which the interview report is generated")
})

async function fetchWithRetry(url, options, retries = 6, delayMs = 3000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        const response = await fetch(url, options);

        if (response.ok) {
            return response;
        }

        const isRetryable = response.status === 503 || response.status === 429;

        if (isRetryable && attempt < retries) {
            console.log(`Gemini API attempt ${attempt} failed with ${response.status}, retrying in ${delayMs * attempt}ms...`);
            await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
            continue;
        }

        return response;
    }
}

async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    const prompt = `Generate an interview report for candidate with following details
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}`

    const response = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GOOGLE_GENAI_API_KEY
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseJsonSchema: z.toJSONSchema(interviewReportSchema)
                }
            })
        }
    )

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    return JSON.parse(text)
}

export default generateInterviewReport