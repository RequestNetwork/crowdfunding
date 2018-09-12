import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { EditIcon } from '../components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TITLE_MUTATION = gql`
  mutation updateProject($id: String!, $title: String!) {
    updateProject(id: $id, title: $title) @client {
      title
    }
  }
`;

const IconButton = styled(Button)`
  && {
    min-width: 60px;
  }
`;

const Div = styled.div`
  display: flex;
  min-height: 4rem;
  align-items: center;
`;
export class Title extends React.Component {
  state = {
    edit: false,
    newTitle: this.props.title,
  };
  render() {
    const { component: DefaultComponent, title, projectId } = this.props;
    return (
      <Mutation
        mutation={TITLE_MUTATION}
        variables={{ title: this.state.newTitle, id: projectId }}
      >
        {updateTitle => (
          <Div>
            {this.state.edit ? (
              <Fragment>
                <TextField
                  defaultValue={this.props.title}
                  onChange={({ target: { value } }) =>
                    this.setState({ newTitle: value })
                  }
                  InputProps={{ disableUnderline: true }}
                />
                <IconButton
                  onClick={() => {
                    updateTitle();
                    this.setState({ edit: false });
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Fragment>
            ) : (
              <Fragment>
                <DefaultComponent>{title}</DefaultComponent>
                <IconButton
                  onClick={() => this.setState(({ edit }) => ({ edit: !edit }))}
                >
                  <EditIcon />
                </IconButton>
              </Fragment>
            )}
          </Div>
        )}
      </Mutation>
    );
  }
}
