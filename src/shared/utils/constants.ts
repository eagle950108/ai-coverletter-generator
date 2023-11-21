export const BASE_URL = 'http://localhost:4444/';

export enum ROUTE {
  API_URL = 'https://api.openai.com/v1/chat/completions'
}
export const CHAT_MODEL = "gpt-3.5-turbo";
export const CONTEXT_ITEM_LABEL = 'Get CoverLetter';

export const KEY_ACCESS_TOKEN = 'accessToken';

export const CONTEXT_ITEM_ID = 'eagleman_coverletter';

export const API_KEY = ""
const RESUME = ``
export const PROMPT_SENTENCE = `Generate a cover letter based on the following resume:\n\n${RESUME}\n\nInstructions: Use my relevant special skills for cover letter. Don't need address header and footer. Please base the letter on the job description below:  `