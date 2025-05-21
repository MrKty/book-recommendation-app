import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { Book } from '../types/book';

const useBooks = (query: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const formattedQuery = query.trim().replace(/\s+/g, '+');
        const res = await api.get(`/volumes?q=${formattedQuery}&maxResults=40`);
        const items = res.data.items || [];
        const bookData: Book[] = items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          categories: item.volumeInfo.categories || [],
          averageRating: item.volumeInfo.averageRating,
          selfLink: item.selfLink,
        }));
        setBooks(bookData);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchBooks();
    }
  }, [query]);

  return { books, loading, error };
};

export default useBooks;