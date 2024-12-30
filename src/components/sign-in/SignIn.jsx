

import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/signin-g.svg";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'; // Import axios

const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(7, "Password must be 7 characters")
      .max(10)
      .required("Password is required"),
  });

const SignIn = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const SignInHandler = (data) => {
    const signInUser = async () => {
      const resp = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );

      if (resp?.data?.access_token) {
        localStorage.setItem("token", resp.data.access_token);
        navigate("/");
      }
    };

    signInUser();
  };

  return (
    <>
      <Box className="d-flex justify-content-center align-items-center vh-100">
        <Box>
          <img src={logo} alt="" />
        </Box>
        <Box>
          <form onSubmit={handleSubmit((data) => SignInHandler(data))}>
            <Box>
              <Typography className="fw-bold" variant="h4">
                Sign in to E-Store
              </Typography>
              <Typography variant="h6">
                Welcome to FreshCart! Enter your email to get started.
              </Typography>
              <Box className="my-3">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      error={!!errors?.email}
                      placeholder="Email"
                      size="small"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Typography className="text-danger">
                  {errors?.email?.message}
                </Typography>
              </Box>
              <Box>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <TextField
                      error={!!errors?.password}
                      placeholder="Password"
                      size="small"
                      type={ShowPassword ? "text" : "password"}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment
                              position="start"
                              onClick={() => setShowPassword(!ShowPassword)}
                            >
                              {ShowPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </InputAdornment>
                          ),
                        },
                      }}
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Typography className="text-danger">
                  {errors?.password?.message}
                </Typography>
              </Box>
              <Button className="my-3" type="submit" fullWidth variant="contained">
                Sign In
              </Button>
              <Typography className="mt-3" variant="body1">
                Don’t have an account?{" "}
                <Link className="text-decoration-none" to="/sign-up">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
