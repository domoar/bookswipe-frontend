import { v4 as uuidv4 } from 'uuid';

export const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('bookswipe_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('bookswipe_session_id', sessionId);
  }
  return sessionId;
};