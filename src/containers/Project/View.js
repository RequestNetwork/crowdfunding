import React, { Component, Fragment } from 'react';
import { Description } from './Description';
import { StyledArticle } from './components';
import { Header } from './Header';
import { Loader } from '../../components/Loader';
import { SideBar } from './SideBar';
import { RequestInfo } from './SideBar/RequestInfo';
import { Backer } from './SideBar/Backer';

export class Project extends Component {
  state = {
    project: {},
    loading: false,
    total: 42,
    raised: 3.13,
    requestId: '',
  };
  async getRequest() {
    this.setState({ loading: true });
    const {
      match: {
        params: { id },
      },
      requestNetwork,
    } = this.props;
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
  }
  componentDidMount() {
    this.getRequest();
  }
  render() {
    const { requestNetwork } = this.props;
    const { project, loading, total, raised, requestId } = this.state;

    if (loading) {
      return <Loader />;
    }
    return (
      <Fragment>
        <Header project={project} />
        <StyledArticle>
          <Description project={project} />
          <SideBar project={project} requestNetwork={requestNetwork}>
            <RequestInfo total={total} raised={raised} currency="ETH" />
            <Backer requestId={requestId} requestNetwork={requestNetwork} />
          </SideBar>
        </StyledArticle>
      </Fragment>
    );
  }
}
