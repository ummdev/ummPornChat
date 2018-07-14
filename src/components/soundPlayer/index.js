import React, { Component } from 'react'
import { Media, Player, controls } from 'react-media-player'
import './index.css'
const { PlayPause} = controls
export default (props)=> {
    return (
      <Media>
        <div className="media">
        <img src={props.coverImage}/>
          <div className="media-player">
            <Player src={props.soundURL}/>
          </div>
          <div className="media-controls">
            <PlayPause/>
          </div>
        </div>
      </Media>
    )
}
