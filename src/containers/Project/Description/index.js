import React from 'react';
import { Query } from 'react-apollo';
import { Descriptor } from './Descriptor';
import { StyledColumn } from '../components';
import { GET_PROJECT } from '../Edit';
import Button from '@material-ui/core/Button';
import { AddIcon, EditIcon } from './icons';
import styled from 'styled-components';
import { Center } from '../../../components/Center';

import { Loader } from '../../../components/Loader';

const StyledCenter = styled(Center)`
  padding-top: 2rem;
`;

const DescriptorButton = styled(Button)`
  & > span {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
`;

const ButtonDescription = styled.div`
  margin-top: 1rem;
`;

const DescriptionContainer = styled.div`
  p,
  span,
  h1,
  h2,
  h3 {
    font-family: Roboto;
    color: #282828;
  }
  p,
  span {
    line-height: 2rem;
  }
  img {
    width: 100%;
    height: 50%;
  }
  a {
    color: #5392ff;
    font-weight: 500;
  }
  iframe {
    height: 350px
    width: 100%;
  }
`;

export const EditSection = ({ description, projectId }) => {
  if (!!description) {
    return (
      <Descriptor description={description} projectId={projectId}>
        <StyledCenter>
          <DescriptorButton>
            <EditIcon />
            <ButtonDescription>Edit the presentation</ButtonDescription>
          </DescriptorButton>
        </StyledCenter>
      </Descriptor>
    );
  }

  return (
    <Descriptor description={description} projectId={projectId}>
      <StyledCenter>
        <DescriptorButton>
          <AddIcon />
          <ButtonDescription>Add a detailed presentation</ButtonDescription>
        </DescriptorButton>
      </StyledCenter>
    </Descriptor>
  );
};

export const Description = ({ project, children }) => (
  <Query query={GET_PROJECT} variables={{ id: project.id }}>
    {({ data, loading }) => {
      if (loading) {
        return <Loader />;
      }
      return (
        <StyledColumn>
          <DescriptionContainer>
            <div
              dangerouslySetInnerHTML={{ __html: project.description || '' }}
            />
          </DescriptionContainer>
          {children}
        </StyledColumn>
      );
    }}
  </Query>
);
