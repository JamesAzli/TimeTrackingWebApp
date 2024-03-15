import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { getAuth, listUsers } from "firebase/auth";
import {
  collection,
  updateDoc,
  setDoc,
  getDocs,
  doc,
} from "firebase/firestore";
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
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { saveAs } from "file-saver";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidenavAdmin from "../../components/SidenavAdmin";


async function fetchDocuments(setDocuments) {
  const querySnapshot = await getDocs(collection(db, "Client-Login"));
  const documents = querySnapshot.docs.map((doc) => doc.data());
  const uniqueDocuments = Array.from(
    new Map(documents.map((doc) => [doc.uid, doc])).values()
  );
  setDocuments(uniqueDocuments);
}

export default function EditRoles() {
  const [documents, setDocuments] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    fetchDocuments(setDocuments);
  }, []);

  const handleEditRole = async (uid) => {
    const userRef = doc(db, "Client-Login", uid);
    await updateDoc(userRef, { role: selectedRoles[uid] });
    await fetchDocuments(setDocuments);
  };

  const handleRoleChange = (e, uid) => {
    const updatedRoles = { ...selectedRoles, [uid]: e.target.value };
    setSelectedRoles(updatedRoles);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleBack() {
    router.push("../Dashboard/AdminTimeInOut"); // Navigate back to the previous page
  }
  const router = useRouter();

  //File Download
  const confirmation = () => {
    // Convert the data to a CSV string using Papa Parse
    const csv = Papa.unparse(rows);
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
  };

  return (
    <>
      {/* <AdminRoles /> */}
      {/* <NavbarAdmin />
    <SidenavAdmin /> */}
      <Paper sx={{ width: "100%", overflow: "hidden", elevation: "8" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          align="center"
          sx={{ padding: ".5rem" }}
        >
          Edit Roles
        </Typography>
        <Divider />

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
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align={"left"} style={{ minWidth: "150px" }}>
                  <b>Name</b>
                </TableCell>
                <TableCell align={"left"} style={{ minWidth: "150px" }}>
                <b>Email</b>
                </TableCell>
                <TableCell align={"left"} style={{ minWidth: "150px" }}>
                <b>Role</b>
                </TableCell>
                <TableCell align={"left"} style={{ minWidth: "150px" }}>
                <b>Edit Role</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell key={row.id} align={"left"}>
                        {row.displayName}
                      </TableCell>
                      <TableCell align={"left"}>{row.email}</TableCell>
                      <TableCell align={"left"}>{row.role}</TableCell>
                      <TableCell>
                        <select
                          value={selectedRoles[row.uid] || ""}
                          onChange={(e) => handleRoleChange(e, row.uid)}
                        >
                          <option value="">Select Role</option>
                          <option value="Employee">Employee</option>
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Team Lead">Team Lead</option>
                        </select>
                        <button onClick={() => handleEditRole(row.uid)}
                        style={{ marginLeft: '10px' }}
                        >
                          Edit Role
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={documents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
