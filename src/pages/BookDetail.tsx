import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spin, Col } from 'antd';
import { DetailedBook } from '../types/detailedBook';
import api from '../utils/axios';
import BookSidebar from '../components/BookSidebar';
import BookInfoTabs from '../components/BookInfoTabs';

const BookDetail = () => {
  const { state } = useLocation();
  const { selfLink } = state;
  const { id } = useParams();

  const [book, setBook] = useState<DetailedBook | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(selfLink);
        setBook(res.data);
      } catch (err) {
        console.error('Failed to fetch book detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selfLink) fetchBookDetail();
  }, [selfLink]);

  if (!id || loading || !book) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          width: '100%',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const volume = book.volumeInfo;
  const imageUrl = (volume.imageLinks?.large || volume.imageLinks?.thumbnail || '').replace(/^http:\/\//, 'https://');

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 32 }}>
        <Col xs={24} md={6}>
          <BookSidebar
            bookId={book.id}
            volume={volume}
            sale={book.saleInfo}
            imgLoaded={imgLoaded}
            setImgLoaded={setImgLoaded}
            imageUrl={imageUrl}
          />
        </Col>

        <div style={{ flex: 1 }}>
          <BookInfoTabs book={book} />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;