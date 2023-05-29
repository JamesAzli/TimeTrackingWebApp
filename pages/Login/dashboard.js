// import * as React from "react";
// import { useState, useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import styles from "../../styles/Login/dashboard.module.scss";
// import Image from "next/image";
// import logo from "../../public/images/GiantMiniLogo.png";
// import { Button } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import Navbar from '../../components/NavbarEmp'
// import "react-toastify/dist/ReactToastify.css";

// export default function MenuAppBar() {
//   const [auth, setAuth] = useState(true);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const date = new Date();
//   const showDate = date.toDateString();
//   const showTime = date.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const [dateString, setDateString] = useState("");

//   function handleClick() {
//     const date = new Date();
//     const showDate = date.toDateString();
//     const showTime = date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     toast.success("TimeIn Recorded!", {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//     setDateString(showTime);
//   }


//   const handleChange = (e) => {
//     setAuth(e.target.checked);
//   };

//   const handleMenu = (e) => {
//     setAnchorEl(e.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar className={styles.AppBar}>
//           <Toolbar>
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2 }}
//             >
//               <Image src={logo} className={styles.logo} />
//             </IconButton>
//             <Typography
//               variant="h6"
//               component="div"
//               sx={{ flexGrow: 1 }}
//             ></Typography>

//             {auth && (
//               <div>
//                 <IconButton
//                   size="large"
//                   aria-label="account of current user"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                   onClick={handleMenu}
//                   color="inherit"
//                 >
//                   {/* <AccountCircle />
//                   <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                     Krby Zyryll Perez
//                   </Typography> */}
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: "top",
//                     horizontal: "right",
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: "top",
//                     horizontal: "right",
//                   }}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem className={styles.menuItem} onClick={handleClose}>
//                     Reports
//                   </MenuItem>
//                   <MenuItem className={styles.menuItem} onClick={handleClose}>
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </div>
//             )}
//           </Toolbar>
//         </AppBar>

//         <div>
//           <Typography
//             className={styles.goodday}
//             component="div"
//             sx={{ flexGrow: 1 }}
//           >
//             Good Day!
//           </Typography>
//           <div>
//             <div className={styles.time}>{showTime}</div>
//             <br />
//           </div>
//         </div>
//         <div className={styles.date}>{showDate}</div>
//       </Box>

//       <div className={styles.dbutton}>
//         <Button onClick={handleClick} className={styles.button}>
//           TimeIn
//         </Button>
//         {dateString && <p>TimeIn Recorder at: {dateString}</p>}
//         <ToastContainer
//           position="top-center"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//       </div>

//     </>
//   );
// }
