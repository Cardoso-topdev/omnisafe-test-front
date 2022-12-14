import { Alert, Box, Snackbar } from '@mui/material';
import React, { PropsWithChildren, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showAlertMsg } from 'redux/redux-slice';
import { IStoreValue } from 'types';

// eslint-disable-next-line @typescript-eslint/ban-types
const SnackbarWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const showAlert = useSelector(
    (state: IStoreValue) => state.omnisafeReducer.showAlert
  );
  const alertMsg = useSelector(
    (state: IStoreValue) => state.omnisafeReducer.alertMsg
  );
  const alertIsSuccess = useSelector(
    (state: IStoreValue) => state.omnisafeReducer.alertIsSuccess
  );
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(
      showAlertMsg({
        showAlert: false,
        alertMsg: ''
      })
    );
  }, [dispatch]);
  return (
    <>
      <Box m={10}>{children}</Box>
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertIsSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarWrapper;
