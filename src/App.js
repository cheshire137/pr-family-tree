import React, { Component } from 'react';
import './App.css';
import Tree from './Tree';
import GitHubLogin from './GitHubLogin';

const githubTokenKey = 'github-token'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { token: localStorage.getItem(githubTokenKey) || '' }
  }

  onTokenChange = token => {
    localStorage.setItem(githubTokenKey, token)
    this.setState(prevState => ({ token }))
  }

  logout = event => {
    event.target.blur()
    localStorage.removeItem(githubTokenKey)
    this.setState(prevState => ({ token: '' }))
  }

  render() {
    const { token } = this.state
    const loggedIn = typeof token === 'string' && token.length > 0

    return (
      <div className="App">
        {loggedIn ? (
          <button
            type="button"
            onClick={this.logout}
          >Log out</button>
        ) : null}
        <header className="App-header">
          {loggedIn ? (
            <Tree />
          ) : (
            <GitHubLogin
              onTokenChange={this.onTokenChange}
              token={token}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
