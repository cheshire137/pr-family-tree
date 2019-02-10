import React, { Component } from 'react';
import { Box, Heading, Link, Text, Label } from '@primer/components';

class PullRequest extends Component {
  render() {
    const { pull } = this.props

    return (
      <Box
        p={2}
        m={2}
      >
        <Heading
          fontSize={2}
          mb={1}
        >
          <Link href={pull.resourcePath}>{pull.title}</Link>
        </Heading>
        <div>
          <Text
            fontSize={1}
          >{pull.repository.nameWithOwner}</Text>
          <span> &middot; </span>
          <Label outline>{pull.baseRefName}</Label> &larr; <Label outline>{pull.headRefName}</Label>
        </div>
      </Box>
    );
  }
}

export default PullRequest;
