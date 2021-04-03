import React from 'react';


  const Cells = props => {
    let renderCell = () => {

      if (props.data.clickable === true) {

        let a = false
        let b = true
        let aLR = false;
        let bLR = true;
        let c = true;

        if ( props.data.lineStaff === true) {
          aLR = true;
          bLR=false;
        }

        if (props.data.note > 0) {
          a = true;
          b = false;
        }

        if (props.data.lineStaff === true) {
          c = false;
        }
        
        if (props.data.isOpen === false) {
          return (
          <div>
            {b ? 
              <div>
                <div className= "cell-enabler" onClick={() => props.click(props.data)}>

                <div className = "measure-text" >{props.data.measure}</div>
                  {<div>
                    {props.data.selectColumn ? <div className = "selected"></div>: null} 
                  </div>
                  }
                  {
                    props.data.barline ? <div className = "barline"></div>: null}

                  {props.data.lineStaff ? <div className = "staff-line"></div>: null}
                </div>
              </div>
            :null }

            {a ?
              <div>
                <div className= "cell-enabler-isOpen">

                <div className = "measure-text" >{props.data.measure}</div>
                  {<div>{props.data.selectColumn ? <div className = "selected"></div>: null} </div>}
                    {props.data.barline ? <div className = "barline"></div>: null}
                  
                    { props.data.firstRow ? <div className= "cell-enabler" onClick={() => props.clickLeft(props.data)}>
                      { aLR && props.data.firstRow ? <div className = "staff-line-leftRight"></div>: null}
                      { bLR && props.data.firstRow ? <div className = "staff-space-leftRight"></div>: null}
                    </div>: null}
{/* //-------------------- */}


<div className= "cell-enabler" onClick={() => props.click(props.data)}>
                      { c ? <div className ="emptyNote-space"></div>: null}
                      {props.data.lineStaff ? <div className ="emptyNote-line" ></div>: null}
</div>                 



                      <div className= "cell-enabler" onClick={() => props.clickRight(props.data)}>
                        { aLR ? <div className = "staff-line-leftRight"></div>: null}
                        { bLR ? <div className = "staff-space-leftRight"></div>: null}
                      </div>
                      
                        { aLR  ? <div className = "staff-line-leftRight"></div>: null}
                        { bLR ? <div className = "staff-space-leftRight"></div>: null}
                      

                </div>
              </div>: null }

          </div>

          )
        }

        else {

          let aLR = false;
          let bLR = true;

          if ( props.data.lineStaff === true) {
            aLR = true;
            bLR=false;
          }


            return (

                <div>
                  <div className= "cell-enabler-isOpen">
                  <div className = "measure-text" >{props.data.measure}</div>

                  <div>{props.data.selectColumn ? <div className = "selected"></div>: null}</div>
                  { props.data.barline ? <div className = "barline"> </div>: null }
                    { props.data.firstRow ? <div className= "cell-enabler" onClick={() => props.clickLeft(props.data)}>
                      { aLR && props.data.firstRow ? <div className = "staff-line-leftRight">{props.data.selectColumn ? <div className = "selected"></div>: null}</div>: null}
                      { bLR && props.data.firstRow ? <div className = "staff-space-leftRight">{ props.data.selectColumn ? <div className = "selected"></div>: null}</div>: null}
                  </div>: null}
                  <div className= "cell-enabler" onClick={() => props.click(props.data)}>b 
                      { props.data.isOpen ? <div className ="whole">{props.data.note} </div>: null }
                  </div>
                      <div className= "cell-enabler" onClick={() => props.clickRight(props.data)}>  
                        { aLR ? <div className = "staff-line-leftRight">{props.data.selectColumn ? <div className = "selected"></div>: null}</div>: null}
                        { bLR ? <div className = "staff-space-leftRight">{ props.data.selectColumn ? <div className = "selected"></div>: null}</div>: null}
                      </div>
                  </div>
                </div>

            )        
        }


      }
      
      else { // Clickable = False-----   this. is for the starting
          let kind = 8
                return (   
                  <div>
                    <div className = "measure" onClick={() => props.click(props.data)}><div className ="barline-starting"></div>
                      
                      {
                        props.data.selectColumn ? <div className = "selected">
                        </div>: null
                      }
                      <div className= "measure-line" ></div>
                      <div className= "measure-line" ></div>
                      <div className= "measure-line" ></div>

{/* 6th S */}
                  <div className= "measure-line" >
                    <div className = "staff-space-starting"></div>

                    <div className = "measure-cell" onClick={() => {
                      props.data.mx = 0; props.data.my = 0; let mx = 0; let my = 0; props.click(props.data, kind, mx, my )}
                        } ><div className = "measure-staff-space-ks">
                          { props.data.accLocation[0][0].my ?<h2>{props.data.accLocation[0][0].acc}</h2>: null} 
                          </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 0; let mx = 1; let my = 0; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[1][0].my ?<h2>{props.data.accLocation[1][0].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 0; let mx = 2; let my = 0; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[2][0].my ?<h2>{props.data.accLocation[2][0].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 0; let mx = 3; let my = 0; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[3][0].my ?<h2>{props.data.accLocation[3][0].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 0; let mx = 4; let my = 0; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[4][0].my ?<h2>{props.data.accLocation[4][0].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 0; let mx = 5; let my = 0; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[5][0].my ?<h2>{props.data.accLocation[5][0].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 0; let mx = 6; let my = 0; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[6][0].my ?<h2>{props.data.accLocation[6][0].acc}</h2>: null}</div></div>: null}
                  </div>     
{/* 5th L */}
                  <div className= "measure-line" >
                  <div className = "staff-line-starting"></div>

                    <div className = "measure-cell" onClick={() => {
                        props.data.mx = 0; props.data.my = 1; let mx = 0; let my = 1; props.click(props.data, kind, mx, my )}
                        } ><div className = "measure-staff-line-ks">
                          { props.data.accLocation[0][1].my ?<h2>{props.data.accLocation[0][1].acc}</h2>: null} 
                          </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 1; let mx = 1; let my = 1; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[1][1].my ?<h2>{props.data.accLocation[1][1].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 1; let mx = 2; let my = 1; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[2][1].my ?<h2>{props.data.accLocation[2][1].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 1; let mx = 3; let my = 1; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[3][1].my ?<h2>{props.data.accLocation[3][1].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 1; let mx = 4; let my = 1; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[4][1].my ?<h2>{props.data.accLocation[4][1].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 1; let mx = 5; let my = 1; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[5][1].my ?<h2>{props.data.accLocation[5][1].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 1; let mx = 6; let my = 1; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[6][1].my ?<h2>{props.data.accLocation[6][1].acc}</h2>: null}</div></div>: null}
                  </div>
{/* 4th S */}                      
                  <div className= "measure-line" >
                  <div className = "staff-space-starting"></div>

<div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 2; let mx = 0; let my = 2; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[0][2].my ?<h2>{props.data.accLocation[0][2].acc}</h2>: null} 
                      </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 2; let mx = 1; let my = 2; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[1][2].my ?<h2>{props.data.accLocation[1][2].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 2; let mx = 2; let my = 2; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[2][2].my ?<h2>{props.data.accLocation[2][2].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 2; let mx = 3; let my = 2; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[3][2].my ?<h2>{props.data.accLocation[3][2].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 2; let mx = 4; let my = 2; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[4][2].my ?<h2>{props.data.accLocation[4][2].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 2; let mx = 5; let my = 2; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[5][2].my ?<h2>{props.data.accLocation[5][2].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 2; let mx = 6; let my = 2; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[6][2].my ?<h2>{props.data.accLocation[6][2].acc}</h2>: null}</div></div>: null}

                  </div>
{/* 4th L */}
                  <div className= "measure-line" >  <div className = "measure-staff-line-clef"></div><div className = "measure-staff-line-ts"><h1>{props.data.up}</h1></div>

                        <div className = "measure-cell" onClick={() => {
  props.data.mx = 0; props.data.my = 3; let mx = 0; let my = 3; props.click(props.data, kind, mx, my )}
                        } ><div className = "measure-staff-line-ks">
                          { props.data.accLocation[0][3].my ?<h2>{props.data.accLocation[0][3].acc}</h2>: null} 
                          </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 3; let mx = 1; let my = 3; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[1][3].my ?<h2>{props.data.accLocation[1][3].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 3; let mx = 2; let my = 3; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[2][3].my ?<h2>{props.data.accLocation[2][3].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 3; let mx = 3; let my = 3; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[3][3].my ?<h2>{props.data.accLocation[3][3].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 3; let mx = 4; let my = 3; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[4][3].my ?<h2>{props.data.accLocation[4][3].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 3; let mx = 5; let my = 3; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[5][3].my ?<h2>{props.data.accLocation[5][3].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 3; let mx = 6; let my = 3; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[6][3].my ?<h2>{props.data.accLocation[6][3].acc}</h2>: null}</div></div>: null}
                  </div>
{/* 3th S */}                      
<div className= "measure-line" >
                  <div className = "staff-space-starting"></div>

<div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 4; let mx = 0; let my = 4; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[0][4].my ?<h2>{props.data.accLocation[0][4].acc}</h2>: null} </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 4; let mx = 1; let my = 4; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[1][4].my ?<h2>{props.data.accLocation[1][4].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 4; let mx = 2; let my = 4; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[2][4].my ?<h2>{props.data.accLocation[2][4].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 4; let mx = 3; let my = 4; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[3][4].my ?<h2>{props.data.accLocation[3][4].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 4; let mx = 4; let my = 4; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[4][4].my ?<h2>{props.data.accLocation[4][4].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 4; let mx = 5; let my = 4; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[5][4].my ?<h2>{props.data.accLocation[5][4].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 4; let mx = 6; let my = 4; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[6][4].my ?<h2>{props.data.accLocation[6][4].acc}</h2>: null}</div></div>: null}

                  </div>
{/* 3th L */}
<div className= "measure-line" ><h1> {props.data.clef}</h1><div className = "staff-line-starting"></div>
                      
                      
                    <div className = "measure-cell" onClick={() => 
                    {props.data.mx = 0; props.data.my = 5; let mx = 0; let my = 5; props.click(props.data, kind, mx, my )}
                      } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[0][5].my ?<h2>{props.data.accLocation[0][5].acc}</h2>: null} </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 5; let mx = 1; let my = 5; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[1][5].my ?<h2>{props.data.accLocation[1][5].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 5; let mx = 2; let my = 5; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[2][5].my ?<h2>{props.data.accLocation[2][5].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 5; let mx = 3; let my = 5; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[3][5].my ?<h2>{props.data.accLocation[3][5].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 5; let mx = 4; let my = 5; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[4][5].my ?<h2>{props.data.accLocation[4][5].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 5; let mx = 5; let my = 5; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[5][5].my ?<h2>{props.data.accLocation[5][5].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 5; let mx = 6; let my = 5; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[6][5].my ?<h2>{props.data.accLocation[6][5].acc}</h2>: null}</div></div>: null}


                      </div>
{/* 2th S */}                      
                  <div className= "measure-line" >
                  <div className = "staff-space-starting"></div>

                    <div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 6; let mx = 0; let my = 6; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[0][6].my ?<h2>{props.data.accLocation[0][6].acc}</h2>: null} </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 6; let mx = 1; let my = 6; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[1][6].my ?<h2>{props.data.accLocation[1][6].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 6; let mx = 2; let my = 6; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[2][6].my ?<h2>{props.data.accLocation[2][6].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 6; let mx = 3; let my = 6; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[3][6].my ?<h2>{props.data.accLocation[3][6].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 6; let mx = 4; let my = 6; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[4][6].my ?<h2>{props.data.accLocation[4][6].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 6; let mx = 5; let my = 6; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[5][6].my ?<h2>{props.data.accLocation[5][6].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 6; let mx = 6; let my = 6; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[6][6].my ?<h2>{props.data.accLocation[6][6].acc}</h2>: null}</div></div>: null}
                  </div>
{/* 2th L */}
                  <div className= "measure-line" >  <div className = "measure-staff-line-clef"></div><div className = "measure-staff-line-ts"><h1>{props.data.down}</h1></div>

                  <div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 7; let mx = 0; let my = 7; props.click(props.data, kind, mx, my )}
                  } ><div className = "measure-staff-line-ks">
                    { props.data.accLocation[0][7].my ?<h2>{props.data.accLocation[0][7].acc}</h2>: null} 
                    </div></div>

                  { props.data.accLocation[0][11].my ? 
                  <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 7; let mx = 1; let my = 7; props.click(props.data, kind, mx, my )}
                  } ><div className = "measure-staff-line-ks">
                  { props.data.accLocation[1][7].my ?<h2>{props.data.accLocation[1][7].acc}</h2>: null} </div></div>: null}

                  { props.data.accLocation[1][11].my ? 
                  <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 7; let mx = 2; let my = 7; props.click(props.data, kind, mx, my )}
                  } ><div className = "measure-staff-line-ks">
                  { props.data.accLocation[2][7].my ?<h2>{props.data.accLocation[2][7].acc}</h2>: null} </div></div>: null}

                  { props.data.accLocation[2][11].my ? 
                  <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 7; let mx = 3; let my = 7; props.click(props.data, kind, mx, my )}
                  } ><div className = "measure-staff-line-ks">
                  { props.data.accLocation[3][7].my ?<h2>{props.data.accLocation[3][7].acc}</h2>: null} </div></div>: null}

                  { props.data.accLocation[3][11].my ? 
                  <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 7; let mx = 4; let my = 7; props.click(props.data, kind, mx, my )}
                  } ><div className = "measure-staff-line-ks">
                  { props.data.accLocation[4][7].my ?<h2>{props.data.accLocation[4][7].acc}</h2>: null}</div></div>: null}

                  { props.data.accLocation[4][11].my ? 
                  <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 7; let mx = 5; let my = 7; props.click(props.data, kind, mx, my )}
                  } ><div className = "measure-staff-line-ks">
                  { props.data.accLocation[5][7].my ?<h2>{props.data.accLocation[5][7].acc}</h2>: null}</div></div>: null}

                  { props.data.accLocation[5][11].my ? 
                  <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 7; let mx = 6; let my = 7; props.click(props.data, kind, mx, my )}
                  } ><div className = "measure-staff-line-ks">
                  { props.data.accLocation[6][7].my ?<h2>{props.data.accLocation[6][7].acc}</h2>: null}</div></div>: null}
                  </div>
{/* 1th S */}                      
<div className= "measure-line" >
                  <div className = "staff-space-starting"></div>

                    <div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 8; let mx = 0; let my = 8; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[0][8].my ?<h2>{props.data.accLocation[0][8].acc}</h2>: null} </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 8; let mx = 1; let my = 8; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[1][8].my ?<h2>{props.data.accLocation[1][8].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 8; let mx = 2; let my = 8; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[2][8].my ?<h2>{props.data.accLocation[2][8].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 8; let mx = 3; let my = 8; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[3][8].my ?<h2>{props.data.accLocation[3][8].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 8; let mx = 4; let my = 8; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[4][8].my ?<h2>{props.data.accLocation[4][8].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 8; let mx = 5; let my = 8; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[5][8].my ?<h2>{props.data.accLocation[5][8].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 8; let mx = 6; let my = 8; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[6][8].my ?<h2>{props.data.accLocation[6][8].acc}</h2>: null}</div></div>: null}
                  </div>
{/* 5th L */}
                  <div className= "measure-line" >
                  <div className = "staff-line-starting"></div>

                    <div className = "measure-cell" onClick={() => {
  props.data.mx = 0; props.data.my = 9; let mx = 0; let my = 9; props.click(props.data, kind, mx, my )}
                        } ><div className = "measure-staff-line-ks">
                          { props.data.accLocation[0][9].my ?<h2>{props.data.accLocation[0][9].acc}</h2>: null} </div></div>
                          
                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 9; let mx = 1; let my = 9; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[1][9].my ?<h2>{props.data.accLocation[1][9].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 9; let mx = 2; let my = 9; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[2][9].my ?<h2>{props.data.accLocation[2][9].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 9; let mx = 3; let my = 9; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[3][9].my ?<h2>{props.data.accLocation[3][9].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 9; let mx = 4; let my = 9; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[4][9].my ?<h2>{props.data.accLocation[4][9].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 9; let mx = 5; let my = 9; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[5][9].my ?<h2>{props.data.accLocation[5][9].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 9; let mx = 6; let my = 9; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-line-ks">
                      { props.data.accLocation[6][9].my ?<h2>{props.data.accLocation[6][9].acc}</h2>: null}</div></div>: null}
                  </div>

                  <div className= "measure-line" >
                    <div className = "staff-space-starting"></div>

                    <div className = "measure-cell" onClick={() => {
                      props.data.mx = 0; props.data.my = 10 ; let mx = 0; let my = 10; props.click(props.data, kind, mx, my )}
                        } ><div className = "measure-staff-space-ks">
                          { props.data.accLocation[0][10].my ?<h2>{props.data.accLocation[0][10].acc}</h2>: null} 
                          </div></div>

                      { props.data.accLocation[0][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 10; let mx = 1; let my = 10; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[1][0].my ?<h2>{props.data.accLocation[1][10].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[1][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 10; let mx = 2; let my = 10; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[2][0].my ?<h2>{props.data.accLocation[2][10].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[2][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 10; let mx = 3; let my = 10; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[3][0].my ?<h2>{props.data.accLocation[3][10].acc}</h2>: null} </div></div>: null}

                      { props.data.accLocation[3][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 10; let mx = 4; let my = 10; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[4][0].my ?<h2>{props.data.accLocation[4][10].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[4][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 10; let mx = 5; let my = 10; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[5][0].my ?<h2>{props.data.accLocation[5][10].acc}</h2>: null}</div></div>: null}

                      { props.data.accLocation[5][11].my ? 
                    <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 10; let mx = 6; let my = 10; props.click(props.data, kind, mx, my )}
                    } ><div className = "measure-staff-space-ks">
                      { props.data.accLocation[6][0].my ?<h2>{props.data.accLocation[6][10].acc}</h2>: null}</div></div>: null}
                  </div> 

                      </div>
                    </div>
                )

              
      }


    }
    return renderCell();
    };

  export default Cells;


























//   import React from 'react';


//   const Cells = props => {
//     let renderCell = () => {

//       if (props.data.clickable === true) {

//         let a = false
//         let b = true
//         let aLR = false;
//         let bLR = true;
//         let c = true;

//         if ( props.data.lineStaff === true) {
//           aLR = true;
//           bLR=false;
//         }

//         if (props.data.note > 0) {
//           a = true;
//           b = false;
//         }

//         if (props.data.lineStaff === true) {
//           c = false;
//         }
        
//         if (props.data.isOpen === false) {
//           return (
//           <div>
//             {b ? 
//               <div>
//                 <div className= "cell-enabler" onClick={() => props.click(props.data)}>

//                 <div className = "measure-text" >{props.data.measure}</div>
//                   {<div>
//                     {props.data.selectColumn ? <div className = "selected"></div>: null} 
//                   </div>
//                   }
//                   {
//                     props.data.barline ? <div className = "barline"></div>: null}

//                   {props.data.lineStaff ? <div className = "staff-line"></div>: null}
//                 </div>
//               </div>
//             :null }

//             {a ?
//               <div>
//                 <div className= "cell-enabler-isOpen">

//                 <div className = "measure-text" >{props.data.measure}</div>
//                   {<div>{props.data.selectColumn ? <div className = "selected"></div>: null} </div>}
//                     {props.data.barline ? <div className = "barline"></div>: null}
                  
//                     { props.data.firstRow ? <div className= "cell-enabler" onClick={() => props.clickLeft(props.data)}>
//                       { aLR && props.data.firstRow ? <div className = "staff-line-leftRight"></div>: null}
//                       { bLR && props.data.firstRow ? <div className = "staff-space-leftRight"></div>: null}
//                     </div>: null}
// {/* //-------------------- */}


// <div className= "cell-enabler" onClick={() => props.click(props.data)}>
//                       { c ? <div className ="emptyNote-space"  ></div>: null}
//                       {props.data.lineStaff ? <div className ="emptyNote-line" ></div>: null}
// </div>                 



//                       <div className= "cell-enabler" onClick={() => props.clickRight(props.data)}>
//                         { aLR ? <div className = "staff-line-leftRight"></div>: null}
//                         { bLR ? <div className = "staff-space-leftRight"></div>: null}
//                       </div>
                      
//                         { aLR  ? <div className = "staff-line-leftRight"></div>: null}
//                         { bLR ? <div className = "staff-space-leftRight"></div>: null}
                      

//                 </div>
//               </div>: null }

//           </div>

//           )
//         }

//         else {

//           let aLR = false;
//           let bLR = true;

//           if ( props.data.lineStaff === true) {
//             aLR = true;
//             bLR=false;
//           }


//             return (

//                 <div>
//                   <div className= "cell-enabler-isOpen">
//                   <div className = "measure-text" >{props.data.measure}</div>

//                   <div>{props.data.selectColumn ? <div className = "selected"></div>: null}</div>
//                   { props.data.barline ? <div className = "barline"> </div>: null }
//                     { props.data.firstRow ? <div className= "cell-enabler" onClick={() => props.clickLeft(props.data)}>
//                       { aLR && props.data.firstRow ? <div className = "staff-line-leftRight">{props.data.selectColumn ? <div className = "selected"></div>: null}</div>: null}
//                       { bLR && props.data.firstRow ? <div className = "staff-space-leftRight">{ props.data.selectColumn ? <div className = "selected"></div>: null}</div>: null}
//                   </div>: null}
//                   <div className= "cell-enabler" onClick={() => props.click(props.data)}>b 
//                       { props.data.isOpen ? <div className ="whole">{props.data.note} </div>: null }
//                   </div>
//                       <div className= "cell-enabler" onClick={() => props.clickRight(props.data)}>  
//                         { aLR ? <div className = "staff-line-leftRight">{props.data.selectColumn ? <div className = "selected"></div>: null}</div>: null}
//                         { bLR ? <div className = "staff-space-leftRight">{ props.data.selectColumn ? <div className = "selected"></div>: null}</div>: null}
//                       </div>
//                   </div>
//                 </div>

//             )        
//         }


//       }
      
//       else { // Clickable = False-----   this. is for the starting
//           let kind = 8
//                 return (   
//                   <div>
//                     <div className = "measure" onClick={() => props.click(props.data)}><div className ="barline-starting"></div>
                      
//                       {
//                         props.data.selectColumn ? <div className = "selected">
//                         </div>: null
//                       }
//                       <div className= "measure-line" ></div>
//                       <div className= "measure-line" ></div>
//                       <div className= "measure-line" ></div>

// {/* 6th S */}
//                   <div className= "measure-line" >
//                     <div className = "staff-space-starting"></div>

//                     <div className = "measure-cell" onClick={() => {
//                       props.data.mx = 0; props.data.my = 0; let mx = 0; let my = 0; props.click(props.data, kind, mx, my )}
//                         } ><div className = "measure-staff-space-ks">
//                           { props.data.accLocation[0][0].my ?<h2>{props.data.accLocation[0][0].acc}</h2>: null} 
//                           </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 0; let mx = 1; let my = 0; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[1][0].my ?<h2>{props.data.accLocation[1][0].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 0; let mx = 2; let my = 0; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[2][0].my ?<h2>{props.data.accLocation[2][0].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 0; let mx = 3; let my = 0; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[3][0].my ?<h2>{props.data.accLocation[3][0].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 0; let mx = 4; let my = 0; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[4][0].my ?<h2>{props.data.accLocation[4][0].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 0; let mx = 5; let my = 0; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[5][0].my ?<h2>{props.data.accLocation[5][0].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 0; let mx = 6; let my = 0; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[6][0].my ?<h2>{props.data.accLocation[6][0].acc}</h2>: null}</div></div>: null}
//                   </div>     
// {/* 5th L */}
//                   <div className= "measure-line" >
//                   <div className = "staff-line-starting"></div>

//                     <div className = "measure-cell" onClick={() => {
//                         props.data.mx = 0; props.data.my = 1; let mx = 0; let my = 1; props.click(props.data, kind, mx, my )}
//                         } ><div className = "measure-staff-line-ks">
//                           { props.data.accLocation[0][1].my ?<h2>{props.data.accLocation[0][1].acc}</h2>: null} 
//                           </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 1; let mx = 1; let my = 1; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[1][1].my ?<h2>{props.data.accLocation[1][1].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 1; let mx = 2; let my = 1; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[2][1].my ?<h2>{props.data.accLocation[2][1].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 1; let mx = 3; let my = 1; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[3][1].my ?<h2>{props.data.accLocation[3][1].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 1; let mx = 4; let my = 1; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[4][1].my ?<h2>{props.data.accLocation[4][1].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 1; let mx = 5; let my = 1; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[5][1].my ?<h2>{props.data.accLocation[5][1].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 1; let mx = 6; let my = 1; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[6][1].my ?<h2>{props.data.accLocation[6][1].acc}</h2>: null}</div></div>: null}
//                   </div>
// {/* 4th S */}                      
//                   <div className= "measure-line" >
//                   <div className = "staff-space-starting"></div>

// <div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 2; let mx = 0; let my = 2; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[0][2].my ?<h2>{props.data.accLocation[0][2].acc}</h2>: null} 
//                       </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 2; let mx = 1; let my = 2; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[1][2].my ?<h2>{props.data.accLocation[1][2].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 2; let mx = 2; let my = 2; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[2][2].my ?<h2>{props.data.accLocation[2][2].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 2; let mx = 3; let my = 2; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[3][2].my ?<h2>{props.data.accLocation[3][2].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 2; let mx = 4; let my = 2; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[4][2].my ?<h2>{props.data.accLocation[4][2].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 2; let mx = 5; let my = 2; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[5][2].my ?<h2>{props.data.accLocation[5][2].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 2; let mx = 6; let my = 2; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[6][2].my ?<h2>{props.data.accLocation[6][2].acc}</h2>: null}</div></div>: null}

//                   </div>
// {/* 4th L */}
//                   <div className= "measure-line" >  <div className = "measure-staff-line-clef"></div><div className = "measure-staff-line-ts"><h1>{props.data.up}</h1></div>

//                         <div className = "measure-cell" onClick={() => {
//   props.data.mx = 0; props.data.my = 3; let mx = 0; let my = 3; props.click(props.data, kind, mx, my )}
//                         } ><div className = "measure-staff-line-ks">
//                           { props.data.accLocation[0][3].my ?<h2>{props.data.accLocation[0][3].acc}</h2>: null} 
//                           </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 3; let mx = 1; let my = 3; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[1][3].my ?<h2>{props.data.accLocation[1][3].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 3; let mx = 2; let my = 3; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[2][3].my ?<h2>{props.data.accLocation[2][3].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 3; let mx = 3; let my = 3; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[3][3].my ?<h2>{props.data.accLocation[3][3].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 3; let mx = 4; let my = 3; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[4][3].my ?<h2>{props.data.accLocation[4][3].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 3; let mx = 5; let my = 3; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[5][3].my ?<h2>{props.data.accLocation[5][3].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 3; let mx = 6; let my = 3; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[6][3].my ?<h2>{props.data.accLocation[6][3].acc}</h2>: null}</div></div>: null}
//                   </div>
// {/* 3th S */}                      
// <div className= "measure-line" >
//                   <div className = "staff-space-starting"></div>

// <div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 4; let mx = 0; let my = 4; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[0][4].my ?<h2>{props.data.accLocation[0][4].acc}</h2>: null} </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 4; let mx = 1; let my = 4; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[1][4].my ?<h2>{props.data.accLocation[1][4].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 4; let mx = 2; let my = 4; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[2][4].my ?<h2>{props.data.accLocation[2][4].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 4; let mx = 3; let my = 4; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[3][4].my ?<h2>{props.data.accLocation[3][4].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 4; let mx = 4; let my = 4; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[4][4].my ?<h2>{props.data.accLocation[4][4].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 4; let mx = 5; let my = 4; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[5][4].my ?<h2>{props.data.accLocation[5][4].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 4; let mx = 6; let my = 4; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[6][4].my ?<h2>{props.data.accLocation[6][4].acc}</h2>: null}</div></div>: null}

//                   </div>
// {/* 3th L */}
// <div className= "measure-line" ><h1> {props.data.clef}</h1><div className = "staff-line-starting"></div>
                      
                      
//                     <div className = "measure-cell" onClick={() => 
//                     {props.data.mx = 0; props.data.my = 5; let mx = 0; let my = 5; props.click(props.data, kind, mx, my )}
//                       } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[0][5].my ?<h2>{props.data.accLocation[0][5].acc}</h2>: null} </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 5; let mx = 1; let my = 5; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[1][5].my ?<h2>{props.data.accLocation[1][5].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 5; let mx = 2; let my = 5; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[2][5].my ?<h2>{props.data.accLocation[2][5].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 5; let mx = 3; let my = 5; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[3][5].my ?<h2>{props.data.accLocation[3][5].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 5; let mx = 4; let my = 5; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[4][5].my ?<h2>{props.data.accLocation[4][5].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 5; let mx = 5; let my = 5; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[5][5].my ?<h2>{props.data.accLocation[5][5].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 5; let mx = 6; let my = 5; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[6][5].my ?<h2>{props.data.accLocation[6][5].acc}</h2>: null}</div></div>: null}


//                       </div>
// {/* 2th S */}                      
//                   <div className= "measure-line" >
//                   <div className = "staff-space-starting"></div>

//                     <div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 6; let mx = 0; let my = 6; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[0][6].my ?<h2>{props.data.accLocation[0][6].acc}</h2>: null} </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 6; let mx = 1; let my = 6; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[1][6].my ?<h2>{props.data.accLocation[1][6].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 6; let mx = 2; let my = 6; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[2][6].my ?<h2>{props.data.accLocation[2][6].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 6; let mx = 3; let my = 6; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[3][6].my ?<h2>{props.data.accLocation[3][6].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 6; let mx = 4; let my = 6; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[4][6].my ?<h2>{props.data.accLocation[4][6].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 6; let mx = 5; let my = 6; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[5][6].my ?<h2>{props.data.accLocation[5][6].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 6; let mx = 6; let my = 6; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[6][6].my ?<h2>{props.data.accLocation[6][6].acc}</h2>: null}</div></div>: null}
//                   </div>
// {/* 2th L */}
//                   <div className= "measure-line" >  <div className = "measure-staff-line-clef"></div><div className = "measure-staff-line-ts"><h1>{props.data.down}</h1></div>

//                   <div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 7; let mx = 0; let my = 7; props.click(props.data, kind, mx, my )}
//                   } ><div className = "measure-staff-line-ks">
//                     { props.data.accLocation[0][7].my ?<h2>{props.data.accLocation[0][7].acc}</h2>: null} 
//                     </div></div>

//                   { props.data.accLocation[0][11].my ? 
//                   <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 7; let mx = 1; let my = 7; props.click(props.data, kind, mx, my )}
//                   } ><div className = "measure-staff-line-ks">
//                   { props.data.accLocation[1][7].my ?<h2>{props.data.accLocation[1][7].acc}</h2>: null} </div></div>: null}

//                   { props.data.accLocation[1][11].my ? 
//                   <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 7; let mx = 2; let my = 7; props.click(props.data, kind, mx, my )}
//                   } ><div className = "measure-staff-line-ks">
//                   { props.data.accLocation[2][7].my ?<h2>{props.data.accLocation[2][7].acc}</h2>: null} </div></div>: null}

//                   { props.data.accLocation[2][11].my ? 
//                   <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 7; let mx = 3; let my = 7; props.click(props.data, kind, mx, my )}
//                   } ><div className = "measure-staff-line-ks">
//                   { props.data.accLocation[3][7].my ?<h2>{props.data.accLocation[3][7].acc}</h2>: null} </div></div>: null}

//                   { props.data.accLocation[3][11].my ? 
//                   <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 7; let mx = 4; let my = 7; props.click(props.data, kind, mx, my )}
//                   } ><div className = "measure-staff-line-ks">
//                   { props.data.accLocation[4][7].my ?<h2>{props.data.accLocation[4][7].acc}</h2>: null}</div></div>: null}

//                   { props.data.accLocation[4][11].my ? 
//                   <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 7; let mx = 5; let my = 7; props.click(props.data, kind, mx, my )}
//                   } ><div className = "measure-staff-line-ks">
//                   { props.data.accLocation[5][7].my ?<h2>{props.data.accLocation[5][7].acc}</h2>: null}</div></div>: null}

//                   { props.data.accLocation[5][11].my ? 
//                   <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 7; let mx = 6; let my = 7; props.click(props.data, kind, mx, my )}
//                   } ><div className = "measure-staff-line-ks">
//                   { props.data.accLocation[6][7].my ?<h2>{props.data.accLocation[6][7].acc}</h2>: null}</div></div>: null}
//                   </div>
// {/* 1th S */}                      
// <div className= "measure-line" >
//                   <div className = "staff-space-starting"></div>

//                     <div className = "measure-cell" onClick={() => {props.data.mx = 0; props.data.my = 8; let mx = 0; let my = 8; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[0][8].my ?<h2>{props.data.accLocation[0][8].acc}</h2>: null} </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 8; let mx = 1; let my = 8; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[1][8].my ?<h2>{props.data.accLocation[1][8].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 8; let mx = 2; let my = 8; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[2][8].my ?<h2>{props.data.accLocation[2][8].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 8; let mx = 3; let my = 8; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[3][8].my ?<h2>{props.data.accLocation[3][8].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 8; let mx = 4; let my = 8; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[4][8].my ?<h2>{props.data.accLocation[4][8].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 8; let mx = 5; let my = 8; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[5][8].my ?<h2>{props.data.accLocation[5][8].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 8; let mx = 6; let my = 8; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[6][8].my ?<h2>{props.data.accLocation[6][8].acc}</h2>: null}</div></div>: null}
//                   </div>
// {/* 5th L */}
//                   <div className= "measure-line" >
//                   <div className = "staff-line-starting"></div>

//                     <div className = "measure-cell" onClick={() => {
//   props.data.mx = 0; props.data.my = 9; let mx = 0; let my = 9; props.click(props.data, kind, mx, my )}
//                         } ><div className = "measure-staff-line-ks">
//                           { props.data.accLocation[0][9].my ?<h2>{props.data.accLocation[0][9].acc}</h2>: null} </div></div>
                          
//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 9; let mx = 1; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[1][9].my ?<h2>{props.data.accLocation[1][9].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 9; let mx = 2; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[2][9].my ?<h2>{props.data.accLocation[2][9].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 9; let mx = 3; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[3][9].my ?<h2>{props.data.accLocation[3][9].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 9; let mx = 4; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[4][9].my ?<h2>{props.data.accLocation[4][9].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 9; let mx = 5; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[5][9].my ?<h2>{props.data.accLocation[5][9].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 9; let mx = 6; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-line-ks">
//                       { props.data.accLocation[6][9].my ?<h2>{props.data.accLocation[6][9].acc}</h2>: null}</div></div>: null}
//                   </div>

//                   <div className= "measure-line" >
//                     <div className = "staff-space-starting"></div>

//                     <div className = "measure-cell" onClick={() => {
//                       props.data.mx = 0; props.data.my = 0; let mx = 0; let my = 0; props.click(props.data, kind, mx, my )}
//                         } ><div className = "measure-staff-space-ks">
//                           { props.data.accLocation[0][0].my ?<h2>{props.data.accLocation[0][0].acc}</h2>: null} 
//                           </div></div>

//                       { props.data.accLocation[0][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 1; props.data.my = 9; let mx = 1; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[1][0].my ?<h2>{props.data.accLocation[1][0].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[1][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 2; props.data.my = 9; let mx = 2; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[2][0].my ?<h2>{props.data.accLocation[2][0].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[2][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 3; props.data.my = 9; let mx = 3; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[3][0].my ?<h2>{props.data.accLocation[3][0].acc}</h2>: null} </div></div>: null}

//                       { props.data.accLocation[3][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 4; props.data.my = 9; let mx = 4; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[4][0].my ?<h2>{props.data.accLocation[4][0].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[4][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 5; props.data.my = 9; let mx = 5; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[5][0].my ?<h2>{props.data.accLocation[5][0].acc}</h2>: null}</div></div>: null}

//                       { props.data.accLocation[5][11].my ? 
//                     <div className = "measure-cell" onClick={() => {props.data.mx = 6; props.data.my = 9; let mx = 6; let my = 9; props.click(props.data, kind, mx, my )}
//                     } ><div className = "measure-staff-space-ks">
//                       { props.data.accLocation[6][0].my ?<h2>{props.data.accLocation[6][0].acc}</h2>: null}</div></div>: null}
//                   </div> 

//                       </div>
//                     </div>
//                 )

              
//       }


//     }
//     return renderCell();
//     };

//   export default Cells;