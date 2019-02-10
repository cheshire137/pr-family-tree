import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Flash } from '@primer/components';

const Tree = () => (
  <Query
    query={gql`
      {
        viewer {
          pullRequests(first: 100, states: [OPEN], orderBy: { field: UPDATED_AT, direction: DESC }) {
            nodes {
              id
              title
              headRefName
              baseRefName
              repository {
                nameWithOwner
              }
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        return (
          <Flash
            scheme="red"
          >{error.message}</Flash>
        );
      }

      return (
        <div>
          {data.viewer.pullRequests.nodes.map(pull => (
            <div key={pull.id}>
              {pull.title}
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default Tree;
