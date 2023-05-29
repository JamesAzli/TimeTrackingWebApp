import React from "react";
import SidenavAdmin from "../../components/SidenavAdmin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavbarEmp from "../../components/NavbarEmp";
import stylerep from '../../styles/Login/empreports.module.scss'
import EmpSummList from "./EmpSummList";
import Head from 'next/head';

export default function EmpReports(){
  return (
    <>
    <Head>
        <title>
          Reports | GIANT
        </title>
      </Head>
      <NavbarEmp />
      <Box height={70} />
      <Box sx={{display: "flex"}}>
        <Box component="main" sx={{ flexGrow:1, p:3}}>
          <EmpSummList />
        </Box>
      </Box>
    </>

  );
}