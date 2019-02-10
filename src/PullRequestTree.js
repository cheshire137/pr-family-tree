import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Flash, Box, Heading, Label } from '@primer/components';

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
            <Box
              p={2}
              m={2}
              key={pull.id}
            >
              <Heading
                fontSize={2}
                mb={1}
              >{pull.title}</Heading>
              <div>
                {pull.repository.nameWithOwner}
                <span> &middot; </span>
                <Label outline>{pull.baseRefName}</Label> &larr; <Label outline>{pull.headRefName}</Label>
              </div>
            </Box>
          ))}
        </div>
      );
    }}
  </Query>
);

export default Tree;
