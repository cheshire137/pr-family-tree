import React, { Component } from 'react';
import { TextInput, Button, Box, Link, Text } from '@primer/components';

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
    localStorage.setItem('github-token', token)
    this.props.onTokenChange(token)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.setState(prevState => ({ token: this.props.token }))
    }
  }

  render() {
    return (
      <Box p={3}>
        <form onSubmit={this.save}>
          <Text
            is="label"
            fontSize={2}
            htmlFor="github-token"
          >GitHub personal access token:</Text>
          <TextInput
            type="text"
            required
            id="github-token"
            m={1}
            aria-label="GitHub personal access token"
            placeholder="Your token"
            onChange={this.onTokenChange}
            value={this.state.token}
          />
          <Button type="submit">
            Save
          </Button>
          <Text fontSize={1} is="p" color="gray.6">
            Generate a personal access token on GitHub at <Link target="_blank" href="https://github.com/settings/tokens">github.com/settings/tokens</Link>.
          </Text>
        </form>
      </Box>
    );
  }
}

export default GitHubLogin;
