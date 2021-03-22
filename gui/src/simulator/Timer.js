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

import {Howl, Howler} from 'howler';

class Timer extends Component {

  constructor(props){
  super(props);
    
  this.startPauseSwitch = this.startPauseSwitch.bind(this);
  this.clockStop = this.clockStop.bind(this);
  this.state = {

    row: this.props.row,

    miliSecond: 0,
    second: 0,
    minute: 0,
    hour: 0,

    switcher: false,
    playIcon: true,

    tempo: this.props.tempo, // from user
    volume: 1,
    count: 0, // intrement per milisecond
    restart: 5, // set loop

    clef: null,
    keySig: null,
    inc: 0,
    source: [b5, as5, a5, gs5, g5, fs5, f5, e5, ds5, d5, cs5, c5]
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
  console.log("getStartingProperties")
    let row = this.state.row;
        // -------- pre render ----------------------------------- FIND STARTING---------------
  
    for (let i = currentSelected; i >= 0; i--) { // find Starting
      if (row[i][0].starting === true) {
        if (row[i][0].clef === null) {
          let type = 4
          let error = 7
          let measure = row[i + 1][8].measure
          this.props.consoleWarningClef(type, measure, error)
          break;
        }
  
        this.setState ({
          clef: row[i][0].clef,
          keySig: row[i][0].keySig,
        });
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
  let intervals = NaN;


    this.interval = setInterval(() => {
      
      if ( currentSelected >= row.length ) {
        this.clockStop();
        return;
      }

      if (this.state.count === 0) {
        
        if ( row[currentSelected][0].starting === true ) {
          this.getStartingProperties(currentSelected);
          if (this.state.clef === null) {
            console.log("clef in null so stop")
            this.clockStop();
            
            return;
          }
          intervals = 0;
        }

        else {
          console.log("playing row", currentSelected)
          intervals = speed / row[currentSelected][0].note;
          this.row(currentSelected);      
          console.log(currentSelected)
          intervals = speed / row[currentSelected][0].note;
          console.log(intervals)
        }
        currentSelected++;
      }
      
      this.setState({
        count: this.state.count + 1,
      });

      console.log(intervals)
      
      if (this.state.count >= intervals) {
        console.log("counter is back to zero")
        this.setState ({
          count: 0,
        });
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
  })
  this.props.playerIcon(this.state.playIcon);
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





















// import React, { Component } from "react";
// import c5 from './SoundSource/c5.mp3';
// import cs5 from './SoundSource/cs5.mp3';
// import d5 from './SoundSource/d5.mp3';
// import ds5 from './SoundSource/ds5.mp3';
// import e5 from './SoundSource/e5.mp3';
// import f5 from './SoundSource/f5.mp3';
// import fs5 from './SoundSource/fs5.mp3';
// import g5 from './SoundSource/g5.mp3';
// import gs5 from './SoundSource/gs5.mp3';
// import a5 from './SoundSource/a5.mp3';
// import as5 from './SoundSource/as5.mp3';
// import b5 from './SoundSource/b5.mp3';

// import {Howl, Howler} from 'howler';

// class Timer extends Component {

//   constructor(props){
//   super(props);
//   this.state = {

//     row: this.props.row,

//     miliSecond: 0,
//     second: 0,
//     minute: 0,
//     hour: 0,

//     switcher: false,
//     playIcon: 'Play ',

//     tempo: 120, // from user
//     count: 0, // intrement per milisecond
//     restart: 5, // set loop
//     barStart: 1,

//     noteLength: 4,
//     Xindex: 0,
//   }
// }

// startPauseSwitch() {

//   let switcher = this.state.switcher;
// console.log("startPauseSwitch")
//   this.setState({
//     row: this.state.row
//   })

//   if (switcher === false) {
    
//     this.clockStart();
//     this.setState({
//       switcher: true,
//       playIcon: "Pause"
//       })
      
//   }

//   else {
//     this.clockPause();
//     this.setState({
//     switcher: false,
//     playIcon: "Resume"
//     })
//   }
// }

// row = () => {

//   let row = this.props.row;
//   let rowLength = row.length;
//   let currentSelected = this.props.currentSelected;
//   let Xindex = this.state.Xindex;
//   let currentRow = currentSelected + Xindex;
//   console.log("current row", currentRow)

//     if (currentRow < rowLength - 1) {

//       let y = 0; // always starts at zero
//       let current = row[currentRow][y  ];

//       while (y < this.props.column) {
//         let a = this.props.row[currentRow][y];

//         // Add if else condition here later on ----------------if Column's isOpen = false --------------------- 
//           if (a.isOpen === true) {

//             let source = c5;

//             if (y === 0) { source = b5;}
//             if (y === 1) { source = as5;}
//             if (y === 2) { source = a5;}
//             if (y === 3) { source = gs5;}
//             if (y === 4) { source = g5;}
//             if (y === 5) { source = fs5;}
//             if (y === 6) { source = f5;}
//             if (y === 7) { source = e5;}
//             if (y === 8) { source = ds5;}
//             if (y === 9) { source = d5;}
//             if (y === 10) { source = cs5;}
//             if (y === 11) { source = c5;}

//             const sound = new Howl ({
//               src: [source],
//               sprite: {
//                 c5: [0, 6000],
//               }
//             })
//             sound.play("c5");

            
            
//             console.log(a)}
//             y++;
//         }

//           this.setState( {
//             noteLength: current.note,
//             Xindex : Xindex + 1,
//         })
//       console.log("Note value is", current.note)
//     }

//     else {
//       this.clockStop();
//     }
// }

// clockStart() {

//   let speed = Math.round( 60 / this.state.tempo * 100 ); // 60 as second; tempo; 
//   console.log("Clock Start", speed)
//   this.row();

//   this.interval = setInterval(() => {
//     let interval = speed / this.state.noteLength;

//     this.setState(prevState => ({
//       count: prevState.count + 1,
//     }));
//     console.log(interval)

//     if (this.state.count >= interval) {
//       this.setState(prevState => ({
//           barStart: prevState.barStart + 1,
//         row: prevState.row + 1,
//         count: 0,
//       } ));
      
//       this.row();
//       console.log("next note")
//     }

//     if (this.state.barStart === this.state.restart) {    
//       this.setState(prevState => ({
//         barStart: prevState.barStart = 1,
//       }))
//     };

//   }, 10)
  
// }

// clockPause(){
//   clearInterval(this.interval)
// }

// clockStop(){
//   this.clockPause();
//   this.setState({
//     switcher: false,
//     count: 0,
//     barStart: 0,
//     Xindex: 0,
//     playIcon:  "Play "
//   })

// }

// getStartingProperties = () =>  {

//   let row = this.state.row;
//   let currentSelected = this.props.currentSelected;
//       // -------- pre render ----------------------------------- FIND STARTING---------------

//   for (let i = currentSelected; i >= 0; i--) { // find Starting

//     if (row[i][0].starting === true) {

//       this.setState ({
//         clef: row[i][0].clef,
//         keySig: row[i][0].keySig,
//       });
//       break;
//     }
//   }

// }

// tempo(event){
//   this.setState({
//     tempo:parseInt(event.target.value)
//   })

// }

// render () {
// Howler.volume(1.0)
//   return (

//     <div>
//       <div className="container"> 
//         <p className="container-header">Player</p> 
//           <button onClick={() => this.startPauseSwitch()}>{this.state.playIcon}</button>
//           <button onClick={() => this.clockStop()}>Stop</button>
//         Tempo
//           <input type= "number" defaultValue = "120" min= "60" max= "200" onChange={this.tempo.bind(this)}/>
//       </div>
//     </div>

//     )
// } 

// } 
