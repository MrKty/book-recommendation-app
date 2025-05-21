import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { columnDefs, defaultColDef } from '../components/config/bookTableConfig';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import useBooks from '../hooks/useBooks';
import { resetSearch } from '../store/searchSlice';
import { useEffect } from 'react';


ModuleRegistry.registerModules([AllCommunityModule]);


const BookList = () => {
  const searchQuery = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { books, loading, error } = useBooks(searchQuery || 'subject:fiction');

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, [dispatch]);

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