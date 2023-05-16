import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Divider from '@mui/material/Divider';
import logo from "../../public/images/GiantLogo.png";
import Image from "next/image";
import styles from "../../styles/Login/login.module.scss";
import Typography from '@mui/material/Typography';
import GoogleButton from "react-google-button";
import Dashboard from "./dashboard"
import firebase from 'firebase/app';
import 'firebase/firestore';
import {auth,provider} from '../../firebase'
import {db} from '../../firebase'
import {signInWithPopup} from 'firebase/auth'; 
import { useRouter } from 'next/router';
import { collection, addDoc } from "firebase/firestore";
// import Home from "../Home"


export default function SignInSide() {
  const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [user, setUser] = useState('')
    const router = useRouter();
     const [latitude, setLatitude] = useState(null);
     const [longitude, setLongitude] = useState(null);
     const [place, setPlace] = useState(null);

    const handleClick = async () => {
    
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      const uid = user.uid;
      const email = user.email;
      const name = user.displayName;

      // Add the user to the 'users' collection in Firestore
      await addDoc(collection(db, "Client-Login"), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
      router.push('/Home');
       
    };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Head>
        <title>
          Login | GIANT
        </title>
      </Head>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, background: "#852525" }} >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In to your Account
            </Typography>
            <Typography component="h1" variant="caption">
              Stay connected with us!
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button className={styles.FormButton}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
              >
                Sign In
              </Button>
              <Grid container>
              </Grid>
            
                <Divider sx={{ mt: 1, mb: 2 }}>or</Divider>
            </Box>
            <div>
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
                    You must use your <b>Google Encompass Account</b> to log in.  
                  </div>
                </Alert>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}>
          <Image
          src={logo}
          style={{
            height: "100%",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#852525",
            backgroundPosition: 'center',
          }}
          />   
        </Grid>
      </Grid>
    
  );
}