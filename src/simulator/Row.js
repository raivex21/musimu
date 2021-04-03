import React from 'react';
import Cells from './Cells';

const Row = props => {
  let cells = props.cells.map((data, index) => {
    return (
      <Cells 
        data = {data} 
        key = {index} 
        click = {props.click}
        clickLeft = {props.clickLeft}
        clickRight = {props.clickRight}
        ks1 = {props.ks1}
        ks2 = {props.ks2}
        handle0={props.handle0}
        />
      )
    })

  return (
  <div className="row">
    {cells}
    </div>
    );
}

export default Row;