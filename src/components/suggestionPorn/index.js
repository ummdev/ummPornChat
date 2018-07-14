import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
function listSuggestionPorn(value , index){
  return(
    <Link  to={{pathname: `/sounds/${value.id}`,}} key={index}>
      <div  className="suggestionbox">
        <p>{value.name}</p>
      </div>
    </Link>
  )
}
export default class SuggestionBox extends Component{
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
