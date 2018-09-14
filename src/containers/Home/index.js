import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import BackgroundImage from './HomeLogo.svg';
import PlanetImage from './Planet.svg';
import { Link } from '../../components/Link';
import { Display, H2 } from '../../components/H';
import Button from '@material-ui/core/Button';
import Media from 'react-media';

const Headline = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  z-index: 1;
  width: 65%;
  align-items: ${({ align }) => (align ? align : 'unset')};
`;

const LandingBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${BackgroundImage});
`;

const Planet = styled.div`
  width: 194px;
  height: 240px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${PlanetImage});
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 87%;
  margin-top: auto;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const ResponsiveColumn = styled(Column)`
  align-items: center;
  justify-content: space-evenly;
  margin: unset;
  margin: auto;
`;

export const OnboardingLink = props => <Link to="/onboarding/project" {...props} />;

export class Home extends Component {
  render() {
    return (
      <Media query="(min-width: 768px)">
        {matches =>
          matches ? (
            <Fragment>
              <LandingBackground />
              <Column>
                <Headline>
                  <Display>Get support</Display>
                  <Display>for your project</Display>
                  <H2 gutterBottom>
                    A fully decentralized solution to raise funds in crypto
                    currency
                  </H2>
                  <Button
                    variant="raised"
                    color="primary"
                    component={OnboardingLink}
                    style={{ maxWidth: 280, height: '3rem' }}
                  >
                    START A PROJECT
                  </Button>
                </Headline>
              </Column>
            </Fragment>
          ) : (
            <ResponsiveColumn>
              <Planet />
              <Headline align="center">
                <Display style={{ fontSize: 24 }} align="center">
                  Get support
                </Display>
                <Display style={{ fontSize: 24 }} align="center">
                  for your project
                </Display>
                <H2 align="center" style={{ fontSize: 12 }} gutterBottom>
                  A fully decentralized solution to raise funds in crypto
                  currency
                </H2>
                <Button
                  variant="raised"
                  size="small"
                  color="primary"
                  component={OnboardingLink}
                  style={{ width: 180 }}
                >
                  START A PROJECT
                </Button>
              </Headline>
            </ResponsiveColumn>
          )
        }
      </Media>
    );
  }
}
