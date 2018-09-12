import Button from '@material-ui/core/Button';
import React from 'react';
import { AppBarImage } from '../../../components/AppBar';
import styled from 'styled-components';
import { Center } from '../../../components/Center';
import { Loader } from '../../../components/Loader';
import BackgroundImage from '../background.png';
import gql from 'graphql-tag';
import { H1, H2 } from '../../../components/H';
import { CameraIcon } from '../components';
import Paper from '@material-ui/core/Paper';
import { ImageUploader } from './ImageUploader';
import red from '@material-ui/core/colors/red';
import Media from 'react-media';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Title } from './Title';

const Separator = styled.div`
  border-bottom: 1px solid #e3e3e3;
  width: 100%;
`;

const Error = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${red[400]};
`;

const BrandLogoContainer = styled(Paper)`
  && {
    background-image: url(${({ logoUrl }) => logoUrl});
    width: 205px;
    height: 205px;
    background-size: cover;
    background-position: top center;
    border-radius: 50%;
    position: relative;
    top: 1rem;
    @media (max-width: 768px) {
      width: 110px;
      height: 110px;
    }
  }
`;

const ProjectHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
`;

const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LogoContent = styled(Center)`
  position: absolute;
  width: 100%;
`;

const UPDATE_PROJECT_IMAGE = gql`
  mutation updateProject($id: String!, $image: String!) {
    updateProject(id: $id, projectImageUrl: $image) @client {
      projectImageUrl
    }
  }
`;

const UPDATE_PROJECT_LOGO = gql`
  mutation updateProject($id: String!, $image: String!) {
    updateProject(id: $id, logoUrl: $image) @client {
      logoUrl
    }
  }
`;

const Input = styled.input`
  height: 100%;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  z-index: 20;
`;

const ProjectImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProjectImageUpload = ({ projectId }) => (
  <ImageUploader
    sizeLimit={1}
    projectId={projectId}
    mutation={UPDATE_PROJECT_IMAGE}
  >
    {({ handleFileUpload, loading, error, message }) => {
      if (loading) return <Loader />;
      return (
        <ProjectImageContainer>
          <input
            id="upload-image-file"
            accept="image/*,.gif"
            style={{ display: 'none' }}
            type="file"
            onChange={({ target: { files } }) => handleFileUpload(files[0])}
          />
          <label htmlFor="upload-image-file">
            <Button
              component="span"
              style={{ fontWeight: 'bold', fontSize: 16 }}
            >
              <CameraIcon style={{ marginRight: '1rem' }} />
              {error ? <Error>{message}</Error> : 'Upload cover photo'}
            </Button>
          </label>
        </ProjectImageContainer>
      );
    }}
  </ImageUploader>
);

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrandLogo = ({ project, editable }) => (
  <ImageUploader
    sizeLimit={1}
    projectId={project.id}
    mutation={UPDATE_PROJECT_LOGO}
  >
    {({ handleFileUpload, loading, error, message }) => {
      if (loading)
        return (
          <BrandLogoContainer logoUrl={project.logoUrl}>
            <Loader />
          </BrandLogoContainer>
        );

      return (
        <BrandLogoContainer logoUrl={project.logoUrl}>
          <LogoContent>
            {editable && (
              <Input
                id="upload-logo-file"
                accept="image/*"
                type="file"
                onChange={({ target: { files } }) => handleFileUpload(files[0])}
              />
            )}
            {!project.logoUrl &&
              editable && (
                <Column htmlFor="upload-logo-file">
                  <Button component="span">
                    <CameraIcon style={{ width: 35, height: 35 }} />
                    {error && <Error>{message}</Error>}
                  </Button>
                </Column>
              )}
          </LogoContent>
        </BrandLogoContainer>
      );
    }}
  </ImageUploader>
);

const ProjectDetails = styled.div`
  display: grid;
  width: 80%;
  grid-gap: 2rem;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: 0.5fr 2.5fr 1.5fr;
`;

const ResponsiveProjectDetails = styled(ProjectDetails)`
  grid-template-columns: 1fr 1fr;
  grid-gap: unset;
`;

export const ProjectHeader = ({ project, editable = true }) => (
  <ProjectHeaderContainer>
    <Media query="(min-width: 768px)">
      {matches =>
        matches ? (
          <ProjectDetails>
            <BrandLogo project={project} editable={editable} />
            <ProjectInfoContainer>
              {editable ? (
                <Title
                  component={H1}
                  title={project.title}
                  projectId={project.id}
                />
              ) : (
                <H1>{project.title}</H1>
              )}
              <H2>{project.category}</H2>

              <Tabs value={0}>
                <Tab label="About" />
              </Tabs>
            </ProjectInfoContainer>
            {editable && <ProjectImageUpload projectId={project.id} />}
          </ProjectDetails>
        ) : (
          <ResponsiveProjectDetails>
            <BrandLogo project={project} editable={editable} />
            <div>
              <ProjectInfoContainer>
                <H1 style={{ fontSize: 14 }}>{project.title}</H1>
                <H2 style={{ fontSize: 12 }}>{project.category}</H2>
                <Tabs value={0}>
                  <Tab label="About" />
                </Tabs>
              </ProjectInfoContainer>
            </div>
          </ResponsiveProjectDetails>
        )
      }
    </Media>
    <Separator />
  </ProjectHeaderContainer>
);

export const Header = ({ project, ...props }) => (
  <AppBarImage {...props} img={project.projectImageUrl || BackgroundImage}>
    <ProjectHeader project={project} />
  </AppBarImage>
);

export const ViewHeader = ({ project, children, ...props }) => (
  <AppBarImage {...props} img={project.projectImageUrl || BackgroundImage}>
    <ProjectHeader project={project} editable={false} />
  </AppBarImage>
);
