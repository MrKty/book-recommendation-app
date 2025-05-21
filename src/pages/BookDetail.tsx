import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { Typography, Rate, Tag, Divider, Descriptions, Button, Spin } from 'antd';
import api from '../utils/axios';
import parse from 'html-react-parser';
import { DetailedBook } from '../types/detailedBook';
import { Col } from 'antd';
import { Collapse } from 'antd';
import { Tabs } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setReview } from '../store/reviewsSlice';
import { Input } from 'antd';
import { message } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const BookDetail = () => {
  const { state } = useLocation();
  const { selfLink } = state;
  const { id } = useParams();

  const [book, setBook] = useState<DetailedBook | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const dispatch = useDispatch();

  const review = useSelector((state: RootState) => {
    const id = book?.id;
    return id && state.reviews[id] ? state.reviews[id] : { rating: 0, text: '' };
  });

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

  const { adjustedAverage, adjustedCount } = useMemo(() => {
    if (!book?.volumeInfo) {
      return { adjustedAverage: 0, adjustedCount: 0 };
    }

    const volume = book.volumeInfo;
    const originalCount = volume.ratingsCount ?? 0;
    const originalTotal = volume.averageRating ? volume.averageRating * originalCount : 0;

    if (review.rating > 0) {
      const count = originalCount + 1;
      const avg = (originalTotal + review.rating) / count;
      return { adjustedAverage: avg, adjustedCount: count };
    }

    return {
      adjustedAverage: volume.averageRating ?? 0,
      adjustedCount: originalCount,
    };
  }, [book?.volumeInfo, review.rating]);

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
  const sale = book.saleInfo;
  const access = book.accessInfo;
  const imageUrl = volume.imageLinks?.large || volume.imageLinks?.thumbnail || '';
  const secureImageUrl = imageUrl.replace(/^http:\/\//, 'https://');


  const renderDescription = () => {
    if (!volume.description) return 'No description available.';

    const cleanedDescription = volume.description;
    const shortDesc = cleanedDescription.slice(0, 300) + '...';

    return expanded ? parse(cleanedDescription) : parse(shortDesc);
  };

  const getFormatLabel = () => {
    if (sale?.isEbook) return 'Ebook';
    if (volume.printType) return volume.printType.charAt(0).toUpperCase() + volume.printType.slice(1).toLowerCase();
    return 'Unknown';
  };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 32 }}>
        <Col xs={24} md={6} style={{
          position: 'sticky',
          top: 32,
          alignSelf: 'flex-start',
          height: 'fit-content',
        }}>
          <div style={{ textAlign: 'center' }}>
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
                src={secureImageUrl}
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

            {sale?.buyLink && sale?.listPrice?.amount && sale?.listPrice?.currencyCode && (
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
            )}

            <Rate
              style={{ fontSize: 24 }}
              value={review.rating}
              onChange={(value) => {
                dispatch(setReview({ id: book.id, rating: value, text: review.text }));
              }}
            />
            <Text style={{ display: 'block', marginTop: 8 }}>
              {review.rating > 0 ? `You rated this ${review.rating}★` : 'Rate this book'}
            </Text>
          </div>
        </Col>

        <div style={{ flex: 1 }}>
          <Tabs defaultActiveKey="info" tabBarStyle={{ marginBottom: 24 }} className="custom-tabs">
            <Tabs.TabPane tab="Book Info" key="info">
              <Title style={{ marginBottom: 0 }}>{volume.title}</Title>

              {volume.subtitle && (
                <Text italic style={{ fontSize: 18, display: 'block', marginBottom: 12 }}>
                  {volume.subtitle}
                </Text>
              )}
              <Text type="secondary" style={{ fontSize: 16 }}>
                {volume.authors?.join(', ')}
              </Text>

              {adjustedAverage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
                  <Rate disabled allowHalf defaultValue={adjustedAverage} style={{ color: '#ed872d' }} />
                  <Text strong style={{ fontSize: 20 }}>{adjustedAverage.toFixed(2)}</Text>
                  {adjustedCount && (
                    <Text type="secondary">
                      · {adjustedCount.toLocaleString()} ratings
                    </Text>
                  )}
                </div>
              )}

              <Paragraph style={{ marginTop: 16, maxWidth: 800 }}>
                {renderDescription()}
                {volume.description && volume.description.length > 300 && (
                  <Text
                    type="secondary"
                    strong
                    style={{ display: 'block', marginTop: 8, cursor: 'pointer' }}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? 'Show less ▲' : 'Show more ▼'}
                  </Text>
                )}
              </Paragraph>

              {volume.categories && (
                <div style={{ marginTop: 16 }}>
                  <Text strong style={{ marginRight: 8 }}>Genres:</Text>
                  {volume.categories.map((cat) => (
                    <Tag key={cat} color="green">{cat}</Tag>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <Text type="secondary" style={{ display: 'block' }}>
                  {volume.pageCount || 'Unknown'} pages, {getFormatLabel()}
                </Text>
                {volume.publishedDate && (
                  <Text type="secondary" style={{ display: 'block' }}>
                    First published{' '}
                    {new Date(volume.publishedDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                )}
              </div>

              <Collapse
                bordered={false}
                style={{ marginTop: 24 }}
                expandIconPosition="end"
                defaultActiveKey={[]}
              >
                <Collapse.Panel
                  header={<Text strong>Book details</Text>}
                  key="1"
                  style={{ background: 'transparent' }}
                >
                  <Descriptions
                    column={2}
                    size="small"
                    labelStyle={{ width: 150 }}
                    style={{ maxWidth: 600 }}
                  >
                    <Descriptions.Item label="Pages">
                      {volume.pageCount || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Publisher">
                      {volume.publisher || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Published">
                      {volume.publishedDate || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Language">
                      {volume.language?.toUpperCase() || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="ISBNs">
                      {volume.industryIdentifiers
                        ?.map((id) => `${id.type}: ${id.identifier}`)
                        .join(', ') || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Formats">
                      {[
                        access?.epub?.isAvailable && 'EPUB',
                        access?.pdf?.isAvailable && 'PDF',
                      ]
                        .filter(Boolean)
                        .join(', ') || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Reading Modes">
                      {[
                        volume.readingModes?.text && 'Text',
                        volume.readingModes?.image && 'Image',
                      ]
                        .filter(Boolean)
                        .join(', ') || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Maturity">
                      {volume.maturityRating === 'NOT_MATURE' ? 'All Ages' : volume.maturityRating || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Text-to-speech">
                      {book.accessInfo?.textToSpeechPermission === 'ALLOWED' ? 'Available' : 'Unavailable'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Web Reader">
                      {access?.webReaderLink ? (
                        <a href={access.webReaderLink} target="_blank" rel="noreferrer">Open Reader ↗</a>
                      ) : 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Sale Status">
                      {book.saleInfo?.saleability || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Is Ebook">
                      {book.saleInfo?.isEbook ? 'Yes' : 'No'}
                    </Descriptions.Item>
                  </Descriptions>
                </Collapse.Panel>
              </Collapse>

              <Divider style={{ marginTop: 48 }} />

              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <Title level={3} style={{ fontWeight: 700, marginBottom: 8 }}>
                  What do <em style={{ fontStyle: 'italic' }}>you</em> think?
                </Title>

                <Rate
                  style={{ fontSize: 28, marginBottom: 8 }}
                  value={review.rating}
                  onChange={(value) =>
                    dispatch(setReview({ id: book.id, rating: value, text: review.text }))
                  }
                />
                <div style={{ marginBottom: 16, fontSize: 16, color: '#444' }}>
                  Rate this book
                </div>

                <TextArea
                  rows={4}
                  placeholder="Write your thoughts about this book..."
                  value={review.text}
                  onChange={(e) =>
                    dispatch(setReview({ id: book.id, rating: review.rating, text: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    maxWidth: 600,
                    margin: '0 auto 24px',
                    display: 'block',
                  }}
                />

                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  disabled={!review.text}
                  style={{ fontWeight: 600, padding: '0 32px' }}
                  onClick={() => {
                    dispatch(setReview({ id: book.id, rating: review.rating, text: review.text }));
                    message.success('Your review has been saved.');
                  }}
                >
                  Submit Review
                </Button>
              </div>

              <Divider />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Preview" key="preview">
              {access?.embeddable ? (
                <iframe
                  title="Google Books Embed"
                  width="100%"
                  height="600"
                  style={{ border: 'none', marginTop: 12 }}
                  src={`https://books.google.de/books?id=${book.id}&lpg=PP1&hl=en&pg=PP1&output=embed`}
                />
              ) : (
                <Text type="secondary">No preview available for this book.</Text>
              )}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;