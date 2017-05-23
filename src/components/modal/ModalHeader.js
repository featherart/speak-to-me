import React from 'react'

import './css/modal-header.css'

const ModalHeader = ({ title, close, noClose }) =>
  <div className='modal-header'>
    <div className='title'>{ title }</div>
    { noClose ?
      '' :
      <div className='close-x' onClick={close}></div>
    }
  </div>

export default ModalHeader
