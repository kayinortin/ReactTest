import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#EEEEEE',
  },
  '&:active': {
    backgroundColor:  '#EFF5FF',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const StyledTableCell = styled(TableCell)(({ isSorted }) => ({
  fontWeight: isSorted ? 'bold' : 'normal',
  color: isSorted ? '#c7c7c7' : '#cfcfcf',
}));

const DataTable = ({
  columns,
  data,
  enableSort = true,
  enablePagination = true,
  initialSortColumn = '',
  initialSortDirection = 'asc',
  getRowStyle,
  onRowClick,
}) => {
  const [orderBy, setOrderBy] = useState(initialSortColumn);
  const [order, setOrder] = useState(initialSortDirection);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeCard, setActiveCard] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const sortedData = useMemo(() => {
    if (!orderBy) return data;
    return [...data].sort((a, b) => {
      const aValue = columns.find(col => col.id === orderBy).getValue(a);
      const bValue = columns.find(col => col.id === orderBy).getValue(b);

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, order, orderBy, columns]);

  const visibleData = enablePagination
    ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : sortedData;

  const handleCardClick = row => {
    setActiveCard(row.id);
    if (onRowClick) {
      onRowClick(row);
    }
    setTimeout(() => setActiveCard(null), 200);
  };

  const renderMobileCard = (row, index) => {
    const defaultStyle = {
      backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#FFF',
    };
    const customStyle = getRowStyle ? getRowStyle(row) : {};
    const mergedStyle = {
      ...defaultStyle,
      ...customStyle,
    };

    return (
      <StyledCard
        key={row.id || index}
        onClick={() => handleCardClick(row)}
        sx={{
          ...mergedStyle,
          backgroundColor: activeCard === row.id ? theme.palette.action?.selected || '#EFF5FF' : mergedStyle.backgroundColor,
        }}
      >
        <CardContent>
          {columns.map(column => (
            <Typography key={column.id} variant="body2" component="p">
              <strong>{column.label}:</strong> {column.render(row)}
            </Typography>
          ))}
        </CardContent>
      </StyledCard>
    );
  };

  return (
    <Box>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <StyledTableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                  isSorted={orderBy === column.id}
                >
                  {enableSort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleData.map((row, index) => {
              const defaultStyle = {
                backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#FFF',
                cursor: 'pointer',
              };
              const customStyle = getRowStyle ? getRowStyle(row) : {};
              const mergedStyle = {
                ...defaultStyle,
                ...customStyle,
                backgroundColor: customStyle.backgroundColor || defaultStyle.backgroundColor,
              };

              return (
                <TableRow
                  key={row.id || index}
                  hover
                  onClick={() => onRowClick && onRowClick(row)}
                  style={mergedStyle}
                >
                  {columns.map(column => (
                    <TableCell key={column.id}>{column.render(row)}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {isMobile && visibleData.map((row, index) => renderMobileCard(row, index))}

      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default DataTable;
