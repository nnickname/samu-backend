import { Configuration, OpenAIApi } from 'openai';

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
      const prompt = `Based on this conversation transcription: 
        ${JSON.stringify(transcription)}
        
        Please answer this question: ${question}`;

      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      return completion.data.choices[0].message?.content || "No answer available";
    } catch (error) {
      console.error('OpenAI API Error:');
      throw new Error('Failed to get answer from OpenAI');
    }
  }
}
