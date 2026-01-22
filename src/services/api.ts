// API Service für Backend-Kommunikation
// Alle HTTP Requests ohne Authentication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  subGenres: string[];
  coverImage?: string;
  quotes: Array<{
    text: string;
    page?: number;
  }>;
  description: string;
  pageCount: number;
  rating: number;
}

export interface SwipeRequest {
  bookId: string;
  direction: 'left' | 'right';
  userId?: string;
}

export interface RecommendationResponse {
  recommendations: Book[];
  matchPercentages: { [bookId: string]: number };
}

// GET: Alle Bücher
export async function getAllBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all books:', error);
    throw error;
  }
}

// GET: Buch-Details nach ID
export async function getBookById(bookId: string): Promise<Book | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
}

// POST: Swipe-Aktion (links oder rechts)
export async function postSwipe(swipeData: SwipeRequest): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/swipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(swipeData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Error posting swipe:', error);
    throw error;
  }
}

// POST: Swipe-Session abschließen
export async function completeSwipeSession(sessionData: {
  likedBookIds: string[];
  rejectedBookIds: string[];
  userId?: string;
}): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/swipe/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Error completing swipe session:', error);
    throw error;
  }
}

// GET: Personalisierte Empfehlungen
export async function getRecommendations(userId?: string): Promise<RecommendationResponse> {
  try {
    const url = userId 
      ? `${API_BASE_URL}/recommendations?userId=${userId}`
      : `${API_BASE_URL}/recommendations`;
      
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}

// GET: Gelikte Bücher (Bibliothek)
export async function getLikedBooks(userId?: string): Promise<Book[]> {
  try {
    const url = userId 
      ? `${API_BASE_URL}/library?userId=${userId}`
      : `${API_BASE_URL}/library`;
      
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching liked books:', error);
    throw error;
  }
}

// GET: User-Statistiken
export async function getUserStats(userId?: string): Promise<{
  totalSwipes: number;
  totalLikes: number;
  totalRead: number;
  topGenres: string[];
}> {
  try {
    const url = userId 
      ? `${API_BASE_URL}/stats?userId=${userId}`
      : `${API_BASE_URL}/stats`;
      
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
}
