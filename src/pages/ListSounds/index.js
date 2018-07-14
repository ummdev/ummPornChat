import React , {Component} from 'react';
import axios from 'axios';
import SoundPlayerComponent from '../../components/soundPlayer';
import AddSoundComponent from '../../components/addSound';
export default class ListSoundsComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      listSounds:[]
    }
    axios.get(`https://us-central1-ummproject-b4a9c.cloudfunctions.net/getSongsById?pornId=${props.match.params.userId}`).then(({data})=>{
      this.setState({
        listSounds: data
      })
    })
  }

  render(){
    return(
      <div>
      {this.state.listSounds.map((value , index)=>{
        return(
          <SoundPlayerComponent
            soundURL={value.soundURL}
            coverImage={value.coverImageURL}
            key={index}/>
        )
      })}
        <br/>
        <br/>
        <AddSoundComponent pornId={this.props.match.params.userId}/>
      </div>
    )
  }
}
