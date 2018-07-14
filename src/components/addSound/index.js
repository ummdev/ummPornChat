import React, {
  Component
} from 'react';
import axios from 'axios';
import firebase from '../../firebase.js';
import './index.css'
import qs from 'qs';
export default class addNewSound extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coverImage: '',
      soundPlayer: '',
      pornId: ''
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
  async upload() {
    let imageURL = '';
    let soundURL = '';
    const storageRef = firebase.storage().ref();
    const imageUUID = this.uuid()
    const soundUUID = this.uuid()
    await storageRef
      .child(`${imageUUID}.png`)
      .putString(this.state.coverImage, 'data_url')

    await storageRef
      .child(`${soundUUID}.mp3`)
      .putString(this.state.soundPlayer, 'data_url')
    const imageRef = storageRef.child(`${imageUUID}.png`)

    await imageRef.getDownloadURL().then((data) => {
      imageURL = data
    })

    const soundRef = storageRef.child(`${soundUUID}.mp3`)
    await soundRef.getDownloadURL().then((data) => {
      soundURL = data
    })

    const data = qs.stringify({
      pornStarId: this.props.pornId,
      soundURL: soundURL,
      coverImageURL: imageURL
    })
    axios.post('https://us-central1-ummproject-b4a9c.cloudfunctions.net/addNewSound', data)
    .then((data) => {
      console.log(data)
    })
  }

  render() {
    return (
      <div className="container">
      <h1>เพิ่มเสียงใหม่</h1>
      <br/><br/>
      <input
       type = "file"
       accept = "image/png"
       onChange = {
        (event) => this.coverImageURL(event)
      }
      />
      <br/>
      <input
        type = "file"
        accept = "audio/mp3"
        onChange = {
          (event) => this.soundURL(event)
        }
      />
      <button onClick = {
        () => this.upload()
      } > คลิก < /button>
      </div>
    )
  }
}
