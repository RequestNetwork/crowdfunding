import React from 'react';
import styled from 'styled-components';
import Logo from '../logo';
import {
  MediumIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  FacebookIcon,
  GithubIcon,
} from '../media/icons';
import { Hr } from '../components/Hr';
import Media from 'react-media';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const StyledBox = styled.div`
  box-sizing: border-box;
  padding-right: 2rem;
  padding-top: 1rem;
`;
const Link = styled.a`
  color: unset;
  text-decoration: unset;
`;

const IconLink = styled(Link)`
  padding-right: 1rem;
  & > svg > g > g {
    fill: #0d2946;
  }
`;

const Div = styled.div`
  font-style: normal;
  font-weight: bold;
  line-height: 30px;
  font-size: 18px;
  padding-bottom: 1rem;

  color: #0d2946;
`;

const FooterTitle = styled.h2`
  margin-top: unset;
  font-style: normal;
  font-weight: bold;
  line-height: 36px;
  font-size: 24px;
  color: #0d2946;
`;

const FooterLink = styled.a`
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 18px;
  color: #6b7c93;
  display: block;
  margin-bottom: 1rem;
`;

const SpaceBetween = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 85%;
  margin-top: 2rem;
  margin-right: auto;
  margin-left: auto;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpaceAround = styled.div`
  width: 57%;
  display: flex;
  justify-content: space-around;
  margin: auto;
`;
const IconList = () => (
  <SpaceAround>
    <IconLink href="https://blog.request.network/">
      <MediumIcon />
    </IconLink>
    <IconLink href="https://www.reddit.com/r/RequestNetwork/">
      <RedditIcon />
    </IconLink>
    <IconLink href="https://t.me/requestnetwork">
      <TelegramIcon />
    </IconLink>
    <IconLink href="https://twitter.com/requestnetwork">
      <TwitterIcon />
    </IconLink>
    <IconLink href="https://github.com/RequestNetwork/">
      <GithubIcon />
    </IconLink>
    <IconLink href="https://www.facebook.com/Request-Network-140279756554525/">
      <FacebookIcon />
    </IconLink>
  </SpaceAround>
);

export const Footer = () => (
  <Media query="(min-width: 768px)">
    {matches =>
      matches ? (
        <StyledFooter>
          <Hr />
          <SpaceBetween>
            <StyledSection>
              <div>
                <Logo />
                <Div>
                  <div>powered by</div>
                  <div>Request Network</div>
                </Div>
                <div>
                  <IconList />
                </div>
              </div>
            </StyledSection>
            <StyledSection>
              <StyledBox>
                <FooterTitle>Platform</FooterTitle>
                <FooterLink href="https://github.com/RequestNetwork/">
                  Github
                </FooterLink>
                <FooterLink href="https://github.com/RequestNetwork/requestNetwork">
                  Library
                </FooterLink>
                <FooterLink href="https://docs.request.network/">
                  Develop with Request
                </FooterLink>
                <FooterLink href="https://request.network/assets/pdf/request_whitepaper.pdf">
                  Whitepaper
                </FooterLink>
              </StyledBox>
              <StyledBox>
                <FooterTitle>Organization</FooterTitle>
                <FooterLink href="https://request.network/#/">About</FooterLink>
                <FooterLink href="https://request.network/#/jobs">
                  Careers
                </FooterLink>
                <FooterLink href="https://request.network/#/contact">
                  Contact
                </FooterLink>
              </StyledBox>
            </StyledSection>
          </SpaceBetween>
        </StyledFooter>
      ) : (
        <Center>
          <IconList />
        </Center>
      )
    }
  </Media>
);
