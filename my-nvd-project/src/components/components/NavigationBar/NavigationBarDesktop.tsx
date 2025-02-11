import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useLocation, useParams } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
// import logo from "../../../img/navbarimg/Booksy-logos-blue.psd (1).jpg";

export interface INavigation {
  handleClickOpen: () => void;
  handleClickClose: () => void;
  logoutLogic: () => void;
  open: boolean;
}
export const NavigationBarDesktop = ({
  handleClickOpen,
  handleClickClose,
  logoutLogic,
  open,
}: INavigation) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const { id } = useParams();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "80px",
        position: "fixed",
        top: 0,
        backgroundColor: "white",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        component="img"
        // src={logo}
        sx={{
          width: "100%",
          maxWidth: "81px",
          position: "absolute",
          display: "flex",
          top: 25,
          left: 30,
        }}
      />
      <Link to="/room" style={{ textDecoration: "none", flex: 0.07 }}>
        <Box
          sx={{
            flex: 1,
            height: "47px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <HomeOutlinedIcon
            sx={{
              width: "24px",
              height: "24px",
              color:
                isActive("/room") ||
                isActive("/room/main-reserve-desk") ||
                isActive("/room/small-reserve-desk") ||
                isActive("/room/cool-reserve-desk")
                  ? "#039ADE"
                  : "#686868",
            }}
          />
          <Typography
            sx={{ pl: 1, pt: 0.3 }}
            fontStyle="Roboto"
            fontWeight="400"
            textAlign="center"
            color={
              isActive("/room") ||
              isActive("/room/main-reserve-desk") ||
              isActive("/room/small-reserve-desk") ||
              isActive("/room/cool-reserve-desk")
                ? "#039ADE"
                : "#686868"
            }
            fontSize="14px"
            lineHeight="19.6px"
          >
            Home
          </Typography>
        </Box>
      </Link>
      <Link to="/clock-in" style={{ textDecoration: "none", flex: 0.07 }}>
        <Box
          sx={{
            flex: 1,
            height: "47px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ApartmentOutlinedIcon
            sx={{
              width: "24px",
              height: "24px",
              color:
                isActive("/clock-in") || isActive("/clock-out")
                  ? "#039ADE"
                  : "#686868",
            }}
          />
          <Typography
            sx={{ pl: 1, pt: 0.3 }}
            fontStyle="Roboto"
            fontWeight="400"
            textAlign="center"
            color={
              isActive("/clock-in") || isActive("/clock-out")
                ? "#039ADE"
                : "#686868"
            }
            fontSize="14px"
            lineHeight="19.6px"
          >
            Clock In
          </Typography>
        </Box>
      </Link>
      <Link to="/me" style={{ textDecoration: "none", flex: 0.07 }}>
        <Box
          sx={{
            flex: 1,
            height: "47px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <PersonOutlineOutlinedIcon
            sx={{
              width: "24px",
              height: "24px",
              color:
                isActive("/me") || isActive(`/editProfile/${id}`)
                  ? "#039ADE"
                  : "#686868",
            }}
          />
          <Typography
            sx={{ pl: 1, pt: 0.3 }}
            fontStyle="Roboto"
            fontWeight="400"
            textAlign="center"
            color={
              isActive("/me") || isActive(`/editProfile/${id}`)
                ? "#039ADE"
                : "#686868"
            }
            fontSize="14px"
            lineHeight="19.6px"
          >
            Profile
          </Typography>
        </Box>
      </Link>
      <LogoutIcon
        sx={{
          width: 32,
          height: 32,
          color: "#B71C1C",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          top: 25,
          right: 30,
        }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
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
    </Box>
  );
};
