import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';
import { Formik, Field, Form } from 'formik';
import gql from 'graphql-tag';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject($id: String!, $description: String!) {
    updateProject(id: $id, description: $description) @client {
      description
    }
  }
`;

const Quill = styled(ReactQuill)`
  width: 100%;
  & > .ql-container,
  .ql-editor {
    min-height: 200px;
  }
`;
class Editor extends Component {
  handleChange = value => {
    this.props.form.setFieldValue('description', value.toString('markdown'));
  };
  render() {
    const toolbarOptions = [
      ['bold', 'italic', 'underline'],

      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ];
    return (
      <Quill
        modules={{ toolbar: toolbarOptions }}
        onChange={this.handleChange}
        value={this.props.value}
      />
    );
  }
}
const StyledForm = styled(Form)`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
  }
`;
const DescriptorForm = () => (
  <StyledForm>
    <Field
      name="description"
      render={({ field, ...props }) => <Editor {...field} {...props} />}
    />
    <StyledButton color="primary" variant="raised" type="submit">
      SAVE
    </StyledButton>
  </StyledForm>
);

export class Descriptor extends Component {
  state = {
    edit: false,
  };

  render() {
    const { edit } = this.state;
    const { description, projectId, children } = this.props;

    return (
      <Mutation mutation={UPDATE_PROJECT_MUTATION}>
        {updateProject => (
          <Fragment>
            {React.cloneElement(children, {
              onClick: () => this.setState(({ edit }) => ({ edit: !edit })),
            })}

            {edit && (
              <Formik
                onSubmit={values =>
                  updateProject({ variables: { ...values, id: projectId } })
                }
                component={DescriptorForm}
                initialValues={{
                  description: description || '',
                  id: projectId,
                }}
              />
            )}
          </Fragment>
        )}
      </Mutation>
    );
  }
}
