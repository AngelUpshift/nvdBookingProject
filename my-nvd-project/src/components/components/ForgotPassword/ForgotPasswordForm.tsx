import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import { useFormik } from "formik";
import { validationSchemaForgotPassword } from "./utils";
import { forgotPasswordThunk } from "../../redux/slices/authSlice";

export const ForgotPasswordForm = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(forgotPasswordThunk(values));
    },
    validationSchema: validationSchemaForgotPassword,
  });
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
        marginTop: "16px",
        boxSizing: "border-box",
        left: "32px",
        gap: "50px",
        padding: theme.spacing(2),
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography
          fontStyle="Roboto"
          fontWeight="700"
          fontSize="24px"
          textAlign={isDesktop ? "center" : isTablet ? "center" : "left"}
          lineHeight="33.6px"
          color="#000000"
        >
          Forgot your password?
        </Typography>
        <Typography
          sx={{
            paddingTop: "16px",
          }}
          textAlign={isDesktop ? "center" : isTablet ? "center" : "left"}
          fontStyle="Roboto"
          fontWeight="500"
          fontSize="20px"
          lineHeight="28px"
          color="#3E3E3E"
        >
          You can reset your password by entering your email address and
          clicking on the link we'll send you.{" "}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", maxWidth: "324px", height: "42px" }}>
        <TextField
          id="email"
          type="email"
          placeholder="Your Email"
          variant="outlined"
          sx={{
            height: "42px",
            width: "100%",
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
          helperText={formik.touched.email && formik.errors.email}
          InputLabelProps={{
            sx: {
              left: "0px",
              "&.MuiInputLabel-shrink": {
                left: "0px",
              },
            },
          }}
        />{" "}
      </Box>
      <Box sx={{ width: "100%", maxWidth: 324, height: "50px" }}>
        <Button
          type="submit"
          disabled={!formik.values.email || Boolean(formik.errors.email)}
          sx={{
            height: "50px",
            borderRadius: "100px",
            fontSize: "14px",
            fontStyle: "Roboto",
            lineHeight: "16.8px",
            fontWeight: "700",
            textTransform: "none",
            backgroundColor:
              !formik.values.email || Boolean(formik.errors.email)
                ? "#8BD1F0"
                : "#039ADE",
            "&.Mui-disabled": {
              backgroundColor: "#8BD1F0",
              color: "#FFFFFF",
            },
          }}
          variant="contained"
          size="large"
          fullWidth
        >
          Send link to email
        </Button>
      </Box>
    </Box>
  );
};
