import React, { Component } from 'react';
import { Button } from '@primer/components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class GitHubLogoutButton extends Component {
  logout = event => {
    event.target.blur()
    localStorage.removeItem('github-token')
    const newToken = ''
    this.props.onLogout(newToken)
  }

  render() {
    return (
      <Query
        query={gql`
          {
            viewer { login }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return null;

          return (
            <Button
              m={3}
              onClick={this.logout}
            >Log out {data.viewer.login}</Button>
          );
        }}
      </Query>
    );
  }
}

export default GitHubLogoutButton;
