import { FC } from 'react';
import { BookOutlined } from '@ant-design/icons';
import { Button, Rate, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setReview } from '../store/reviewsSlice';

const { Text } = Typography;

interface BookSidebarProps {
  bookId: string;
  volume: any;
  sale?: any;
  imgLoaded: boolean;
  setImgLoaded: (loaded: boolean) => void;
  imageUrl: string;
}

const BookSidebar: FC<BookSidebarProps> = ({ bookId, volume, sale, imgLoaded, setImgLoaded, imageUrl }) => {
  const dispatch = useDispatch();
  const review = useSelector((state: RootState) => state.reviews[bookId] || { rating: 0, text: '' });

  return (
    <div style={{ position: 'sticky', top: 32, alignSelf: 'flex-start', height: 'fit-content', textAlign: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: 200,
          height: 300,
          margin: '0 auto',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        {!imgLoaded && (
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <BookOutlined style={{ fontSize: 48, color: '#ccc' }} />
            <div style={{ marginTop: 8 }}>
              <Spin size="small" />
            </div>
          </div>
        )}

        <img
          src={imageUrl}
          alt={volume.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            position: 'absolute',
          }}
        />
      </div>

      {volume.canonicalVolumeLink && (
        <Button
          shape="round"
          size="large"
          href={volume.canonicalVolumeLink}
          target="_blank"
          style={{
            width: '80%',
            backgroundColor: '#1a73e8',
            borderColor: '#1a73e8',
            color: 'white',
            marginBottom: 12,
          }}
          icon={<span style={{ fontSize: 16 }}>↗</span>}
        >
          View in Google Play
        </Button>
      )}

      {volume.previewLink && (
        <Button
          type="primary"
          shape="round"
          size="large"
          href={volume.previewLink}
          target="_blank"
          style={{
            backgroundColor: '#2e7d32',
            borderColor: '#2e7d32',
            width: '80%',
            marginBottom: 12,
          }}
        >
          Read Preview
        </Button>
      )}

      {sale?.buyLink && sale?.listPrice?.amount && sale?.listPrice?.currencyCode ? (
        <Button
          shape="round"
          size="large"
          href={sale.buyLink}
          target="_blank"
          style={{
            width: '80%',
            borderColor: '#2e7d32',
            color: '#2e7d32',
            marginBottom: 24,
          }}
          icon={<span style={{ fontSize: 16 }}>↗</span>}
        >
          Buy for {sale.listPrice.amount.toFixed(2)} {sale.listPrice.currencyCode}
        </Button>
      ) : (
        <div style={{ color: '#999', fontStyle: 'italic', marginBottom: 24 }}>
          Not available for buying
        </div>
      )}

      <Rate
        style={{ fontSize: 24 }}
        value={review.rating}
        onChange={(value) => {
          dispatch(setReview({ id: bookId, rating: value, text: review.text }));
        }}
      />
      <Text style={{ display: 'block', marginTop: 8 }}>
        {review.rating > 0 ? `You rated this ${review.rating}★` : 'Rate this book'}
      </Text>
    </div>
  );
};

export default BookSidebar;