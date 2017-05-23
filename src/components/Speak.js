import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class Speak extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voices: [],
      currentVoiceA: null,
      currentVoiceB: null,
      volume: 1,
      pitch: 0.9,
      rate: 0.9,
      clearable: true,
    }
  }
  componentDidMount() {
    // Fetch the available voices asynchronously
  	this.setState({voices: speechSynthesis.getVoices()})
  }

  handleVolume(e) {
    e.preventDefault()
    if (e) {
      this.setState({
        volume: e.target.value
      })
      if (this.props.callback && typeof this.props.callback === 'function') {
        this.props.volCallback({ volume: e.target.value })
      }
    }
  }

  onChange(e) {
    if (e) {
      if (this.props.character === 1) {
        this.setState({
          currentVoiceA: e.value,
        })
        if (this.props.callback && typeof this.props.callback === 'function') {
          this.props.voiceCallback({ voice: e.value })
        }
      } else { // for now there are just two voices, need to figure out how to handle Harry Potter
        this.setState({
          currentVoiceB: e.value,
        })
        if (this.props.callback && typeof this.props.callback === 'function') {
          this.props.voiceCallback({ voice: e.value })
        }
      }
    }
  }

  render() {
    return (
      <div className='speech-form-container'>
        { this.state.voices && this.state.voices.length > 0 ?
        <Select
          placeholder='Select a voice'
          options={this.state.voices.map( voice => ({
            value: voice.lang,
            label: voice.name + ' ' + voice.lang,
          }))}
          value={this.state.currentVoiceA || this.state.currentVoiceB}
          clearable={this.state.clearable}
          onChange={e => this.onChange(e)}
        />
        :
        ''
        }
        <div className='controls'>
          <label className='label'>Volume</label>
          <input type='range'  min='0' max='1' step='0.1' value={this.state.volume} onChange={(e) => this.handleVolume(e)}/>
          <label className='label'>Rate</label>
          <input type='range'  min='0' max='1' step='0.1' ref='rate' id='rate'/>
          <label className='label'>Pitch</label>
          <input type='range'  min='0' max='1' step='0.1' ref='pitch' id='pitch'/>
        </div>
      </div>
   )
  }
}
export default Speak
