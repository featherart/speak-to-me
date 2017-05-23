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
      clearable: true,
    }
  }
  componentDidMount() {
    // Fetch the available voices.
  	this.setState({voices: speechSynthesis.getVoices()})
  }

  onChange(e) {
    if (e) {
      if (this.props.character === 1) {
        this.setState({
          currentVoiceA: e.value,
        })
        if (this.props.callback && typeof this.props.callback === 'function') {
          this.props.callback({ voice: e.value })
        }
      } else {
        this.setState({
          currentVoiceB: e.value,
        })
        if (this.props.callback && typeof this.props.callback === 'function') {
          this.props.callback({ voice: e.value })
        }
      }
    }
  }

  render() {
    return (
      <div>
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
      </div>
   )
  }
}
export default Speak
