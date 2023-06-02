import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import logo from "../../public/images/GiantLogo.png";
import Image from "next/image";
import GoogleButton from "react-google-button";
import styles from "../../styles/Login/login.module.scss";
import Dashboard from "./dashboard"
import firebase from 'firebase/app';
import 'firebase/firestore';
import {auth,provider} from '../../firebase'
import {db} from '../../firebase'
import {signInWithPopup} from 'firebase/auth'; 
import { useRouter } from 'next/router';
import { collection, addDoc, setDoc,getDoc, doc } from "firebase/firestore";
// import Home from "../Home"

function LoginT(){
    // const theme = createTheme();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [user, setUser] = useState('')
    const router = useRouter();

    const handleClick = async () => {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uid = user.uid;
      const email = user.email;
      const name = user.displayName;
      let role = "";
    
      if (user.role == "Admin") {
        role = "Admin";
      } else {
        role = "Employee";
      }
    
      const userRef = doc(db, 'Client-Login', uid);
      const docSnap = await getDoc(userRef);
    
      if (docSnap.exists()) {
        const role = docSnap.get("role");
        if (role === "Admin") {
          router.push('/Login/superAdminReps');
        } else {
          router.push('/Home');
        } 
      } else {
        // Add the user to the 'users' collection in Firestore
        await setDoc(doc(db, "Client-Login", uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          role: role
        });
        
        if (user.role === "Admin") {
          router.push('/Login/superAdminReps');
        } else {
          router.push('/Home');
        } 
        // Route to Admin Dashboard or Home based on user's role
        
      }
    };
    
    
    return (
      <Container component="main" maxWidth="550rem">
        <Head>
        <title>
          Login | GIANT
        </title>
      </Head>
        <Box
          sx={{
            marginTop: 6,
          }}
        >
          <Grid container>
            {/* <CssBaseline /> */}
  
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
               >
                <Typography component="h1" variant="h6" >
                  Log in to your Account
                </Typography>
                <Typography component="h1" variant="caption" >
                  Stay connected with us!
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField className={styles.TextField} 
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              
                
                <FormControlLabel className={styles.labels} 
                  control={<Checkbox value="remember"  size="small" />}
                  label= "Remember me" 
                />

                 <Button  className={styles.FormButton} 
                  fullWidth
                  size="large"
                  sx={{ mt: 2, mb: 2}}
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>

                <div>
                <Divider>or</Divider>
                  {user ? (
                    <Dashboard />
                  ) : (
                    <GoogleButton
                      className={styles.GoogleButton}
                      onClick={handleClick}
                      
                    />
                  )}
                </div>
                
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 4 }}
                >
                  <div>
                    You must use your <b>Google Account</b> to log in.  
                  </div>
                </Alert>
                
              </Box>
            </Grid>
            <Grid item xs={false} sm={4} md={7}>
              <Image
                src={logo}
                style={{
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#852525",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
}


export default LoginT;