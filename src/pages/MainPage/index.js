import React, {Component} from 'react';
import './index.css'
import ChatBoxComponent from '../../components/chatBox';
import SuggestionBoxComponent from '../../components/suggestionPorn';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Media, Player, controls } from 'react-media-player'
import './index.css'
const { PlayPause} = controls
function listSuggestionPornComponent(value , index){
  return(
    <Link  to={{pathname: `/sounds/${value.id}`,}} key={index}>
      <div  className="suggestionbox">
        <p>{value.name}</p>
      </div>
    </Link>
  )
}

export default class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      listMessages: [],
      listPornStars: [],
      listSuggestionPorns: [],
      listSounds: [],
      listSuggestionSound: []
    }

  }

  sendText() {
    axios.get(`https://us-central1-ummproject-b4a9c.cloudfunctions.net/getSuggestion`)
      .then(({data}) => {
        this.setState({listPornStars: data})
        this.suggestion()
      })
  }

  selectPornStar(pornId){
    console.log(pornId)
    axios.get(`https://us-central1-ummproject-b4a9c.cloudfunctions.net/getSongsById?pornId=${pornId}`).then(({data})=>{
      this.setState({
        listSuggestionSound: data
      })
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
        {this.state.listSuggestionPorns.map((value , index)=>{
          return(
            <div  className="suggestionbox" onClick={this.selectPornStar.bind(this,value.id)} key={index}>
              <p>{value.name}</p>
            </div>
          )
        })}
        {this.state.listSuggestionSound.map((value , index)=>{
          console.log(value)
          return(
            <Media key={index}>
              <div className="media">
              <img src={value.coverImageURL} className="sound"/>
                <div className="media-player">
                  <Player src={value.soundURL}/>
                </div>
                <div className="media-controls">
                  <PlayPause/>
                </div>
              </div>
            </Media>
          )
        })}
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
