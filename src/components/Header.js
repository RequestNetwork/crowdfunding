import styled from 'styled-components';
import React from 'react';
import { Connector } from '../containers/Connector';
import { Flex } from '../components/Flex';
import { HomeButton } from '../components/HomeButton';

const StyledHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-right: 2rem;
  margin-left: 7rem;
`;

const NavLink = styled.a`
  padding-top: 8px;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export default ({ children }) => (
  <div>
    <StyledHeader direction="rows">
      <HomeButton />
      <Flex direction="rows">
        <NavLink>Demo</NavLink>
        <NavLink>Documentation</NavLink>
        <NavLink>Help center</NavLink>
        <Connector />
      </Flex>
    </StyledHeader>
    {children}
  </div>
);
