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
import logo from "../assets/signup-g.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom"; // Add this import

const SignUpSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  secondName: yup.string().required("Second name is required"),
  Email: yup.string().email().required("Email is required"),
  Password: yup.string().required("Password is required"),
});

const SignUp = () => {
  const [showpassword, setshowpassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      secondName: "",
      Email: "",
      Password: "",
    },
    resolver: yupResolver(SignUpSchema),
  });

  console.log(errors, "errors");

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Box
          className="vh-100 d-flex justify-content-center align-items-center"
        >
          <Box className="d-flex flex-row justify-content-around align-items-center flex-wrap container">
            {/* Left Side: Image */}
            <Box className="text-center">
              <img src={logo} className="img-fluid" alt="Sign Up" />
            </Box>

            {/* Right Side: Form */}
            <Box className="text-start p-3" style={{ maxWidth: "400px" }}>
              <Typography variant="h5">Get Start Shopping</Typography>
              <Typography variant="body2" className="mb-4">
                Welcome to FreshCart! Enter your email to get started.
              </Typography>

              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors?.firstName}
                    {...field}
                    size="small"
                    className="my-2"
                    fullWidth
                    type="text"
                    placeholder="First name"
                  />
                )}
              />
              <Typography className="text-danger text-start">
                {errors?.firstName?.message}
              </Typography>

              <Controller
                name="secondName"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors?.secondName}
                    {...field}
                    size="small"
                    className="my-2"
                    fullWidth
                    type="text"
                    placeholder="Second name"
                  />
                )}
              />
              <Typography className="text-danger text-start">
                {errors?.secondName?.message}
              </Typography>

              <Controller
                name="Email"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors?.Email}
                    {...field}
                    size="small"
                    className="my-2"
                    fullWidth
                    type="email"
                    placeholder="Email"
                  />
                )}
              />
              <Typography className="text-danger text-start">
                {errors?.Email?.message}
              </Typography>

              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors?.Password}
                    {...field}
                    size="small"
                    className="my-2"
                    fullWidth
                    type={showpassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={() => setshowpassword(!showpassword)}
                          style={{ cursor: "pointer" }}
                        >
                          {showpassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Password"
                  />
                )}
              />
              <Typography className="text-danger text-start">
                {errors?.Password?.message}
              </Typography>

              <Button type="submit" size="small" fullWidth variant="contained">
                Sign Up
              </Button>
              <Typography className="mt-3 text-start" variant="body2">
              Don’t have an account? <Link to="/sign-in"> SignIn</Link>
            </Typography>
            </Box>
           
          </Box>
        </Box>
      </form>
    </>
  );
};

export default SignUp;
