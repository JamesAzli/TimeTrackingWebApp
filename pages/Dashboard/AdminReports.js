import React from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navbar";
import stylerep from '../../styles/adminreports.module.scss'
import SummList from "../Dashboard/SummList";


export default function DataEntry(){
  return (
    <>
    <div className={stylerep.bgcolor}>
      <Navbar />
      <Box height={70} />
      <Box sx={{display: "flex"}}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow:1, p:3}}>
          <SummList />
        </Box>
      </Box>


    </div>
    </>

  );
}