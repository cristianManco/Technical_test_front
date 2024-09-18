import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../store/characterSlice';
import { Box, TextField, CircularProgress, Paper } from '@mui/material';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'species', headerName: 'Species', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'location', headerName: 'Location', width: 200 },
];

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: string;
}

interface CharacterState {
  characters: Character[];
  loading: boolean;
}

const CharacterList: React.FC = () => {
  const dispatch = useDispatch();
  const { characters, loading } = useSelector((state: { characters: CharacterState }) => state.characters);
  
  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(210);
  const [search, setSearch] = useState('');

  // API call on load or when changing page, page size, or search text
  useEffect(() => {
    dispatch(fetchCharacters({ name: search, page: page + 1, limit: pageSize }));
  }, [dispatch, page, search, pageSize]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0); 
  };

  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, backgroundColor: 'white', borderRadius: '5px' }}
        value={search}
        onChange={handleSearchChange}
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={characters.map((char: Character, index: number) => ({ id: index, ...char }))}
          columns={columns}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          rowCount={200}
          components={{
            Toolbar: GridToolbar,
          }}
          sx={{
            '& .MuiDataGrid-root': {
              borderRadius: '10px',
              overflow: 'hidden',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#673ab7',
              color: 'black',
              fontSize: '1rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f1f1f1',
            },
          }}
        />
      )}
    </Paper>
  );
};

export default CharacterList;
