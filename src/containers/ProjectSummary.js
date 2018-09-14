import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Center } from '../components/Center';
import { Flex } from '../components/Flex';
import { H2 } from '../components/H';
import Media from 'react-media';
import styled from 'styled-components';

const styles = {
  card: {
    height: 150,
    marginBottom: '2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const Bold = styled.span`
  font-weigth: 600;
`;

export const EmptyAmountSection = () => (
  <Typography align="center" component="p">
    Amount to raise to raise <Bold>XX</Bold> ETH
  </Typography>
);
export const AmountSection = ({ amount }) => (
  <Typography align="center" component="p">
    Amount to raise to raise {parseInt(amount, 10) / Math.pow(10, 18)} ETH
  </Typography>
);

function ProjectCard({
  component: button,
  subComponent: amount,
  title,
  ...props
}) {
  const { classes } = props;

  return (
    <Media query="(min-width: 768px)">
      {matches =>
        matches ? (
          <Card elevation={0} className={classes.card}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                flexWrap: 'wrap',
              }}
            >
              <Flex>
                <H2>{title}</H2>
                {amount}
              </Flex>
              <Center>{button}</Center>
            </div>
          </Card>
        ) : (
          <Card style={{ marginBottom: '1rem' }} elevation={0}>
            <CardHeader title={title} />
            <CardContent>{amount}</CardContent>
            {button}
          </Card>
        )
      }
    </Media>
  );
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const ProjectSummary = withStyles(styles)(ProjectCard);
