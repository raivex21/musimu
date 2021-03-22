import React from 'react';

  const Task = props => {

    let renderTask = () => { 
        // let idNum =  props.timeSig.idNum;
        // let taskKind =  props.timeSig.taskKind;
        let idNum = props.timeSig.idNum;
        let taskCondition = props.timeSig.taskCondition;
        let up = props.timeSig.up;
        let down = props.timeSig.down;

          return (   
            <div>
              Task {idNum}:<br/> 
                {taskCondition}<br/>
                {up}<br/> 
                {down}<br/>
                <div className= "cell-enabler-isOpen" onClick={() => {let taskNum = idNum; props.removeTask(taskNum)}}>X</div>
                {/* <div className= "cell-enabler-isOpen" onClick={() => {let taskNum = idNum; props.removeTask(taskNum)}}>up</div>
                <div className= "cell-enabler-isOpen" onClick={() => {let taskNum = idNum; props.removeTask(taskNum)}}>Down</div> */}
            </div>
          ) 
      

    }
    return renderTask();
    };

  export default Task;