import { MeetingController } from '../src/controllers/MeetingController';
import { Request, Response } from 'express';
import { IMeeting, Meeting } from '../src/models/Meeting';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/database';
import { OpenAIService } from '../src/services/OpenAIService';

describe('MeetingController', () => {
  const MOCK_MEETING_ID = '67206efe98f309711b33ea31';

  let meetingController: MeetingController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockMeeting: Partial<IMeeting>;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });


  beforeEach(() => {
    meetingController = new MeetingController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockMeeting = {
      transcription: {
        speakers: [],
        messages: []
      },
      chatHistory: []
    };
  });


  describe('Chats', () => {
    let createdMeetingId: string;

    afterEach(async () => {
        if (createdMeetingId) {
            await Meeting.findByIdAndDelete(createdMeetingId);
        }
    });

    it('debe retornar todas las reuniones exitosamente', async () => {
      await meetingController.getAllChats(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.arrayContaining([
            expect.any(Object),
        ])
      );
    });

    it('debe crear una reunión exitosamente', async () => {
      mockRequest = {
        body: {}
      };

      await meetingController.createMeeting(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          transcription: expect.objectContaining({
            speakers: expect.any(Array),
            messages: expect.any(Array)
          }),
          chatHistory: expect.any(Array)
        })
      );

      createdMeetingId = (mockResponse.json as jest.Mock).mock.calls[0][0]._id;
    });
  });

  describe('getChatById', () => {
    it('debe obtener un chat específico por ID', async () => {
      const mockChat = {
        _id: MOCK_MEETING_ID,
        transcription: {
          speakers: [],
          messages: []
        },
        chatHistory: []
      };

      mockRequest = {
        params: {
          meetingId: MOCK_MEETING_ID
        }
      };

      jest.spyOn(Meeting, 'findOne').mockResolvedValueOnce(mockChat as unknown as IMeeting);

      await meetingController.getChatHistory(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockChat);
    });
    
  });

  describe('OpenAIService', () => {
    it('debe obtener una respuesta exitosa de OpenAI', async () => {
      const mockTranscription = {
        speakers: ['Speaker 1'],
        messages: ['Hello, this is a test message']
      };

      const mockQuestion = '¿Cuál fue el tema principal de la reunión?';
      const mockAIResponse = 'Esta es una respuesta de prueba de OpenAI';

      const openAIService = new OpenAIService();
      jest.spyOn(OpenAIService.prototype, 'getAnswer').mockResolvedValueOnce(mockAIResponse);

      const response = await openAIService.getAnswer(mockQuestion, mockTranscription);

      expect(response).toBe(mockAIResponse);
    });
  });
});
