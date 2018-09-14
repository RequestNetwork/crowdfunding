import React, { Fragment } from 'react';
import AppBar, { SimpleAppBar } from '../components/AppBar';
import { Footer } from './Footer';
import { Project as ProjectEdit } from './Project/Edit';
import { Project as ProjectView } from './Project/View';
import { MyProjects as ProjectList } from './MyProjects';
import { Home } from './Home';
import { Route } from 'react-router-dom';
import { Onboarding } from './Onboarding';
import styled from 'styled-components';
import { FAQ } from './FAQ';

const ContainerBase = styled.div`
  display: grid;
  grid-template-columns: 100%;
  min-height: 700px;
`;

const HomeContainer = styled(ContainerBase)`
  grid-template-rows: 170px minmax(calc(100vh - 170px), min-content) 1fr;
  @media (max-width: 768px) {
    height: 100vh;
    grid-template-rows: 1fr 5fr 1fr;
    min-height: 400px;
  }
`;

const FormContainer = styled(ContainerBase)`
  grid-template-rows: 150px minmax(calc(100vh - 150px), min-content) 1fr;
  @media (max-width: 768px) {
    min-height: unset;
    grid-template-rows: 1fr 4fr;
  }
`;

const ProjectContainer = styled(ContainerBase)`
  grid-template-rows: 340px minmax(calc(100vh - 340px), min-content) 1fr;
  @media (max-width: 768px) {
    grid-template-rows: 250px minmax(calc(100vh - 250px), min-content) 1fr;
  }
`;

export const Main = ({ requestNetwork }) => (
  <Fragment>
    <Route
      path="/onboarding/*"
      render={props => (
        <FormContainer>
          <SimpleAppBar />
          <Onboarding {...props} />
        </FormContainer>
      )}
    />
    <Route
      exact
      path="/project/:id"
      component={props => (
        <ProjectContainer>
          <ProjectEdit {...props} requestNetwork={requestNetwork} />
          <Footer />
        </ProjectContainer>
      )}
    />
    <Route
      exact
      path="/project/published/:id"
      component={props => (
        <ProjectContainer>
          <ProjectView {...props} requestNetwork={requestNetwork} />
          <Footer />
        </ProjectContainer>
      )}
    />
    <Route
      exact
      path="/projects"
      component={props => (
        <HomeContainer>
          <AppBar />
          <ProjectList />
          <Footer />
        </HomeContainer>
      )}
    />
    <Route
      exact
      path="/"
      component={props => (
        <HomeContainer>
          <AppBar contrast />
          <Home {...props} />
          <Footer />
        </HomeContainer>
      )}
    />
    <Route
      path="/faq/"
      render={props => (
        <FormContainer>
          <SimpleAppBar />
          <FAQ {...props} />
        </FormContainer>
      )}
    />
  </Fragment>
);
