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
import { styled} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Swal from 'sweetalert2';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';


const columns= [ 
  
  { id: 'name', label: 'Name', minWidth: 200 } ,
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

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
     />
       ))(({ theme }) => ({
      '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: "#852525",
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 16,
          color: "#852525",
          marginRight: theme.spacing(1.5),
        },
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmation = () => {
  // Convert the data to a CSV string using Papa Parse
  const csv = Papa.unparse(rows);
  // Save the CSV file using FileSaver.js
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'GiantReport.csv');
  // Show a success message using SweetAlert
  Swal.fire({
    confirmButtonColor: '#852525',
    icon: 'success',
    title: 'Export Successful',
    text: 'Your data has been exported to CSV file.',
  });
};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={8} >
        <Typography
        gutterBottom
        variant="h5"
        component="div"
        align='center'
        sx={{padding: ".5rem" }}
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
                 sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 400, }} className={stylerep.searchmargin}>
                 <InputBase
                 sx={{ ml: .5, flex: 1 }}
                 placeholder="Search"
                 inputProps={{ 'aria-label': 'search' }}
                 />
                  <IconButton type="button" sx={{ p: '1px' }} aria-label="search">
                  <SearchIcon />
                  <Divider orientation="vertical" flexItem />
                  <Button className={stylerep.sort} 
                   id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  >
                    Sort by
                 </Button>
              <StyledMenu
              id="demo-customized-menu"
               MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
               }}
               anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
             >
             <MenuItem onClick={handleClose} disableRipple>
             <EditIcon />
             Name
             </MenuItem>
             <MenuItem onClick={handleClose} disableRipple>
             <CalendarMonthIcon />
              Date
             </MenuItem>
             </StyledMenu>
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
                <Button 
                variant="contained" 
                endIcon={<PrintIcon />} className={stylerep.listmargin}>
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
