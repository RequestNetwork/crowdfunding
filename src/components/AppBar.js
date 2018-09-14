import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from '../components/Link';
import { Center } from '../components/Center';
import { HomeButton } from '../components/HomeButton';
import styled from 'styled-components';
import Media from 'react-media';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Hamburger = ({ style }) => (
  <svg
    style={{ style }}
    width="29"
    height="21"
    viewBox="0 0 31 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0H28"
      transform="translate(1.5 1.5)"
      stroke="#0D2946"
      strokeWidth="2"
      strokeLinecap="square"
    />
    <path
      d="M0.5 1.5H28.5"
      transform="translate(1 10)"
      stroke="#0D2946"
      strokeWidth="2"
      strokeLinecap="square"
    />
    <path
      d="M0.5 1.5H28.5"
      transform="translate(1 20)"
      stroke="#0D2946"
      strokeWidth="2"
      strokeLinecap="square"
    />
  </svg>
);

const DocumentationLink = props => <Link to="/faq" {...props} />;
const MyProjectsLink = props => <Link to="/projects" {...props} />;

const Background = styled.div`
  align-self: center;
  z-index: 2;
`;
const BackgroundImage = styled.div`
  background-image: url('${props => props.img}');
  background-color: rgba(255, 255, 253, 0.8) !important;
  background-blend-mode: color;
  color: black;
`;

const StyledToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: space-between;
    color: #0d2946;
    @media (min-width: 768px) {
      padding-right: 24px;
      padding-left: 24px;
      width: ${({ width }) => (width ? width : '80%')};
      margin: auto;
    }
  }
`;

class RequestAppBar extends Component {
  state = { drawer: false };
  render() {
    const { drawer } = this.state;
    const { style, buttons: Buttons, contrast } = this.props;
    return (
      <AppBar style={style} position="static" elevation={0}>
        <Drawer
          elevation={2}
          style={{
            background: 'linear-gradient(180deg, #f5f6fa 52.26%, #fefefe 100%)',
            color: '#0D2946',
          }}
          variant="persistent"
          anchor="right"
          open={drawer}
        >
          <SpaceBetween>
            <HomeButton />
            <div onClick={() => this.setState({ drawer: false })}>x</div>
          </SpaceBetween>
          <Buttons />
        </Drawer>
        <StyledToolbar>
          <HomeButton />
          <Media query="(max-width: 768px)">
            {matches =>
              matches ? (
                <IconButton
                  onClick={() => this.setState({ drawer: true })}
                  color="inherit"
                  aria-label="Menu"
                >
                  <Hamburger />
                </IconButton>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    color: contrast ? 'white' : 'inherit',
                  }}
                >
                  <Buttons />
                </div>
              )
            }
          </Media>
        </StyledToolbar>
      </AppBar>
    );
  }
}

export default props => {
  return (
    <Background>
      <RequestAppBar {...props} buttons={NavButtons} />
    </Background>
  );
};

export const SimpleAppBar = () => (
  <Center>
    <HomeButton />
  </Center>
);

const NavButtons = () => (
  <Fragment>
    <Button color="inherit" component={MyProjectsLink}>
      My Projects
    </Button>
    <Button
      color="inherit"
      component={DocumentationLink}
      style={{ marginRight: '1rem' }}
    >
      Documentation
    </Button>
  </Fragment>
);

export const AppBarImage = ({ img, children, ...props }) => {
  return (
    <BackgroundImage img={img}>
      <RequestAppBar
        {...props}
        style={{ marginTop: '2rem' }}
        buttons={NavButtons}
      />
      {children}
    </BackgroundImage>
  );
};
