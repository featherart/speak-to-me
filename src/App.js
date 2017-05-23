import React, { Component } from 'react';
import Speak from './components/Speak'
import MdCreate from 'react-icons/lib/md/create';
import Popover from 'react-simple-popover';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characterHover: false,
      characterOneVoice: null,
      characterTwoVoice: null,
      open1: false,
      open2: false,
      playbackReady: true,
    }
  }
  componentDidMount() {
    document.title = 'Scripted Demo';
  }

  handleClick1(e) {
    this.setState({open1: !this.state.open1});
  }

  handleClick2(e) {
    this.setState({open2: !this.state.open2});
  }

  handleClose(e) {
    this.setState({open1: false, open2: false});
  }

  pickVoice(e) {
    e.preventDefault();
    this.setState({
      characterHover: !this.state.characterHover,
      character: parseInt(e.target.dataset.id, 10)
    })
  }

  handleVoiceChange(voice, character) {
    if (character === 1) {
      this.setState({characterOneVoice: voice})
    } else {
      this.setState({characterTwoVoice: voice})
    }
    if (this.state.characterTwoVoice && this.state.characterOneVoice) {
      // show speak button
      console.log('in here, reveal button')
      this.setState({ playbackReady: true })
    }
    console.log('state now: ', this.state)
  }

  playPage() {
    //playback the page with chosen voices
    const defaultOpts = {
      volume: 1,
      rate: 0.9,
      pitch: 1,
      lang: this.state.characterOneVoice && this.state.characterOneVoice.voice,
     }

     let msg = new SpeechSynthesisUtterance() // only accepts text to speak as param
     Object.assign(msg, defaultOpts)

     // Set the text.
   	 msg.text = this.refs.dialogueOne.innerText
     window.speechSynthesis.speak(msg)

     // Set the attributes.
   // 	msg.volume = parseFloat(volumeInput.value);
   // 	msg.rate = parseFloat(rateInput.value);
   // 	msg.pitch = parseFloat(pitchInput.value);

  }

  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <h2>Cinderella Must Die</h2>
        </div>
        <div className='screenplay'>
          <div className='character'>
            <div className='spacer'> </div>
            <div
              data-id='1'
              ref='cindy'
              className={(this.state.characterHover && this.state.character === 1) || this.state.characterOneVoice ? 'highlight' : ''}
              onClick={(e) => this.pickVoice(e)}>
              CINDERELLA
                <a
                  href="#"
                  ref="popover1"
                  onClick={this.handleClick1.bind(this)}><MdCreate /></a>
                <Popover
                  className='popover'
                  placement='right'
                  container={this}
                  target={this.refs.popover1}
                  show={this.state.open1}
                  onHide={this.handleClose.bind(this)} >
                  <Speak
                    character={1}
                    callback={voice => this.handleVoiceChange(voice, 1)}
                  />
                </Popover>
            </div>
            <div className='spacer'> </div>
          </div>
          <div className='dialogue' ref='dialogueOne'>
          My father was a baron, my mother a baroness. I'm of noble blood!
          </div>
          <div className='character'>
            <div className='spacer'> </div>
            <div
              data-id='2'
              ref='mami'
              className={(this.state.characterHover && this.state.character === 2) || this.state.characterTwoVoice ? 'highlight' : ''}
              onClick={(e) => this.pickVoice(e)}>
              MADEMOISELLE
              <a
                href="#"
                ref="popover2"
                onClick={this.handleClick2.bind(this)}><MdCreate /></a>
                <Popover
                  className='popover'
                  placement='right'
                  container={this}
                  target={this.refs.popover2}
                  show={this.state.open2}
                  onHide={this.handleClose.bind(this)} >
                  <Speak
                    character={2}
                    callback={voice => this.handleVoiceChange(voice, 2)}
                   />
                </Popover>
            </div>
            <div className='spacer'> </div>
          </div>
          <div className='dialogue'>
          You fool. I <bold>know</bold> your mother.
          </div>
          <div className='character'>
            <div className='spacer'> </div>
            <div
              data-id='1'
              className={(this.state.characterHover && this.state.character === 1) ? 'highlight' : ''}
              onClick={(e) => this.pickVoice(e)}>
              CINDERELLA
            </div>
            <div className='spacer'> </div>
          </div>
          <div className='spacer'> </div>
          <div className='dialogue'>
          She's not my mother! She's my stepmother. My father married her after my real mother died.
          </div>
          <div className='character'>
            <div className='spacer'> </div>
            <div
              data-id='2'
              className={(this.state.characterHover && this.state.character === 2) ? 'highlight' : ''}
              onClick={(e) => this.pickVoice(e)}>
              MADEMOISELLE
            </div>
            <div className='spacer'> </div>
          </div>
          <div className='dialogue'>
          You're telling tales. What about your sisters?
          </div>
          <div className='character'>
            <div className='spacer'> </div>
            <div
              data-id='1'
              className={(this.state.characterHover && this.state.character === 1) ? 'highlight' : ''}
              onClick={(e) => this.pickVoice(e)}>
              CINDERELLA
            </div>
            <div className='spacer'> </div>
          </div>
          <div className='dialogue'>
          They're not my sisters, they're my stepsisters. When my father dies they squandered my inheritance and force me into service.
          But, as God is my witness, I'm one of you.
          </div>
        </div>
        { this.state.playbackReady ?
          <button onClick={() => this.playPage()}>Play</button>
          :
          ''
        }
      </div>
    );
  }
}

export default App;
