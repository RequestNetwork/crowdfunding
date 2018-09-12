import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { H1, H2 } from '../components/H';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { ProjectSummary } from './ProjectSummary.js';
import styled from 'styled-components';

export const MY_PROJECT_QUERY = gql`
  query {
    me {
      staff
      projects {
        id
        title
        amount
        description
      }
    }
  }
`;

const ProjectList = ({ projects }) => (
  <Container>
    <H1 align="center">My Projects</H1>
    <Div>
      <ProjectSummary
        projectId={projects[0].id}
        title={projects[0].title}
        amount={projects[0].amount}
      />
    </Div>
  </Container>
);

const DRAFTS_QUERY = gql`
  query {
    drafts {
      title
      id
      amount
    }
  }
`;

const Div = styled.div`
  padding-top: 2rem;
`;

const UnPublished = () => (
  <Query fetchPolicy="network-only" query={DRAFTS_QUERY}>
    {({ data, loading }) => {
      if (loading) {
        return <Loader />;
      }
      const { drafts } = data;
      if (drafts.length <= 0) {
        return <H1 align="center">All projects have been published</H1>;
      }
      return (
        <Fragment>
          <H2 align="center">{drafts.length} unpublished projects</H2>
          <Div>
            {drafts.map(project => (
              <ProjectSummary
                style={{ marginBottom: '1rem' }}
                key={project.id}
                projectId={project.id}
                title={project.title}
                amount={project.amount}
              />
            ))}
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
        <Query query={MY_PROJECT_QUERY}>
          {({ data, loading, error }) => {
            if (error) {
              return <Error />;
            }
            if (loading) {
              return <Loader />;
            }
            if (!data) {
              return <div />;
            }
            const { me } = data;
            if (!me) {
              return <div />;
            }
            if (me.staff) {
              return (
                <Container>
                  <H1 align="center">Unpublished Projects</H1>
                  <UnPublished />
                </Container>
              );
            }
            if (me.projects.length === 0) {
              return <H1 align="center">You havent created any projects</H1>;
            }
            return <ProjectList projects={me.projects} />;
          }}
        </Query>
      </ScrollableDiv>
    );
  }
}
