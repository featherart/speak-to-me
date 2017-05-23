import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class Speak extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voices: [],
      currentVoice: null,
      clearable: true,
    }
  }
  componentDidMount() {
    // Fetch the available voices.
  	this.setState({voices: speechSynthesis.getVoices()})
  }

  speak() {
    const defaultOpts = {
      volume: 1,
      rate: 0.9,
      pitch: 1,
      lang: "en-GB"
     }
    // var voices = window.speechSynthesis.getVoices();
    let msg = new SpeechSynthesisUtterance() // only accepts text to speak as param
    Object.assign(msg, defaultOpts)

  }
  onChange(e) {
    if (e) {
      this.setState({
        currentVoice: e.value,
        clearable: true,
      })
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
        value={this.state.currentVoice}
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
