import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import {
  validationSchemaChangePassword,
  validationSchemaEditProfile,
} from "./utils";
import { putUserThunk } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useParams } from "react-router-dom";
import { ButtonSave } from "../ButtonBack/ButtonSave";
import { changePasswordThunk, meThunk } from "../../redux/slices/authSlice";
import { useEffect, useRef, useState } from "react";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import logo from "../../../img/Default-avatar 1.png";

export const EditProfileForm = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { id } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [profileChanged, setProfileChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector((state) => state.auth);

  const formikProfile = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      team: user.team,
      squad: user.squad,
      avatar_url: user.avatar_url ? user.avatar_url : "",
    },
    onSubmit: (values) => {
      dispatch(putUserThunk({ id, ...values }));
    },
    validationSchema: validationSchemaEditProfile,
  });

  const formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(changePasswordThunk(values)).unwrap();
      } catch (error) {
        if (error === "Passwords don't match") {
          setErrors({ currentPassword: error });
        } else {
          setErrors({ currentPassword: "An unexpected error occurred" });
        }
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: validationSchemaChangePassword,
  });

  useEffect(() => {
    dispatch(meThunk()).then(() => {
      formikProfile.setValues({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        team: user.team,
        squad: user.squad,
        avatar_url: user.avatar_url,
      });
    });
  }, [dispatch, user]);

  const hasChanges = (
    values: Record<string, unknown>,
    initialValues: Record<string, unknown>
  ) => {
    return Object.keys(values).some(
      (key) => values[key] !== initialValues[key]
    );
  };

  useEffect(() => {
    setProfileChanged(
      hasChanges(formikProfile.values, formikProfile.initialValues)
    );
  }, [formikProfile.values, formikProfile.initialValues]);

  useEffect(() => {
    setPasswordChanged(
      hasChanges(formikPassword.values, formikPassword.initialValues)
    );
  }, [formikPassword.values, formikPassword.initialValues]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (profileChanged) {
      formikProfile.submitForm();
    }

    if (passwordChanged) {
      formikPassword.submitForm();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formikProfile.setFieldValue("avatar_url", reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing(2),
          width: "100%",
          height: "70vh", // Adjust height based on screen size
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "4px",
          }}
        >
          <Box
            component="img"
            src={
              formikProfile.values.avatar_url
                ? formikProfile.values.avatar_url
                : user.avatar_url
                ? user.avatar_url
                : logo
            }
            sx={{
              width: isMobile ? "154px" : "229px",
              height: isMobile ? "229px" : isTablet ? "229px" : "265px",
              objectFit: "cover",
            }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: "100px",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <VideoCameraBackOutlinedIcon
              sx={{ width: "16px", height: "16px" }}
            />
            <Typography fontSize="12px" fontWeight="700" textTransform="none">
              Edit Picture
            </Typography>
          </Button>
        </Box>
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "100%" : "800px",
            gap: "15px",
          }}
        >
          <ButtonSave onClick={handleSave} />

          <Typography
            fontStyle="Roboto"
            fontWeight="700"
            fontSize={isMobile ? "16px" : "18px"}
            lineHeight="25.2px"
            textAlign="left"
          >
            Edit info
          </Typography>
          <TextField
            id="first_name"
            label="First Name"
            variant="outlined"
            InputLabelProps={{
              style: {
                fontSize: "12px", // Adjust label font size
                top: "-12px", // Adjust position if needed
                paddingLeft: "28px",
                color: "#686868",
                fontWeight: 500,
                fontStyle: "Roboto",
              },
              shrink: false, // Ensure label shrinks above input
            }}
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
            sx={{
              height: "42px",
              width: "100%",

              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
                paddingBottom: "4px",
              },
            }}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            value={formikProfile.values.first_name}
            error={
              formikProfile.touched.first_name &&
              Boolean(formikProfile.errors.first_name)
            }
          />
          <TextField
            id="last_name"
            label="Last Name"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: {
                fontSize: "12px", // Adjust label font size
                top: "-12px", // Adjust position if needed
                paddingLeft: "28px",
                color: "#686868",
                fontWeight: 500,
                fontStyle: "Roboto",
              },
              shrink: false, // Ensure label shrinks above input
            }}
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
            sx={{
              height: "42px",
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
                paddingBottom: "4px",
              },
            }}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            value={formikProfile.values.last_name}
            error={
              formikProfile.touched.last_name &&
              Boolean(formikProfile.errors.last_name)
            }
          />
          <TextField
            id="email"
            type="email"
            disabled
            fullWidth
            label="Your Email"
            variant="outlined"
            InputLabelProps={{
              style: {
                fontSize: "12px", // Adjust label font size
                top: "-12px", // Adjust position if needed
                paddingLeft: "28px",
                color: "#686868",
                fontWeight: 500,
                fontStyle: "Roboto",
              },
              shrink: false, // Ensure label shrinks above input
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
            sx={{
              height: "42px",
              width: "100%",
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
                paddingBottom: "4px",
              },
            }}
            onChange={formikProfile.handleChange}
            onBlur={formikProfile.handleBlur}
            value={formikProfile.values.email}
            error={
              formikProfile.touched.email && Boolean(formikProfile.errors.email)
            }
          />

          <FormControl
            sx={{
              height: "42px",
              width: "100%",
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
              },
            }}
            error={
              formikProfile.touched.team && Boolean(formikProfile.errors.team)
            }
          >
            <InputLabel
              htmlFor="team"
              sx={{
                fontSize: "14px", // Adjust label font size
                top: "15px", // Adjust position if needed
                color: "#686868",
                fontWeight: 500,
                fontStyle: "Roboto",
              }}
            >
              Select Team
            </InputLabel>
            <Select
              id="team"
              name="team"
              value={formikProfile.values.team}
              onChange={formikProfile.handleChange}
              onBlur={formikProfile.handleBlur}
              variant="outlined"
              fullWidth
              displayEmpty
              sx={{
                height: "42px",
                width: "100%",
                padding: "0 14px",

                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 14px", // Adjust padding as needed
                },
                "& .MuiOutlinedInput-root": {
                  height: "100%",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  paddingLeft: "1px",
                  paddingTop: "25px",
                },
              }}
              renderValue={(selected) => {
                if (selected === "") {
                  return <Typography>Select Team</Typography>;
                }
                return selected === "BND"
                  ? "Backend Team"
                  : selected === "FND"
                  ? "Frontend Team"
                  : selected === "DESIGN"
                  ? "Design Team"
                  : selected === "QA"
                  ? "Quality assurance Team"
                  : selected === "HR"
                  ? "Human resources Team"
                  : "Product Team";
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
            sx={{
              height: "42px",
              width: "100%",
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
              },
            }}
            error={
              formikProfile.touched.squad && Boolean(formikProfile.errors.squad)
            }
          >
            <InputLabel
              htmlFor="squad"
              sx={{
                fontSize: "14px", // Adjust label font size
                top: "15px", // Adjust position if needed
                color: "#686868",
                fontWeight: 500,
                fontStyle: "Roboto",
              }}
            >
              Select Squad
            </InputLabel>
            <Select
              id="squad"
              name="squad"
              value={formikProfile.values.squad}
              onChange={formikProfile.handleChange}
              onBlur={formikProfile.handleBlur}
              variant="outlined"
              displayEmpty
              sx={{
                height: "42px",
                width: "100%",
                padding: "0 14px",

                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 14px", // Adjust padding as needed
                },
                "& .MuiOutlinedInput-root": {
                  height: "100%",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  paddingLeft: "1px",
                  paddingTop: "25px",
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
                      Select Squad
                    </Typography>
                  );
                }
                return selected === "NETWATCH"
                  ? "Net Watch"
                  : selected === "NOVA"
                  ? "Nova"
                  : "Gizmo";
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
                Net Watch
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
          <Typography
            fontStyle="Roboto"
            fontWeight="700"
            fontSize={isMobile ? "16px" : "18px"}
            lineHeight="25.2px"
            textAlign="left"
          >
            Change Password
          </Typography>
          <TextField
            id="currentPassword"
            type="password"
            placeholder="Current Password"
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
            onChange={formikPassword.handleChange}
            onBlur={formikPassword.handleBlur}
            value={formikPassword.values.currentPassword}
            error={
              formikPassword.touched.currentPassword &&
              Boolean(formikPassword.errors.currentPassword)
            }
          />
          <TextField
            id="password"
            type="password"
            placeholder="New Password"
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
            onChange={formikPassword.handleChange}
            onBlur={formikPassword.handleBlur}
            value={formikPassword.values.password}
            error={
              formikPassword.touched.password &&
              Boolean(formikPassword.errors.password)
            }
          />
          <TextField
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
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
            onChange={formikPassword.handleChange}
            onBlur={formikPassword.handleBlur}
            value={formikPassword.values.confirmPassword}
            error={
              formikPassword.touched.confirmPassword &&
              Boolean(formikPassword.errors.confirmPassword)
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
