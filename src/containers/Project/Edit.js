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
import { Publisher } from './SideBar/Publisher';
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';

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
export const DisabledButton = ({ children }) => (
  <Button
    variant="raised"
    disabled
    color="primary"
    style={{
      marginTop: '1rem',
      marginBottom: '3rem',
    }}
  >
    {children}
  </Button>
);

const Flex = styled.div`
  display: flex;
  margin-bottom: 1rem;
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
                    requestNetwork={requestNetwork}
                    project={data.project}
                  >
                    {({
                      ready,
                      publish,
                      message,
                      finished,
                      broadcasting,
                      txHash,
                      mining,
                    }) => {
                      if (broadcasting) {
                        return (
                          <DisabledButton>
                            <MetaMaskLoader />
                          </DisabledButton>
                        );
                      }
                      const PublishedLink = props => (
                        <Link to={`/project/published/${txHash}`} {...props} />
                      );
                      if (mining) {
                        return (
                          <Flex>
                            <Loader size={50} style={{ marginRight: '1rem' }} />
                            <div>
                              Please wait while your links are being generated
                            </div>
                          </Flex>
                        );
                      }
                      if (finished) {
                        return (
                          <Fragment>
                            <Clipboard
                              style={{ all: 'unset' }}
                              data-clipboard-text={`${
                                window.location.origin
                              }/project/published/${txHash}`}
                            >
                              <Button
                                variant="raised"
                                color="primary"
                                fullWidth
                              >
                                COPY URL
                              </Button>
                            </Clipboard>
                            <Button
                              disabled={!finished}
                              variant="raised"
                              color="primary"
                              component={PublishedLink}
                              fullWidth
                              style={{ height: '3rem', marginTop: '1rem' }}
                            >
                              Go to Project
                            </Button>
                          </Fragment>
                        );
                      }

                      return (
                        <Button
                          variant="raised"
                          color="primary"
                          disabled={!ready}
                          style={{ marginBottom: '3rem' }}
                          onClick={publish}
                        >
                          {message}
                        </Button>
                      );
                    }}
                  </Publisher>
                </SideBar>
              </StyledArticle>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
