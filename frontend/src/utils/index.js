import { artAiPrompts } from '../constants';
import FileSaver from 'file-saver';

export const getRandomPrompt = (prompt) => {
    const randomNum = Math.floor(Math.random()*artAiPrompts.length);
    const randomPromt = artAiPrompts[randomNum]

    if(randomPromt === prompt) return getRandomPrompt(prompt)
    return randomPromt
}

export const downloadImg = async (_id, photo) => {
    FileSaver.saveAs(photo, `ThinkArt-${_id}.jpg`)
}
