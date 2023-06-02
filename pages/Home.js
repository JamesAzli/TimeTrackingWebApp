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
import cookie from "js-cookie";
import axios from 'axios';
import Swal from 'sweetalert2'

// import moment from "moment-timezone"

export default function MenuAppBar() {
  // const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [place, setPlace] = useState(null);
  const [photoURL, setphotoURL] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);
  const [TR1, setTimeRendered1] = useState();
  const [showTime, setShowTime] = useState('');

  // useEffect(() => {
  //   if (timeIn && timeOut) {
  //     const inTime = moment(timeIn, "HH:mm");
  //     const outTime = moment(timeOut, "HH:mm");
  //     const hoursDiff = moment.duration(outTime.diff(inTime)).asMinutes();
  //     setTimeRendered1(hoursDiff);
  //   }
  // }, [TR1]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        // setErrorMessage("Location access is not enabled")
        // alert('"Location access is not enabled"')
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude && longitude) {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=cada18a586924614b6d60d9ac25c1945`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const address = data.results[0].formatted;
          setPlace(address);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchAddress();
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

  useEffect(() => {
    const getDocumentId = cookie.get("documentId");
    if (getDocumentId) {
      setDocumentId(getDocumentId);
    }
  }, []);

  useEffect(() => {
    const fetchTimeIn = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Manila/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dateTime = new Date(data.datetime);
        const timeString = dateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setTimeIn(timeString);
      } catch (err) {
        console.error(err);
        setTimeIn(fetchTimeIn, 5000); // retry after 5 seconds
      }
    };
    fetchTimeIn();
  }, []);

  useEffect(() => {
    const fetchTimeOut = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Manila/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dateTime = new Date(data.datetime);
        const timeString = dateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setTimeOut(timeString);
      } catch (err) {
        console.error(err);
        setTimeout(fetchTimeOut, 5000); // retry after 5 seconds
      }
    };
    fetchTimeOut();
  }, []);

  const date = new Date();
  const showDatePage = date.toDateString();


  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setShowTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  const timestamp = new Date().getTime(); // current timestamp
  const date2 = new Date(timestamp);
  const showDate = date2.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const [dateString, setDateString] = useState("");

  const handleClick = async () => {
    const locationPermission = await navigator.permissions.query({ name: 'geolocation' });
    if (locationPermission.state === 'denied') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enable your location',
      })
    } else if (documentId) {
      // User has already timed in without timing out
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have already timed in. Please time out first before timing in again.',
      });
    } else {
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

      //Minutes Late
    const expectedTimeIn = new Date();
    expectedTimeIn.setHours(7, 15, 0); // Set expected time-in to 7:15 PM
    const actualTimeIn = new Date();
    const timeDifference = actualTimeIn - expectedTimeIn; // Difference in milliseconds

    const totalMinutesLate = Math.floor(timeDifference / (1000 * 60)); // Calculate total minutes of lateness
    const hoursLate = Math.floor(totalMinutesLate / 60); // Calculate hours of lateness
    const minutesLate = totalMinutesLate % 60; // Calculate minutes of lateness

      try {
        const docRef = await addDoc(collection(db, "Reports-Admin"), {
          timein: timeIn,
          name: displayName,
          location: place,
          date: showDate,
          lateMinutes: `${hoursLate} hours ${minutesLate} minutes`,
          // uid: documentId
        });
        
        console.log("New document created with ID: ", docRef.id);
        setDocumentId(docRef.id);
        cookie.set("documentId", docRef.id, { expires: 1 });
        
      }catch (error) {
      console.error("Error adding document: ", error);
    }
    }
    
}
const handleTimeoutClick = async () => {
  if (!documentId) {
    // User has not timed in yet
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have not timed in yet. Please time in before timing out.',
    });
    return;
  }
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm Clock-Out',
    cancelButtonText: 'No, cancel',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#852525',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      const documentRef = doc(db, "Reports-Admin",documentId);
    await updateDoc(documentRef, {
      timeout: timeOut,
    });
    setDocumentId(null);
    cookie.remove("documentId");

    toast.success("TimeOut Recorded!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire(
        'Cancelled',
        'Time out not recorded',
        'error'
      )
    }
  })  
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
    window.location.href = '../Login/sampleReport'
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
        <div className={styles.date}>{showDatePage}</div>
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
