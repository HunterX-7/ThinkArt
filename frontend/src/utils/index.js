import { artAiPrompts } from '../constants';

export const getRandomPrompt = (prompt) => {
    const randomNum = Math.floor(Math.random()*artAiPrompts.length);
    const randomPromt = artAiPrompts[randomNum]

    if(randomPromt === prompt) return getRandomPrompt(prompt)
    return randomPromt
}