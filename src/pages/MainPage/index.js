import React,{Component} from 'react';
import './index.css'
import ChatBoxComponent from '../../components/chatBox';
export default class MainPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      listMessages: ["1","2","3"]
    }
  }
  render(){
    return(
      <div className="container">
      <ChatBoxComponent listMessages={this.state.listMessages}/>
      <input
        className="messageInput"
        onChange={(event)=> this.setState({
          text: event.target.value
        })}/>
      {this.state.text}
      </div>
    )
  }
}
