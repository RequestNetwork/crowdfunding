import React, { Component } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router';
import { H1, H2 } from '../../components/H';
import { Loader } from '../../components/Loader';
import gql from 'graphql-tag';
import { Wizard } from './Wizard';
import { StyledForm, StyledFormHeader } from '../../components/Forms';
import { ProjectSchema } from './validators';
const web3 = require('web3');

const projectValues = {
  amount: '',
  category: 'Personal',
  description: '',
  logoUrl: '',
  paymentAddress: '',
  projectImageUrl: '',
  title: '',
  txHash: '',
};

const CREATE_PROJECT = gql`
  mutation createProject(
    $title: String!
    $paymentAddress: String!
    $amount: String!
    $category: String!
  ) {
    createProject(
      title: $title
      paymentAddress: $paymentAddress
      amount: $amount
      category: $category
    ) @client {
      id
      title
    }
  }
`;

const Error = styled.div`
  color: red;
`;

export const transformAmountToWei = values =>
  Object.assign({}, values, {
    amount: web3.utils.toWei(values.amount, 'ether'),
  });

export class Onboarding extends Component {
  state = {
    submitted: false,
    id: '',
  };

  handleSubmit = async ({ createProject, values }) => {
    const valuesWithWeiAmount = transformAmountToWei(values);
    const response = await createProject({ variables: valuesWithWeiAmount });
    this.setState({
      submitted: true,
      id: response.data.createProject.id,
    });
  };

  render() {
    const { submitted, id } = this.state;
    if (submitted) {
      return <Redirect to={`/project/${id}`} />;
    }

    return (
      <Mutation mutation={CREATE_PROJECT}>
        {(createProject, { error, loading }) => {
          return (
            <StyledForm>
              <StyledFormHeader>
                <H1 align="center">Let’s initiate your fundraising project</H1>
                <H2>Fill out the form to get started</H2>
              </StyledFormHeader>
              <div>
                {error && <Error>{error.message}</Error>}
                {loading && <Loader />}
                <Formik
                  validationSchema={ProjectSchema}
                  onSubmit={values =>
                    this.handleSubmit({ createProject, values })
                  }
                  initialValues={{ ...projectValues }}
                  component={Wizard}
                />
              </div>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}
