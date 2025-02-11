import { Box, Button, Typography } from "@mui/material";

export const SmallAndCoolButtons = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: { xs: 105, sm: 105, md: 113, lg: 120 },
        height: 38,
        left: 236,
        position: "absolute",
      }}
    >
      <Button
        sx={{
          width: "100%",
          height: "100%",
          gap: "8px",
          borderRadius: "100px",
          padding: "1.5px 0px 1.5px 0px",
          backgroundColor: "#8BD1F0",
          "&.MuiButton-contained": {
            backgroundColor: "#8BD1F0", // Force the contained variant to use your background color
            color: "white",
          },
        }}
        variant="contained"
        disabled
      >
        <Typography
          sx={{ fontSize: { xs: "14px", sm: "14px", md: "14px", lg: "14px" } }}
          fontWeight="700"
          lineHeight="16.8px"
          textAlign="center"
          textTransform="none"
        >
          Book a Seat
        </Typography>
      </Button>
    </Box>
  );
};
