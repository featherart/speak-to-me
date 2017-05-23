import React, { Component } from 'react'

class Speak extends Component {

  const defaultOpts = {
    volume: 1,
    rate: 0.9,
    pitch: 1,
    lang: "en-GB"
   }

   let msg = new SpeechSynthesisUtterance(); // only accepts text to speak as param
   Object.assign(msg, defaultOpts);


  render() {
    var voices = window.speechSynthesis.getVoices();

    // if(voices.length > 0) {
    //   msg.voice = voices[Math.floor(Math.random() * 83) + 1];
    // }

    //console.log('voice: ', msg.voice);

    speechSynthesis.speak(msg);
    return (
      <select>
        <option>test</option>
      </select>

   )
  }

}
