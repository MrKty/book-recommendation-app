import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { DetailedBook } from '../types/detailedBook';

const useBookDetail = (selfLink?: string) => {
  const [book, setBook] = useState<DetailedBook | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selfLink) return;

    const fetchBookDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(selfLink);
        setBook(res.data);
      } catch (err) {
        console.error('Failed to fetch book detail:', err);
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [selfLink]);

  return { book, loading, error };
};

export default useBookDetail;