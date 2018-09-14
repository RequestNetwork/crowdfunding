import React, { Component, Fragment } from 'react';
import { Description } from './Description';
import { StyledArticle } from './components';
import { ViewHeader } from './Header';
import { Loader } from '../../components/Loader';
import { SideBar } from './SideBar';
import { RequestInfo } from './SideBar/RequestInfo';
import { Backer } from './SideBar/Backer';

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
    const { requestNetwork } = this.props;
    const { project, loading, total, raised, requestId } = this.state;

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
            <Backer requestId={requestId} requestNetwork={requestNetwork} />
          </SideBar>
        </StyledArticle>
      </Fragment>
    );
  }
}
