import { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import api from '../utils/axios';
import { Book } from '../types/book';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Rate, Tag } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();

  const fetchBooks = async (query: string = 'fiction') => {
    setLoading(true);
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
    } catch (error) {
      console.error('Failed to fetch books', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books whenever the query changes
  useEffect(() => {
    fetchBooks(searchQuery || 'fiction');
  }, [searchQuery]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => (
        <span style={{ fontWeight: 500, fontSize: 16 }}>
          <BookOutlined style={{ marginRight: 8, color: '#1677ff' }} />
          {title}
        </span>
      ),
    },
    {
      title: 'Author(s)',
      dataIndex: 'authors',
      key: 'authors',
      render: (authors: string[]) =>
        authors?.map((author) => (
          <Tag key={author} color="blue">
            {author}
          </Tag>
        )),
    },
    {
      title: 'Genre',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories: string[]) =>
        categories?.length
          ? categories.map((cat) => (
            <Tag key={cat} color="green">
              {cat}
            </Tag>
          ))
          : 'N/A',
    },
    {
      title: 'Avg. Rating',
      dataIndex: 'averageRating',
      key: 'averageRating',
      render: (rating?: number) =>
        rating ? (
          <div>
            <Rate disabled allowHalf value={rating} style={{ fontSize: 14 }} />
            <span style={{ marginLeft: 8 }}>{rating.toFixed(1)}</span>
          </div>
        ) : (
          'N/A'
        ),
    },
  ];

  return (
    <div style={{ padding: 24, overflowX: 'auto' }}>
      <Table
        columns={columns}
        dataSource={books}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 20 }}
        onRow={(record) => ({
          onDoubleClick: () =>
            navigate(`/book/${record.id}`, { state: { selfLink: record.selfLink } }),
        })}
        bordered
        size="middle"
        rowClassName={() => 'hover-row'}
        style={{ borderRadius: 12, overflow: 'hidden' }}
      />
    </div>
  );
};

export default BookList;