import React, { useState } from 'react';
import { Button, Popover, Typography, Box, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch } from 'react-redux';
import { refreshCharacters } from '../store/characterSlice';
import styled from '@emotion/styled';

const AnimatedButton = styled(Button)`
  &:hover {
    background-color: #ff4081;
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
  }
`;

const RefreshButton: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setLoading(true);
    await dispatch(refreshCharacters());
    setLoading(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'refresh-popover' : undefined;

  return (
    <>
      <AnimatedButton
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={<RefreshIcon />}
      >
        Refresh Characters
      </AnimatedButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{ p: 2 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>Refreshing...</Typography>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Characters refreshed successfully!
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default RefreshButton;
