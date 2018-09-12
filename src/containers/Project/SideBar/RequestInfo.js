import React, { Component } from 'react';
import ProgressBar from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

const Div = styled.div`
  margin-bottom: 1rem;
`;

const Raised = styled.span`
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 24px;

  color: #0d2946;
`;

const Total = styled.span`
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 18px;
  color: #6b7c93;
`;

export class RequestInfo extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.project.isPublished) {
      return false;
    }
    if (
      !prevProps.requestNetwork.isReady &&
      this.props.requestNetwork.isReady
    ) {
      return this.getProjectRequest();
    }
  }

  render() {
    const { currency } = this.props;
    const total = parseInt(this.props.total.toString(), 10) / Math.pow(10, 18);
    const raised =
      parseInt(this.props.raised.toString(), 10) / Math.pow(10, 18);
    return (
      <Div>
        <Div>
          <Raised>
            {raised} {currency}{' '}
          </Raised>
          <Total>
            / {total} {currency} funded
          </Total>
        </Div>
        <ProgressBar variant="determinate" value={(raised / total) * 100} />
      </Div>
    );
  }
}
