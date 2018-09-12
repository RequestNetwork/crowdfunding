import React from 'react';
import styled from 'styled-components';

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 8rem;
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;
export const StyledArticle = styled.article`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 3fr 1.5fr;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const CameraIcon = ({ style }) => (
  <svg
    width="29"
    height="24"
    viewBox="0 0 29 24"
    fill="none"
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.8 0C2.60178 0 0 2.58384 0 5.76C0 8.93616 2.60178 11.52 5.8 11.52C8.99822 11.52 11.6 8.93616 11.6 5.76C11.6 2.58384 8.99822 0 5.8 0Z"
      transform="translate(8.7002 7.44)"
      fill="#0D2946"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.5605 4.79999H26.6807C27.96 4.79999 29 5.83295 29 7.10352V21.2002C29 22.4794 27.9521 23.52 26.6641 23.52H2.33594C1.04785 23.52 0 22.4794 0 21.2002V7.10352C0 5.83295 1.04004 4.79999 2.31934 4.79999H2.8999V2.39999H5.7998V4.79999H6.43945L8.37256 0H20.6274L22.5605 4.79999ZM3.8667 4.79999H4.8335V3.35999H3.8667V4.79999ZM14.5 21.6C9.70264 21.6 5.7998 17.724 5.7998 12.96C5.7998 8.19601 9.70264 4.32001 14.5 4.32001C19.2969 4.32001 23.1997 8.19601 23.1997 12.96C23.1997 17.724 19.2969 21.6 14.5 21.6ZM23.2002 8.64001C23.2002 9.69888 24.0674 10.56 25.1333 10.56C26.1997 10.56 27.0669 9.69888 27.0669 8.64001C27.0669 7.58112 26.1997 6.72 25.1333 6.72C24.0674 6.72 23.2002 7.58112 23.2002 8.64001Z"
      transform="translate(0 0.23999)"
      fill="#0D2946"
    />
  </svg>
);

export const EditIcon = ({ style }) => (
  <svg
    width="22"
    height="22"
    style={style}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.215 0H0.766355C0.336449 0 0 0.377597 0 0.814815C0 1.25203 0.35514 1.62963 0.766355 1.62963H21.2336C21.6636 1.62963 22 1.25203 22 0.814815C22 0.377597 21.6449 0 21.215 0Z"
      transform="translate(0 20.3704)"
      fill="#5392FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.0180664 13.4444L0 17.1317C0 17.3397 0.0722656 17.5477 0.217285 17.699C0.361816 17.8503 0.54248 17.9259 0.741699 17.9259L4.25049 17.907C4.44971 17.907 4.63037 17.8314 4.77539 17.6801L16.894 5.01094C17.1836 4.70839 17.1836 4.21675 16.894 3.89529L13.4214 0.22691C13.1318 -0.0756378 12.6616 -0.0756378 12.354 0.22691L9.93018 2.77965L0.235352 12.8961C0.108398 13.0473 0.0180664 13.2364 0.0180664 13.4444ZM12.8965 1.89092L15.3384 4.44366L13.9639 5.88076L11.522 3.32802L12.8965 1.89092ZM10.4551 4.44366L1.51953 13.7848L1.50146 16.3376L3.96143 16.3186L12.897 6.99641L10.4551 4.44366Z"
      fill="#5392FF"
    />
  </svg>
);
