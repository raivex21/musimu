import React, { Component } from "react";
import Board from "./Board";
import WorkSheet from "./WorkSheet";
import ConsWarn from "./Console";
import "./Simulator.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: 0,
      rest: false,
      // buttonBoolSMD: true,
      buttonBoolSMD: false,

      keySig: null,
      up: null,
      down: null,

      clef: null,

      alphabet: ["A", "B", "C", "D", "E", "F", "G"],
      solfeggio: ["do", "re", "mi", "fa", "so", "la", "ti"],
      places: [
        { alp: 0, sol: "", place: 0, accidentals: 0 },
        { alp: 0, sol: "", place: 1, accidentals: 0 },
        { alp: 0, sol: "", place: 2, accidentals: 0 },
        { alp: 0, sol: "", place: 3, accidentals: 0 },
        { alp: 0, sol: "", place: 4, accidentals: 0 },
        { alp: 0, sol: "", place: 5, accidentals: 0 },
        { alp: 0, sol: "", place: 6, accidentals: 0 },
        { alp: 0, sol: "", place: 7, accidentals: 0 },
        { alp: 0, sol: "", place: 8, accidentals: 0 },
        { alp: 0, sol: "", place: 9, accidentals: 0 },
        { alp: 0, sol: "", place: 10, accidentals: 0 },
        { alp: 0, sol: "", place: 11, accidentals: 0 },
      ],

      accidental: "#",

      handle: 0,
      viewOption: false,
      tempo: 120,
      volume: 100,
      playIcon: true,
      metronome: false,
      pauseIcon: false,
      consWarn: [{ start: true, warns: 0 }],

      workSheet: false,
      task: [],
    };
    this.viewOptionOn = this.viewOptionOn.bind(this);
    this.viewOptionOff = this.viewOptionOff.bind(this);
  }
  // toWorkSheet = (clef, up, down, keySig) => {
  // console.log(clef,  up, down, keySig)
  // }

  toWorkSheet = () => {
    console.log("aaa");
  };

  consoleWarningTS = (
    type,
    measure,
    error,
    up,
    down,
    barLength,
    totalNoteValue
  ) => {
    console.log(
      "measure =",
      measure,
      "type =",
      type,
      "error =",
      error,
      up,
      down,
      barLength,
      totalNoteValue
    );
    let consWarn = this.state.consWarn;
    consWarn[0].warn = true;

    if (consWarn.length > 1) {
      console.log("measure =", measure, "type =", type, "error =", error);
      for (let a = 1; a <= consWarn.length - 1; a++) {
        if (consWarn[a].measure === measure && consWarn[a].type === type) {
          console.log("measure =", measure, "type =", type);

          if (
            consWarn[a].error === 0 ||
            consWarn[a].error === 1 ||
            consWarn[a].error === 2 ||
            consWarn[a].error === 3 ||
            consWarn[a].error === 4 ||
            consWarn[a].error === 5
          ) {
            // if  error = 1 or 2 or 3 exist, update warning------
            console.log("error =", error);
            consWarn[a].type = type;
            consWarn[a].error = error;
            consWarn[a].measure = measure;
            consWarn[a].barLength = barLength;
            consWarn[a].totalNoteValue = totalNoteValue;
            consWarn[a].up = up;
            consWarn[a].down = down;
            this.setState({ consWarn });
            console.log(this.state.consWarn);
            return;
          }
        }
      }
      //add new warning
      console.log("add warning for ----------- measure and type only");
      consWarn.push({
        type: type,
        error: error,
        measure: measure,
        barLength: barLength,
        totalNoteValue: totalNoteValue,
        show: false,
        up: up,
        down: down,
      });
    } else {
      console.log("add warning for ----------- new 3 parameters ");
      consWarn.push({
        type: type,
        error: error,
        measure: measure,
        barLength: barLength,
        totalNoteValue: totalNoteValue,
        show: false,
        up: up,
        down: down,
      });
    }

    this.setState({
      consWarn,
    });
    this.findConsWarnLength();
    console.log(this.state.consWarn);
  };
  consoleWarningClef = (type, measure, error) => {
    console.log("measure =", measure, "type =", type, "error =", error);
    let consWarn = this.state.consWarn;
    consWarn[0].warn = true;

    if (consWarn.length > 1) {
      console.log("measure =", measure, "type =", type, "error =", error);
      for (let a = 1; a <= consWarn.length - 1; a++) {
        if (consWarn[a].measure === measure && consWarn[a].type === type) {
          console.log("measure =", measure, "type =", type);
          // edit type = type; measure = measure
          if (consWarn[a].error === 6 || consWarn[a].error === 7) {
            // if  error = 7 exist, update warning------
            consWarn[a].type = type;
            consWarn[a].error = error;
            consWarn[a].measure = measure;
            this.setState({ consWarn });
            console.log(this.state.consWarn);
            return;
          }
        }
      }
      //add new warning
      console.log("add warning for ----------- measure and type only");
      consWarn.push({
        type: type,
        error: error,
        measure: measure,
        show: false,
      });
    } else {
      console.log("add warning for ----------- new 3 parameters ");
      consWarn.push({
        type: type,
        error: error,
        measure: measure,
        show: false,
      });
    }

    this.setState({
      consWarn,
    });
    this.findConsWarnLength();
    console.log(this.state.consWarn);
  };
  consoleWarningKS = (type, measure, error, accidental) => {
    let consWarn = this.state.consWarn;
    consWarn[0].warn = true;

    if (consWarn.length > 1) {
      console.log("measure =", measure, "type =", type, "error =", error);
      for (let a = 1; a <= consWarn.length - 1; a++) {
        if (
          consWarn[a].measure === measure &&
          consWarn[a].type === type &&
          consWarn[a].error === error
        ) {
          console.log("measure =", measure, "type =", type);
          // edit type = type; measure = measure
          if (
            consWarn[a].error === 8 ||
            consWarn[a].error === 9 ||
            consWarn[a].error === 10 ||
            consWarn[a].error === 11 ||
            consWarn[a].error === 12
          ) {
            // if  error = 8 exist, update warning------
            consWarn[a].type = type;
            consWarn[a].error = error;
            consWarn[a].measure = measure;
            consWarn[a].accidental = accidental;
            this.setState({ consWarn });
            console.log(this.state.consWarn);
            return;
          }
        }
      }
      //add new warning
      console.log("add warning for ----------- measure and type only");
      consWarn.push({
        type: type,
        error: error,
        measure: measure,
        accidental: accidental,
        show: false,
      });
    } else {
      console.log("add warning for ----------- new 3 parameters ");
      consWarn.push({
        type: type,
        error: error,
        measure: measure,
        accidental: accidental,
        show: false,
      });
    }

    this.setState({ consWarn });
    this.findConsWarnLength();
    console.log(this.state.consWarn);
  };
  readMore = (t, m, e) => {
    console.log(m, t, e);
    let consWarn = this.state.consWarn;
    for (let a = 1; a <= consWarn.length - 1; a++) {
      console.log(a, consWarn[a].show);
      if (
        consWarn[a].measure === m &&
        consWarn[a].type === t &&
        consWarn[a].error === e
      ) {
        if (consWarn[a].show === false) {
          consWarn[a].show = true;
          this.findConsWarnLength();
          return;
        } else {
          consWarn[a].show = false;
          this.findConsWarnLength();
          return;
        }
      }
    }
  };

  removeWarning = (type, measure, error) => {
    let consWarn = this.state.consWarn;
    console.log("Remove warning", type, measure, consWarn.length - 1);

    for (let a = 1; a <= consWarn.length - 1; a++) {
      console.log(a, consWarn[a].show);

      if (consWarn[a].measure === measure && consWarn[a].type === 1) {
        if (
          consWarn[a].error === 1 ||
          consWarn[a].error === 2 ||
          consWarn[a].error === 3
        ) {
          consWarn.splice(a, 1);

          this.findConsWarnLength();
          return;
        }
      }

      if (
        consWarn[a].measure === measure &&
        consWarn[a].type === type &&
        consWarn[a].error === error
      ) {
        if (consWarn[a].show === false) {
          consWarn.splice(a, 1);

          this.findConsWarnLength();
          return;
        } else {
          consWarn[a].show = false;
          consWarn.splice(a, 1);

          return;
        }
      }
    }

    // for (let a = 1; a <= consWarn.length -1  ;a++) {
    //    console.log(consWarn[a].measure, measure);

    //   if (type === 1) {
    //     if (consWarn[a].measure === measure) {
    //       console.log("measure = measure");
    //       consWarn.splice(a, 1)

    //     }
    //   }
    //   if (type === 2) {
    //     if (consWarn[a].measure === measure) {
    //       console.log("measure = measure");
    //       consWarn.splice(a, 1)

    //     }
    //   }
    //     this.setState({ consWarn })
    // }
    // this.findConsWarnLength();
  };

  recalcuConsoleMeasure = (measure) => {
    let consWarn = this.state.consWarn;
    console.log(consWarn.length);

    if (consWarn.length - 1 !== 1) {
      for (let a = consWarn.length - 1; a > 0; a--) {
        if (consWarn[a].type === 1) {
          if (consWarn[a].measure === measure) {
            console.log("measure = measure");
            consWarn.splice(a, 1);

            this.setState({
              consWarn,
            });
          }
        }
      }
    }
    this.findConsWarnLength();
  };

  findConsWarnLength() {
    let consWarn = this.state.consWarn;
    let a = consWarn.length;
    consWarn[0].warns = a;
    this.setState({
      consWarn,
    });
    console.log(this.state.consWarn[0].warns);
  }

  handleChange = (event) => {
    this.setState({
      keySig: event.target.value,
    });
  };

  renderMe() {
    let places = this.state.places;
    let alphabet = this.state.alphabet;
    let KeySig = this.state.keySig;

    let b = alphabet.findIndex((alphabet) => {
      if (alphabet === KeySig) {
        return true;
      } else {
        return false;
      }
    });

    let i = 0;
    let j = 0;
    let d = 0;

    while (i < 12) {
      let c = b + d;

      if (
        i === 0 ||
        i === 2 ||
        i === 4 ||
        i === 5 ||
        i === 7 ||
        i === 9 ||
        i === 11
      ) {
        if (c < 7) {
          places[i].alp = c;
          d++;
        } else {
          c = 0;
          places[i].alp = j;
          j++;
        }
        i++;
      } else {
        places[i].alp = "none";
        i++;
      }
    }

    this.setState({
      places: places,
    });
    console.log(this.state.places);
  }

  keySigUp = (event) => {
    this.setState({
      up: parseInt(event.target.value),
    });
  };

  keySigDown = (event) => {
    this.setState({
      down: parseInt(event.target.value),
    });
  };

  viewOptionOn() {
    this.setState({
      viewOption: true,
    });
  }

  viewOptionOff() {
    this.setState({
      viewOption: false,
    });
  }

  insertStartingMeasureDisabler = (swt) => {
    this.setState({
      buttonBoolSMD: swt,
    });
  };

  playerIcon = (playIcon) => {
    console.log("player is on", playIcon);
    let plI = this.state.playIcon;
    let paI = this.state.pauseIcon;
    if (playIcon === true) {
      plI = false;
      paI = true;
    } else {
      plI = true;
      paI = false;
    }
    this.setState({ playIcon: plI, pauseIcon: paI });
  };

  tempo(event) {
    this.setState({
      tempo: parseInt(event.target.value),
    });
  }

  Metronome() {
    console.log("metronome");
    let met = null;
    if (this.state.metronome === false) {
      met = true;
    } else {
      met = false;
    }
    this.setState({ metronome: met });
    console.log(this.state.metronome);
  }
  volume(event) {
    this.setState({
      volume: parseInt(event.target.value),
    });
  }

  componentDidMount() {
    document.onkeydown = this.onKeyDown;
  }

  onKeyDown = (e) => {
    e = e || window.event;
    // switch (e.keyCode) {
    //   case 81:
    //     document.getElementById("wholeNote").click();
    //     break;
    //   case 87:
    //     document.getElementById("halfNote").click();
    //     break;
    //   case 69:
    //     document.getElementById("quarterNote").click();
    //     break;
    //   case 82:
    //     document.getElementById("eightNote").click();
    //     break;

    //   case 89:
    //     document.getElementById("wholeNoteRest").click();
    //     break;
    //   case 85:
    //     document.getElementById("halfNoteRest").click();
    //     break;
    //   case 73:
    //     document.getElementById("quarterNoteRest").click();
    //     break;
    //   case 79:
    //     document.getElementById("eightNoteRest").click();
    //     break;

    //   case 83:
    //     document.getElementById("select").click();
    //     break;

    //   case 90:
    //     document.getElementById("flat").click();
    //     break;
    //   case 88:
    //     document.getElementById("sharp").click();
    //     break;
    //   case 67:
    //     document.getElementById("natural").click();
    //     break;
    //   case 66:
    //     document.getElementById("barLine").click();
    //     break;
    //   case 32:
    //     document.getElementById("startPauseSwitch").click();
    //     break;
    //   case 77:
    //     document.getElementById("clockStop").click();
    //     break;

    //   default:
    // }
  };

  render() {
    let consWarn = this.state.consWarn.map((consWarn, index) => {
      return (
        <ConsWarn
          consWarn={consWarn}
          key={index}
          findWarning={this.findWarning}
          readMore={this.readMore}
          removeWarning={this.removeWarning}
        />
      );
    });

    return (
      <div className="canvas">
        {/* ----------------------------------- Tools & Measurements----------------------------------- */}
        <div className="tool">
          <div className="container">
            <p className="container-header">Tools</p>
            <div className="box-devider1">
              <div className="box-devider">
                <button
                  disabled={this.state.buttonBoolSMD}
                  onClick={() => this.insertStartingMeasure()}
                >
                  Insert Measurement
                </button>
                <input
                  type="radio"
                  name="tools"
                  id="select"
                  onClick={() =>
                    this.setState({ note: 0, buttonBoolSMD: false, handle: 0 })
                  }
                  defaultChecked="checked"
                />
                Select
              </div>
              <div className="box-devider">
                Notes
                <input
                  type="radio"
                  name="tools"
                  id="wholeNote"
                  onClick={() =>
                    this.setState({
                      note: 1,
                      buttonBoolSMD: true,
                      handle: 1,
                      rest: false,
                    })
                  }
                />
                Whole
                <input
                  type="radio"
                  name="tools"
                  id="halfNote"
                  onClick={() =>
                    this.setState({
                      note: 2,
                      buttonBoolSMD: true,
                      handle: 1,
                      rest: false,
                    })
                  }
                />
                Half
                <input
                  type="radio"
                  name="tools"
                  id="quarterNote"
                  onClick={() =>
                    this.setState({
                      note: 4,
                      buttonBoolSMD: true,
                      handle: 1,
                      rest: false,
                    })
                  }
                />
                Quarter
                <input
                  type="radio"
                  name="tools"
                  id="eightNote"
                  onClick={() =>
                    this.setState({
                      note: 8,
                      buttonBoolSMD: true,
                      handle: 1,
                      rest: false,
                    })
                  }
                />
                eight
              </div>
              <div className="box-devider">
                Rests
                <input
                  type="radio"
                  name="tools"
                  id="wholeNoteRest"
                  onClick={() =>
                    this.setState({
                      note: 1,
                      buttonBoolSMD: true,
                      handle: 1,
                      rest: true,
                    })
                  }
                />
                Whole
                <input
                  type="radio"
                  name="tools"
                  id="halfNoteRest"
                  onClick={() =>
                    this.setState({
                      note: 2,
                      buttonBoolSMD: true,
                      handle: 1,
                      rest: true,
                    })
                  }
                />
                Half
                <input
                  type="radio"
                  name="tools"
                  id="quarterNoteRest"
                  onClick={() =>
                    this.setState({
                      note: 4,
                      buttonBoolSMD: true,
                      handle: 1,
                      rest: true,
                    })
                  }
                />
                Quarter
                <input
                  type="radio"
                  name="tools"
                  id="eightNoteRest"
                  onClick={() =>
                    this.setState({
                      note: 8,
                      buttonBoolSMD: true,
                      handle: 1,
                      rest: true,
                    })
                  }
                />
                eight
              </div>

              <div className="box-devider">
                <input
                  type="radio"
                  name="accidental"
                  id="natural"
                  defaultChecked="checked"
                />
                n
                <input type="radio" name="accidental" id="flat" />b
                <input type="radio" name="accidental" id="sharp" />#
              </div>
              <div className="box-devider">
                <input
                  type="radio"
                  name="tools"
                  id="barLine"
                  onClick={() =>
                    this.setState({ buttonBoolSMD: true, note: 0, handle: 2 })
                  }
                />{" "}
                Bar line
              </div>
              <div className="box-devider">
                <button
                  onClick={() => {
                    if (this.state.workSheet === false) {
                      this.setState({ workSheet: true });
                      return;
                    }
                    if (this.state.workSheet === true) {
                      this.setState({ workSheet: false });
                      return;
                    }
                  }}
                >
                  Task
                </button>
              </div>
            </div>
          </div>

          <div className="container">
            <p className="container-header">Player</p>
            <div className="box-devider1">
              <div className="box-devider">
                <button id="startPauseSwitch" onClick={() => this.Metronome()}>
                  M
                </button>
                <button
                  id="startPauseSwitch"
                  onClick={() => this.startPauseSwitch()}
                >
                  {this.state.playIcon ? (
                    <div className="button-play"></div>
                  ) : null}
                  {this.state.pauseIcon ? (
                    <div className="button-pause"></div>
                  ) : null}
                </button>
                <button id="clockStop" onClick={() => this.clockStop()}>
                  <div className="button-stop"></div>
                </button>
                tempo
                <input
                  type="number"
                  defaultValue="120"
                  min="60"
                  max="200"
                  onChange={this.tempo.bind(this)}
                />
                bpm
              </div>
              <div className="box-devider">
                <input
                  type="range"
                  id="vol"
                  name="vol"
                  min="0"
                  max="100"
                  defaultValue="100"
                  onChange={this.volume.bind(this)}
                ></input>
                {this.state.volume}
              </div>
            </div>
          </div>

          {/* ----------------------------------- Measurments ----------------------------------- */}
          {this.state.viewOption ? (
            <div className="container">
              <div className="container-popUp">
                <p className="container-header">Measurments</p>
                <div>
                  Clef
                  <button onClick={() => this.setState({ clef: "G" })}>
                    G clef
                  </button>
                  <button onClick={() => this.setState({ clef: "F" })}>
                    F Clef
                  </button>
                </div>
                <div>
                  Time Signature
                  <button
                    onClick={() => this.setState({ up: 4, down: 4, handle: 0 })}
                  >
                    4/4
                  </button>
                  <button
                    onClick={() => this.setState({ up: 3, down: 4, handle: 0 })}
                  >
                    3/4
                  </button>
                  <button
                    onClick={() => this.setState({ up: 2, down: 4, handle: 0 })}
                  >
                    2/4
                  </button>
                  Custom Up
                  <input
                    type="number"
                    defaultValue="4"
                    min="1"
                    max="20"
                    onChange={this.keySigUp.bind(this)}
                  />
                  Down
                  <select onChange={this.keySigDown}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                  </select>
                </div>
                <div>
                  <button onClick={() => this.setStarting()}>Apply</button>
                  <button onClick={() => this.removeStartingMeasure()}>
                    Delete Starting Measure
                  </button>
                  <button
                    className="buttonUpDown"
                    onClick={() => this.viewOptionOff()}
                  >
                    =
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.workSheet ? (
            <div>
              <WorkSheet />
            </div>
          ) : null}
        </div>

        <div className="area1">
          {/* -------------------------------- Paper Canvas Area --------------------------------*/}
          <div className="paper-canvas-area">
            <div className="paper">
              <div className="paper-header"></div>
              <div className="paper-margin">
                <Board
                  note={this.state.note}
                  rest={this.state.rest}
                  clef={this.state.clef}
                  keySig={this.state.keySig}
                  accidental={this.state.accidental}
                  tempo={this.state.tempo}
                  volume={this.state.volume}
                  up={this.state.up}
                  down={this.state.down}
                  places={this.state.places}
                  handle={this.state.handle}
                  metronome={this.state.metronome}
                  viewOptionOn={this.viewOptionOn}
                  viewOptionOff={this.viewOptionOff}
                  consoleWarningTS={this.consoleWarningTS}
                  consoleWarningClef={this.consoleWarningClef}
                  consoleWarningKS={this.consoleWarningKS}
                  removeWarning={this.removeWarning}
                  recalcuConsoleMeasure={this.recalcuConsoleMeasure}
                  insertStartingMeasureDisabler={
                    this.insertStartingMeasureDisabler
                  }
                  setStarting={(click) => (this.setStarting = click)}
                  removeStartingMeasure={(click) =>
                    (this.removeStartingMeasure = click)
                  }
                  playerIcon={this.playerIcon}
                  startPauseSwitch={(click) => (this.startPauseSwitch = click)}
                  clockStop={(click) => (this.clockStop = click)}
                  insertStartingMeasure={(click) =>
                    (this.insertStartingMeasure = click)
                  }
                />
              </div>
            </div>
          </div>
          {/* Console Area */}
          <div className="console-canvas-area">{consWarn}</div>
        </div>
      </div>
    );
  }
}

export default App;
