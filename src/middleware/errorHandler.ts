import { Request, Response } from 'express';

export const errorHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
}; 