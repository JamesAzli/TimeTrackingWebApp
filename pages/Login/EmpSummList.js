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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { auth } from "../../firebase";
import moment from "moment-timezone";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";

export default function SummList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [displayName, setDisplayName] = useState("");

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
      const reportsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(reportsData);
    };

    fetchReports();
  }, [displayName]);

  useEffect(() => {
    const getReports = async () => {
      const data = await getDocs(collection(db, 'Reports-Admin'));
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getReports();
  }, []);

  function handleBack() {
    router.push("/Home"); // Navigate back to the previous page
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell align={"left"}>{row.name}</TableCell>
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