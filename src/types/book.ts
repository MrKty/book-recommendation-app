export interface Book {
  id: string;
  title: string;
  authors: string[];
  genre: string;
  averageRating: number;
  description?: string;
}

export enum Genre {
  Fiction = 'Fiction',
  History = 'History',
  SciFi = 'SciFi',
  Biography = 'Biography'
}