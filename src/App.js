import React, { Component } from 'react';
import PullRequestTree from './PullRequestTree';
import {BaseStyles} from '@primer/components';
import './App.css';
import GitHubLogin from './GitHubLogin';
import GitHubLogoutButton from './GitHubLogoutButton';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { token: localStorage.getItem('github-token') || '' }
  }

  onTokenChange = token => {
    this.setState(prevState => ({ token }))
  }

  render() {
    const { token } = this.state
    const loggedIn = typeof token === 'string' && token.length > 0

    return (
      <BaseStyles>
        <div className="App">
          {loggedIn ? (
            <GitHubLogoutButton
              onLogout={this.onTokenChange}
            />
          ) : null}
          <header className="App-header">
            {loggedIn ? (
              <PullRequestTree />
            ) : (
              <GitHubLogin
                onTokenChange={this.onTokenChange}
                token={token}
              />
            )}
          </header>
        </div>
      </BaseStyles>
    );
  }
}

export default App;
