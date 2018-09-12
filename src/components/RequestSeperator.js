import React from 'react';
import styled from 'styled-components';
import Logo from '../logo';

const Line = styled.div`
  border: 1px solid #e3e3e3;
  width: 150px;
  height: 0px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaddedDiv = styled.div`
  padding: 1rem;
`;

export const RequestSeperator = () => (
  <Div>
    <Line />
    <PaddedDiv>
      <Logo size={17} />
    </PaddedDiv>
    <Line />
  </Div>
);
