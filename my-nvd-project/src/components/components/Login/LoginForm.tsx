import {
  Box,
  TextField,
  Typography,
  Link,
  Button,
  useMediaQuery,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import { validationSchemaLogin } from "./utils";
import { useAppDispatch } from "../../redux/store";
import { loginThunk } from "../../redux/slices/authSlice";
import { useTheme } from "@mui/material/styles";

export const LoginForm = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginThunk(values));
    },
    validationSchema: validationSchemaLogin,
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
        },
        padding: 2,
        backgroundColor: "white",
        gap: 2,
        boxSizing: "border-box",
        maxWidth: "500px", // Set a maxWidth for the container
        margin: "0 auto", // Center the container
      }}
    >
      <Typography
        fontSize={{
          xs: "20px",
          sm: "24px",
          md: "28px",
          lg: "32px",
        }}
        fontWeight="700"
        width="100%"
        textAlign={isMobile ? "left" : isTablet ? "left" : "center"}
        color="#000000"
        lineHeight={{
          xs: "28px",
          sm: "28px",
          md: "36px",
          lg: "44.8px",
        }}
      >
        Welcome to Book Chair
      </Typography>
      <Typography
        fontSize={{
          xs: "20px",
          sm: "20px",
          md: "20px",
          lg: "20px",
        }}
        fontStyle="Roboto"
        fontWeight="500"
        textAlign={isMobile ? "left" : isTablet ? "left" : "center"}
        color="#3E3E3E"
        lineHeight={{
          xs: "24px",
          sm: "26px",
          md: "28px",
          lg: "28px",
        }}
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "500px",
          },
        }}
      >
        Use your credentials to login and use the platform
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "337px",
          gap: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          id="email"
          type="email"
          placeholder="Your Email"
          variant="outlined"
          sx={{
            height: "42px",
            width: {
              sm: "100%",
              lg: "337px",
            },
            maxWidth: "337px", // Set a maxWidth for the TextField
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "& .MuiOutlinedInput-root": {
              height: "100%",
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: "14px",
            },
          }}
          InputProps={{
            style: {
              borderRadius: "10px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineOutlinedIcon
                  sx={{ width: "20px", height: "20px" }}
                />
              </InputAdornment>
            ),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          // helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          type="password"
          placeholder="Your Password"
          variant="outlined"
          sx={{
            height: "42px",
            width: {
              sm: "100%",
              lg: "337px",
            },
            maxWidth: "400px", // Set a maxWidth for the TextField
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "& .MuiOutlinedInput-root": {
              height: "100%",
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: "14px",
            },
          }}
          InputProps={{
            style: {
              borderRadius: "10px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ width: "20px", height: "20px" }} />
              </InputAdornment>
            ),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          // helperText={formik.touched.password && formik.errors.password}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Link
            href="/forgot-password"
            fontSize="12px"
            fontWeight="600"
            lineHeight="16.8px"
            textAlign="right"
            underline="none"
            color="#3E3E3E"
          >
            Forgot Password?
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "337px",
          gap: 1.5,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            height: "50px",
            borderRadius: "100px",
            fontSize: "14px",
            fontWeight: "700",
            textTransform: "none",
          }}
        >
          Log In
        </Button>

        <Typography
          fontSize="14px"
          lineHeight="19.6px"
          color="#686868"
          textAlign="center"
          fontWeight="600"
        >
          Don't have an account?
        </Typography>
        <Button
          type="button"
          variant="outlined"
          size="large"
          sx={{
            height: "50px",
            borderRadius: "100px",
            fontSize: "14px",
            fontWeight: "700",
            textTransform: "none",
            backgroundColor: "#FFFFFF",
          }}
          href="/register"
        >
          Create an account
        </Button>
      </Box>
    </Box>
  );
};
