import {
  Box,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logoutThunk, meThunk } from "../redux/slices/authSlice";
import MediaQuery from "react-responsive";
import { NavigationBarDesktop } from "../components/NavigationBar/NavigationBarDesktop";
import { getBookingThunk } from "../redux/slices/bookingSlice";
import { IBooking } from "../../types/booking/booking";
import icon from "../../img/Default-avatar 1.png";

export const MyProfilePage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const booking = useAppSelector((state) => state.booking);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const isMobileHeight = useMediaQuery("(max-height: 750px)");

  useEffect(() => {
    dispatch(meThunk());
    dispatch(getBookingThunk({ order: "asc" }));
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const logoutLogic = () => {
    dispatch(logoutThunk());
  };

  const filteredBookingsOfTheUser: IBooking[] = booking.bookingList.filter(
    (value) => value.user._id === user._id
  );
  const filteredBookingsOfTheUserNotCancelled: IBooking[] =
    booking.bookingList.filter(
      (value) => value.user._id === user._id && value.status === "booked"
    );
  const filteredBookingsOfTheUserCancelled: IBooking[] =
    booking.bookingList.filter(
      (value) => value.user._id === user._id && value.status === "cancelled"
    );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* Logout Icon */}
      <MediaQuery maxWidth={1024}>
        <LogoutIcon
          sx={{
            width: 32,
            height: 32,
            color: "#B71C1C",
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: 70,
            right: 16,
          }}
          onClick={handleClickOpen}
        />
        <Dialog
          open={open}
          onClose={handleClickClose}
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "20px",
              width: "369px",
              height: "164px",
            },
          }}
        >
          <CloseIcon
            sx={{
              width: 20,
              height: 20,
              display: "flex",
              position: "absolute",
              flexDirection: "column",
              top: 10,
              right: 10,
            }}
            onClick={handleClickClose}
          />
          <DialogTitle id="logout-dialog-title">
            <Typography fontSize="18px" fontStyle="Roboto" fontWeight="700">
              Log out
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              <Typography fontWeight="400" fontSize="14px" fontStyle="Roboto">
                Are you sure you want to logout ?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              size="medium"
              sx={{
                width: "78px",
                height: "38px",
                borderRadius: "100px",
                backgroundColor: "#DBDBDD",
                textTransform: "none",
                color: "gray",
                top: "-40%",
                fontWeight: 700,
                fontSize: "14px",
                fontStyle: "Roboto",
                right: "1%",
              }}
              onClick={handleClickClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "78px",
                height: "38px",
                padding: "9px 16px 9px 16px",
                borderRadius: "100px",
                textTransform: "none",
                top: "-40%",
                fontWeight: 700,
                fontSize: "14px",
                fontStyle: "Roboto",
                right: "1%",
              }}
              onClick={logoutLogic}
              autoFocus
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </MediaQuery>

      {/* Profile Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: theme.spacing(2),
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{ ml: isDesktop ? 10 : 1 }}
            variant="h6"
            fontWeight="700"
            fontStyle="Roboto"
            fontSize="24px"
          >
            {user.first_name}’s Profile
          </Typography>
          <Link to={`/editProfile/${user._id}`}>
            <SettingsOutlinedIcon
              sx={{
                ml: isDesktop ? 2 : 1,
                mt: 0.5,
                width: 32,
                height: 32,
                color: "#039ADE",
              }}
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: "369px",
            width: "100%",
            borderRadius: 2,
            padding: 2,
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component="img"
            src={user.avatar_url !== "" ? user.avatar_url : icon}
            sx={{
              width: 154,
              height: 154,
              mr: 2,
              borderRadius: 2,
            }}
          />
          <Box sx={{ maxWidth: "181px", width: "50%" }}>
            <Typography
              sx={{
                width: "100%",
                maxWidth: "181px",
              }}
              variant="h4"
              fontWeight="700"
              fontSize={
                isDesktop
                  ? "28px"
                  : isTablet
                  ? "28px"
                  : isMobileHeight
                  ? "18px"
                  : "24px"
              }
            >
              {user.first_name}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="700"
              fontSize={
                isDesktop
                  ? "28px"
                  : isTablet
                  ? "28px"
                  : isMobileHeight
                  ? "18px"
                  : "24px"
              }
              paddingBottom="10px"
            >
              {user.last_name}
            </Typography>
            <Typography variant="body2" color="#686868" fontSize="12px">
              Email
            </Typography>
            <Typography
              variant="body2"
              color="black"
              fontSize={
                isDesktop
                  ? "12px"
                  : isTablet
                  ? "12px"
                  : isMobileHeight
                  ? "8px"
                  : "12px"
              }
              paddingBottom="10px"
            >
              {user.email}
            </Typography>
            <Typography variant="body2" color="#686868" fontSize="12px">
              Squad
            </Typography>
            <Typography
              variant="body2"
              color="black"
              fontSize={
                isDesktop
                  ? "12px"
                  : isTablet
                  ? "12px"
                  : isMobileHeight
                  ? "8px"
                  : "12px"
              }
              paddingBottom="10px"
            >
              {user.squad === "NOVA"
                ? "Nova"
                : user.squad === "NETWATCH"
                ? "Net Watch"
                : "Gizmo"}
            </Typography>
            <Typography variant="body2" color="#686868" fontSize="12px">
              Team
            </Typography>
            <Typography
              variant="body2"
              color="black"
              fontSize={
                isDesktop
                  ? "12px"
                  : isTablet
                  ? "12px"
                  : isMobileHeight
                  ? "8px"
                  : "12px"
              }
            >
              {user.team === "BND"
                ? "Backend Team"
                : user.team === "FND"
                ? "Frontend Team"
                : user.team === "DESIGN"
                ? "Design Team"
                : user.team === "QA"
                ? "Quality assurance Team"
                : user.team === "HR"
                ? "Human resources Team"
                : "Product Team"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Info Section */}
      <Box
        sx={{
          maxWidth: "361px", // Adjust maxWidth based on screen size
          width: "100%",
          height: "auto", // Allow height to adjust based on content
          left: "16px",
          gap: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: "425px",
        }}
      >
        <Card
          sx={{
            maxWidth: isMobile || isTablet ? "361px" : "800px", // Adjust maxWidth based on screen size
            width: "100%",
            height: "86px",
            borderRadius: "20px", // Added borderRadius here
          }}
        >
          <CardContent>
            <Typography
              sx={{
                width: "100%",
                height: "25px",
                paddingTop: "3px",
              }}
              fontStyle="Roboto"
              fontWeight="700"
              fontSize="18px"
              component="div"
              color="#000000"
            >
              Total bookings
            </Typography>
            <Typography
              sx={{
                width: "100%",
                height: "25px",
                paddingTop: "16px",
              }}
              component="div"
            >
              {filteredBookingsOfTheUser.length}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            maxWidth: isMobile || isTablet ? "361px" : "800px", // Adjust maxWidth based on screen size
            width: "100%",
            height: "86px",
            borderRadius: "20px", // Added borderRadius here
          }}
        >
          <CardContent>
            <Typography
              sx={{
                width: "100%",
                height: "25px",
                paddingTop: "3px",
              }}
              fontStyle="Roboto"
              fontWeight="700"
              fontSize="18px"
              component="div"
              color="#000000"
            >
              Not cancelled bookings
            </Typography>
            <Typography
              sx={{
                width: "100%",
                height: "25px",
                paddingTop: "16px",
              }}
              component="div"
            >
              {filteredBookingsOfTheUserNotCancelled.length}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            maxWidth: isMobile || isTablet ? "361px" : "800px", // Adjust maxWidth based on screen size
            width: "100%",
            height: "86px",
            borderRadius: "20px", // Added borderRadius here
          }}
        >
          <CardContent>
            <Typography
              sx={{
                width: "100%",
                height: "25px",
                paddingTop: "3px",
              }}
              fontStyle="Roboto"
              fontWeight="700"
              fontSize="18px"
              component="div"
              color="#000000"
            >
              Cancelled bookings
            </Typography>
            <Typography
              sx={{
                width: "100%",
                height: "25px",
                paddingTop: "16px",
              }}
              component="div"
            >
              {filteredBookingsOfTheUserCancelled.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <MediaQuery maxWidth={1024}>
        <NavigationBar />
      </MediaQuery>
      <MediaQuery minWidth={1025}>
        <NavigationBarDesktop
          handleClickOpen={handleClickOpen}
          handleClickClose={handleClickClose}
          logoutLogic={logoutLogic}
          open={open}
        />
      </MediaQuery>
    </Container>
  );
};
