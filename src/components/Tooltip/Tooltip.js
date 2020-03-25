import React, { Component } from 'react';
import './Tooltip.css';

export default class Tooltip extends Component {
  render() {
    const { title, className, children } = this.props;
    return (
      <div className={className}>
        <span className='tooltiptext'>{title}</span>
        {children}
      </div>
    );
  }
}
