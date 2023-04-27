// import LoginSignIn from "./Login/login-signin"
import Sidenav from "../components/SidenavAdmin";
// import AdminDash from "./Dashboard/AdminDash"
import AdminReports from "./Dashboard/AdminReports"
import styles from '../styles/Login/adminreports.module.scss'
// import styles from '../styles/header.module.scss'
import Navbar from "../components/Navbar"


function HomePage() {
 
  return(
  <>
   {/* <div className={styles.background}>     */}
   {/* <Sidenav/> */}
   {/* <Navbar /> */}
   {/* <LoginSignIn /> */}
    <AdminReports/>
    {/* <AdminDash/> */}
   
    {/* </div> */}
   </>
  )
}

export default HomePage