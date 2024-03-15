import * as React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  setDoc
} from "firebase/firestore";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import stylerep from "../../styles/Login/adminreports.module.scss";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SortIcon from "@mui/icons-material/Sort";
import Swal from "sweetalert2";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { ArrowBackIcon } from "@mui/icons-material";
import moment from "moment-timezone";
import { Tab } from "@mui/material";
import { LocalizationProvider} from "@mui/lab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { FormControl, InputLabel, Select } from "@mui/material";
import { FaCalendarAlt } from 'react-icons/fa';
import { DateRangePicker } from 'rsuite';


// async function fetchDocuments(setDocuments) {
//   const querySnapshot = await getDocs(collection(db, "Client-Login"));
//   const documents = querySnapshot.docs.map((doc) => doc.data());
//   const uniqueDocuments = Array.from(new Map(documents.map((doc) => [doc.uid, doc])).values());
//   setDocuments(uniqueDocuments);
// }

const fetchDocuments = async (callback) => {
  // Fetch your documents here
  const data = await getDocs(collection(db, "Client-Login"));
  callback(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

export default function SummList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const Ereports = collection(db, "Reports-Admin");
  const [orderByField, setOrderByField] = useState("name");
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState();
  const [documents, setDocuments] = useState([])
  const [selectedRole, setSelectedRole] = useState("")
  const [startDate, setStartDate] = useState(new Date());

  

  useEffect(()=>{
    fetchDocuments(setDocuments);
  }, [])

  const handleEditRole = async (uid) => {
    const userRef = doc(db, 'Client-Login', uid);
    await updateDoc(userRef, { role: selectedRole });
    // await fetchDocuments(setDocuments);
  };
  
  //date picker
  const handleDateChange = (value) => {
    setDateRange(value);
  };

  useEffect(() => {
    getReports();
  }, []);

  const router = useRouter();

  function handleBack() {
    router.push("../Dashboard/AdminDash"); // Navigate back to the previous page
  }

  const getReports = async () => {
    const data = await getDocs(Ereports);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const confirmation = () => {
  //   Swal.fire({
  //     title: 'Successfully Collected',
  //     text: "Your file is ready to download!",
  //     icon: 'success',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Download'

  //   })
  // };

  //Sorting
  const StyledMenu = styled((props) => (
    <Menu

      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: "#852525",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 16,
          color: "#852525",
          marginRight: theme.spacing(1.5),
        },
      },
    },
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //File Download
  const confirmation = () => {
    Swal.fire({
      title: 'Confirm Export?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Export'
    }).then((result) => {
      if (result.isConfirmed) {
        // Convert the data to a CSV string using Papa Parse
    const csv = Papa.unparse(filteredReports);
    // Save the CSV file using FileSaver.js
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "GiantReport.csv");
    // Show a success message using SweetAlert
    Swal.fire({
      confirmButtonColor: "#852525",
      icon: "success",
      title: "Export Successful",
      text: "Your data has been exported to CSV file.",
    });
      }
    })
    
  };

  const fetchReports = async () => {
    const querySnapshot = await getDocs(collection(db, "Reports-Admin"));
    const reportsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reportsData;
  };
  
  const sortReports = (reports, field) => {
    if (field === "name") {
      return reports.sort((a, b) => (a.name?.localeCompare(b.name) || 0));
    } else if (field === "date") {
      return reports.sort((a, b) => {
        const dateComparison = b.date?.localeCompare(a.date);
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return b.timein?.localeCompare(a.timein);
      });
    }
    return reports;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const reportsData = await fetchReports();
      setReports(reportsData);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const updateReports = async () => {
      const updatedReports = await Promise.all(
        reports.map(async (report) => {
          if (report.timein && report.timeout) {
            const inTime = moment(report.timein, "h:mm A");
            const outTime = moment(report.timeout, "h:mm A");
  
            // If timeout is before timein, add 1 day to outTime
            if (outTime.isBefore(inTime)) {
              outTime.add(1, "day");
            }
  
            const duration = moment.duration(outTime.diff(inTime));
            const hoursDiff = duration.hours();
            const minutesDiff = duration.minutes();
  
            const updatedReport = { ...report };
            updatedReport.timeRendered = `${hoursDiff} hours ${minutesDiff} minutes`;
  
            return updatedReport;
          } else {
            return report;
          }
        })
      );
  
      setReports(updatedReports);
    };
  
    if (reports.length > 0) {
      updateReports();
    }
  }, [reports]);
  
  const handleOrderByChange = (event) => {
    const selectedValue = event.target.value;
    setOrderByField(selectedValue);
  };
  
  const sortedReports = sortReports(reports, orderByField);
  
  const filteredReports = sortedReports.filter((report) => {
    const selectedDate = startDate?.setHours(0, 0, 0, 0); // Convert selected date to start of day
    const reportDate = new Date(report.date).setHours(0, 0, 0, 0); // Convert report date to start of day
    const searchQueryLowerCase = searchQuery.toLowerCase();
    const reportNameLowerCase = (report.name ?? '').toLowerCase();
  
    return (
      (!searchQuery || reportNameLowerCase.includes(searchQueryLowerCase)) &&
      (!selectedRole || report.role === selectedRole) &&
      (!selectedDate || reportDate === selectedDate)
    );
  });

  const printContentRef = useRef(null);

  const handlePrint = () => {
    const printContents = printContentRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
    ${printContents}
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };


  return (
    
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={8}>
  <Typography gutterBottom variant="h5" component="div" align="center" sx={{ padding: '.5rem' }}>
    Attendance Summary
  </Typography>
  <Divider />
  <Box height={10} />
  <Stack direction="row" spacing={2}>
    <Box
      component="form"
      sx={{
        p: '2px 2px',
        display: 'flex',
        alignItems: 'center',
        width: 350,
      }}
      className={stylerep.searchmargin}
    >
      <InputBase
        sx={{ ml: 0.5, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '1px' }}>
        <SearchIcon />
      </IconButton>
    </Box>
    <FormControl sx={{ m: 1, minWidth: 120,zIndex: 9999 }} size="small">
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
       style={{ fontSize: '18px', width: '300px', height: '40px' }} 
       />
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-simple-select-label" htmlFor="order-by"></InputLabel>
      <Select id="order-by" value={orderByField} onChange={handleOrderByChange}>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="date">Date</MenuItem>
      </Select>
    </FormControl>
    <Typography variant="h6" component="div" sx={{ flexGrow: 0.95 }}></Typography>
    <Button
      onClick={confirmation}
      sx={{ color: '#ccd1d1' }}
      variant="contained"
      endIcon={<FileDownloadIcon />}
      className={stylerep.listmargin}
    >
      Export
    </Button>
    <Button
      variant="contained"
      endIcon={<PrintIcon />}
      className={stylerep.listmargin}
      onClick={handlePrint}
    >
      Print
    </Button>
  </Stack>
  <div ref={printContentRef}>
    <Box height={10} />
	 <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align={"left"} style={{ minWidth: "150px" }}>
                <b>Name</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "100px" }}>
              <b>Geo Location</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "80px" }}>
              <b>TimeIn</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "80px" }}>
              <b>TimeOut</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "80px" }}>
              <b>Minutes Late</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "120px" }}>
              <b>Time Rendered</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "120px" }}>
              <b>Remarks</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "120px" }}>
              <b>Date</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredReports
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
      return (
        <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.location}</TableCell>
        <TableCell align="left">{row.timein}</TableCell>
        <TableCell align="left">{row.timeout}</TableCell>
        <TableCell align="left">{row.lateMinutes}</TableCell>
        <TableCell>{row.timeRendered}</TableCell>
        <TableCell align="left">{row.remarks}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        </TableRow>
                );
              })}
          </TableBody>
        </Table>
		 </TableContainer>
		 </div>
  <TablePagination
    rowsPerPageOptions={[10, 30, 50]}
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
