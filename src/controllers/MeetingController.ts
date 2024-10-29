import { Request, Response } from 'express';
import { MeetingRepository } from '../repositories/MeetingRepository';
import { OpenAIService } from '../services/OpenAIService';
import { errorHandler } from '../middleware/errorHandler';
import { responseHandler } from '../middleware/responseHandler';

export class MeetingController {
  private meetingRepository: MeetingRepository;
  private openAIService: OpenAIService;

  constructor() {
    this.meetingRepository = new MeetingRepository();
    this.openAIService = new OpenAIService();
  }

  getChatHistory = errorHandler(async (req: Request, res: Response): Promise<void> => {
    const { meetingId } = req.params;
    const meeting = await this.meetingRepository.findByMeetingId(meetingId);
    
    if (!meeting) {
      return responseHandler.error(res, 'Meeting not found', 404);
    }
    responseHandler.success(res, meeting);
  });

  createMeeting = errorHandler(async (req: Request, res: Response): Promise<void> => {
    const meeting = await this.meetingRepository.createMeeting(req.body);
    if (!meeting) {
      return responseHandler.error(res, 'Error creating meeting', 400);
    }
    responseHandler.success(res, meeting, 201);
  });

  askQuestion = errorHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.body.question || req.body.question === '') {
      return responseHandler.error(res, 'Question is required', 400);
    }
    const { meetingId } = req.params;
    const { question } = req.body;

    const meeting = await this.meetingRepository.findByMeetingId(meetingId);
    if (!meeting) {
      return responseHandler.error(res, 'Meeting not found', 404);
    }

    const answer = await this.openAIService.getAnswer(question, meeting.transcription);
    const updatedMeeting = await this.meetingRepository.addChatMessage(meetingId, question, answer);
    if (!updatedMeeting) {
      return responseHandler.error(res, 'Error updating meeting', 404);
    }
    responseHandler.success(res, {
      question,
      answer,
      timestamp: new Date()
    });
  });

  getAllChats = errorHandler(async (req: Request, res: Response): Promise<void> => {
    const chats = await this.meetingRepository.getAllChats();
    if (!chats?.length) {
      return responseHandler.error(res, 'No chats found', 404);
    }
    responseHandler.success(res, chats);
  });
}
