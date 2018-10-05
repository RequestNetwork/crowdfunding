import React, { Component, Fragment } from 'react';
import { Description } from './Description';
import { StyledArticle } from './components';
import { ViewHeader } from './Header';
import { Loader } from '../../components/Loader';
import { SideBar } from './SideBar';
import { RequestInfo } from './SideBar/RequestInfo';
import { Backer } from '@requestnetwork/crowdfunding-react-components';
import BackerSection from './SideBar/BackerSection';

export class Project extends Component {
  state = {
    project: {},
    loading: false,
    error: false,
    total: 42,
    raised: 3.13,
    requestId: '',
  };
  getRequest = async () => {
    this.setState({ loading: true });
    const {
      match: {
        params: { id },
      },
      requestNetwork,
    } = this.props;

    try {
      const {
        request: {
          data: { data: project },
          payee: { expectedAmount, balance },
          requestId,
        },
      } = await requestNetwork.get({ hash: id });
      this.setState({
        project: project,
        loading: false,
        total: expectedAmount,
        raised: balance,
        requestId,
      });
    } catch (e) {
      setTimeout(this.getRequest, 1000);
    }
  };
  componentDidMount() {
    this.getRequest();
  }
  render() {
    const {
      project: userProject,
      loading,
      total,
      raised,
      requestId,
    } = this.state;
    const projectTemplate = {
      description: '',
      projectImageUrl: '',
    };
    const project = { ...projectTemplate, ...userProject };

    if (loading) {
      return (
        <Fragment>
          <ViewHeader project={project} />
          <StyledArticle>
            <Loader />
            <SideBar>
              <div />
            </SideBar>
          </StyledArticle>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <ViewHeader project={project} />
        <StyledArticle>
          <Description project={project} />
          <SideBar>
            <RequestInfo total={total} raised={raised} currency="ETH" />
            <Backer requestId={requestId} component={BackerSection} />
          </SideBar>
        </StyledArticle>
      </Fragment>
    );
  }
}
