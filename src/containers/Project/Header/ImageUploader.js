import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

export class ImageUploader extends Component {
  state = {
    loading: false,
    error: false,
    message: '',
  };

  isValidSize = size => {
    const { sizeLimit } = this.props;

    if (size / 1024 / 1024 < sizeLimit) {
      return true;
    }
    return false;
  };

  addFile = async (updateProject, file, projectId) => {
    this.setState({ loading: true, error: false });
    if (!this.isValidSize(file.size)) {
      return this.setState({
        error: true,
        message: `Image should be under ${this.props.sizeLimit}MB`,
        loading: false,
      });
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      await updateProject({
        variables: { image: reader.result, id: projectId },
      });
      this.setState({ loading: false });
    };
    reader.onerror = error => {
      this.setState({ error: true });
      console.log('Error: ', error);
    };
  };

  render() {
    const { mutation, projectId } = this.props;
    const { loading: isLoading, error, message } = this.state;
    return (
      <Mutation mutation={mutation}>
        {updateProject => {
          return this.props.children({
            handleFileUpload: file =>
              this.addFile(updateProject, file, projectId),
            loading: isLoading,
            error,
            message,
          });
        }}
      </Mutation>
    );
  }
}
