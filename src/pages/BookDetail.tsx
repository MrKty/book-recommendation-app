import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Spin, Col } from 'antd';
import BookSidebar from '../components/book/BookSidebar';
import BookInfoTabs from '../components/book/BookInfoTabs';
import useBookDetail from '../hooks/useBookDetail';

const BookDetail = () => {
  const { state } = useLocation();
  const { selfLink } = state;
  const { id } = useParams();

  const { book, loading, error } = useBookDetail(selfLink);
  const [imgLoaded, setImgLoaded] = useState(false);

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

  // Not memoized
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