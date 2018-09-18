import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { H1, H2 } from '../components/H';
import { Loader } from '../components/Loader';
import {
  ProjectSummary,
  AmountSection,
  EmptyAmountSection,
} from './ProjectSummary.js';
import styled from 'styled-components';
import { OnboardingLink } from './Home';
import Button from '@material-ui/core/Button';
import { Link } from '../components/Link';

// will be used to display users projects

const DRAFTS_QUERY = gql`
  query {
    project @client {
      title
      id
      amount
    }
  }
`;

const Div = styled.div`
  padding-top: 2rem;
  width: 768px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const UnPublished = () => (
  <Query query={DRAFTS_QUERY}>
    {({ data, loading }) => {
      const FILLER = 'xxxxxxxx';
      if (loading) {
        return <Loader />;
      }
      if (!data || !data.project)  {
        return (
          <Fragment>
            <H1 align="center">All projects have been published</H1>
            <Center>
              <Div>
                <ProjectSummary
                  title={FILLER}
                  subComponent={<EmptyAmountSection />}
                  component={
                    <Button
                      variant="raised"
                      color="primary"
                      component={OnboardingLink}
                      fullWidth
                      style={{ height: '3rem' }}
                    >
                      Create a new Project
                    </Button>
                  }
                />
              </Div>
            </Center>
          </Fragment>
        );
      }

      if (data.project.isPublished) {
        return (
          <Fragment>
            <H1 align="center">All projects have been published</H1>
            <Center>
              <Div>
                <ProjectSummary
                  title={FILLER}
                  subComponent={<EmptyAmountSection />}
                  component={
                    <Button
                      variant="raised"
                      color="primary"
                      component={OnboardingLink}
                      fullWidth
                      style={{ height: '3rem' }}
                    >
                      Create a new Project
                    </Button>
                  }
                />
              </Div>
            </Center>
          </Fragment>
        );
      }
      const { project } = data;
      return (
        <Fragment>
          <H2 align="center">You have 1 unpublished project</H2>
          <Div>
            <ProjectSummary
              style={{ marginBottom: '1rem' }}
              key={project.id}
              title={project.title}
              subComponent={<AmountSection amount={project.amount} />}
              component={
                <Link to={`/project/${project.id}`}>
                  <Button fullWidth color="primary" variant="raised">
                    VIEW PROJECT
                  </Button>
                </Link>
              }
              amount={project.amount}
            />
          </Div>
        </Fragment>
      );
    }}
  </Query>
);

const ScrollableDiv = styled.div`
  overflow-y: auto;
  display: flex;
  padding-top: 4rem;
  padding-bottom: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    width: 0px; /* remove scrollbar space */
    background: transparent; /* optional: just make scrollbar invisible */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export class MyProjects extends Component {
  render() {
    return (
      <ScrollableDiv>
        <Container>
          <UnPublished />
        </Container>
      </ScrollableDiv>
    );
  }
}
