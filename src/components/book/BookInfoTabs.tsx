import { FC, useMemo, useState } from 'react';
import { Collapse, Descriptions, Divider, Rate, Tabs, Tag, Typography, Input, Button, message } from 'antd';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setReview } from '../../store/reviewsSlice';
import { DetailedBook } from '../../types/detailedBook';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface BookInfoTabsProps {
  book: DetailedBook;
}

const BookInfoTabs: FC<BookInfoTabsProps> = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const defaultReview = useMemo(() => ({ rating: 0, text: '' }), []);
  const review = useSelector((state: RootState) => state.reviews[book.id] || defaultReview);

  const volume = book.volumeInfo;
  const sale = book.saleInfo;
  const access = book.accessInfo;

  const { adjustedAverage, adjustedCount } = useMemo(() => {
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
  }, [volume.averageRating, volume.ratingsCount, review.rating]);

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
    <Tabs
      defaultActiveKey="info"
      tabBarStyle={{ marginBottom: 24 }}
      className="custom-tabs"
      items={[
        {
          key: 'info',
          label: 'Book Info',
          children: (
            <>
              <Title style={{ marginBottom: 0 }}>{volume.title}</Title>

              {volume.subtitle && (
                <Text italic style={{ fontSize: 18, display: 'block', marginBottom: 12 }}>
                  {volume.subtitle}
                </Text>
              )}

              <Text type="secondary" style={{ fontSize: 16 }}>
                {volume.authors?.join(', ')}
              </Text>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
                <Rate disabled allowHalf value={adjustedAverage} style={{ color: '#ed872d' }} />
                <Text strong style={{ fontSize: 20 }}>
                  {adjustedAverage > 0 ? adjustedAverage.toFixed(2) : '0.00'}
                </Text>
                <Text type="secondary">
                  · {adjustedCount > 0 ? `${adjustedCount.toLocaleString()} ratings` : 'No ratings yet'}
                </Text>
              </div>

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
                items={[
                  {
                    key: 'details',
                    label: <Text strong>Book details</Text>,
                    style: { background: 'transparent' },
                    children: (
                      <Descriptions
                        column={2}
                        size="small"
                        styles={{ label: { width: 150 } }}
                        style={{ maxWidth: 600 }}
                      >
                        <Descriptions.Item label="Pages">{volume.pageCount || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Publisher">{volume.publisher || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Published">{volume.publishedDate || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Language">{volume.language?.toUpperCase() || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="ISBNs">{volume.industryIdentifiers?.map((id) => `${id.type}: ${id.identifier}`).join(', ') || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Formats">{[access?.epub?.isAvailable && 'EPUB', access?.pdf?.isAvailable && 'PDF'].filter(Boolean).join(', ') || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Reading Modes">{[volume.readingModes?.text && 'Text', volume.readingModes?.image && 'Image'].filter(Boolean).join(', ') || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Maturity">{volume.maturityRating === 'NOT_MATURE' ? 'All Ages' : volume.maturityRating || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Text-to-speech">{book.accessInfo?.textToSpeechPermission === 'ALLOWED' ? 'Available' : 'Unavailable'}</Descriptions.Item>
                        <Descriptions.Item label="Web Reader">{access?.webReaderLink ? <a href={access.webReaderLink} target="_blank" rel="noreferrer">Open Reader ↗</a> : 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Sale Status">{book.saleInfo?.saleability || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Is Ebook">{book.saleInfo?.isEbook ? 'Yes' : 'No'}</Descriptions.Item>
                      </Descriptions>
                    ),
                  },
                ]}
              />
              <Collapse
                bordered={false}
                style={{ marginTop: 12 }}
                expandIconPosition="end"
                defaultActiveKey={[]}
                items={[
                  {
                    key: 'review',
                    label: <Text strong>Your review</Text>,
                    style: { background: 'transparent' },
                    children: (
                      <div style={{ textAlign: 'center' }}>
                        <Title level={4} style={{ fontWeight: 600, marginBottom: 8 }}>
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
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
                    ),
                  },
                ]}
              />
            </>
          ),
        },
        {
          key: 'preview',
          label: 'Preview',
          children: access?.embeddable ? (
            <iframe
              title="Google Books Embed"
              width="100%"
              height="600"
              style={{ border: 'none', marginTop: 12 }}
              src={`https://books.google.de/books?id=${book.id}&lpg=PP1&hl=en&pg=PP1&output=embed`}
            />
          ) : (
            <Text type="secondary">No preview available for this book.</Text>
          ),
        }
      ]}
    />
  );
};

export default BookInfoTabs;