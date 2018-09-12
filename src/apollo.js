import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { uuidv4 } from './utils';
import { persistCache } from 'apollo-cache-persist';

import gql from 'graphql-tag';

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: window.localStorage,
});

const resolvers = {
  Mutation: {
    updateProject: (_, { id, ...rest }, { cache, getCacheKey }) => {
      const __typename = 'Project';
      const cacheId = getCacheKey({ __typename, id: id });
      const fragment = gql`
        fragment updateDescription on Project {
          description
          title
          logoUrl
          projectImageUrl
        }
      `;
      const project = cache.readFragment({ fragment, id: cacheId });
      const data = { ...project, ...rest, __typename };
      cache.writeData({ id: cacheId, data });
      return { ...rest, __typename };
    },
    createProject: (
      _,
      { paymentAddress, title, amount, category },
      { cache }
    ) => {
      const __typename = 'Project';
      const newProject = {
        amount,
        category,
        description: '',
        id: uuidv4(),
        isPublished: false,
        logoUrl: '',
        paymentAddress,
        projectImageUrl: '',
        isOwner: true,
        title,
        txHash: '',
        __typename,
      };
      const data = {
        project: newProject,
      };
      cache.writeData({ data });
      return newProject;
    },
  },
};

const stateLink = withClientState({
  resolvers,
  cache,
});

export const client = new ApolloClient({
  cache,

  link: stateLink,
});
