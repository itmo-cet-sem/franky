import React, { Component } from 'react';
import { Chip, Avatar } from '@material-ui/core';
import './TagChip.css';

class TagChip extends Component {
  render() {
    const { tag, value } = this.props;

    return (
      <Chip
        avatar={<Avatar className="tag-chip__value">{value}%</Avatar>}
        label={tag}
        variant="outlined"
        className="tag-chip"
        color="primary"
      />
    );
  }
}

export default TagChip;