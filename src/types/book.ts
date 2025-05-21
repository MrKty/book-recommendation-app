export interface Book {
  id: string;
  title: string;
  authors: string[];
  categories?: string[];
  averageRating?: number;
  selfLink: string;
}