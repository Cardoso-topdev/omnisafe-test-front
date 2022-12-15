/* eslint-disable @typescript-eslint/ban-types */
import Box from '@mui/material/Box';
import Header from 'components/Header';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IStoreValue } from 'types';

/**
 * MainLayout is using on the all pages
 */
const MainLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const user = useSelector((state: IStoreValue) => state.omnisafeReducer.user)
  const url = window.location.pathname;
  if ((!user.username || user.username === '') && (url !== '/sign-in') && (url !== '/sign-up')) {
    return <Navigate to={'/sign-in'} replace />
  }
  return (
    <Box component={'div'}>
      <Header />
      <Box m={10}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
