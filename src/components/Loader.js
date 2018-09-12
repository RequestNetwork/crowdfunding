import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Center } from './Center';
import styled from 'styled-components';

export const Loader = ({ size, ...props }) => {
  return (
    <Center>
      <CircularProgress {...props} size={size ? size : 100} />
    </Center>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;

const Div = styled.div`
  margin-right: 2rem;
`;

export const MetaMaskLoader = () => (
  <Row>
    <Div>Check MetaMask</Div>
    <Loader color="inherit" size={25} />
  </Row>
);
