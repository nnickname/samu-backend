import { Meeting, IMeeting } from '../models/Meeting';

export class MeetingRepository {
  async findByMeetingId(meetingId: string): Promise<IMeeting | null> {
    return Meeting.findOne({ meetingId });
  }

  async addChatMessage(meetingId: string, question: string, answer: string): Promise<IMeeting | null> {
    return Meeting.findOneAndUpdate(
      { meetingId },
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
    const meeting = new Meeting(meetingData);
    return meeting.save();
  }
}
