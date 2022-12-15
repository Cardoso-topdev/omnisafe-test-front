import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { TableHead, TableRow, TableCell, TableSortLabel, Box, IconButton, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { IEventType, IStoreValue } from 'types';
import { subscribeEventType } from 'redux/redux-slice';

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id?: keyof IEventType;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    numeric: false,
    disablePadding: false,
    label: 'Subscribe',
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IEventType) => void;
  order: Order;
  orderBy: string;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof IEventType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label }, index) => (
          id ? <TableCell
            key={index}
            align='center'
            padding={'normal'}
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell> : <TableCell
            key={index}
            align={'center'}
            padding='normal'
          >
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EventTypeTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IEventType>('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const storeEventTypes = useSelector((state: IStoreValue) => state.omnisafeReducer.eventTypes);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IEventType,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {storeEventTypes.slice()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((eventTypeItem: IEventType, index) => {
                const { name, subscribed } = eventTypeItem
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                      align='center'
                    >
                      {name}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        aria-label="like"
                        component="span"
                        onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                          event.stopPropagation();
                          dispatch(subscribeEventType(eventTypeItem));
                        }}
                      >
                        {subscribed ? (<StarIcon />) : (<StarOutlineIcon />)}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={storeEventTypes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EventTypeTable;