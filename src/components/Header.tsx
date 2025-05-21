import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useSelector((state) => state.search);

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value.trim()));
  };

  const isBookDetail = location.pathname.includes('/book/');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        borderBottom: '1px solid #eee',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {isBookDetail && (
          <ArrowLeftOutlined
            onClick={() => navigate('/')}
            style={{ fontSize: 18, cursor: 'pointer' }}
          />
        )}
        <h2 style={{ margin: 0 }}>
          {isBookDetail ? 'Book Details' : 'Book List'}
        </h2>
      </div>

      {!isBookDetail && (
        <Input.Search
          placeholder="Search by title or author"
          enterButton
          allowClear
          defaultValue={query}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      )}
    </div>
  );
};

export default Header;