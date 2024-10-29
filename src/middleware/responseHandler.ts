import { Response } from 'express';

export const responseHandler = {
  success: (res: Response, data: any, status: number = 200): void => {
    res.status(status).json(data);
  },
  
  error: (res: Response, message: string, status: number = 400): void => {
    res.status(status).json({ message });
  }
}; 