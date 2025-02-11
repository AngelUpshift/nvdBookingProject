import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Seat1 } from "../Seats/Seat1";
import { Seat3 } from "../Seats/Seat3";
import { Seat5 } from "../Seats/Seat5";

import { IRoom } from "../../../types/room/room";
import { AleksandraSeat } from "../Seats/AleksandraSeat";
import { TeoSeat } from "../Seats/TeoSeat";

export interface ICoolRoomForm {
  roomList: IRoom[];
}
export const CoolRoomForm = (roomList: ICoolRoomForm) => {
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
        <Seat1
          seat={roomList.roomList[2].desks[0]}
          roomId={roomList.roomList[2]._id}
        />
        <AleksandraSeat />
        <Seat3
          seat={roomList.roomList[2].desks[2]}
          roomId={roomList.roomList[2]._id}
        />
        <TeoSeat />
        <Seat5
          seat={roomList.roomList[2].desks[4]}
          roomId={roomList.roomList[2]._id}
        />
      </Box>
    </Box>
  );
};
