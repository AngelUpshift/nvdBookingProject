import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Seat1 } from "../Seats/Seat1";
import { Seat2 } from "../Seats/Seat2";
import { Seat3 } from "../Seats/Seat3";
import { Seat4 } from "../Seats/Seat4";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { getRoomThunk } from "../../redux/slices/roomSlice";
import { Seat5 } from "../Seats/Seat5";
import { Seat6 } from "../Seats/Seat6";
import { Seat7 } from "../Seats/Seat7";
import { Seat8 } from "../Seats/Seat8";
import MediaQuery from "react-responsive";

export const MainRoomForm = () => {
  const room = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const defaultQueryParams = {
      search: "",
      sortBy: "createdAt",
      page: 1,
      order: "asc",
    };

    dispatch(getRoomThunk(room.queryParameters || defaultQueryParams));
  }, [dispatch, room.queryParameters]);

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "100%",
        height: isMobile ? "70vh" : isTablet ? "70vh" : "65vh", // Adjust height based on screen size
        maxHeight: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        maxWidth: isMobile || isTablet ? "361px" : "372px",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        alignItems: "center",
        top: isMobile ? "200px" : "256px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "361px",
          left: 20,
        }}
      >
        <Typography
          sx={{
            width: "100%",
            maxWidth: "361px",
          }}
          fontStyle="Roboto"
          fontSize="16px"
          fontWeight="700"
          lineHeight="22.4px"
        >
          Left side seats
        </Typography>
        <Seat1 seat={room.roomList[0].desks[0]} roomId={room.roomList[0]._id} />
        <Seat2 seat={room.roomList[0].desks[1]} roomId={room.roomList[0]._id} />
      </Box>
      <Box
        sx={{ width: "100%", maxWidth: 361, border: 1, color: "#C5C5C7 " }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "361px",
          width: "100%",
          top: 204,
        }}
      >
        <Typography
          sx={{
            maxWidth: "361px",
            width: "100%",
          }}
          fontStyle="Roboto"
          fontSize="16px"
          fontWeight="700"
          lineHeight="22.4px"
        >
          Middle seats
        </Typography>
        <Seat3 seat={room.roomList[0].desks[2]} roomId={room.roomList[0]._id} />
        <Seat4 seat={room.roomList[0].desks[3]} roomId={room.roomList[0]._id} />
        <Seat5 seat={room.roomList[0].desks[4]} roomId={room.roomList[0]._id} />
        <Seat6 seat={room.roomList[0].desks[5]} roomId={room.roomList[0]._id} />
      </Box>
      <Box
        sx={{ width: "100%", maxWidth: 361, border: 1, color: "#C5C5C7 " }}
      ></Box>
      <MediaQuery maxHeight={700}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "361px",
            minHeight: "40vh",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              maxWidth: "361px",
              width: "100%",
            }}
            fontStyle="Roboto"
            fontSize="16px"
            fontWeight="700"
            lineHeight="22.4px"
          >
            Window seats
          </Typography>
          <Seat7
            seat={room.roomList[0].desks[6]}
            roomId={room.roomList[0]._id}
          />
          <Seat8
            seat={room.roomList[0].desks[7]}
            roomId={room.roomList[0]._id}
          />
        </Box>
      </MediaQuery>
      <MediaQuery minHeight={701}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "361px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              maxWidth: "361px",
              width: "100%",
            }}
            fontStyle="Roboto"
            fontSize="16px"
            fontWeight="700"
            lineHeight="22.4px"
          >
            Window seats
          </Typography>
          <Seat7
            seat={room.roomList[0].desks[6]}
            roomId={room.roomList[0]._id}
          />
          <Seat8
            seat={room.roomList[0].desks[7]}
            roomId={room.roomList[0]._id}
          />
        </Box>
      </MediaQuery>
    </Box>
  );
};
