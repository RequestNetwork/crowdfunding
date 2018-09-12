import React from 'react';
import styled from 'styled-components';
import { Center as BasicCenter } from './Center';

export const StyledForm = styled.div`
  height: 85%;
  align-self: center;

  @media (max-width: 768px) {
    height: unset;
  }
`;

export const StyledFormHeader = ({ children }) => <FlexEnd>{children}</FlexEnd>;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
`;

export const StyledFormContent = styled(BasicCenter)`
  margin: auto;
  box-sizing: border-box;
  width: 350px;
  max-width: 350px;
  @media (max-width: 350px) {
    width: 90%;
    max-width: unset;
  }
`;
