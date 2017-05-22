import React, { Component } from 'react';
import Speak from './utils/Speak'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characterHover: false
    }
  }
  componentDidMount() {
    document.title = 'Scripted Demo'
  }

  pickVoice() {
    this.setState({characterHover: !this.state.characterHover})
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
            <div className={this.state.characterHover ? 'highlight' : ''} onClick={() => this.pickVoice()}>
            CINDERELLA
            </div>
            <div className='spacer'> </div>
          </div>
          <div className='dialogue'>
          My father was a baron, my mother a baroness. I'm of noble blood!
          </div>
          <div className='character'>
          MADEMOISELLE
          </div>
          <div className='dialogue'>
          You fool. I <bold>know</bold> your mother.
          </div>
          <div className='character'>
          CINDERELLA
          </div>
          <div className='dialogue'>
          She's not my mother! She's my stepmother. My father married her after my real mother died.
          </div>
          <div className='character'>
          MADEMOISELLE
          </div>
          <div className='dialogue'>
          You're telling tales. What about your sisters?
          </div>
          <div className='character'>
          CINDERELLA
          </div>
          <div className='dialogue'>
          They're not my sisters, they're my stepsisters. When my father dies they squandered my inheritance and force me into service.
          But, as God is my witness, I'm one of you.
          </div>
        </div>
      </div>
    );
  }
}

export default App;
