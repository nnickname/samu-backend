import { Meeting, IMeeting } from '../models/Meeting';
import JsonTranscription from '../../transcripcion.json';
export class MeetingRepository {
  async findByMeetingId(meetingId: string): Promise<IMeeting | null> {
    return Meeting.findOne({ _id: meetingId });
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
    try {
        meetingData.transcription = JsonTranscription;
        const meeting = new Meeting(meetingData);
        console.log('Attempting to save meeting:', meeting);
        const savedMeeting = await meeting.save();
        console.log('Meeting saved successfully:', savedMeeting);
        return savedMeeting;
    } catch (error) {
        console.error('Error saving meeting:', error);
        throw error;
    }
  }
}
