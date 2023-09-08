import { config } from 'dotenv';
config();

import OpenAI from "openai";
const OPENAI = new OpenAI({
  apiKey: process.env.API_KEY
});



export async function getPromptsFromOpenAI (summary) {
  const content = 'Give me single line promts for image generation relevant to the following summary. '
  const messages = [{"role": "user", "content": `${content} ${summary}`}];

  const response = await OPENAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  
  const responseMessage = response.choices[0].message;

  return responseMessage;
}

export async function getHashTagsFromOpenAI (summary, number) {
  const content = `Give me ${number || 10} hashtags for the following content.`
  const messages = [{"role": "user", "content": `${content} ${summary}`}];

  const response = await OPENAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  
  const responseMessage = response.choices[0].message;

  const arrayList = responseMessage.content.split(/\r?\n/);

  const filtered = arrayList.map((item) => {
    return item.split('. ')[1];
  })
  return filtered;
}

