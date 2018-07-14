import React, {Component} from 'react';
import './index.css'
import ChatBoxComponent from '../../components/chatBox';
import SuggestionBoxComponent from '../../components/suggestionPorn';
import axios from 'axios';
export default class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      listMessages: [],
      listPornStars: [],
      listSuggestionPorns: []
    }
  }

  sendText() {
    axios.get(`https://us-central1-ummproject-b4a9c.cloudfunctions.net/getSuggestion`)
      .then(({data}) => {
        this.setState({listPornStars: data})
        this.suggestion()
      })
  }

  suggestion() {
    const regex = new RegExp(this.state.text, 'g')
    const listSuggestionPorns = this.state.listPornStars.filter((value) => regex.test(value.name))
    this.setState({
      listSuggestionPorns: listSuggestionPorns
    })
  }

  render() {
    return (
      <div className="container">
        <ChatBoxComponent listMessages={this.state.listMessages}/>
        <SuggestionBoxComponent listSuggestion={this.state.listSuggestionPorns}/>
        <div className="messageInput">
          <input
            className="message"
            onChange={(event) => this.setState({text: event.target.value})}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && this.state.listPornStars.length === 0) {
                this.sendText()
              } else if (event.key === 'Enter' && this.state.listPornStars.length > 0) {
                this.suggestion()
              }
              }}/>
        </div>
    </div>)
  }
}
