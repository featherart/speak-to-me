import React, { Component } from 'react'

class Character extends Component {
  constructor(props) {
    super(props)
    this.state = {
      character: null
    }
  }
  handleClick(e) {
    e.preventDefault()
    this.setState({
      character: parseInt(e.target.dataset.id, 10),
    })
    this.props.action()
  }
  render () {
    return(
      <div className='character'>
        <div className='spacer'> </div>
        <div
          data-id={this.props.character}
          className={this.props.characterHover && (this.state.character === this.props.character) ? 'highlight' : ''}
          onClick={(e) => this.handleClick(e)}>
          {this.props.name}
        </div>
        <div className='spacer'> </div>
      </div>
    )
  }

}

export default Character
