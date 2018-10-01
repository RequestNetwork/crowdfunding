import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import { Description, EditSection } from './Description';
import { StyledArticle } from './components';
import { Header } from './Header';
import { MetaMaskLoader, Loader } from '../../components/Loader';
import { Link } from '../../components/Link';
import { SideBar } from './SideBar';
import { Publisher } from '@requestnetwork/react-components';
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';
import PublishSection from './SideBar/PublishSection';

export const GET_PROJECT = gql`
  query project {
    project @client {
      amount
      category
      description
      id
      isPublished
      logoUrl
      paymentAddress
      projectImageUrl
      title
      txHash
      isOwner
    }
  }
`;
export class Project extends Component {
  render() {
    const { requestNetwork } = this.props;
    return (
      <Query query={GET_PROJECT}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }
          if (!data) {
            return <div />;
          }
          return (
            <Fragment>
              <Header project={data.project} />
              <StyledArticle>
                <Description project={data.project}>
                  <EditSection
                    projectId={data.project.id}
                    description={data.project.description}
                  />
                </Description>
                <SideBar>
                  <Publisher
                    project={data.project}
                    component={PublishSection}
                  />
                </SideBar>
              </StyledArticle>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
