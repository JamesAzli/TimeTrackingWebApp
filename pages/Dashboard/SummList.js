import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import stylerep from '../../styles/Login/adminreports.module.scss'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2'

const columns= [ 
  
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'geoloc', label: 'Geo-Location', minWidth: 200 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 80,
    align: 'right', 
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'timeIn',
    label: 'Time-In',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'timeOut',
    label: 'Time-Out',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'rendered',
    label: 'Time Rendered (hrs)',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];

function createData(name, geoloc, date, timeIn, timeOut, rendered)  {
  
  return { name, geoloc, date, timeIn, timeOut, rendered };
}

const rows = [
  createData('Gwen Kyle Gagasa', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/26/2023', '7:00', '4:00', 8),
  createData('Krby Zyryl Perez', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Bea Vallejos', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('James Azli Umayam', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Jermaine Jan Calip', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Stephen Charles Pamatian', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Brandon Dave Reyno', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Diether Abad', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Kliford Balgos', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Calvin Ferrer', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('JC Ron Miguel James', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Marc Oneal Guaib', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Donald Calma Jr.', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Gwen Kyle Gagasa', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
  createData('Bea Antonette Vallejos', 'The Norwegian Collection Inc. Building, Loakan Road, Baguio, 2600, Philippines', '4/25/2023', '7:00', '4:00', 8),
];

export default function SummList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    
  };

  const confirmation = () => {
    Swal.fire({
      title: 'Successfully Collected',
      text: "Your file is ready to download!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Download'
    
    })
  };
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
        <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{padding: "10px" }}
        >
            Attendance Summary
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2}>
            {/* <Autocomplete
             disablePortal
             id="combo-box-demo"
             options={rows}
             sx={{width: 300}}
            //  onChange={(e,v)} => filterData(v)}
             getOptionlabel={(rows)} => rows.date || ""}
             renderInput={(params)} => ( */}
                <Paper
                 component="form"
                 sx={{ p: '4px 4px', display: 'flex', alignItems: 'center', width: 400, }} className={stylerep.searchmargin}>
                 <InputBase
                 sx={{ ml: 1, flex: 1 }}
                 placeholder="Search"
                 inputProps={{ 'aria-label': 'search' }}
                 />
                  <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
                  <SearchIcon />
                  </IconButton>
                </Paper>
                {/* )}
                /> */}
                <Typography variant="h6" component="div" sx={{ flexGrow: .95 }}>
                </Typography>
                
                <Button onClick={confirmation} 
                sx={{color: "#ccd1d1"}} 
                variant="contained" 
                endIcon={<FileDownloadIcon />} 
                className={stylerep.listmargin}>
                    Export
                </Button>
                <Button variant="contained" endIcon={<PrintIcon />} className={stylerep.listmargin}>
                    Print
                </Button>
        </Stack>
        <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell className={stylerep.tablehead} 
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}