import Login from "./Login/Login"
import Sidenav from "../components/SidenavAdmin";
import AdminDash from "./Dashboard/AdminDash"
import EmpReports from "./Login/EmpReports";
import AdminReports from "./Dashboard/AdminReports"
import stylerep from '../styles/Login/adminreports.module.scss'
import stylehead from '../styles/Login/header.module.scss'
import Navbar from "../components/NavbarEmp"


function HomePage() {
 
  return(
  <>
   {/* <div className={styles.background}>     */}
   {/* <Sidenav/> */}
   {/* <Navbar /> */}

   <Login />
   {/* <EmpReports /> */}
    {/* <AdminReports/> */}
    {/* <AdminDash/> */}
   
    {/* </div> */}
   </>
  )
}

export default HomePage