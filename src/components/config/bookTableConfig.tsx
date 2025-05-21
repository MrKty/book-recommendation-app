// components/bookTableConfig.ts
import { BookOutlined } from '@ant-design/icons';
import { Rate, Tag } from 'antd';
import AuthorTags from '../book/AuthorTags';
import { ColDef } from 'ag-grid-community';

export const columnDefs: ColDef[] = [
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
    cellStyle: { whiteSpace: 'normal' },
    cellRenderer: (params: any) => <AuthorTags authors={params.value || []} />,
  },
  {
    headerName: 'Genre',
    field: 'categories',
    flex: 1,
    sortable: true,
    cellRenderer: (params: any) =>
      params.value?.length
        ? params.value.map((cat: string) => (
            <Tag key={cat} color="green">{cat}</Tag>
          ))
        : 'N/A',
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
      ) : (
        'N/A'
      ),
  },
];

export const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  suppressMovable: true,
  cellStyle: {
    fontSize: 14,
    padding: '12px',
  },
};