import React, { Component } from "react";
import c5 from './SoundSource/c5.mp3';
import cs5 from './SoundSource/cs5.mp3';
import d5 from './SoundSource/d5.mp3';
import ds5 from './SoundSource/ds5.mp3';
import e5 from './SoundSource/e5.mp3';
import f5 from './SoundSource/f5.mp3';
import fs5 from './SoundSource/fs5.mp3';
import g5 from './SoundSource/g5.mp3';
import gs5 from './SoundSource/gs5.mp3';
import a5 from './SoundSource/a5.mp3';
import as5 from './SoundSource/as5.mp3';
import b5 from './SoundSource/b5.mp3';

import c4 from './SoundSource/c4.mp3';
import cs4 from './SoundSource/cs4.mp3';
import d4 from './SoundSource/d4.mp3';
import ds4 from './SoundSource/ds4.mp3';
import e4 from './SoundSource/e4.mp3';
import f4 from './SoundSource/f4.mp3';
import fs4 from './SoundSource/fs4.mp3';
import g4 from './SoundSource/g4.mp3';
import gs4 from './SoundSource/gs4.mp3';
import a4 from './SoundSource/a4.mp3';
import as4 from './SoundSource/as4.mp3';
import b4 from './SoundSource/b4.mp3';
import fBeat from './SoundSource/fBeat.mp3';
import beat from './SoundSource/beat.mp3';

import {Howl, Howler} from 'howler';

class Timer extends Component {

  constructor(props){
  super(props);
    
  this.startPauseSwitch = this.startPauseSwitch.bind(this);
  this.clockStop = this.clockStop.bind(this);
  this.state = {

    row: this.props.row,

    switcher: false,
    playIcon: true,

    tempo: this.props.tempo, // from user
    volume: 1,
    count: 0, // intrement per milisecond
    restart: 5, // set loop
    currentSelected: 0,
    line: 0,
    

    clef: null,
    keySig: null,
    timeSig: null,
    inc: 0,
    source: [
      b5, as5, a5, gs5, g5, fs5, f5, e5, ds5, d5, cs5, c5,
      b4, as4, a4, gs4, g4, fs4, f4, e4, ds4, d4, cs4, c4
    
    ],

    metronome: 0,
    fBeat: fBeat,
    beat: beat,

    compass: 1,
    
  }
}

componentDidMount() {
  this.props.startPauseSwitch(this.startPauseSwitch);
  this.props.clockStop(this.clockStop);

};

startPauseSwitch = () => {

  let switcher = this.state.switcher;
console.log("startPauseSwitch")
  this.setState({
    row: this.state.row
  })

  if (switcher === false) {
    
    this.clockStart();
    this.setState({
      switcher: true,
      playIcon: false
      })
      this.props.playerIcon(this.state.playIcon);
  }

  else {
    this.clockPause();
    this.setState({
    switcher: false,
    playIcon: true,
    })
    this.props.playerIcon(this.state.playIcon);
  }
};

getStartingProperties = (currentSelected) => {
  console.log("getStartingProperties", currentSelected)
  this.setState({
    currentSelected: this.state.currentSelected + 1,
  })
    let row = this.state.row;
        // -------- pre render ----------------------------------- FIND STARTING---------------
  
    for (let i = currentSelected; i >= 0; i--) { // find Starting
      if (row[i][0].starting === true) {
        console.log("Starting i true", row[i][0].clef)

        if (row[i][0].clef === null) {
          console.log("Sound Break")
          let type = 4
          let error = 7
          let measure = row[i + 1][8].measure
          this.props.consoleWarningClef(type, measure, error)
          this.clockStop();
          
        }
  
        this.setState ({
          clef: row[i][0].clef,
          keySig: row[i][0].keySig,
          timeSig: row[i][0].up
        });
        console.log(this.state.clef, this.state.keySig, this.state.timeSig)
        break;
      }
    }
};

row = (currentSelected) => {

  let row = this.props.row;
    if (currentSelected < row.length) {
      let y = 0; // always starts at zero
        while (y < this.props.column) {
          let a = row[currentSelected][y];
            // Add if else condition here later on ----------------if Column's isOpen = false --------------------- 
          if (a.isOpen === true) {
            if (row[currentSelected][y].rest === true) {
              console.log("hkjdhaskdhashjkashdkhasdhkasjhdskj")
              return;
            }

            let source = this.state.source[y];
            
            const sound = new Howl ({
              src: [source],
              sprite: {
                normal: [0, 6000],

              }
            })
            sound.play("normal");
          }
          y++;
        }
    }

    else {
      console.log("stoped playing")
      this.clockStop();
    } 
}

clockStart() {
console.log("this.clockStart")
  let row = this.state.row;
  let speed = Math.round( 60 / this.props.tempo * 100 ); // 60 as second; tempo; 
  let currentSelected = this.props.currentSelected;
  let intervals = null;
  let count = 0;

    this.interval = setInterval(() => {

      if ( currentSelected === row.length - 1) {
        this.clockStop();
        console.log("aaa")
        return;
      }
      if(row[this.state.currentSelected][0].starting === true) {
        this.getStartingProperties(currentSelected)
      }
      if (intervals === null) {
        intervals = (speed / row[this.state.currentSelected][0].note ) * this.state.timeSig;
        console.log(intervals)

      }

      if (row[this.state.currentSelected][0].starting === false && count === 0) {
        console.log("Play something", this.state.currentSelected);
        currentSelected = this.state.currentSelected
        this.row(currentSelected);
      }
      count = count + 1;
      
      if (this.state.metronome === 0  && this.props.metronome === true) {
        console.log("METRONOME is back to zero",  this.state.timeSig, this.state.compass, this.state.row[1][0].note, this.state.line)

          if (this.state.compass === 1) {
            console.log("Play 1st")
            let source = this.state.fBeat;
            
            const sound = new Howl ({
              src: [source],
              sprite: {
                normal: [0, 6000],
              }
            })
            sound.play("normal");
          }
          else {
            console.log("play 2nd")
            let source = this.state.beat;
            
            const sound = new Howl ({
              src: [source],
              sprite: {
                normal: [0, 6000],

              }
            })
            sound.play("normal");
          }

          this.setState({
            compass: this.state.compass + 1,
          })
        if (this.state.compass > this.state.timeSig ) {
          this.setState ({
            compass: 1,
          })
        }
    } 

    console.log(count, intervals, this.state.currentSelected)


    this.setState({
      metronome: this.state.metronome + 1,
    });
    
      if (this.state.metronome >= speed) {
        console.log("reset metronome")
        this.setState ({
          metronome: 0,
        });
      }

      if (count >= intervals) {
        console.log("reset count")
        this.setState ({
          currentSelected: this.state.currentSelected + 1,
        });
        count = 0;
      }

    }, 10)
    
}

clockPause = () => {
  clearInterval(this.interval)
}

clockStop = () => {
  this.clockPause();
  console.log("stop")
  this.setState({
    switcher: false,
    count: 0,
    inc: 0,
    playIcon:  false,
    metronome: 0,
    currentSelected: this.props.currentSelected,

  })
}

render () {
  Howler.volume(this.props.volume / 100)
    return (

      <div>

      </div>

      )
  }
} 

export default Timer;