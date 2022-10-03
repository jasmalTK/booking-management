import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Carousal from "../Components/Carousal";
import Card from "../Components/Card";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import * as data from "../datas";

function Home() {
  const [value, setValue] = useState(1);
  const [carousalIdx, setCarousaldx] = useState(1);
  const [showMsg, setMsg] = useState(true);
  const AllBookings = useSelector((state) => state.BookingDetails);
  const [state, setState] = useState({
    card_bookings: [],
  });

  useEffect(() => {
    let card_bookings = [...state.card_bookings];
    let Services = [...data.services];
    let ServiceName = Services[carousalIdx]["ServiceName"];
    if (value === 1) {
      card_bookings = AllBookings.filter(
        (i) => (i.Status === "Pending") & (i.ServiceName === ServiceName)
      );
      setState((prevState) => {
        return {
          ...prevState,
          card_bookings,
        };
      });
    } else if (value === 2) {
      card_bookings = AllBookings.filter(
        (i) => (i.Status === "Active") & (i.ServiceName === ServiceName)
      );
      setState((prevState) => {
        return {
          ...prevState,
          card_bookings,
        };
      });
    } else {
      card_bookings = AllBookings.filter(
        (i) => (i.Status === "Payment") & (i.ServiceName === ServiceName)
      );
      setState((prevState) => {
        return {
          ...prevState,
          card_bookings,
        };
      });
    }
  }, [value]);

  useEffect(() => {
    if (data.services.length) {
      handleSwipe(carousalIdx);
    }
  }, [carousalIdx]);

  const handleSwipe = (index) => {
    let ServiceName = data.services[index].ServiceName;
    let Status = "Pending";
    if (value === 2) {
      Status = "Active";
    } else if (value === 3) {
      Status = "Payment";
    }

    let card_bookings = AllBookings.filter(
      (i) => (i.ServiceName === ServiceName) & (i.Status === Status)
    );
    setState((prevState) => {
      return {
        ...prevState,
        card_bookings,
      };
    });
  };

  const [count, setCount] = useState(5);
  const total_count = state.card_bookings.length;

  return (
    <Container>
      <Header>
        <HeadMenu>
          <ArrowBackIosIcon />
          <Badge
            color="error"
            badgeContent={
              AllBookings.filter((i) => i.Status === "Pending").length
            }
            max={99}
          >
            <MenuItem value={value} id={1} onClick={() => setValue(1)}>
              Requests
            </MenuItem>
          </Badge>
          <Badge
            color="error"
            badgeContent={
              AllBookings.filter((i) => i.Status === "Active").length
            }
            max={99}
          >
            <MenuItem value={value} id={2} onClick={() => setValue(2)}>
              Services
            </MenuItem>
          </Badge>
          <Badge
            color="error"
            badgeContent={
              AllBookings.filter((i) => i.Status === "Payment").length
            }
            max={99}
          >
            <MenuItem value={value} id={3} onClick={() => setValue(3)}>
              Payments
            </MenuItem>
          </Badge>
        </HeadMenu>
      </Header>
      <CarousalContainer>
        <Carousal handleSwipe={handleSwipe} setCarousaldx={setCarousaldx} />
      </CarousalContainer>
      {showMsg && value === 2 ? (
        <ServiceMesgDiv>
          <ServiceMsg>
            <ServiceMsgContent>
              These are your upcoming services. You could scan your customer's
              QR Code to generate invoice for payments
            </ServiceMsgContent>
            <CancelIcon onClick={() => setMsg(false)} />
          </ServiceMsg>
        </ServiceMesgDiv>
      ) : null}

      <Card
        value={value}
        setValue={setValue}
        state={state}
        count={count}
        setCarousaldx={setCarousaldx}
      />
      <LoadDataDiv>
        {total_count > count ? (
          <LoadSpan onClick={() => setCount(count + 5)}>Show more</LoadSpan>
        ) : (
          <LoadSpan>
            No more{" "}
            {value === 1 ? "Pending" : value === 2 ? "Service" : "Payments"}{" "}
            Requests
          </LoadSpan>
        )}
      </LoadDataDiv>
    </Container>
  );
}

export default Home;

const LoadDataDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;
const LoadSpan = styled.span`
  color: #b1b3b5;
  cursor: pointer;
  :hover {
    color: black;
  }
`;
const Container = styled.div``;
const ServiceMesgDiv = styled.div`
  padding: 10px;
  background: #4c6fa8;
  opacity: 0.9;
  margin-top: 6px;
`;
const ServiceMsg = styled.div`
  color: #fff;
  border-left: 4px solid #fff;
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    color: #fff !important;
    cursor: pointer;
  }
`;
const ServiceMsgContent = styled.p`
  font-size: 17px;
  letter-spacing: 1px;
`;
const Header = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #4c6fa8;
  width: 100%;
  opacity: 0.9;
`;
const HeadMenu = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;
const MenuItem = styled.span`
  cursor: pointer;
  border-bottom: ${({ value, id }) => (value === id ? "2px solid #fff" : "")};
`;
const CarousalContainer = styled.div`
  /* width: 90%; */
  margin: auto;
`;
