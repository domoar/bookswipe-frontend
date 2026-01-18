export interface Quote {
  id: string;
  text: string;
  author: string;
  mood: string[];
}

export interface BookRecommendation {
  title: string;
  reason: string;
  coverUrl: string;
}