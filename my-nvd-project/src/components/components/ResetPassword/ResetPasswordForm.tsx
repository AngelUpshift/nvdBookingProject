import { Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { validationSchemaResetPassword } from "./utils";
import { useAppDispatch } from "../../redux/store";
import { resetPasswordThunk } from "../../redux/slices/authSlice";
import { useParams } from "react-router-dom";

export const ResetPasswordForm = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const dispatch = useAppDispatch();
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      dispatch(resetPasswordThunk({ token, ...values }));
    },
    validationSchema: validationSchemaResetPassword,
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
        left: "32px",
        gap: "50px",
        padding: theme.spacing(2),
        backgroundColor: "white",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          fontStyle="Roboto"
          fontSize={{ xs: "24px", sm: "24px", md: "28px", lg: "32px" }}
          fontWeight="700"
          lineHeight="33.6px"
          textAlign={isDesktop ? "center" : isTablet ? "center" : "left"}
        >
          Reset your password
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "324px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <TextField
          id="password"
          type="password"
          placeholder="New Password"
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
                <Lock sx={{ width: "20px", height: "20px" }} />
              </InputAdornment>
            ),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          InputLabelProps={{
            sx: {
              left: "0px",
              "&.MuiInputLabel-shrink": {
                left: "0px",
              },
            },
          }}
        />{" "}
        <TextField
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
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
                <Lock sx={{ width: "20px", height: "20px" }} />
              </InputAdornment>
            ),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
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
      <Box sx={{ width: "100%", maxWidth: "324px" }}>
        <Button
          type="submit"
          disabled={
            !formik.values.confirmPassword ||
            Boolean(formik.errors.confirmPassword) ||
            !formik.values.password ||
            Boolean(formik.errors.password)
          }
          sx={{
            height: "50px",
            borderRadius: "100px",
            fontSize: "14px",
            fontStyle: "Roboto",
            lineHeight: "16.8px",
            fontWeight: "700",
            textTransform: "none",
            backgroundColor:
              !formik.values.confirmPassword ||
              !formik.values.password ||
              Boolean(formik.errors.password) ||
              Boolean(formik.errors.confirmPassword)
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
          Save
        </Button>
      </Box>
    </Box>
  );
};
