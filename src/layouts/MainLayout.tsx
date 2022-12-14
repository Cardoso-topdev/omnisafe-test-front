/* eslint-disable @typescript-eslint/ban-types */
import Box from '@mui/material/Box';
import React, { PropsWithChildren } from 'react';
import Header from '../components/Header';

/**
 * MainLayout is using on the all pages
 */
const MainLayout: React.FC<PropsWithChildren<{ hasHeader?: boolean }>> = ({
  children,
  hasHeader = true
}) => {
  // const dispatch = useDispatch();
  return (
    <Box component={'div'}>
      {hasHeader && <Header />}
      <Box m={10}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
