import React from "react";
import styled from "styled-components/macro";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Box from "@mui/material/Box";
import { styled as style_mu } from "@mui/material/styles";

const StyledBadge = style_mu(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 8,
    top: 4,
  },
}));

function Header() {
  return (
    <Container>
      <LeftDiv>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </LeftDiv>
      <CenterDiv>
        <CenterImg>
          <Img src="https://media-exp1.licdn.com/dms/image/C4E1BAQEA_Dud7mQFUQ/company-background_10000/0/1550507983868?e=2147483647&v=beta&t=JxSTUaz5SWFISxCbNqrkhGusgwEkjuqvKfxeS89znmo" />
        </CenterImg>
      </CenterDiv>
      <RightDiv>
        <IconButton>
          <Box sx={{ color: "action.active" }}>
            <Badge color="error" variant="dot">
              <ChatBubbleOutlineOutlinedIcon />
            </Badge>
          </Box>
        </IconButton>
        <IconButton>
          <Box sx={{ color: "action.active" }}>
            <StyledBadge color="error" variant="dot" className="dot-badge">
              <NotificationsOutlinedIcon />
            </StyledBadge>
          </Box>
        </IconButton>
      </RightDiv>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;
const LeftDiv = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;
const CenterDiv = styled.div``;
const RightDiv = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  &.MuiBadge-dot {
    top: 6px !important;
    right: 10px !important;
  }
`;
const CenterImg = styled.div`
  width: 100px;
  height: 60px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
