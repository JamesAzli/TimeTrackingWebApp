import React from "react";
import SidenavAdmin from "../../components/SidenavAdmin";
import NavbarAdmin from "../../components/NavbarAdmin";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styledash from '../../styles/Login/admindash.module.scss'
import { useTheme } from '@mui/material/styles';
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


export default function Admindash() {
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

  return (
    <>
      <NavbarAdmin />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <SidenavAdmin />
        <Card sx={{ display: 'flex' }} className={styledash.align}>

          <CardContent sx={{ flex: '1 0 auto' }} >
            <Typography component="div" variant="h5" align="center">
              Total Number of Employees
            </Typography>
            <div>{
              counts && <Typography variant="subtitle1" color="#852525" component="div" className={styledash.text}>
                {counts.empCount}
              </Typography>}
            </div>
          </CardContent>
        </Card>
      </Box>

    </>

  );
}