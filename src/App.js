import React, { Component } from 'react'
//import Speak from './utils/Speak'
import Character from './components/Character'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characterHover: false,
      character: 0,
    }
  }
  componentDidMount() {
    document.title = 'Scripted Demo'
  }

  pickVoice() {
    this.setState({
      characterHover: !this.state.characterHover,
    })
  }

  render() {
    return (
      <div className='app'>
        <div className='app-header'>
          <h2>Cinderella Must Die</h2>
        </div>
        <div className='screenplay'>
          <Character
            name={'CINDERELLA'}
            character={1}
            action={() => this.pickVoice()}
            characterHover={this.state.characterHover}
            />
          <div className='dialogue'>
          My father was a baron, my mother a baroness. I'm of noble blood!
          </div>
          <Character
            name={'MADEMOISELLE'}
            character={2}
            action={() => this.pickVoice()}
            characterHover={this.state.characterHover}
            />
          <div className='dialogue'>
          You fool. I <bold>know</bold> your mother.
          </div>
          <Character
            name={'CINDERELLA'}
            character={1}
            action={(e) => this.pickVoice(e)}
            characterHover={this.state.characterHover}
            />
          <div className='dialogue'>
          She's not my mother! She's my stepmother. My father married her after my real mother died.
          </div>
          <Character
            name={'MADEMOISELLE'}
            character={2}
            action={(e) => this.pickVoice(e)}
            characterHover={this.state.characterHover}
            />
          <div className='dialogue'>
          You're telling tales. What about your sisters?
          </div>
          <Character
            name={'CINDERELLA'}
            character={1}
            action={(e) => this.pickVoice(e)}
            characterHover={this.state.characterHover}
            />
          <div className='dialogue'>
          They're not my sisters, they're my stepsisters. When my father dies they squandered my inheritance and force me into service.
          But, as God is my witness, I'm one of you.
          </div>
        </div>
    </div>
    )
  }
}

export default App;
