import { Box, Typography } from "@mui/material";
import { SmallAndCoolButtons } from "../ButtonBack/SmallAndCoolButtons";

export const AnaSeat = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        // maxWidth: 361,
        height: 71,
      }}
    >
      {/* <Box
        sx={{
          width: 73,
          height: 47,
          top: 44,
          left: 20,
          borderRadius: "4px 0px 0px 0px",
        }}
      > */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          // height: 18,
          // borderRadius: 4,
          // padding: "4px, 6px, 4px, 6px",
        }}
      >
        <Typography fontStyle="Roboto" fontSize="16px" fontWeight="400">
          💺 Seat 2
        </Typography>
        <Typography
          color="#B71C1C"
          fontStyle="Roboto"
          fontSize="14px"
          fontWeight="600"
          lineHeight="19.6px"
        >
          Ana's Seats
        </Typography>
        <SmallAndCoolButtons />
      </Box>
      {/* </Box> */}
      {/* <Box
        sx={{
          width: 113,
          top: 49,
          padding: " 9px, 16px, 9px, 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        
      </Box> */}
    </Box>
  );
};
