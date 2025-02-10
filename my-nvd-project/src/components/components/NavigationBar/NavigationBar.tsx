import { Box, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useLocation, useParams } from "react-router-dom";
export const NavigationBar = () => {
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
        height: "71px",
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link to="/room" style={{ textDecoration: "none", flex: 1 }}>
        <Box
          sx={{
            flex: 1,
            height: "47px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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
            sx={{ width: "100%", height: "20px" }}
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
      <Link to="/clock-in" style={{ textDecoration: "none", flex: 1 }}>
        <Box
          sx={{
            flex: 1,
            height: "47px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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
            sx={{ width: "100%", height: "20px" }}
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
      <Link to="/me" style={{ textDecoration: "none", flex: 1 }}>
        <Box
          sx={{
            flex: 1,
            height: "47px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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
            sx={{ width: "100%", height: "20px" }}
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
    </Box>
  );
};
