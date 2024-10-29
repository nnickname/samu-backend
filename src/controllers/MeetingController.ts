import { Request, Response } from 'express';
import { MeetingRepository } from '../repositories/MeetingRepository';
import { OpenAIService } from '../services/OpenAIService';

export class MeetingController {
  private meetingRepository: MeetingRepository;
  private openAIService: OpenAIService;

  constructor() {
    this.meetingRepository = new MeetingRepository();
    this.openAIService = new OpenAIService();
  }

  getChatHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { meetingId } = req.params;
      const meeting = await this.meetingRepository.findByMeetingId(meetingId);
      
      if (!meeting) {
        res.status(404).json({ message: 'Meeting not found' });
        return;
      }

      res.json(meeting.chatHistory);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  createMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
      const meeting = await this.meetingRepository.createMeeting(req.body);
      if(meeting){
        res.status(201).json(meeting);
      }else{
        res.status(400).json({ message: 'Error creating meeting' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  askQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      
      const { meetingId } = req.params;
      const { question } = req.body;

      const meeting = await this.meetingRepository.findByMeetingId(meetingId);
      if (!meeting) {
        res.status(404).json({ message: 'Meeting not found' });
        return;
      }

      const answer = await this.openAIService.getAnswer(question, meeting.transcription);
      const updatedMeeting = await this.meetingRepository.addChatMessage(meetingId, question, answer);
      console.log(updatedMeeting);
      if(updatedMeeting){ 
        res.json({
          question,
        answer,
          timestamp: new Date()
        });
      }else{
        res.status(400).json({ message: 'Error updating meeting' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
}



