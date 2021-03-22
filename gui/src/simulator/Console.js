import React from 'react';
//type 1 = Time signature
  //error 1 Empty measure
  //error 2 Insuficient beat counts at measure 
  //error 3 Time Signature is not yet set at measure
  //error 4 Clef is note yet set at measure
//type 2 = Clef
  const Console = props => {

    let renderConsole = () => { 

      if (props.consWarn.start === true){ //for starting only
        if (props.consWarn.warns === 0 ){
          return (   
          <div className = "console-warning" >No Problems found</div>
          )
        }

        else {
          return (   
            <div className = "console-warning" >({props.consWarn.warns  - 1}) Problems found</div>
          )
        }
      }
      else {
        let icon = ["Warning" , "TS", "Bl", "N", "Clef", "KS"];
        let error = [
                    "Empty measure",                                                            // 0
                    "Insuficient beat counts at measure ",                                      // 1
                    "Too much notes at measure ",                                               // 2
                    "Time Signature is not yet set for measure",                                // 3
                    "Adding barline without declaring time signature for starting measure",     // 4
                    "Adding Note without starting measure is not fully for starting measure",   // 5

                    "Clef is note yet set for measure",                                         // 6
                    "Unable to play without knowing the clef",                                  // 7

                    "Putting another accidental vertically. Warning detected before measure",   //8
                    "Putting another accidental Horizontally. Warning detected before measure", //9
                    "Putting different kind of accidental",                                     //10
                    "Declaring key signiture without Clef before measure",                      //11

                    "Unkown Key Signature before measure"                                       //12
                    ];
        let expln = [
                      {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null, i: null, j: null, k: null},
                    ] 

        let m =  props.consWarn.measure;
        let t = props.consWarn.type;
        let e =  props.consWarn.error;

          if (e === 0) {
            if (props.consWarn.clef === null) {expln[t].a = "Blank measure."}
          }

          if (e === 1 || e === 2) {
            expln[0].a = "Time signature is sets at"
            expln[0].b = props.consWarn.up
            expln[0].c = props.consWarn.down
            expln[0].d = "so the total beats per measure shoud be"
            expln[0].e = props.consWarn.barLength

              if(props.consWarn.totalNoteValue !== 0) {
                expln[0].f = "but you put a total beats of"
                expln[0].g =  props.consWarn.totalNoteValue
              }

              else {
                expln[0].f = "but there is no note on measure"
                expln[0].g = m
              }
            }

          if (e === 3 || e === 4) {
            if (props.consWarn.up === null) {expln[0].a = "Set the top number of time signature."}
            if (props.consWarn.up !== null && props.consWarn.down === null) {expln[0].b = "Set the bottom number of time signature."}
            if (props.consWarn.down === null) {expln[0].c = "Also, set the bottom number."}
          }

          if (e === 5) {
            expln[0].a = "Clef is not yet set."
          }

          if (e === 6) {
            expln[0].a = "Clef is not yet set. Set up clef before measure"
            expln[0].b ={m}
            expln[0].c = "to know what key you are now."
          }

          if (e === 7) {
            expln[0].a = "To hear the tone, set the clef before measure,"
            expln[0].b ={m}
          }

          if (e === 8) {
            expln[0].a = "If you wish to add more"
            expln[0].b = props.consWarn.accidental
            expln[0].c = ", draw to it in the right column. Warning is before measure"
            // expln[0].d ={m}
          }

          return (   
            <div>
                <div className = "console-warning">

                  <div className = "warning-circle-yellow" >{icon[t]}</div><br/>
                    <div className = "warning-what" >
                      {error[e]} {props.consWarn.measure}<br/>                      
                       measure={m};type={t};error ={e}
                    </div>

                    { props.consWarn.show ? 
                      <div className = "console-warning-read-more-context">
                        {expln[0].a} {expln[0].b} {expln[0].c} {expln[0].d} {expln[0].e} {expln[0].f} {expln[0].g}
                      </div>
                    : null}
                </div>

              <button className = "console-warning-read-more" onClick={() =>props.readMore(t, m, e)} >Learn more.</button>
            </div>
          )
      }

    }
    return renderConsole();
    };

  export default Console;