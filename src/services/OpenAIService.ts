import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class OpenAIService {
  private openai: OpenAIApi;

  constructor() {    
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getAnswer(question: string, transcription: any): Promise<string> {
    try {
      const messages: ChatCompletionRequestMessage[]   = [
        { role: "assistant", content: "You are a helpful assistant that answers questions about meeting transcriptions." },
        { role: "user", content: "Here is the meeting transcription:" },
        { role: "user", content: JSON.stringify(transcription) },
        { role: "user", content: `Question: ${question}` }
      ];
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages
      });
      return completion.data.choices[0].message?.content || "No answer available";
    } catch (error: any) {
      throw new Error('Failed to get answer from OpenAI');
    }
  }
}
