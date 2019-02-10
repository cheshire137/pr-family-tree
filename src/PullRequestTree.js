import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Flash, Box, Heading, Label, Link, Text } from '@primer/components';
import PullRequest from './PullRequest';

const getBranchNames = pullRequests => {
  const branchNames = {}
  for (const pull of pullRequests) {
    branchNames[pull.headRefName] = 1
    branchNames[pull.baseRefName] = 1
  }
  return Object.keys(branchNames).sort()
}

const getPullRequestsByBaseBranch = pullRequests => {
  const dict = {}
  for (const pull of pullRequests) {
    if (!(pull.baseRefName in dict)) {
      dict[pull.baseRefName] = []
    }
    dict[pull.baseRefName].push(pull)
  }
  return dict
}

const PullRequestTree = () => (
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
              resourcePath
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

      const pullRequests = data.viewer.pullRequests.nodes
      const branchNames = getBranchNames(pullRequests)
      const pullRequestsByBranch = getPullRequestsByBaseBranch(pullRequests)

      return (
        <div>
          {branchNames.map(branchName => {
            const pullRequestsForBranch = pullRequestsByBranch[branchName] || []

            return (
              <Box key={branchName} p={2}>
                <Heading
                  fontSize={3}
                  mb={2}
                >{branchName}</Heading>
                {pullRequestsForBranch.map(pull => (
                  <PullRequest
                    key={pull.id}
                    pull={pull}
                  />
                ))}
              </Box>
            )
          })}
        </div>
      );
    }}
  </Query>
);

export default PullRequestTree;
