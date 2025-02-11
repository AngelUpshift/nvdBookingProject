import { Box, useMediaQuery, useTheme } from "@mui/material";
import { AngelSeat } from "../Seats/AngelSeat";
import { AnaSeat } from "../Seats/AnaSeat";

export const SmallRoomForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "100%",
        maxHeight: "100%",
        maxWidth: isMobile || isTablet ? "400px" : "372px",
        height: isMobile ? "70vh" : isTablet ? "70vh" : "65vh", // Adjust height based on screen size
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: isMobile ? "200px" : "256px",
        backgroundColor: "white",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          left: 16,
          width: "100%",
          maxWidth: 361,
          gap: "10px",
        }}
      >
        <AngelSeat />
        <AnaSeat />
      </Box>
    </Box>
  );
};
