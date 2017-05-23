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
      if (this.props.volCallback && typeof this.props.volCallback === 'function') {
        this.props.volCallback({ volume: e.target.value })
      }
    }
  }

  handleRate(e) {
    e.preventDefault()
    if (e) {
      this.setState({
        rate: e.target.value
      })
      if (this.props.rateCallback && typeof this.props.rateCallback === 'function') {
        this.props.rateCallback({ rate: e.target.value })
      }
    }
  }

  handlePitch(e) {
    e.preventDefault()
    if (e) {
      this.setState({
        pitch: e.target.value
      })
      if (this.props.pitchCallback && typeof this.props.pitchCallback === 'function') {
        this.props.pitchCallback({ pitch: e.target.value })
      }
    }
  }

  onChange(e) {
    if (e) {
      if (this.props.character === 1) {
        this.setState({
          currentVoiceA: e.value,
        })
        if (this.props.voiceCallback && typeof this.props.voiceCallback === 'function') {
          this.props.voiceCallback({ voice: e.value })
        }
      } else { // for now there are just two voices, need to figure out how to handle Harry Potter
        this.setState({
          currentVoiceB: e.value,
        })
        if (this.props.voiceCallback && typeof this.props.voiceCallback === 'function') {
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
            value: voice.lang || voice.name,
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
          <input type='range'  min='0' max='1' step='0.1' value={this.state.volume} onChange={e => this.handleVolume(e)}/>
          <label className='label'>Rate</label>
          <input type='range'  min='0' max='1' step='0.1' value={this.state.rate} onChange={e => this.handleRate(e)}/>
          <label className='label'>Pitch</label>
          <input type='range'  min='0' max='1' step='0.1' value={this.state.pitch} onChange={e => this.handlePitch(e)}/>
        </div>
      </div>
   )
  }
}
export default Speak
