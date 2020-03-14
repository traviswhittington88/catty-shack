import React, { Component } from 'react'

export class Tooltip extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { tooltiptext } = this.props
    return (
      <div className="tooltip">
        <span className="tooltiptext">{tooltiptext}</span>
      </div>
    )
  }
}

export default Tooltip
