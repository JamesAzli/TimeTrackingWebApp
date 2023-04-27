import React from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styledash from '../../styles/admindash.module.scss'


export default function Admindash(){
    return(
        <>
        <div className={styledash.bgcolor}>
        <Navbar />
       <Box height= {70} />
        <Box sx={{display: "flex"}}>
        <Sidenav />
        <Box component="main" sx={{flexGrow: 1, p:3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <Stack spacing={2} direction="row">
        <Card sx={{ minWidth: 49 +"%", height: 150 }} className={styledash.gradient}>
         <CardContent>
            <div className={styledash.iconstyle}>
                <AccessTimeIcon/>
            </div>
        <Typography gutterBottom variant="h5" component="div" sx={{color: "#ffffff"}}>
          Total: 49
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{color: "#ccd1d1"}}>
          Employee Time In
        </Typography>
      </CardContent>
     </Card>
     <Card sx={{ minWidth: 49 +"%", height: 150 }} className={styledash.gradientlight}>
         <CardContent>
            <div className={styledash.iconstyle}>
                <AccessTimeIcon/>
            </div>
        <Typography gutterBottom variant="h5" component="div" sx={{color: "#ffffff"}}>
          Total: 49
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{color: "#ccd1d1"}}>
          Employee Time Out
        </Typography>
      </CardContent>
     </Card>
     </Stack>
       
     </Grid>
      </Grid>
        </Box>
    </Box>
        </div>
  
</>

);
}