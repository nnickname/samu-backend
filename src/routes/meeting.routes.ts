import { Router } from 'express';
import { MeetingController } from '../controllers/MeetingController';

const router = Router();
const meetingController = new MeetingController();

router.get('/meeting/:meetingId/chat', meetingController.getChatHistory);
router.post('/meeting/:meetingId/chat', meetingController.askQuestion);

export default router;
