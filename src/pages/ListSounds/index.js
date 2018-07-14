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
        <SoundPlayerComponent
          soundURL="http://www.largesound.com/ashborytour/sound/brobob.mp3"
          coverImage="http://www.largesound.com/ashborytour/sound/brobob.gif"/>
        <br/>
        <br/>
        <AddSoundComponent/>
      </div>
    )
  }
}
