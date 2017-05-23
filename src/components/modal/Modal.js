import React, { Component } from 'react'

import './css/modal.css'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  close(e) {
    if (e) {
      e.preventDefault()
    }

    this.setState({ isOpen: false })
    document.body.classList.remove('no-scroll')
  }

  open() {
    this.setState({ isOpen: true })
    document.body.classList.add('no-scroll')
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape)
    document.body.classList.remove('no-scroll')
  }

  handleEscape(e) {
    if (e.keyCode === 27) {
      this.close(e)
    }
  }

  render() {
    const that = this
    const headerWithProps = React.Children.map(this.props.header,
     child => React.cloneElement(child, {
       close: that.close,
     })
    )
    const bodyWithProps = React.Children.map(this.props.children || this.props.body,
     child => React.cloneElement(child, {
       close: that.close,
     })
    )
    return (
      <div>
        <button
          id={this.props.buttonId}
          className={this.props.buttonClass}
          onClick={this.open}
          title={this.props.buttonText}
          disabled={this.props.buttonDisabled}
        >
          {this.props.buttonIcon ? this.props.buttonIcon : '' }
          <span className='button-text'>
            {this.props.buttonText}
          </span>
        </button>
        { this.state.isOpen &&
          <div className='modal-container'>
            <div className={ this.state.isOpen ? 'open' : 'closed' }>
              <div className='modal'>
                { this.props.noChrome ? (
                  <div>
                    { bodyWithProps }
                  </div>
                ) : (
                  <div className={this.props.styleWrapper}>
                    <div className='header'>
                      {headerWithProps}
                    </div>
                    <div className='body'>
                      {bodyWithProps}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Modal
