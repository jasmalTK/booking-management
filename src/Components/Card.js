import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useDispatch } from "react-redux";
import { bookingSuccess } from "../slices/BookingSlice";
import * as data from "../datas";

const steps = ["Request", "Service", "Payment"];

function Card(props) {
  const dispatch = useDispatch();
  const handleSubmit = (i) => {
    let stateObject = { ...i };
    let Status = "Pending";
    if (props.value === 1) {
      Status = "Active";
    } else if (props.value === 2) {
      Status = "Payment";
    }
    stateObject.Status = Status;
    dispatch(bookingSuccess(stateObject));
    if (props.value === 1 || props.value === 2) {
      props.setValue(props.value + 1);
      const index = data.services.findIndex((object) => {
        return object.ServiceName === i.ServiceName;
      });
      props.setCarousaldx(index);
    }
  };

  return props.state.card_bookings.slice(0, props.count).map((i, index) => (
    <MainContainer key={i.BookingID}>
      <TopHead>
        <HeadLeft>
          <CardHead>
            {props.value === 1
              ? "Pending Request"
              : props.value === 2
              ? "Upcoming Service"
              : "Pending Payment"}
          </CardHead>
          <CardDate>{i.RequestTime}</CardDate>
        </HeadLeft>
        <HeadRight>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={props.value - 1} alternativeLabel>
              {steps.map((label) => (
                <StepComponent key={label}>
                  <StepLabeComponant>{label}</StepLabeComponant>
                </StepComponent>
              ))}
            </Stepper>
          </Box>
        </HeadRight>
      </TopHead>
      <ProfileDiv>
        <ImgSection>
          <ProPicDiv>
            <ProPic src={i.UserPhoto} />
          </ProPicDiv>
          <NameSection>
            <Name>{i.UserName}</Name>
            <Place>{i.UserPlace}</Place>
          </NameSection>
        </ImgSection>
        <DealSection>
          <DealIconDiv>
            <DealIcon />
          </DealIconDiv>
          <DealDetail>You two had 12 deals before.</DealDetail>
        </DealSection>
      </ProfileDiv>

      <AvailibiltyHead>
        {props.value === 1
          ? "This customer is available at:"
          : props.value === 2
          ? "Chek in here or scan customer's QR Code to check in when the service is about to start"
          : "Service is c  omplete, please confirm payment amount:  "}
      </AvailibiltyHead>
      {props.value === 3 ? (
        <InvoiceSection>
          <DescriptionOutlinedIcon />
          <ItemDiv>
            <ItemHead>Invoice item:</ItemHead>
            <ItemDetails>
              <Item>Session Price</Item>
              <Item className="price">
                $
                {Number(
                  data.services.filter(
                    (s) => s.ServiceName === i.ServiceName
                  )[0].Price
                ).toFixed(2)}
              </Item>
            </ItemDetails>
          </ItemDiv>
        </InvoiceSection>
      ) : (
        <div>
          <AvailablityDiv>
            <IconDiv>
              <TimeIcon />
            </IconDiv>

            <AvailablityContentDiv>
              {props.value === 1 ? (
                <div>
                  <AvailablityContent>{i.AvailabilityDate}</AvailablityContent>
                  <AvailablityContent className="time">
                    {i.AvailabilityTime}
                  </AvailablityContent>
                </div>
              ) : (
                <AvailablityContent>
                  {i.AvailabilityTime.split("-")[0]},{i.AvailabilityDate}
                </AvailablityContent>
              )}
            </AvailablityContentDiv>
          </AvailablityDiv>
          <AvailablityDiv>
            <IconDiv>
              <LocationIcon />
            </IconDiv>

            <AvailablityContentDiv>
              <AvailablityContent className="location">
                {i.UserAddress}
              </AvailablityContent>
            </AvailablityContentDiv>
          </AvailablityDiv>
        </div>
      )}
      <ButtonDiv>
        <Button className={props.value === 2 ? "" : "second"}>
          {props.value === 1
            ? "Reschedule"
            : props.value === 2
            ? "Check In"
            : "Start a Chat"}
        </Button>
        <Button onClick={() => handleSubmit(i)}>
          {props.value === 1
            ? "Accept Request"
            : props.value === 2
            ? "Generate Invoice"
            : "Resend Invoice"}
        </Button>
        <MoreDiv>
          <MoreHorizOutlinedIcon />
          <MoreSpan>More</MoreSpan>
        </MoreDiv>
      </ButtonDiv>
    </MainContainer>
  ));
}

export default Card;

const StepLabeComponant = styled(StepLabel)`
  && {
    &.MuiStepLabel-label .Mui-completed .MuiStepLabel-alternativeLabel {
      margin: unset !important;
    }
  }
`;

const StepComponent = styled(Step)`
  && {
    &.MuiStepLabel-label .Mui-completed .MuiStepLabel-alternativeLabel {
      margin: unset !important;
    }
  }
  &.MuiStepLabel-label .Mui-completed .MuiStepLabel-alternativeLabel {
    margin: unset !important;
  }
`;
const InvoiceSection = styled.div`
  display: flex;
  margin: 10px 0px;
  svg {
    color: #4c6fa8;
  }
`;
const ItemDiv = styled.div`
  width: 90%;
  margin-left: 10px;
`;
const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;
const ItemHead = styled.span`
  font-size: 19px;
  font-weight: bold;
`;
const Item = styled.span`
  font-size: 17px;
  &.price {
    color: #bf2a37;
  }
`;

const Button = styled.button`
  padding: 5px 36px;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  background: #4c6fa8;
  opacity: 0.9;
  border: unset;
  &.second {
    color: #4c6fa8;
    background: #fff;
    border: 2px solid #4c6fa8;
  }

  @media (max-width: 520px) {
    padding: 5px 25px;
  }
  @media (max-width: 420px) {
    padding: 5px 10px;
    font-size: 12px;
  }
  @media (max-width: 360px) {
    padding: 5px 5px;
    font-size: 11px;
  }
`;
const MoreDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    color: #4c6fa8 !important;
  }
  margin-left: 4px;
`;

const MoreSpan = styled.span`
  color: #4c6fa8;
  font-weight: bold;
`;

const IconDiv = styled.div`
  width: 2%;
  @media (max-width: 1280px) {
    width: 3%;
  }
  @media (max-width: 960px) {
    width: 4%;
  }
  @media (max-width: 680px) {
    width: 6%;
  }
  @media (max-width: 540px) {
    width: 7%;
  }
  @media (max-width: 360px) {
    width: 11 %;
  }
`;
const TimeIcon = styled(AccessTimeOutlinedIcon)``;
const LocationIcon = styled(LocationOnOutlinedIcon)``;
const AvailablityContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
`;
const AvailablityContent = styled.span`
  font-size: 18px;
  font-weight: bold;
  &.location {
    color: #5e78bd;
    font-size: 163e12ffdpx;
  }
  &.time {
    margin-left: 11px;
  }
  @media (max-width: 460px) {
    font-size: 16px;
  }
`;
const AvailibiltyHead = styled.span`
  color: #c2c2c2;
  font-weight: bold;
  margin-top: 15px;
`;
const CardHead = styled.h4`
  color: #bf2a37;
  font-weight: bold;
  font-size: 18px;
`;

const CardDate = styled.span`
  color: #c2c2c2;
  font-size: 13px;
  font-weight: bold;
`;

const MainContainer = styled.div`
  margin: 16px auto;
  width: 90%;
  padding: 18px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 5px 1px #888888;
  border-radius: 5px;
`;
const TopHead = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProfileDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const AvailablityDiv = styled.div`
  margin-top: 15px;
  display: flex;
  svg {
    width: 20px !important;
    height: 20px !important;
    color: #7c74c2 !important;
    opacity: 0.7;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 23px 30px;
  width: 28%;
  @media (max-width: 1280px) {
    width: 50%;
  }
  @media (max-width: 940px) {
    width: 92%;
  }
  @media (max-width: 820px) {
    width: 88%;
  }

  @media (max-width: 720px) {
    width: 90%;
  }
`;
const HeadLeft = styled.div`
  width: 40%;
`;
const HeadRight = styled.div`
  width: 60%;
  && {
    margin: unset !important;
  }
  &.MuiStepLabel-label .Mui-completed .MuiStepLabel-alternativeLabel {
    margin: unset !important;
  }
`;
const ImgSection = styled.div`
  display: flex;
  width: 42%;
  justify-content: space-between;
  align-items: center;
`;
const DealSection = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin-left: 19px;
`;
const ProPicDiv = styled.div`
  height: 68px;
  width: 68px;
  border-radius: 18px;
`;
const ProPic = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 65px;
  object-fit: cover;
`;
const NameSection = styled.div`
  width: 88%;
  margin-left: 11px;
`;
const Name = styled.h4`
  font-weight: bold;
  font-size: 18px;
  color: #5e78bd;
  width: 60%;
`;
const Place = styled.span`
  font-weight: bold;
`;
const DealDetail = styled.p`
  font-weight: bold;
  font-size: 16px;
`;
const DealIcon = styled(HandshakeOutlinedIcon)`
  width: 100%;
  height: 100%;
`;
const DealIconDiv = styled.div`
  svg {
    width: 40px !important;
    height: 40px !important;
    color: #7c74c2;
    opacity: 0.7;
  }

  display: flex;
  align-items: center;
  margin-right: 11px;
`;
