import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="#ff4d00" align="center" {...props}>
     
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
      
    // });


    axios.post('http://67.205.163.34:1143/login', {
      username: data.get('email'),
      password: data.get('password')
    })
    .then(function (response) {
      console.log("response after requests:",response);

      sessionStorage.setItem('@112sZ##@@#@32&*&&*Z<><>:@@!aasdas@@UUUU@!87^@&<<<>>!', response.data.type);
      sessionStorage.setItem('&!&26@asd9s9d8ZJJzjkJLA@*(&&hjbbzccnm2@<><!2Uu!I,.!@7#&', response.data.authenticated);
      window.location.reload(false);
      // sessionStorage.setItem('userID', '1');
      // sessionStorage.setItem('userTYPE', 'teamleader');
      // sessionStorage.setItem('isLogin', 'true');
     
      
      // console.log(sessionStorage.getItem("@112sZ##@@#@32&*&&*Z<><>:@@!aasdas@@UUUU@!87^@&<<<>>!"))
      // console.log(sessionStorage.getItem("&!&26@asd9s9d8ZJJzjkJLA@*(&&hjbbzccnm2@<><!2Uu!I,.!@7#&"))
      
      // axios.post('http://localhost:1143/login', {
      //   username: data.get('email'),
      //   password: data.get('password')
      // })
      // .then(function (response) {
      //   console.log("response after requests:",response);
  
      //   sessionStorage.setItem('userID', response.data.id);
      //   sessionStorage.setItem('userName', response.data.username);
      //   sessionStorage.setItem('userTYPE', response.data.type);
      //   sessionStorage.setItem('authenticated', response.data.authenticated);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });


      

    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#ff4d00',marginTop:"15%" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,backgroundColor:"#ff4d00" }}
            >
               <Link to='/reset' className='page-scroll'   style={{ fontSize: 10,color: "white" }}>
                  Send Reset Code</Link>
            </Button>  
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}