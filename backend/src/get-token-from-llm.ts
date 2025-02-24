import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getTokenFromLLM(contents: string) {
  const completion = await groq.chat.completions
    .create({
      messages: [
            {"role": "system", "content": "You are an AI agent that needs to tell me if this tweet is about buying a token. Return me either the address of the solana token, or return me null if you cant find a solana token address in this tweet. Only return if it says it is a bull post. The token address will be very visible in the tweet."},
        {
          "role": "user",
          "content": contents,
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  return completion.choices[0].message.content ?? null;
}