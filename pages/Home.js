// import React, { useState, useEffect } from 'react';

// import {place} from './Login/Login'



// function Home(){
  
//     const logout =()=>{
//         
//     }

//     


  
//     return (
//       <div>
//          <p>Welcome, {displayName}!</p>
//          {/* {place && <p>Current Location: {place}</p>} */}
//          <button onClick={logout}>Logout</button>
//       </div>
//     );
// }

// export default Home;
import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import styles from "../styles/Login/dashboard.module.scss"
import Image from "next/image";
import logo from "../public/images/GiantMiniLogo.png";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from 'firebase/app';
import 'firebase/auth';
import {auth} from '../firebase';
import {db} from '../firebase'
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";

export default function MenuAppBar() {
  // const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [place, setPlace] = useState(null);
  const [photoURL, setphotoURL] = useState(null);
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=cada18a586924614b6d60d9ac25c1945`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const address = data.results[0].formatted;
          setPlace(address);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
        setphotoURL(user.photoURL)
      } else {
        setDisplayName(null);
        setphotoURL(null);
      }
    });
  }, []);

  // const docRef = doc(db, "Reports-Admin");
  const date = new Date();
  const showDate = date.toDateString();
  const showTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [dateString, setDateString] = useState("");

  const handleClick = async () => {

    const date = new Date();
    const showDate = date.toDateString();
    const showTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    toast.success("TimeIn Recorded!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setDateString(showTime);
    try {
      const docRef = await addDoc(collection(db, "Reports-Admin"), {
        timein: showTime,
        name: displayName,
        location: place,
        date: showDate,
      });
      
      console.log("New document created with ID: ", docRef.id);
      setDocumentId(docRef.id);
    // await addDoc(collection(db, "Reports-Admin"), {
    //   timein: showTime,
    //   timein: showTime,
    //   name: displayName,
    //   location: place,
    //   date: showDate,
    // });
    // setDocumentId(docRef.id);
   } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const handleTimeoutClick = async () => {
  const date = new Date();
  const showTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  try {
    await updateDoc(doc(db, "Reports-Admin", documentId), {
      timeout: showTime,
    });

    toast.success("Timeout Recorded!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};


  const handleChange = (e) => {
    setAuth(e.target.checked);
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    localStorage.clear()
    window.location.reload
    window.location.href = '../Login/Reports'
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload;
    window.location.href = "/";
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={styles.AppBar}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Image src={logo} className={styles.logo} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>

            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                   <Avatar src={photoURL} alt="user profile" />
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      &emsp;
                      {displayName}
                    </Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem className={styles.menuItem} onClick={handleClose}>
                    Reports
                  </MenuItem>
                  <MenuItem className={styles.menuItem} onClick={logout}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <div>
          <Typography
            className={styles.goodday}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Good Day {displayName}
          </Typography>
          <div>
            <div className={styles.time}>{showTime}</div>
            <br />
          </div>
        </div>
        <div className={styles.date}>{showDate}</div>
      </Box>

      <div className={styles.dbutton}>
        <Button onClick={handleClick} className={styles.button}>
          Time-In
        </Button>
        <Button onClick={handleTimeoutClick}  className={styles.button}>
          Time-out
        </Button>
        {dateString && <p>TimeIn Recorder at: {dateString}</p>}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>

    </>
  );
}
