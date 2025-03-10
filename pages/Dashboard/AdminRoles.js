import React from "react";
import SidenavAdmin from "../../components/SidenavAdmin";
import Box from "@mui/material/Box";
import NavbarAdmin from "../../components/NavbarAdmin"
import EditRoles from "../Dashboard/EditRoles";


export default function AdminRoles(){
  return (
    <>
      <NavbarAdmin />
      <Box height={70} />
      <Box sx={{display: "flex"}}>
        <SidenavAdmin />
        <Box component="main" sx={{ flexGrow:1, p:3}}>
          <EditRoles />
        </Box>
      </Box>
     </>

  );
}