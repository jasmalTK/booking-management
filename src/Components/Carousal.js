import React from "react";
import Slider from "infinite-react-carousel";
import styled from "styled-components/macro";
import * as data from "../datas";

function Carousal(props) {
  return (
    <MainContainer>
      <Slider
        dots
        arrows={false}
        beforeChange={(old, index) =>
          props.setCarousaldx(index != undefined ? index : 1)
        }
        initialSlide={1}
      >
        {data.services.map((i, index) => (
          <SliderContainer key={index}>
            <SliderImgDiv>
              <SliderImg src={i.ServiceImg} />
            </SliderImgDiv>
            <SliderContent>
              <HeadDiv>
                <ContentHead>{i.ServiceName}</ContentHead>
                <ContentSubHead>{i.SeriveType.toUpperCase()}</ContentSubHead>
              </HeadDiv>

              <ContentDescription>{i.ServiceDescription}</ContentDescription>
              <ContentPrice>
                <Session>For one session</Session>
                <Price>${Number(i.Price).toFixed(2)}</Price>
              </ContentPrice>
            </SliderContent>
          </SliderContainer>
        ))}
      </Slider>
    </MainContainer>
  );
}

export default Carousal;

const SliderContainer = styled.div`
  margin: 27px 27px 0px 27px;
  display: flex !important;
  border: 1px solid #e8e7e3;
  width: unset !important;
`;
const SliderImgDiv = styled.div`
  width: 40%;
  height: 160px;
`;
const SliderContent = styled.div`
  width: 60%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SliderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MainContainer = styled.div``;
const ContentHead = styled.h2`
  font-size: 22px;
  color: #5e78bd;
  opacity: 0.9;
`;
const ContentSubHead = styled.span`
  font-weight: bold;
  font-size: 14px;
`;
const ContentDescription = styled.p``;
const ContentPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Session = styled.span`
  opacity: 0.7;
`;
const Price = styled.span`
  font-size: 23px;
  color: #bf2a37;
  font-weight: bold;
`;
const HeadDiv = styled.div``;
