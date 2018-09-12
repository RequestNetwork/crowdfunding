import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Loader } from '../../../../components/Loader';

const GET_PUBLISHED_MUTATION = gql`
  mutation getPublished($projectId: ID!, $url: String!) {
    getPublished(projectId: $projectId, url: $url) {
      email
    }
  }
`;

export class GetPublished extends Component {
  render() {
    const { projectId } = this.props;
    return (
      <Mutation mutation={GET_PUBLISHED_MUTATION}>
        {(getPublished, { data, error, loading }) => {
          if (error) return <div>There was an error</div>;
          if (loading) return <Loader />;

          return (
            <Button
              variant="raised"
              onClick={() =>
                getPublished({
                  variables: { projectId, url: window.location.origin },
                })
              }
              color="primary"
              style={{ marginBottom: '2rem' }}
            >
              {data ? 'Check Your Mail' : 'Get Verified'}
            </Button>
          );
        }}
      </Mutation>
    );
  }
}
