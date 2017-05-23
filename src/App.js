import React, { Component } from 'react'
import Speak from './components/Speak'
import MdCreate from 'react-icons/lib/md/create'
import MdPlayArrow from 'react-icons/lib/md/play-arrow'
import MdPause from 'react-icons/lib/md/pause'
import MdMovie from 'react-icons/lib/md/movie'
import MdNavigateNext from 'react-icons/lib/md/navigate-next'
import MdPeople from 'react-icons/lib/md/people'
import MdLocationOn from 'react-icons/lib/md/location-on'

import Popover from 'react-simple-popover'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characterHover: false,
      characterOneVoice: null,
      characterTwoVoice: null,
      open1: false,
      open2: false,
      playbackReady: false,
      volumeA: null,
      volumeB: null,
      pitchA: null,
      pitchB: null,
      rateA: null,
      rateB: null,
      speaker: null,
    }
  }
  componentDidMount() {
    document.title = 'Scripted Demo'
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
      character: parseInt(e.target.dataset.id, 10),
    })
  }

  handleVoiceChange(voice, character) {
    if (character === 1) {
      this.setState({ characterOneVoice: voice, playbackReady: true })
    } else {
      this.setState({ characterTwoVoice: voice, playbackReady: true })
    }
  }

  handleVolumeChange(volume, character) {
    if (character === 1) {
      this.setState({ volumeA: volume.volume })
    } else {
      this.setState({ volumeB: volume.volume })
    }
  }

  handleRateChange(rate, character) {
    if (character === 1) {
      this.setState({ rateA: rate.rate })
    } else {
      this.setState({ rateB: rate.rate })
    }
  }

  handlePitchChange(pitch, character) {
    if (character === 1) {
      this.setState({ pitchA: pitch.pitch })
    } else {
      this.setState({ pitchB: pitch.pitch })
    }
  }

  playSnippet() {
    // playback the page with chosen voices & options or defaults
    // just assume this is speaker one & two; not a long term solution, obvs
    const defaultOptsOne = {
      volume: this.state.volumeA ? parseFloat(this.state.volumeA) : 0.9,
      rate: this.state.rateA ? parseFloat(this.state.rateA) : 0.9,
      pitch: this.state.pitchA ? parseFloat(this.state.pitchA) : 0.9,
      lang: this.state.characterOneVoice && this.state.characterOneVoice.voice,
     }

     const defaultOptsTwo = {
       volume: this.state.volumeB ? parseFloat(this.state.volumeB) : 0.9,
       rate: this.state.rateB ? parseFloat(this.state.rateB) : 0.9,
       pitch: this.state.pitchB ? parseFloat(this.state.pitchB) : 0.9,
       lang: this.state.characterTwoVoice && this.state.characterTwoVoice.voice,
      }

     let msgOne = new SpeechSynthesisUtterance()
     Object.assign(msgOne, defaultOptsOne)

     let msgTwo = new SpeechSynthesisUtterance()
     Object.assign(msgTwo, defaultOptsTwo)

     msgOne.text = this.refs.dialogueOne.innerText
     window.speechSynthesis.speak(msgOne)

     msgTwo.text = this.refs.dialogueTwo.innerText
     window.speechSynthesis.speak(msgTwo)
  }

  playPage() {
    // playback the page with chosen voices & options or defaults
    // pause is buggy so it's hard to use and be able to playback again
    // just assume this is speaker one & two; not a long term solution, obvs
    const defaultOptsOne = {
      volume: this.state.volumeA ? parseFloat(this.state.volumeA) : 0.9,
      rate: this.state.rateA ? parseFloat(this.state.rateA) : 0.9,
      pitch: this.state.pitchA ? parseFloat(this.state.pitchA) : 0.9,
      lang: this.state.characterOneVoice && this.state.characterOneVoice.voice,
     }

     const defaultOptsTwo = {
       volume: this.state.volumeB ? parseFloat(this.state.volumeB) : 0.9,
       rate: this.state.rateB ? parseFloat(this.state.rateB) : 0.9,
       pitch: this.state.pitchB ? parseFloat(this.state.pitchB) : 0.9,
       lang: this.state.characterTwoVoice && this.state.characterTwoVoice.voice,
      }

     let msgOne = new SpeechSynthesisUtterance()
     Object.assign(msgOne, defaultOptsOne)

     let msgTwo = new SpeechSynthesisUtterance()
     Object.assign(msgTwo, defaultOptsTwo)

   	 msgOne.text = this.refs.dialogueOne.innerText
     window.speechSynthesis.speak(msgOne)

     msgTwo.text = this.refs.dialogueTwo.innerText
     window.speechSynthesis.speak(msgTwo)

     let msgThree = new SpeechSynthesisUtterance()
     Object.assign(msgThree, defaultOptsOne)
     msgThree.text = this.refs.dialogueThree.innerText
     window.speechSynthesis.speak(msgThree)

     let msgFour = new SpeechSynthesisUtterance()
     Object.assign(msgFour, defaultOptsTwo)
     msgFour.text = this.refs.dialogueFour.innerText
     window.speechSynthesis.speak(msgFour)

     let msgFive = new SpeechSynthesisUtterance()
     Object.assign(msgFive, defaultOptsOne)
     msgFive.text = this.refs.dialogueFive.innerText
     window.speechSynthesis.speak(msgFive)
  }

  pausePlayback() {
    // stop talking
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    } else {
      window.speechSynthesis.pause()
    }
  }

  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <div className='title'>Cinderella Must Die</div>
          <div className='explorer-panel'>
            <MdMovie className='explorer-icon-movie' />
            <MdPeople className='explorer-icon-cast' />
            <MdLocationOn className='explorer-icon-location' />
          </div>
        </div>
        <div className='screenplay'>
          <div className='character'>
            <div className='spacer'> </div>
            <div
              data-id='1'
              className={(this.state.characterHover && this.state.character === 1) || this.state.characterOneVoice ? 'highlight' : ''}
              onClick={e => this.pickVoice(e)}>
              CINDERELLA
                <a
                  href="#"
                  ref="popover1"
                  onClick={this.handleClick1.bind(this)}><MdCreate className='edit-icon' /></a>
                <Popover
                  placement='right'
                  container={this}
                  target={this.refs.popover1}
                  show={this.state.open1}
                  onHide={this.handleClose.bind(this)} >
                  <Speak
                    character={1}
                    currentVoiceA={this.state.characterOneVoice ? this.state.characterOneVoice.value : null}
                    voiceCallback={voice => this.handleVoiceChange(voice, 1)}
                    volCallback={volume => this.handleVolumeChange(volume, 1)}
                    rateCallback={rate => this.handleRateChange(rate, 1)}
                    pitchCallback={pitch => this.handlePitchChange(pitch, 1)}
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
              className={(this.state.characterHover && this.state.character === 2) || this.state.characterTwoVoice ? 'highlight' : ''}
              onClick={(e) => this.pickVoice(e)}>
              MADEMOISELLE
              <a
                href="#"
                ref="popover2"
                onClick={this.handleClick2.bind(this)}><MdCreate className='edit-icon'/></a>
                <Popover
                  className='popover'
                  placement='right'
                  container={this}
                  target={this.refs.popover2}
                  show={this.state.open2}
                  onHide={this.handleClose.bind(this)} >
                  <Speak
                    character={2}
                    voiceCallback={voice => this.handleVoiceChange(voice, 2)}
                    volCallback={volume => this.handleVolumeChange(volume, 2)}
                    rateCallback={rate => this.handleRateChange(rate, 2)}
                    pitchCallback={pitch => this.handlePitchChange(pitch, 2)}
                  />
                </Popover>
            </div>
            <div className='spacer'> </div>
          </div>
          <div className='dialogue' ref='dialogueTwo'>
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
          <div className='dialogue' ref='dialogueThree'>
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
          <div className='dialogue' ref='dialogueFour'>
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
          <div className='dialogue' ref='dialogueFive'>
          They're not my sisters, they're my stepsisters. When my father died they squandered my inheritance and force me into service.
          But, as God is my witness, I'm one of you.
          </div>
        </div>
        { this.state.playbackReady ?
          <div className='playback-controls'>
            <MdNavigateNext className='snippet-button' onClick={() => this.playSnippet()} />
            <MdPlayArrow className='playback-button' onClick={() => this.playPage()} />
            <MdPause className='pause-button' onClick={() => this.pausePlayback()} />
          </div>
          :
          ''
        }
      </div>
    );
  }
}

export default App;
