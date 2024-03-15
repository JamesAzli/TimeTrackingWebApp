import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import stylerep from "../../styles/Login/empreports.module.scss";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import { auth } from "../../firebase";
import firebase from "firebase/app";
import moment from "moment-timezone";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  orderBy
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";

export default function SummList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const router = useRouter();
  const Ereports = collection(db,'Reports-Admin')
  const [reports, setReports] = useState([]);
  const [displayName, setDisplayName] = useState("");
  
  useEffect(()=>{
    getReports();
  },[])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
      } else {
        setDisplayName(null);
      }
    });
  }, []);


  useEffect(() => {
    const fetchReports = async () => {
      const colRef = collection(db, 'Reports-Admin')
      const name = displayName
      const q = query(colRef, where("name", "==", name), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const reportsData = querySnapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }));
      setReports(reportsData);
     
    };
    fetchReports();
  }, [displayName]);


  // useEffect(() => {
  //   const fetchReports = async () => {
  //     const colRef = collection(db, "Reports-Admin");
  //     const name = displayName;
  //     const q = query(colRef, where("name", "==", name));
  //     const querySnapshot = await getDocs(q);
  //     const reportsData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setReports(reportsData);
  //   };
  //   fetchReports();
  // }, [displayName]);

  function handleBack() {
    router.push("/Home"); // Navigate back to the previous page
  }

  const getReports = async () => {
    const data = await getDocs(Ereports);
    setRows(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const confirmation = () => {
    Swal.fire({
      title: "Successfully Collected",
      text: "Your file is ready to download!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Download",
    });
  };

  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    reports.forEach(async (report) => {
      if (report.timein && report.timeout) {
        const inTime = moment(report.timein, "HH:mm");
        const outTime = moment(report.timeout, "HH:mm");
        const hoursDiff = moment.duration(outTime.diff(inTime)).asHours();

        const reportRef = doc(db, "Reports-Admin", report.id);
        await updateDoc(reportRef, {
          timeRendered: hoursDiff,
        });
      }
    });
  }, [reports]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={8}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        align="center"
        sx={{ padding: ".5rem" }}
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

        <Button
          sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
          size="small"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          className={stylerep.listmargin}
          onClick={handleBack}
        >
          Back to Dashboard
        </Button>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 16 }}
        ></Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0.95 }}
        ></Typography>
      </Stack>
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
                <b>Time-In</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "80px" }}>
                <b>Time-Out</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "80px" }}>
                <b>Minutes Late</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "120px" }}>
                <b>Time Rendered</b>
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "120px" }}>
                <b>Date</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell key={row.id} align={"left"}>
                      {row.name}
                    </TableCell>
                    <TableCell align={"left"}>{row.location}</TableCell>
                    <TableCell align={"left"}>{row.timein}</TableCell>
                    <TableCell align={"left"}>{row.timeout}</TableCell>
                    <TableCell align={"left"}>{row.lateMinutes}</TableCell>
                    <TableCell>
                      {row.timein && row.timeout
                        ? moment
                            .utc(
                              moment(row.timeout, "HH:mm").diff(
                                moment(row.timein, "HH:mm")
                              )
                            )
                            .format("HH:mm")
                        : "00:00"}
                    </TableCell>
                    <TableCell align={"left"}>{row.date}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
