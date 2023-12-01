import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in with:", { username, password });
    // You can add authentication logic, API calls, etc.
  };

  return (
    <div className="center-container">
      <div className="login-form">
        <Typography sx={{ margin: "5%" }} variant="h3" align="center">
          Login
        </Typography>
        <form>
          <div>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
          </div>
          <div>
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </div>
        </form>
        <div>
          <Typography variant="body2">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
