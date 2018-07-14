import React,{Component} from 'react';
import './index.css';
function listMessages(value , index){
  return(
    <div key={index} className="messageBox">
      <p>{value}</p>
    </div>
  )
}
export default class chatBoxComponent extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="container">
      {this.props.listMessages.map(listMessages)}
      </div>
    )
  }
}
