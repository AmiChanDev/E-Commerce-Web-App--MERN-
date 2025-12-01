import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

export const getOrCreateSessionId = (req: Request): string => {
  // Check if session ID exists in cookies
  let sessionId = req.cookies.sessionId;

  // If no session ID, generate a new one
  if (!sessionId) {
    sessionId = uuidv4();
  }

  return sessionId;
};

export const setSessionCookie = (sessionId: string, res: any): void => {
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };

  res.cookie('sessionId', sessionId, cookieOptions);
};