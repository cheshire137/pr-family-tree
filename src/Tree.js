import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Tree = () => (
  <Query
    query={gql`
      {
        viewer { login }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <div>
          <p>viewer {data.viewer.login}</p>
        </div>
      );
    }}
  </Query>
);

export default Tree;
