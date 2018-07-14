import React,{Component} from 'react';
import './index.css';
function listSuggestionPorn(value , index){
  return(
    <div key={index} className="suggestionbox">
      <p>{value.name}</p>
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
      {this.props.listSuggestion.map(listSuggestionPorn)}
      </div>
    )
  }
}
