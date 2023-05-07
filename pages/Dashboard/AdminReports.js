import React from "react";
import SidenavAdmin from "../../components/SidenavAdmin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavbarAdmin from "../../components/NavbarAdmin";
import stylerep from '../../styles/Login/adminreports.module.scss'
import SummList from "../Dashboard/SummList";


export default function AdminReports(){
  return (
    <>
    <div className={stylerep.bgcolor}>  
      <NavbarAdmin />
      <Box height={70} />
      <Box sx={{display: "flex"}}>
        <SidenavAdmin />
        <Box component="main" sx={{ flexGrow:1, p:3}}>
          <SummList />
        </Box>
      </Box>


    </div>
    </>

  );
}