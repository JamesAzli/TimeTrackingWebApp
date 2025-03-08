import React, { useEffect, useState } from "react";
import Head from "next/head";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "../../public/images/GiantLogoW.png";
import Image from "next/image";
import GoogleButton from "react-google-button";
import styles from "../../styles/Login/login.module.scss";
import "firebase/firestore";
import { auth, provider } from "../../firebase";
import { db } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, setDoc, getDoc } from "firebase/firestore";

function LoginT() {
  // const theme = createTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [user, setUser] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const uid = user.uid;
    let role = ""

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
        router.push('/Dashboard/AdminTimeInOut');
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
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Head>
        <title>Login | GIANT</title>
      </Head>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 4,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 20,
          }}
        >
          <Typography component="h1" variant="h6">
            Log in to your Account
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
              className={styles.TextField}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              className={styles.FormButton}
              fullWidth
              size="large"
              sx={{ mt: 3, mb: 3 }}
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
            <Grid container></Grid>
            <Divider sx={{ mt: 1, mb: 2 }}>or</Divider>
          </Box>
          <div>
            {user ? (
              <p>Welcome, {user.displayName}!</p>
            ) : (
              <GoogleButton
                className={styles.GoogleButton}
                onClick={handleClick}
              />
            )}
          </div>

          <Alert color="primary" severity="info" sx={{ mt: 4 }}>
            <div>
              You must use your <b>Google Account</b> to log in.
            </div>
          </Alert>
        </Box>
      </Grid>
      <Grid item xs={false} sm={4} md={8}>
        <Image
          src={logo}
          alt="logo"
          style={{
            height: "100%",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#852525",
            backgroundPosition: "center",

          }}
        />
      </Grid>
    </Grid>
  );
}

export default LoginT;
