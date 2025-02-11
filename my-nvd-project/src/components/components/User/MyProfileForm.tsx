import { Box, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";

export const MyProfileForm = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "361px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "34px",
        position: "absolute",
        top: 112,
        left: 12,
        backgroundColor: "white",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "205px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "34px",
          position: "absolute",
          left: 16,
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            textAlign: "left",
          }}
          fontStyle="Roboto"
          fontSize="24px"
          fontWeight="700"
          lineHeight="33.6px"
        >
          Emily’s Profile
        </Typography>
        <Link to="/editProfile">
          <SettingsOutlinedIcon
            sx={{
              marginTop: "3px",
              width: "24px",
              height: "24px",
              color: "#039ADE",
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};
