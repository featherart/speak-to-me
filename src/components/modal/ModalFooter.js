import React, { Component } from 'react'

import './css/modal-footer.css'

class ModalFooter extends Component {

  render() {
    return (
      <div className='modal-footer'>
        { this.props.children ?
          this.props.children : null
        }
        { this.props.buttonOneText ?
          <button
            onClick={this.props.buttonOneHandler}
            className={this.props.buttonOneClass ? this.props.buttonOneClass : 'modal-button-one'}>
            {this.props.buttonOneText}
          </button> : null
        }
        { this.props.buttonTwoText ?
          <button
            onClick={this.props.buttonTwoHandler}
            className={this.props.buttonTwoClass ? this.props.buttonTwoClass : 'modal-button-two'}>
            {this.props.buttonTwoText}
          </button> : null
        }
        { this.props.buttonThreeText ?
          <button
            onClick={this.props.buttonThreeHandler}
            className={this.props.buttonThreeClass ? this.props.buttonThreeClass : 'modal-button-three'}>
            {this.props.buttonThreeText}
          </button> : null
        }
        { this.props.buttonFourText ?
          <button
            onClick={this.props.buttonFourHandler}
            className={this.props.buttonFourClass ? this.props.buttonFourClass : 'modal-button-four'}>
            {this.props.buttonFourText}
          </button> : null
        }
      </div>
    )
  }
}


export default ModalFooter
