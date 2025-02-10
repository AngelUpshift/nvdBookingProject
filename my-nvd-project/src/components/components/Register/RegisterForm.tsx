import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import { validationSchemaRegister } from "./utils";
import { useAppDispatch } from "../../redux/store";
import { registerThunk } from "../../redux/slices/authSlice";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      team: "",
      squad: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(registerThunk(values));
    },
    validationSchema: validationSchemaRegister,
  });

  const theme = useTheme();

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%", // Fixed width
        maxWidth: "500px",
        padding: theme.spacing(2),
        backgroundColor: "white",
        left: "32px",
        boxSizing: "border-box", // Ensure padding doesn't cause overflow
        paddingTop: "50px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontStyle: "Roboto",
            fontWeight: "700",
            fontSize: {
              xs: "24px",
              sm: "24px",
              md: "24px",
              lg: "32px",
            },
            lineHeight: "33.6px",
          }}
        >
          Create an Account
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "337px",
          },
          maxWidth: "100%",
          paddingTop: "30px",
          left: "35px",
          gap: theme.spacing(1),
          display: "flex", // Added display flex
          flexDirection: "column", // Set flex direction to column
        }}
      >
        <TextField
          id="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          placeholder="First name"
          variant="outlined"
          InputProps={{
            style: {
              borderRadius: "10px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon
                  sx={{ width: "20px", height: "20px" }}
                />
              </InputAdornment>
            ),
          }}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          // helperText={formik.touched.first_name && formik.errors.first_name}
        ></TextField>
        <TextField
          id="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          placeholder="Last name"
          variant="outlined"
          InputProps={{
            style: {
              borderRadius: "10px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon
                  sx={{ width: "20px", height: "20px" }}
                />
              </InputAdornment>
            ),
          }}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          // helperText={formik.touched.last_name && formik.errors.last_name}
        ></TextField>
        <FormControl
          fullWidth
          error={formik.touched.team && Boolean(formik.errors.team)}
        >
          <Select
            id="team"
            name="team"
            value={formik.values.team}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            displayEmpty
            sx={{
              height: "42px",
              width: "100%",
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                padding: "0 14px", // Adjust padding as needed
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "10px",
              },
            }}
            renderValue={(selected) => {
              if (selected === "") {
                return (
                  <Typography
                    sx={{
                      width: "77px",
                      height: "20px",
                      top: "11px",
                      left: "12px",
                      fontStyle: "Roboto",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "19.6px",
                      color: "#686868",
                    }}
                  >
                    Select team
                  </Typography>
                );
              }
              return selected;
            }}
          >
            {" "}
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="FND"
            >
              FrontEnd
            </MenuItem>
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="BND"
            >
              BackEnd
            </MenuItem>
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="DESIGN"
            >
              Design
            </MenuItem>
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="QA"
            >
              Quality assurance
            </MenuItem>
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="HR"
            >
              Human resources
            </MenuItem>
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="PR"
            >
              Product team
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          error={formik.touched.squad && Boolean(formik.errors.squad)}
        >
          <Select
            id="squad"
            name="squad"
            value={formik.values.squad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            displayEmpty
            sx={{
              height: "42px",
              width: "100%",
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                padding: "0 14px", // Adjust padding as needed
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "10px",
              },
            }}
            renderValue={(selected) => {
              if (selected === "") {
                return (
                  <Typography
                    sx={{
                      width: "77px",
                      height: "20px",
                      top: "11px",
                      left: "12px",
                      fontStyle: "Roboto",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "19.6px",
                      color: "#686868",
                    }}
                  >
                    Select squad
                  </Typography>
                );
              }
              return selected;
            }}
          >
            {" "}
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="NETWATCH"
            >
              Net watch
            </MenuItem>
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="GIZMO"
            >
              Gizmo
            </MenuItem>
            <MenuItem
              sx={{
                fontStyle: "Roboto",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19.6px",
                color: "#686868",
              }}
              value="NOVA"
            >
              Nova
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="email"
          value={formik.values.email}
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          placeholder="Email"
          variant="outlined"
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
          error={formik.touched.email && Boolean(formik.errors.email)}
          // helperText={formik.touched.email && formik.errors.email}
        ></TextField>
        <TextField
          id="password"
          value={formik.values.password}
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          placeholder="Password"
          variant="outlined"
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
          error={formik.touched.password && Boolean(formik.errors.password)}
          // helperText={formik.touched.password && formik.errors.password}
        ></TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "324px",
          },
          maxWidth: 324,
          gap: theme.spacing(1.5),
          left: "35px",
          paddingTop: "20px",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            height: "50px",
            borderRadius: "100px",
            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "14px",
              lg: "14px",
            },
            fontStyle: "Roboto",
            lineHeight: "16.8px",
            fontWeight: "700",
            textTransform: "none", // Ensure text is not capitalized
          }}
        >
          Create Account
        </Button>

        <Typography
          sx={{
            width: "100%",
            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "14px",
              lg: "14px",
            },
          }}
          lineHeight="19.6px"
          fontStyle="Roboto"
          color="#686868"
          textAlign="center"
          fontWeight="600"
        >
          Already have an account?
        </Typography>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{
            height: "50px",
            borderRadius: "100px",
            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "14px",
              lg: "14px",
            },
            fontStyle: "Roboto",
            fontWeight: "700",
            textTransform: "none", // Ensure text is not capitalized
            backgroundColor: "#FFFFFF",
            lineHeight: "16.8px",
          }}
          href="/login"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
