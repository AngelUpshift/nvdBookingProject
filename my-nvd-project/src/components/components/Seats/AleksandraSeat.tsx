import { Box, Typography } from "@mui/material";
import { SmallAndCoolButtons } from "../ButtonBack/SmallAndCoolButtons";

export const AleksandraSeat = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: 361,
        height: 71,
      }}
    >
      <Box
        sx={{
          width: 73,
          height: 47,
          top: 44,
          left: 20,
          borderRadius: "4px 0px 0px 0px",
        }}
      >
        <Typography>💺 Seat 2</Typography>
        <Box
          sx={{
            display: "flex",
            width: 224,
            height: 18,
            borderRadius: 4,
            gap: "10px",
            padding: "4px, 6px, 4px, 6px",
          }}
        >
          <Typography
            color="#B71C1C"
            fontStyle="Roboto"
            fontSize="14px"
            fontWeight="600"
            lineHeight="19.6px"
          >
            Aleksandra's Seats
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: 113,
          top: 49,
          padding: " 9px, 16px, 9px, 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SmallAndCoolButtons />
      </Box>
    </Box>
  );
};
