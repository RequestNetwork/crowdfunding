import React from 'react';
import { H2 } from '../components/H';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const FAQ_LIST = [
  {
    question: 'What are your fees?',
    answer:
      'Our fees are 0.1% per transaction. This fee covers the payment processing costs of making a transaction. Crowdfunding app does not take any percentage of the amount donated. ',
  },

  {
    question: 'Why would I use Crowdfunding app?',
    answer:
      'Crowdfunding app allows you to give cryptocurrency directly to the project of your choice. Using Crowdfunding app allows your donations to be cheaper, faster and more secure than ever before. Your identity is also kept completely confidential -- you never disclose any personally identifying information to make a donation.',
  },

  {
    question: 'Where does my donation go?',
    answer:
      'Directly to the project of your choice. Crowdfunding app never holds your donation, and sends it immediately to the project owners wallet.',
  },

  {
    question: 'When will the project receive the money?',
    answer:
      'The project will receive the money instantly. With Crowdfunding app, there are no middlemen or gatekeepers -- your money goes straight from your wallet to the project owners.  ',
  },

  {
    question: 'How does Crowdfunding app work?',
    answer:
      'Crowdfunding app uses the power of blockchain and decentralized systems to raise money. We  are built using the Request Network protocol -- a secure, decentralized payment solution. ',
  },

  {
    question: ' Don’t have an ethereum address? ',
    answer:
      '  Signup here with Coinbase to create a wallet that can easily convert your funds raised to your preferred local currency. ',
  },
];

const Div = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    width: 75%;
  }
  span {
    line-height: 1.5rem;
  }
`;

export const FAQ = () => (
  <Div>
    {FAQ_LIST.map(({ question, answer }, index) => {
      return (
        <div key={index}>
          <H2>{question}</H2>
          <Typography variant="caption">{answer}</Typography>
        </div>
      );
    })}
    <Typography variant="caption">
      Have any more questions? Email us at help@request.network
    </Typography>
  </Div>
);
