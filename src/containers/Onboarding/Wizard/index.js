import { Form } from 'formik';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { StyledFormContent } from '../../../components/Forms';
import { ProjectStep } from './ProjectDetails';

export class Wizard extends Component {
  render() {
    const { isValid } = this.props;
    return (
      <Form>
        <StyledFormContent>
          <Route
            exact
            path="/onboarding/project"
            render={props => <ProjectStep isValid={isValid} {...props} />}
          />
        </StyledFormContent>
      </Form>
    );
  }
}
