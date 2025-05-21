import { useEffect, useState, useMemo } from 'react';
import { Typography, Rate, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { resetSearch } from '../store/searchSlice';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { Book } from '../types/book';
import { BookOutlined } from '@ant-design/icons';
import AuthorTags from '../components/AuthorTags';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBooks = async (query: string = 'subject:fiction') => {
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

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, []);

  useEffect(() => {
    fetchBooks(searchQuery || 'subject:fiction');
  }, [searchQuery]);

  const columnDefs: ColDef[] = useMemo(() => [
    {
      headerName: 'Title',
      field: 'title',
      flex: 4,
      sortable: true,
      cellRenderer: (params: any) => (
        <span style={{ fontWeight: 500, fontSize: 16 }}>
          <BookOutlined style={{ marginRight: 8, color: '#1677ff' }} />
          {params.value}
        </span>
      ),
    },
    {
      headerName: 'Author(s)',
      field: 'authors',
      flex: 2,
      sortable: true,
      autoHeight: true,
      cellStyle: {
        whiteSpace: 'normal',
      },
      cellRenderer: (params: any) => <AuthorTags authors={params.value || []} />,
    },
    {
      headerName: 'Genre',
      field: 'categories',
      flex: 1,
      sortable: true,
      cellRenderer: (params: any) =>
        params.value?.length ? params.value.map((cat: string) => (
          <Tag key={cat} color="green">{cat}</Tag>
        )) : 'N/A',
    },
    {
      headerName: 'Avg. Rating',
      field: 'averageRating',
      flex: 1,
      sortable: true,
      cellRenderer: (params: any) =>
        params.value ? (
          <div>
            <Rate disabled allowHalf value={params.value} style={{ fontSize: 14 }} />
            <span style={{ marginLeft: 8 }}>{params.value.toFixed(1)}</span>
          </div>
        ) : 'N/A',
    },
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    suppressMovable: true,
    cellStyle: {
      fontSize: 14,
      padding: '12px',
    },
  }), []);

  return (
    <div style={{ padding: 24 }}>
      <div className="ag-theme-alpine" style={{ height: '85vh', width: '100%' }}>
        <AgGridReact
          rowData={books}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={(params) => params.data.id}
          rowHeight={60}

          animateRows
          pagination
          paginationPageSize={20}
          onRowDoubleClicked={(event) => {
            const { id, selfLink } = event.data;
            navigate(`/book/${id}`, { state: { selfLink } });
          }}
          loading={loading}
          noRowsOverlayComponentParams={{ message: 'No books found.' }}
          className="ag-theme-quartz"
          domLayout="normal"
        />
      </div>
    </div>
  );
};

export default BookList;