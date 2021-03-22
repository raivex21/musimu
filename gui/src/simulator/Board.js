import React, { Component } from "react";
import Row from "./Row";
import Timer from "./Timer";

class Board extends Component {
  constructor(props) {
    super(props);

    this.insertStartingMeasure = this.insertStartingMeasure.bind(this);
    this.setStarting = this.setStarting.bind(this);
    this.removeStartingMeasure = this.removeStartingMeasure.bind(this);

    this.state = {
      currentIndex: 1,
      row: [[]],
      column: 20,
      currentSelected: 0,
      x: 0,

      clef: 10, // 10 = G-clef,
      accidental: "#",
      barLength: null,
      measureLengthCalc: [],

      buttonBool: true,
    };
  }

  // keySignatureClefCompare = cell => {
  //   // let row = this.state.row;
  //   // let currentSelected = this.state.currentSelected;
  //   // let rowLoc = row[currentSelected][0].accLocation;
  //   // let alphabet = [];

  //   //       let x = 0
  //   //       while (x < 7) {
  //   //         let y = 0;
  //   //           while (y < 10) {

  //   //             if ( rowLoc[x][y].my === true) {
  //   //               alphabet.push ({
  //   //                 x: x,
  //   //                 y: y,
  //   //               })
  //   //             }
  //   //             y++;
  //   //           }
  //   //         x++;
  //   //       }

  //   //       let map;
  //   //       let alpMap;

  //   //         if (this.props.accidental === "#") {
  //   //           map = [1, 4, 0, 3, 6, 2, 5];
  //   //           alpMap = ["G", "D", "A", "E", "B", "F#", "C#"];
  //   //         }
  //   //         if (this.props.accidental === "b") {
  //   //           map = [5, 2, 6, 3, 7, 4, 5];
  //   //           alpMap = ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];
  //   //         }
  //   //           if (alphabet.length !== 0) {
  //   //             let g = 0;
  //   //               while (g < alphabet.length) {
  //   //                 if (alphabet[g].x === g && alphabet[g].y === map[g]) {
  //   //                   if (g === alphabet.length - 1){
  //   //                     console.log("Key of", alpMap[g], "Major");
  //   //                   }
  //   //                 }
  //   //                 else {
  //   //                   if (alphabet.length !== 7) {
  //   //                     console.log("Invalid key Signature. Try again");
  //   //                     return;
  //   //                   }
  //   //                   return;
  //   //                 }
  //   //                 g++;
  //   //               }
  //   //             }
  //   //           else {
  //   //             console.log("Key of C Major");
  //   //           }

  //   // let row = this.state.row;
  //   // let currentSelected = this.state.currentSelected;
  //   // let rowLoc = row[currentSelected][0].accLocation;
  //   // let alphabet = [];

  // };

  ks1 = (cell, xValue, mx, my) => {
    if (this.props.handle === 0) {
      let currentSelected = xValue;
      let row = this.state.row;
      row[currentSelected][0].accidental = this.props.accidental;
      this.setState({ row });
      this.ks2(cell, currentSelected, mx, my);
    }
  };
  ks2 = (cell, currentSelected, mx, my, kind) => {
    let type = 5;
    let row = this.state.row;
    console.log(row[currentSelected][0]);
    if (this.props.handle === 0) {
      if (kind === undefined) {
        if (row[currentSelected][0].starting !== true) {
          return;
        } // --------------debuged--------------------
        //all y in x ---- means -----  check column

        if (row[currentSelected][0].accLocation[mx][my].my === false) {
          row[currentSelected][0].accLocation[mx][my].my = true;
          row[currentSelected][0].accLocation[mx][my].acc =
            row[currentSelected][0].accidental;
          row[currentSelected][0].accLocation[mx][11].my = true;
        } else {
          let a = 0;
          let current = [];
          while (a < 9) {
            if (
              row[currentSelected][0].accLocation[mx][a].my === true &&
              my !== a
            ) {
              current.push(a);
            }
            a++;
            if (a === 9) {
              a = 0;
              break;
            }
          }
          let b = 0;
          let currentNext = [];
          if (mx !== 6) {
            while (b < 9) {
              if (row[currentSelected][0].accLocation[mx + 1][b].my === true) {
                currentNext.push(b);
              }
              b++;
            }
          }

          if (mx === 6) {
            row[currentSelected][0].accLocation[6][my].my = false;
            console.log("a");
          }

          if (current.length === 0 && currentNext.length === 0) {
            row[currentSelected][0].accLocation[mx][my].my = false;
            row[currentSelected][0].accLocation[mx][11].my = false;
            console.log("b");
          }

          if (current.length !== 0 && currentNext.length !== 0) {
            row[currentSelected][0].accLocation[mx][my].my = false;
            console.log("c");
          }
          if (current.length !== 0 && currentNext.length === 0) {
            row[currentSelected][0].accLocation[mx][my].my = false;
            console.log("d");
          }
        }
      }
      //--------------------------------------------------Checking-----------------------------------------
      let a = [];
      for (let x = 0; x <= 6; x++) {
        let y = 0;
        while (y < 10) {
          if (row[currentSelected][0].accLocation[x][y].my === true) {
            a.push({
              acc: row[currentSelected][0].accLocation[x][y].acc,
              x: x,
              y: y,
            });
          }
          y++;
        }
      }

      let xDup = false;
      for (let c = 0; c < a.length; c++) {
        let xCount = [];
        let i = 0;
        while (i < a.length) {
          if (a[i].x === c) {
            xCount.push(c);
          }
          i++;
        }
        if (xCount.length === 0) {
          break;
        }
        if (xCount.length > 1) {
          xDup = true;
          let error = 8;
          let measure = row[currentSelected + 1][8].measure;
          let accidental = row[currentSelected][0].accidental;
          this.props.consoleWarningKS(type, measure, error, accidental, my, mx);
        }
        if (xDup === false) {
          let error = 8;
          let measure = row[currentSelected + 1][8].measure;
          let accidental = row[currentSelected][0].accidental;
          this.props.removeWarning(type, measure, error, accidental, my, mx);
        }
      }

      // ------------------------for y ------------------------------------------------
      let yDup = false;
      let y = 0;
      while (y < 10) {
        let yCount = [];
        for (let i = 0; i < a.length; i++) {
          if (a[i].y === y) {
            yCount.push(i);
          }
        }
        if (yCount.length > 1) {
          yDup = true;
          // break;
        }

        y++;
      }
      if (yDup === true) {
        let error = 9;
        let measure = row[currentSelected + 1][8].measure;
        let accidental = row[currentSelected][0].accidental;
        this.props.consoleWarningKS(type, measure, error, accidental, my, mx);
      } else {
        let error = 9;
        let measure = row[currentSelected + 1][8].measure;
        let accidental = row[currentSelected][0].accidental;
        this.props.removeWarning(type, measure, error, accidental, my, mx);
      }

      this.setState({ row });
      // -------------------------------CHECKING IF THE ACCIDENTALS ARE THE SAME ----------------------------

      let mixed = false;
      for (let i = 0; i <= a.length - 1; i++) {
        if (a[0].acc !== a[i].acc) {
          mixed = true;
          break;
        }
      }
      if (mixed === true) {
        console.log("different");
        let error = 10;
        let measure = row[currentSelected + 1][8].measure;
        let accidental = row[currentSelected][0].accidental;
        this.props.consoleWarningKS(type, measure, error, accidental);
      } else {
        let error = 10;
        let measure = row[currentSelected + 1][8].measure;
        let accidental = row[currentSelected][0].accidental;
        this.props.removeWarning(type, measure, error, accidental);
      }

      // ----------------------What Key Signature------------------------
      if (row[currentSelected][0].clef === null) {
        console.log(currentSelected, "it's null");
        let error = 11;
        let measure = row[currentSelected + 1][8].measure;
        let accidental = row[currentSelected][0].accidental;
        this.props.consoleWarningKS(type, measure, error, accidental);
        return;
      }
      let clef = row[currentSelected][0].clef;
      this.keySignatureClefCompare(clef, a, currentSelected);
    } else {
      console.log("Use Select tool to edit Key Signature");
    }
  };
  keySignatureClefCompare = (clef, a, currentSelected) => {
    console.log(a);
    // -----------set Letters --------------------------
    let row = this.state.row;
    let letter = ["G", "F", "E", "D", "C", "B", "A"];
    let picker = 0;
    let round = 0;
    if (clef === "G") {
      round = 0;
      picker = 0;
    }
    if (clef === "F") {
      round = 5;
      picker = 5;
    }

    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 12; y++) {
        row[currentSelected][0].accLocation[x][y].letter = letter[picker];
        picker++;
        if (picker === 7) {
          picker = 0;
        }
        if (y === 11) {
          picker = round;
        }
      }
    }
    let alpMap = [
      "G",
      "D",
      "A",
      "E",
      "B",
      "F#",
      "C#",
      "F",
      "Bb",
      "Eb",
      "Ab",
      "Db",
      "Gb",
      "Cb",
      "C",
    ];
    let keySeq = [
      "F",
      "C",
      "G",
      "D",
      "A",
      "E",
      "B",
      "B",
      "E",
      "A",
      "D",
      "G",
      "C",
      "F",
    ];
    let addUp = 0;
    let sequence = [];

    for (let i = 0; i < a.length; i++) {
      console.log(
        row[currentSelected][0].accLocation[a[i].x][a[i].y].letter,
        a[i].acc
      );
      sequence.push({
        letter: row[currentSelected][0].accLocation[a[i].x][a[i].y].letter,
        acc: a[i].acc,
      });
    }

    let type = 5;
    let error = 12;
    let measure = row[currentSelected + 1][8].measure;

    if (sequence.length === 0) {
      this.props.removeWarning(type, measure, error);
    } else {
      if (a[0].acc === "b") {
        addUp = 7;
      }
      for (let i = 0; i < a.length; i++) {
        if (sequence[i].letter === keySeq[i + addUp]) {
          console.log(
            sequence[i].letter,
            keySeq[i + addUp],
            "Key of",
            alpMap[i + addUp]
          );

          if (i === a.length - 1) {
            console.log(
              sequence[i].letter,
              keySeq[i],
              "Final Key is in Key of",
              alpMap[i + addUp]
            );
            this.props.removeWarning(type, measure, error);
            row[currentSelected][0].keySig = alpMap[i + addUp];
            break;
          }
        } else {
          console.log("unkown Key Signature");
          this.props.consoleWarningKS(type, measure, error);
          break;
        }
      }
    }

    console.log(sequence, a.length);
    console.log(a.length);
    this.setState({ row });
  };
  createRow = (cell, rowX, kind) => {
    // let currentIndex = this.state.currentIndex;

    let currentIndex = null;
    if (rowX !== undefined) {
      currentIndex = rowX;
    } else {
      currentIndex = this.state.currentIndex;
    }
    let row = this.state.row;
    let column = this.state.column;

    row.splice(currentIndex, 0, []);
    for (let y = 0; y < column; y++) {
      if (y !== 0) {
        if (y !== 8) {
          row[currentIndex].push({
            x: currentIndex,
            y: y,

            isOpen: false,
            note: 0,
            lineStaff: false, // gives line on the cell if true -------------------------------
            clickable: true, // cell will unclicable if enabler is false ----------------------
            starting: false,
            firstRow: false,
          });
        } else {
          row[currentIndex].push({
            x: currentIndex,
            y: y,

            isOpen: false,
            note: 0,
            measure: null,
            lineStaff: false, // gives line on the cell if true -------------------------------
            clickable: true, // cell will unclicable if enabler is false ----------------------
            barline: false,
            starting: false,
            firstRow: false,
          });
        }
      } else {
        row[currentIndex].push({
          x: currentIndex,
          y: y,

          isOpen: false,
          note: 0,
          lineStaff: false, // gives line on the cell if true -------------------------------
          clickable: true, // cell will unclicable if enabler is false ----------------------

          select: true,

          selectColumn: false,
          starting: false,
          firstRow: false,
        });
      }
    }

    // set design
    for (let i = 4; i < column - 7; i++) {
      if (i === 4 || i === 6 || i === 8 || i === 10 || i === 12) {
        row[currentIndex][i].lineStaff = true;
      }
    }

    if (kind === 4) {
      this.incrementX();
    }
    if (row[currentIndex - 1][0].starting === true) {
      for (let i = 0; i <= column - 1; i++) {
        row[currentIndex][i].firstRow = true;
      }
    }
    if (kind === 4) {
      for (let i = 0; i <= column - 1; i++) {
        row[currentIndex + 1][i].firstRow = false;
      }
    }

    // Make enabler true for the first column--------------SET DEFAULT---------------------------------

    this.increment();
    this.setState({ row });
  };
  createMeasureRow() {
    let row = this.state.row;

    row.splice(0, 1, []);
    row[0].push({
      x: 0,
      starting: true,

      clef: null,

      // Time signature

      up: null,
      down: null,
      // Key signature
      keySig: null,

      selectColumn: false,
      barLength: null,

      accidental: "#",
      mx: 0,
      my: 0,
      letter: "",
      accLocation: [],
    });
    console.log(row[0]);
    for (let i = 0; i < 7; i++) {
      row[0][0].accLocation.push([]);
      for (let y = 0; y < 12; y++) {
        row[0][0].accLocation[i].push({
          my: false,
          acc: "",
          letter: "",
        });
      }
    }

    // set design

    // Make enabler true for the first column--------------SET DEFAULT---------------------------------

    this.setState({ row });
  }
  insertStartingMeasure = (cell) => {
    let x = this.state.currentSelected;
    let row = this.state.row;

    if (row[x][0].starting === true) {
      console.log("This is already a starting measure");
      return;
    }

    if (row[x - 1][0].starting === true) {
      if (x === row.length) {
        console.log("Unable to Insert Another Starting Just next to Starting");
        return;
      }
      if (row.length !== x + 1) {
        if (row[x + 1][0].starting === true) {
          console.log(
            "Unable to Insert Another Starting Just next to Starting"
          );
          return;
        }
      }
    }

    if (x !== 0) {
      console.log(x, row);
      row.splice(x, 0, []);

      row[x].push({
        x: x,
        starting: true,

        clef: null,

        // Time signature

        up: null,
        down: null,
        // Key signature
        keySig: null,

        selectColumn: false,
        barLength: null,

        accidental: "#",
        mx: 0,
        my: 0,

        accLocation: [],
      });
      console.log(row[x]);
      for (let i = 0; i < 7; i++) {
        row[x][0].accLocation.push([]);
        for (let y = 0; y < 12; y++) {
          row[x][0].accLocation[i].push({
            my: false,
            acc: "",
            letter: "",
          });
        }
      }

      this.increment();

      row[x + 1][0].selectColumn = false;
      console.log(row[x][0]);
      row[x][0].selectColumn = true;
      row[x + 1][8].barline = false;

      this.setState({
        row,
        currentSelected: x,
      });
      this.props.viewOptionOn();
      console.log(this.state.row);
      this.incrementX();

      let kind = 3;
      let rowX = null;
      let measure = 1;
      console.log(x);
      for (let a = x - 1; a >= 1; a--) {
        console.log(a - 1, row[a - 1][0]);
        if (row[a - 1][0].starting === true) {
          measure = row[a][8].measure + 1;
          break;
        }

        if (row[a][8].barline === true) {
          measure = row[a][8].measure + 1;
          break;
        }
      }
      row[x + 1][8].measure = measure;
      this.setMeasureNum(x + 1, rowX, kind);

      for (let i = 0; i <= this.state.column - 1; i++) {
        row[x + 1][i].firstRow = true;
      }

      if (row[x + 1][0].note > 0) {
        let kind = 7;
        this.checkStartingClef(x, rowX, kind);
      }
    } else {
      console.log("already set");
    }
    console.log(this.state.row);
  };
  removeStartingMeasure = (cell) => {
    let row = this.state.row;
    let x = this.state.currentSelected;

    if (x === 0) {
      console.log("Cannot Delete The First Starting Measure");
      return;
    }
    row.splice(x, 1);

    this.decrementX();
    row[x][8].barline = true;

    for (let i = 0; i <= this.state.column - 1; i++) {
      row[x][i].firstRow = false;
    }

    this.setState({ row });
    console.log(x, this.state.row);
  };
  increment() {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
  }
  decrement() {
    this.setState({
      currentIndex: this.state.currentIndex - 1,
    });
  }
  incrementX = (cell) => {
    let x = this.state.currentSelected + 1;
    let row = this.state.row;
    let column = this.state.column;
    let rowLength = row.length;
    console.log(x);
    if (x === row.length - 1) {
      return;
    }

    for (let a = x; a < rowLength; a++) {
      if (row[a][0].starting === false) {
        for (let i = 0; i < column; i++) {
          row[a][i].x = a;
        }
      } else {
        row[a][0].x = a;
      }
    }
    this.setState({ row });
  };
  decrementX = (cell) => {
    let x = this.state.currentSelected;
    let row = this.state.row;
    let column = this.state.column;
    let rowLength = row.length;

    for (let a = x; a < rowLength; a++) {
      if (row[a][0].starting === false) {
        for (let i = 0; i < column; i++) {
          row[a][i].x = a;
        }
      } else {
        row[a][0].x = a;
      }
    }

    this.setState({ row });

    // console.log(rowLength)
  };
  clickLeft = (cell) => {
    console.log("Clicked left");

    if (this.props.handle === 1) {
      let row = this.state.row;
      let rowX = cell.x;
      let kind = 4;
      let measure = row[cell.x][8].measure;
      row[cell.x][8].measure = null;

      this.createRow(cell, rowX, kind);

      row[cell.x - 1][8].measure = measure;
      row[cell.x - 1][cell.y].isOpen = true;
      for (let i = 0; i <= this.state.column - 1; i++) {
        row[cell.x - 1][i].note = this.props.note;
      }
      let x = cell.x;
      kind = 6;
      this.findStartingMeasure(x, kind);
      this.setState({ row });
    }

    if (this.props.handle === 2) {
      console.log("Clicked left handle 2");
      if (this.state.row[cell.x - 1][0].starting === true) {
        // THIS IS STARTING, CAN'T CLICK
        console.log("this is starting measure");
        return;
      }
      let swt = true;
      this.props.insertStartingMeasureDisabler(swt);
      this.handle2(cell + 1); // bar
    }
  };
  clickRight = (cell) => {
    console.log("Clicked Right", cell.x + 1);

    let row = this.state.row;
    if (this.props.handle === 0) {
      console.log("Clicked left handle 2", cell.x + 1, row.length);
      if (cell.x + 1 !== row.length) {
        console.log("Clicked left handle 2");
        let kind = 5;
        let side = cell.x + 1;
        this.handle0(cell, kind, side); // bar
      }
    }
    if (this.props.handle === 1) {
      let rowX = cell.x + 1;

      this.createRow(cell, rowX);

      row[cell.x + 1][cell.y].isOpen = true;
      for (let i = 0; i <= this.state.column - 1; i++) {
        row[cell.x + 1][i].note = this.props.note;
      }

      this.incrementX(cell);
      this.setState({ row });
      let x = cell.x;
      let kind = 6;
      this.findStartingMeasure(x, kind);
    }

    if (this.props.handle === 2) {
      let swt = true;
      let kind = 5;
      let side = cell.x + 1;
      this.props.insertStartingMeasureDisabler(swt);
      this.handle2(cell, kind, side); // bar
    }
  };
  click = (cell, kind, mx, my) => {
    let row = this.state.row;
    let handle = this.props.handle;
    if (handle === 0) {
      let swt = false;
      this.props.insertStartingMeasureDisabler(swt);
      let side;
      this.handle0(cell, kind, side, mx, my); // select
    }

    if (handle === 1) {
      let swt = true;
      this.props.insertStartingMeasureDisabler(swt);
      this.handle1(cell); // notes
    }

    if (handle === 2) {
      let swt = true;
      this.props.insertStartingMeasureDisabler(swt);
      this.handle2(cell); // bar
    }

    this.setState({ row });
  };
  handle0 = (cell, kind, side, mx, my) => {
    let row = this.state.row;
    let xValue = cell.x;
    if (kind === 5) {
      xValue = side;
    }
    let currentSelected = this.state.currentSelected;
    row[currentSelected][0].selectColumn = false;
    row[xValue][0].selectColumn = true;

    if (row[xValue][0].starting === true) {
      this.props.viewOptionOn();
    } else {
      this.props.viewOptionOff();
    }
    this.setState({
      x: xValue,
      currentSelected: xValue,
    });

    if (kind === 8) {
      this.ks1(cell, xValue, mx, my);
    }
  };
  handle1 = (cell) => {
    // contain conlose -------------- passing------------
    let row = this.state.row;
    let currentCell = row[cell.x][cell.y]; // get x and y positions
    let x = cell.x;
    let note = this.props.note;

    if (row[x][0].starting === false) {
      if (currentCell.isOpen === false) {
        // 1. Find if one of the cells in current row has a True value for isOpen
        let found = row[x].findIndex((cell) => {
          if (cell.isOpen === true) return true;
          else {
            return false;
          }
        });
        // 2. deside if it is going to make another row next to it or not.
        if (found === -1 && row.length - 1 === x) {
          // if none
          this.setState({
            currentIndex: x,
          });
          // this.createRow(); -----------------------------------------------------------------------------------
        }
        if (cell.x === 1) {
          row[1][8].measure = 1;
        }

        currentCell.isOpen = true;
        currentCell.note = note;
        let kind = 6;
        console.log("find Starting Measure");
        this.findStartingMeasure(x, kind);
        //the length of the note should be equal to it's column
        row[x].findIndex((cell) => {
          cell.note = note;
          return null;
        });
      } else {
        // When Closing ------------------
        currentCell.isOpen = false;
        console.log("this will be CLOSE");
        let found = row[x].findIndex((cell) => {
          // find if there is true in isOpen from the specific row clicked
          if (cell.isOpen === true) return true;
          else {
            return false;
          }
        });
        if (found === -1) {
          console.log(x);
          if (x !== 1) {
            if (x + 1 !== row.length) {
              if (row[x][8].barline === true) {
                // if x is has barline but to be removes, put it in the next x

                if (row[x + 1][8].barline === false) {
                  row[x + 1][8].barline = true;
                  row[x + 1][8].measure = row[x][8].measure;
                  row.splice(x, 1);
                  this.decrementX(cell);
                } else {
                  let a = 0;
                  while (a <= this.state.column - 1) {
                    row[x][a].note = 0;
                    a++;
                  }
                  let type = 1;
                  let error = 0;
                  let measure = row[x][8].measure;
                  this.props.consoleWarningTS(type, measure, error);
                  console.log("wala");
                }
              } else {
                row.splice(x, 1);
                this.decrementX(cell);
              }
            }
          }
        }
        let kind = 1;
        this.findStartingMeasure(x, kind);
      }
      this.setState({
        x: x,
      });
    } else {
      console.log("this is a starting measure");
    }
  };
  handle2 = (cell, kind, side) => {
    // create barline--------------- passing function with console
    let x = cell.x;
    if (kind === 5) {
      x = side;
    }
    let row = this.state.row;
    console.log(x, row.length);
    if (x === row.length) {
      console.log("This is the last row last. Use End Bar line");
      return;
    }
    if (x === 0 || row[x][0].starting === true) {
      // THIS IS STARTING, CAN'T CLICK
      console.log("this is starting measure");
    } else {
      if (row[x - 1][0].starting === false) {
        if (row[x - 1][0].barline === true) {
          console.log(
            "error: declaring barline without notes or rest between barlines"
          );
        } else {
          if (row[x][8].barline === false) {
            //---- switch barline to TRUE
            row[x][8].barline = true;
            let kind = 1;
            console.log(kind);
            this.setState({ row });
            this.findStartingMeasure(x, kind); //  ------  findStartingMeasure => checkingStartingTS => console => setMeasureNum => measureLengthCalc
          } else {
            // ----------------switch barline to FALSE
            row[x][8].barline = false;
            row[x][8].measure = null;
            let kind = 2;
            this.setState({ row });
            this.findStartingMeasure(x, kind); //    ------  findStartingMeasure => checkingStartingTS => toLastNewMeasure => measureLengthCalc
            let rowX;
            this.setMeasureNum(x, rowX, kind);
            let measure = 1;
            for (let a = row.length - 1; a >= 1; a--) {
              console.log(a, row[a][8].measure);
              if (row[a][8].measure !== null) {
                console.log(row[a][8]);
                measure = row[a][8].measure + 1;
                break;
              }
            }
            this.props.recalcuConsoleMeasure(measure);
          }
        }
      }
    }
  };
  setStarting = (cell) => {
    // contain console ---------------------- passing function with console
    let row = this.state.row;
    let x = this.state.currentSelected;
    row[x][0].clef = this.props.clef;
    row[x][0].up = this.props.up;
    row[x][0].down = this.props.down;
    row[x][0].keySig = this.props.keySig;
    //-------FOR TS -----------------------------
    if (row[x][0].up === null || row[x][0].down === null) {
      console.log(" TS not complete");
    } else {
      //then
      if (x === 0) {
        row[x + 1][8].measure = 1;
      }

      let type = 3;
      let error = 4;
      let measure = row[x + 1][8].measure;
      console.log(type, measure, error);
      this.props.removeWarning(type, measure, error);

      this.calcDownUp(x);
      let rowX = x;
      let kind = 1;
      this.measureLengthCalc(x + 1, rowX, kind);
    }
    //-------FOR Clef -----------------------------
    if (row[x][0].Clef === null) {
      console.log(" clef not complete");
    } else {
      let type = 4;
      let error = 6;
      let measure = row[x + 1][8].measure;
      this.props.removeWarning(type, measure, error);
      type = 5;
      error = 11;
      console.log(type, measure, error);
      this.props.removeWarning(type, measure, error);
      let currentSelected = x;
      let kind = 8;
      let mx = null;
      let my = null;
      this.ks2(cell, currentSelected, mx, my, kind);

      row[x][0].keySig = "C";
    }

    this.setState({ row });

    for (x = 0; x < row.length - 1; x++) {
      if (row[x][0].starting === true) {
        let clef = row[x][0].clef;
        let up = row[x][0].up;
        let down = row[x][0].down;
        let keySig = row[x][0].keySig;
        console.log(row[x][0], clef, up, down, keySig);
        this.props.toWorkSheet(clef, up, down, keySig);
      }
    }
  };
  findStartingMeasure = (x, kind) => {
    console.log(x, kind, "Get Starting Position's X axis");
    let row = this.state.row;
    let rowX = 0; //  row[X] Position -------------
    for (let i = x; i >= 0; i--) {
      // find Starting

      if (row[i][0].starting === true) {
        rowX = i;
        break;
      }
    }
    // -------------------------TS-----------------------------------
    if (kind === 1) {
      let kind = 1;
      this.checkingStartingTS(x, rowX, kind);
    }
    if (kind === 2) {
      let kind = 2;
      this.toLastNewMeasure(x, rowX, kind);
      this.measureLengthCalc(x, rowX, kind);
    }
    // -------------------------KS-----------------------------------
    if (kind === 6) {
      let kind = 6;
      this.checkStartingClef(x, rowX, kind);
    }
  };
  //----------------------------------------------------TS----------------------------------------------------------------------------------------
  toLastNewMeasure = (x, rowX, kind) => {
    console.log("Get last clicable position's X axis");
    let row = this.state.row;

    if (kind === 2) {
      let barCount = 0;
      for (let a = rowX; a <= row.length - 2; a++) {
        if (row[a + 1][0].starting === false) {
          if (row[a + 1][8].barline === true) {
            barCount = barCount + 1;
            console.log(row[a + 1][0].starting);
          }
        }
      }

      if (barCount === 0) {
        let measure = row[rowX + 1][8].measure;
        let type = 3;
        let error = 4;
        console.log(type, error, measure, row[rowX + 1][8].measure);

        this.props.removeWarning(type, measure, error);
      }
      console.log("barcount =", barCount);
    }
  };
  checkingStartingTS = (x, rowX, kind) => {
    console.log(x, rowX, "Get Starting first measure's from left axis");
    let row = this.state.row;
    if (kind === 1) {
      let bLValrow = row[rowX][0].barLength;
      let measure = row[rowX + 1][8].measure;
      let type = 3;
      let error = 4;
      if (bLValrow === null) {
        // Adding barline without declaring time signature for starting measure
        let kind = 1;
        console.log(type, error, measure, row[rowX + 1][8].measure);
        this.setMeasureNum(x, rowX, kind); // --------------------measure numbers-----------
        console.log("ggg");
        let up = row[rowX][0].up;
        let down = row[rowX][0].down;
        let barLength = row[rowX][0].barLength;
        let totalNoteValue = row[rowX][0].totalNoteValue;
        this.props.consoleWarningTS(
          type,
          measure,
          error,
          up,
          down,
          barLength,
          totalNoteValue
        );
      } else {
        // -----------------------if Up and Down are not Null
        let kind = 1;
        this.setMeasureNum(x, rowX, kind); // --------------------measure numbers-----------
        console.log("hhh");
        this.measureLengthCalc(x, rowX, kind); //--------  proceed checking left and right measure
      }
    }
    if (kind === 2) {
      console.log("remove");
    }
  };
  setMeasureNum = (x, rowX, kind) => {
    // set Measure Number
    console.log(x, rowX, kind, "Measure number or address");
    let row = this.state.row;
    let measure = 1;
    let kindHandler = 1;
    if (kind === 3) {
      kindHandler = 2;
    }
    for (let a = x - kindHandler; a >= 0; a--) {
      if (a !== 0) {
        if (row[a - 1][0].starting === true) {
          measure = row[a][8].measure;
          break;
        }
        if (row[a][8].barline === true) {
          measure = row[a][8].measure;
          break;
        }
      }
    }
    if (kind === 1) {
      row[x][8].measure = measure + 1; // ------declare current measure number
      measure = measure + 1;
    }

    if (kind === 3) {
      measure = row[x][8].measure;
    }

    for (let b = x + 1; b <= row.length - 1; b++) {
      if (row[b][0].starting === true) {
        console.log(row[b + 1][8]);
        row[b + 1][8].measure = measure + 1;
        measure = measure + 1;
        continue;
      }

      if (row[b][8].barline === true) {
        row[b][8].measure = measure + 1;
        measure = measure + 1;
        continue;
      }
    }
  };
  measureLengthCalc = (x, rowX, kind) => {
    // ------- get measure length   --- if kind 1, get measure length of left measure and right measure

    let row = this.state.row;

    let starting = x - 1;
    let barLength = 0;
    let newX = 1;
    let measure = 1;
    let loop = 1;
    let up = null;
    let down = null;

    console.log(rowX, row[rowX]);
    barLength = row[rowX][0].barLength;
    up = row[rowX][0].up;
    down = row[rowX][0].down;
    if (kind === 1) {
      // if kind 1, need to do 2 loops
      loop = row.length;
    }
    if (kind === 2) {
      // if kind 1, need to do 2 loops
      loop = row.length;
    }

    console.log(loop);
    for (let l = 1; l <= loop; l++) {
      // this is the loop       ------------ LOOP ------------

      for (let n = starting; n >= 0; n--) {
        // set the barLength
        if (row[n][0].starting === true) {
          barLength = row[n][0].barLength;
          break;
        }
      }
      console.log("loop number=", l, "Bar Length=", barLength);
      for (let n = starting; n >= 0; n--) {
        // set the Strting POINT (newX) and measure   --- or The 1st column in  measure
        if (row[n][0].starting === true) {
          newX = n + 1;
          measure = row[n + 1][8].measure;
          break;
        }
        if (row[n][8].barline === true) {
          newX = n;
          measure = row[n][8].measure;
          break;
        }
      }

      console.log(
        x,
        starting,
        kind,
        "Measure length Calc",
        "newX =",
        newX,
        "Measure=",
        measure
      );
      //--------------------------------------------------
      let ret = false;
      let noteValue = [0]; // added Zero for reduce()
      let nS = 0;
      let nM = 0;
      let nBL = barLength;

      for (let b = newX; b <= row.length - 1; b++) {
        if (row[b][0].starting === true) {
          // break to the starting measure or a bar line

          nS = b + 1;
          nM = row[b + 1][8].measure;
          console.log(row[b][0].barLength);
          console.log(row[b][8], newX);
          nBL = row[b][0].barLength;
          if (row[b][0].barLength === null) {
            // if the next starting measure's Time Siganture is NULL consoleWarn
            for (let c = b; c <= row.length; c++) {
              let type = 3;
              let error = 4;
              let measure = row[c][0].measure;
              let up = row[c][0].up;
              let barLength = row[c][0].barLength;
              let down = row[c][0].down;
              let totalNoteValue = row[rowX][0].totalNoteValue;
              console.log(measure);
              if (row[c][0].starting === true) {
                this.props.consoleWarningTS(
                  type,
                  measure,
                  error,
                  up,
                  down,
                  barLength,
                  totalNoteValue
                );
              } else {
                b = c;
                break;
              }
            }
          }

          break;
        }
        if (row[b][8].barline === true) {
          nS = b;
          nM = row[b][8].measure;
          console.log(row[b][8], newX);
          if (b !== newX) {
            break;
          }
        }

        if (row[b][0].note === 1) {
          noteValue.push(4);
        }
        if (row[b][0].note === 2) {
          noteValue.push(2);
        }
        if (row[b][0].note === 4) {
          noteValue.push(1);
        }

        if (b === row.length - 1) {
          ret = true;
        }
      }
      let totalNoteValue = noteValue.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });

      console.log(measure, barLength, "vs", totalNoteValue);
      // -------------------------

      let type = 1;
      console.log(barLength, totalNoteValue, kind);
      if (barLength === null) {
        starting = nS;
        measure = nM;
        barLength = nBL;
        console.log(starting, measure, barLength);
        if (ret === true) {
          console.log("Done");
          return;
        }
        continue;
      }

      if (barLength > totalNoteValue) {
        let error = 1;
        this.props.consoleWarningTS(
          type,
          measure,
          error,
          up,
          down,
          barLength,
          totalNoteValue
        );
        console.log("kulang");
      }
      if (barLength < totalNoteValue) {
        let error = 2;
        this.props.consoleWarningTS(
          type,
          measure,
          error,
          up,
          down,
          barLength,
          totalNoteValue
        );
        console.log("sobra");
      }
      if (barLength === totalNoteValue) {
        console.log("chakto");
        this.props.removeWarning(type, measure);
      }

      // measure = nextMeasure
      // barLength = nextBarLength
      starting = nS;
      measure = nM;
      barLength = nBL;
      console.log(starting, measure, barLength);
      if (ret === true) {
        console.log("Done");
        return;
      }
    }
  };
  calcDownUp = (x) => {
    let row = this.state.row;
    let up = this.props.up;
    let down = this.props.down;
    let calcDown = 0;
    let c = 4;
    let i = 0;
    console.log(up, down);
    while (calcDown !== 4 || i < 7) {
      //current note value should be 4 && do while for 7 times only, limit to 7
      calcDown = c * down;
      if (calcDown !== 4) {
        c = c / 2;
      } else {
        break;
      }
      i++;
    }
    let barLength = c * up;
    console.log(barLength);
    row[x][0].barLength = barLength;
    this.setState({ row });
  };
  valuePerMeasureCalc = (cell, h, x, m) => {
    // contain console
    console.log("valuePerMeasureCalc", cell, h, x, m);
    let row = this.state.row;
    let currentX = 0;
    let starting = 0;
    let barline = 1;
    let startingMeasure = 0; //--- THIS IS THE MEASURE

    for (let i = currentX; i >= 1; i--) {
      // find Starting Measure
      if (row[i][0].starting === false) {
        if (row[i][8].barline === true) {
          // if found...
          barline = i;
          break;
        } else {
          continue;
        }
      } else {
        barline = i + 1;
        break;
      }
    }
    startingMeasure = row[barline][8].measure;
    let measure = startingMeasure;

    console.log(m);

    //------------------------------------------------------------------------------------------------------------
    let noteValue = [0]; // added Zero for reduce()
    for (
      let i = barline;
      i <= row.length - 1 ||
      row[i - 1][0].starting === true ||
      row[i - 1][8].barline === true;
      i++
    ) {
      // find end of Measure
      console.log(barline, measure);
      if (row[i][0].starting === false) {
        if (row[i][8].barline === false) {
          if (row[i][0].note === 1) {
            console.log("pushed 4");
            noteValue.push(4);
          }
          if (row[i][0].note === 2) {
            console.log("pushed 2");
            noteValue.push(2);
          }
          if (row[i][0].note === 4) {
            console.log("pushed 1");
            noteValue.push(1);
          }
        } else {
          break;
        }
      } else {
        break;
      }
    }
    console.log(noteValue);
    let barLength = row[starting][0].barLength;
    let totalNoteValue = noteValue.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
    console.log(startingMeasure, barLength, "vs", totalNoteValue);
    let type = 1;
    let up = row[starting][0].up;
    let down = row[starting][0].down;
    if (barLength > totalNoteValue) {
      let error = 1;
      this.props.consoleWarningTS(type, measure, error, up, down);
      console.log("kulang");
      return;
    }
    if (barLength < totalNoteValue) {
      let error = 2;
      this.props.consoleWarningTS(type, measure, error, up, down);
      console.log("sobra");
      return;
    }
    if (barLength === totalNoteValue) {
      console.log(h, m);

      console.log("chakto");
      this.props.removeWarning(type, measure, up, down);
      return;
    }
    console.log(
      currentX,
      starting,
      barline,
      barLength,
      totalNoteValue,
      startingMeasure
    );
  };
  //----------------------------------------------------Clef--------------------------------------------------------------------------------------

  checkStartingClef = (x, rowX, kind) => {
    let row = this.state.row;
    let a = null;
    if (kind === 6) {
      a = rowX;
    }
    if (kind === 7) {
      a = x;
    }
    console.log(row[a][0]);
    if (row[a][0].clef === null) {
      let type = 4;
      let measure = row[a + 1][8].measure;
      let error = 6;
      this.props.consoleWarningClef(type, measure, error);
    } else {
      this.measureLengthCalc(x, rowX, kind);
    }
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------

  componentDidMount() {
    this.createMeasureRow();
    this.createRow();
    this.measure1();
    this.props.insertStartingMeasure(this.insertStartingMeasure);
    this.props.setStarting(this.setStarting);
    this.props.removeStartingMeasure(this.removeStartingMeasure);
  }

  measure1() {
    let row = this.state.row;
    row[1][8].measure = 1;
    this.setState({ row });
  }

  //-----------------------------RENDER HERE------------------------------------
  render() {
    let rows = this.state.row.map((row, index) => {
      return (
        <Row
          cells={row}
          key={index}
          click={this.click}
          clickLeft={this.clickLeft}
          clickRight={this.clickRight}
          ks1={this.ks1}
          ks2={this.ks2}
        />
      );
    });
    return (
      <div className="row">
        <div>
          <Timer
            row={this.state.row}
            column={this.state.column}
            tempo={this.props.tempo}
            timeSig={this.props.timeSig}
            currentSelected={this.state.currentSelected}
            startPauseSwitch={this.props.startPauseSwitch}
            clockStop={this.props.clockStop}
            volume={this.props.volume}
            playerIcon={this.props.playerIcon}
            consoleWarningClef={this.props.consoleWarningClef}
          />
        </div>

        {rows}
      </div>
    );
  }
}

export default Board;
