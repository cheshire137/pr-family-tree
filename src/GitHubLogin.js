import React, { Component } from 'react';

class GitHubLogin extends Component {
  constructor(props) {
    super(props)
    this.state = { token: props.token }
  }

  onTokenChange = event => {
    const token = event.target.value
    this.setState(prevState => ({ token }))
  }

  save = event => {
    event.preventDefault()
    const token = this.state.token.trim()
    this.props.onTokenChange(token)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.setState(prevState => ({ token: this.props.token }))
    }
  }

  render() {
    return (
      <form onSubmit={this.save}>
        <input
          type="text"
          required
          placeholder="GitHub personal access token"
          onChange={this.onTokenChange}
          value={this.state.token}
        />
        <button type="submit">
          Save
        </button>
      </form>
    );
  }
}

export default GitHubLogin;
