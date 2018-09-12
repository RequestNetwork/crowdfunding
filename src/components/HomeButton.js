import React from 'react';
import Logo from '../logo';
import { Flex } from '../components/Flex';
import { Link } from '../components/Link';
import styled from 'styled-components';

const NavHome = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledFlex = styled(Flex)`
  margin-left: 1rem;
  color: #0d2946;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 15px;
`;

const Subtitle = styled.div`
  font-style: italic;
  font-weight: normal;
  line-height: normal;
  font-size: 9px;
`;

export const HomeButton = () => (
  <NavHome to="/">
    <Logo />
    <StyledFlex>
      <Title>Crowd</Title>
      <Subtitle>Powered by Request Network</Subtitle>
    </StyledFlex>
  </NavHome>
);
