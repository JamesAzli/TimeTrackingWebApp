import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Login/dashboard.module.scss";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'firebase/auth';
import {auth} from '../../firebase';
import {db} from '../../firebase'
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import cookie from "js-cookie";
import NavbarAdmin from '../../components/NavbarAdmin';
import SidenavAdmin from '../../components/SidenavAdmin';
import Swal from "sweetalert2";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [place, setPlace] = useState(null);
  const [photoURL, setphotoURL] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        // setErrorMessage("Location access is not enabled")
        alert('"Location access is not enabled"')
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
  const [showTime, setShowTime] = useState('');

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

  const [dateString, setDateString] = useState("");

  const timestamp = new Date().getTime(); // current timestamp
  const date2 = new Date(timestamp);
  const showDate = date2.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });


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
      toast.success("Clock-In Recorded!", {
        position: "top-center",
        autoClose: 2000,
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
      const documentRef = doc(db, "Reports-Admin", documentId);
    await updateDoc(documentRef, {
      timeout: timeOut,
    });
    setDocumentId(null);
    cookie.remove("documentId");

    toast.success("Clock-Out Recorded!", {
      position: "top-center",
      autoClose: 2000,
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
    window.location.href = '../Login/EmpReports'
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload;
    window.location.href = "/";
  }

  return (
    <>  
      <NavbarAdmin />
      <Box height={70} />
      <Box sx={{display: "flex"}}>
        <SidenavAdmin />
        <Box component="main" sx={{ flexGrow:1, p:3}}>

        <div>
          <Typography
            className={styles.goodday}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {/* <br/> */}
            Good Day {displayName}
          </Typography>
          <div>
            <div className={styles.time}>{showTime}</div>
            <br />
          </div>
        </div>
        <div className={styles.date}>{showDatePage}</div>
      

      <div className={styles.dbutton}>
        <Button onClick={handleClick} className={styles.tibutton}>
          Clock-In
        </Button>
        <Button onClick={handleTimeoutClick}  className={styles.tibutton}>
          Clock-Out
        </Button>
        {/* {dateString && <p>Time-In Recorded at: {dateString}</p>} */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
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
        </Box>
      </Box>
    </>
  );
}