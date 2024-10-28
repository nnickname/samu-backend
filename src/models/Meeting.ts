import mongoose, { Schema, Document } from 'mongoose';

interface ISpeaker {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

interface IMessage {
  speakerId: number;
  text: string;
}

interface IChatMessage {
  question: string;
  answer: string;
  timestamp: Date;
}

export interface IMeeting extends Document {
  meetingId: string;
  transcription: {
    speakers: ISpeaker[];
    messages: IMessage[];
  };
  chatHistory: IChatMessage[];
}

const MeetingSchema = new Schema({
  meetingId: { type: String, required: true, unique: true },
  transcription: {
    speakers: [{
      id: Number,
      name: String,
      lastName: String,
      email: String
    }],
    messages: [{
      speakerId: Number,
      text: String
    }]
  },
  chatHistory: [{
    question: String,
    answer: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

export const Meeting = mongoose.model<IMeeting>('Meeting', MeetingSchema);
