import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '../components/Link';
import { Center } from '../components/Center';
import { Flex } from '../components/Flex';
import { H2 } from '../components/H';
import Media from 'react-media';

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

function ProjectCard({ projectId, title, amount, ...props }) {
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
                <Typography component="p">
                  Amount to raise to raise{' '}
                  {parseInt(amount, 10) / Math.pow(10, 18)} ETH
                </Typography>
              </Flex>
              <Center>
                <Link to={`/project/${projectId}`}>
                  <Button
                    style={{ width: 180 }}
                    color="primary"
                    variant="raised"
                  >
                    VIEW PROJECT
                  </Button>
                </Link>
              </Center>
            </div>
          </Card>
        ) : (
          <Card style={{ marginBottom: '1rem' }} elevation={0}>
            <CardHeader title={title} />
            <CardContent>
              <Typography align="center" component="p">
                Amount to raise to raise{' '}
                {parseInt(amount, 10) / Math.pow(10, 18)} ETH
              </Typography>
            </CardContent>
            <Link to={`/project/${projectId}`}>
              <Button
                fullWidth
                style={{ borderRadius: 'unset' }}
                color="primary"
                variant="raised"
              >
                VIEW PROJECT
              </Button>
            </Link>
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
