import React,{Component} from 'react';
import './index.css'
import ChatBoxComponent from '../../components/chatBox';
import axios from 'axios';
export default class MainPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      listMessages: ["1","2","3"],
      listPornStars: []
    }
  }

  sendText(){
    axios.get(`https://us-central1-ummproject-b4a9c.cloudfunctions.net/getSuggestion`)
    .then(({data})=>{
      this.setState({
        listPornStars: data
      })
    })
  }

  suggestion(){
    console.log(this.state.listPornStars)
  }

  checkListPornStars(event){
    if(event.key === 'Enter' && this.state.listPornStars.length === 0){
      this.sendText()
    }else if(event.key === 'Enter' && this.state.listPornStars.length > 0){
      this.suggestion()
    }
  }
  render(){
    return(
      <div className="container">
        <ChatBoxComponent listMessages={this.state.listMessages}/>
        <div className="messageInput">
          <input
            className="message"
            onChange={(event) => this.setState({
              text: event.target.value
            })}
            onKeyPress={(event) =>this.checkListPornStars.bind(this , event)}/>
        </div>
      </div>
    )
  }
}
