import React from "react";
import SidenavAdmin from "../../components/SidenavAdmin";
import NavbarAdmin from "../../components/NavbarAdmin";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styledash from '../../styles/Login/admindash.module.scss'
import { useTheme } from '@mui/material/styles';

import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";


async function getDataFromDatabase() {
  const collectionRef = collection(db, "Client-Login");
  const querySnapshot = await getDocs(collectionRef);
  const empCount = querySnapshot.size;
  return {
    empCount,
  };
}


export default function Admindash(){
  const theme = useTheme();
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countsData = await getDataFromDatabase();
        setCounts(countsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

    return(
        <>
        <NavbarAdmin />
       <Box height= {70} />
        <Box sx={{display: "flex"}}>
        <SidenavAdmin />
       
       <Card sx={{ display: 'flex' }} className={styledash.align}>
   
        <CardContent sx={{ flex: '1 0 auto' }} >
          <Typography component="div" variant="h5" align="center">
            Total Number of Employees
          </Typography>
          <div>{
            counts &&  <Typography variant="subtitle1" color="#852525" component="div" className={styledash.text}>
            {counts.empCount}
          </Typography>}
          </div>
        </CardContent>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box> */}


    </Card>

    </Box>
  
</>

);
}