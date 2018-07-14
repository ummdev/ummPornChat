import React, {
  Component
} from 'react';
import axios from 'axios';
import firebase from '../../firebase.js';
const storage = firebase.storage();
export default class addNewSound extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coverImage: '',
      soundPlayer: ''
    };
    this.coverImageURL = this.coverImageURL.bind(this)
    this.soundURL = this.soundURL.bind(this)
    this.upload = this.upload.bind(this)
  }

  coverImageURL(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => {
        this.setState({
          coverImage: event.target.result
        })
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  soundURL(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => {
        this.setState({
          soundPlayer: event.target.result
        })
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uuid() {
    return 'xxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  upload() {
    // Promise.all([
    //   storage.ref(`a.png`).putString(this.state.coverImage, 'data_url').snapshot.ref.getDownloadURL(),
    //   storage.ref(`b.mp3`).putString(this.state.soundPlayer, 'data_url').snapshot.ref.getDownloadURL()
    // ]).then((data) => {
    //   console.log(data)
    // })
    storage.ref(`a.png`).putString(this.state.coverImage, 'data_url').snapshot.ref.getDownloadURL().then((data)=>{
      console.log(data)
    })
  }

  render() {
    return ( <div >
      <input
      type = "file"
      accept = "image/png"
      onChange = {
        (event) => this.coverImageURL(event)
      }
      />
      <input
        type = "file"
        accept = "audio/mp3"
        onChange = {
        (event) => this.soundURL(event)
        }
      />
      <button
        onClick = {
        () => this.upload()
      }> คลิก </button>
      </div>
    )
  }
}
