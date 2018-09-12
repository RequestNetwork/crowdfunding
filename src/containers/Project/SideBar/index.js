import React from 'react';
import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 8rem;
`;

export const SideBar = ({ children }) => {
  return <Column>{children}</Column>;
};
