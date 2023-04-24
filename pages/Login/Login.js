import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import logo from "../../public/images/Giant.png";
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
import { collection, addDoc } from "firebase/firestore";
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
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 10,
          }}
        >
          <Grid container>
            {/* <CssBaseline /> */}
  
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 15,
                  mx: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                {/* <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                > */}
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
                <div>
                  {user ? (
                    <Dashboard />
                  ) : (
                    <GoogleButton
                      className={styles.GoogleButton}
                      onClick={handleClick}
                      // type="submit"
                      // fullWidth
                      // variant="contained"
                      // sx={{ mt: 3, mb: 2 }}
                    />
                  )}
                </div>
                {/* <Grid container alignItems='center'>
                    {/* <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid> */}
                {/* </Grid> */}
              </Box>
              {/* <div className={styles.backdrop}>GIANT</div> */}
              {/* </Box> */}
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
// }

export default LoginT;