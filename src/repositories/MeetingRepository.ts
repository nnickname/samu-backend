import { Meeting, IMeeting } from '../models/Meeting';
import { TRANSCRIPTION } from '../models/transcription';
export class MeetingRepository {
  async findByMeetingId(meetingId: string): Promise<IMeeting | null> {
    return Meeting.findOne({ _id: meetingId });
  }

  async addChatMessage(meetingId: string, question: string, answer: string): Promise<IMeeting | null> {
    return Meeting.findOneAndUpdate(
      { _id: meetingId },
      {
        $push: {
          chatHistory: {
            question,
            answer,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );
  }

  async createMeeting(meetingData: Partial<IMeeting>): Promise<IMeeting> {
    try {
        meetingData.transcription = TRANSCRIPTION;
        const meeting = new Meeting(meetingData);
        const savedMeeting = await meeting.save();
        return savedMeeting;
    } catch (error) {
        throw error;
    }
  }
  async getAllChats(): Promise<IMeeting[]> {
    return Meeting.find();
  }
}
