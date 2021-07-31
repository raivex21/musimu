import React, { useEffect, useState } from "react";
import { getTaskList } from "../features/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { createGradedTask } from "../features/taskSlice";

function Task(props) {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const { taskList } = useSelector((state) => state.task);
  const { token, userId } = useSelector((state) => state.auth);
  let taskClef;
  let complete = [];
  let percentage;

  useEffect(() => {
    dispatch(getTaskList(token));
  }, []);

  console.log(taskList);
  console.log(props.x, props.taskClef, props.taskKeySig);

  if (props.taskClef === "𝄞") {
    taskClef = "G Clef";
  }
  if (props.taskClef === "𝄢") {
    taskClef = "F Clef";
  }

  for (let a = 0; a < taskList.length; a++) {
    const res = taskList[a]?.subcat_name == taskClef;
    if (res === true) {
      for (let i = 0; i < taskList.length; i++) {
        // clef
        if (complete[0] === undefined && taskList[i].cat === 1) {
          complete.push({
            x: props.x,
            clef: taskClef,
          });
          continue;
        }
        if (props.x === complete[i] && taskList[i].cat === 1) {
          complete[i].x = props.x;
          complete[i].clef = props.taskClef;
          continue;
        }

        console.log(props.x, complete[i], taskList[i].cat);
        //keysig
      }
    }
  }

  for (let a = 0; a < taskList.length; a++) {
    console.log(taskList[a].cat === 3, props.taskKeySig);
    if (taskList[a].cat === 3) {
      const res = taskList[a]?.subcat_name == props.taskKeySig;
      if (res === true) {
        for (let i = 0; i < taskList.length; i++) {
          // clef
          if (complete[0] === undefined && taskList[i].cat === 3) {
            complete.push({
              x: props.x,
              keySig: props.taskKeySig,
            });
            console.log(complete);
            continue;
          }
          if (props.x === complete[i] && taskList[i].cat === 3) {
            complete[i].x = props.x;
            complete[i].keySig = props.taskKeySig;
            console.log(complete);
            continue;
          } else {
            complete.push({
              x: props.x,
              keySig: props.taskKeySig,
            });
            break;
          }
        }
      }
    }
  }

  percentage = (complete.length / taskList.length) * 100;
  console.log(complete);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("student", userId);
    formData.append("grade", percentage);
    dispatch(createGradedTask(token, formData));
  };
  return (
    <div className="task-list">
      {taskList.map((task) => (
        <li key={task.id}>{task.name}</li>
      ))}
      <br></br>
      Progress: {percentage}%
      <button onClick={handleSubmit} className="task-submit">
        Submit
      </button>
    </div>
  );
}

export default Task;
