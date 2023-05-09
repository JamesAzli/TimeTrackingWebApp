import Login from "./Login/Login"
import Sidenav from "../components/SidenavAdmin";
import AdminDash from "./Dashboard/AdminDash"
import EmpReports from "./Login/EmpReports";
import AdminReports from "./Dashboard/AdminReports"
import AdminTimeInOut from "./Dashboard/AdminTimeInOut"
import stylerep from '../styles/Login/adminreports.module.scss'
import stylehead from '../styles/Login/header.module.scss'



function HomePage() {
 
  return(
  <>
   {/* <div className={styles.background}>     */}
   {/* <Sidenav/> */}
   {/* <Navbar /> */}
   <AdminTimeInOut/>
   {/* <Login /> */}
   {/* <EmpReports /> */}
    {/* <AdminReports/> */}
    {/* <AdminDash/> */}
   
    {/* </div> */}
   </>
  )
}

export default HomePage