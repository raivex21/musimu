import React, { Component } from "react";
import Task from "./Task";
import { connect } from "react-redux";

class WorkSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: [],
      taskKind: null,
      taskCondition: null,
      clef: null,
      up: null,
      down: null,
      clefList: false,
      timeSigList: false,
      keySigList: false,

      iSBool: false,
    };
  }

  taskList = () => {
    let task = this.state.task;
    let taskCondition = this.state.taskCondition;
    let idNum = 1;
    if (task.length !== null) {
      idNum = task.length + 1;
    }

    if (this.state.taskKind === "time Signature") {
      task.push({
        idNum: idNum,
        taskCondition: "Set up time signature to",
        up: this.state.up,
        down: this.state.down,
        taskKind: this.state.taskKind,
      });
    } else {
      if (
        this.state.taskCondition === null ||
        this.state.taskCondition === "none"
      ) {
        console.log("Insert something");
        this.setState({
          iSBool: true,
        });
        return;
      } else {
        this.setState({
          iSBool: false,
        });

        task.push({
          idNum: idNum,
          taskCondition: taskCondition,
          taskKind: this.state.taskKind,
        });
      }
    }

    this.setState({
      task,
      taskKind: null,
      taskCondition: null,
      clef: null,
      up: null,
      down: null,
    });
    console.log(this.state.task);
  };

  handleChangeTask = (event) => {
    this.setState({
      taskKind: event.target.value,
      clefList: false,
      keySigList: false,
      timeSigList: false,
    });
  };

  handleTaskSelect = () => {
    if (this.state.taskKind === "clef") {
      this.setState({
        clefList: true,
        timeSigList: false,
        keySigList: false,
      });
    }
    if (this.state.taskKind === "time Signature") {
      this.setState({
        clefList: false,
        timeSigList: true,
        keySigList: false,
      });
    }
    if (this.state.taskKind === "key Signature") {
      this.setState({
        clefList: false,
        timeSigList: false,
        keySigList: true,
      });
    }
    console.log(
      this.state.clefList,
      this.state.timeSigList,
      this.state.keySigList
    );
  };

  handleTaskCondition = (event) => {
    this.setState({
      taskCondition: event.target.value,
    });
  };

  handleConditions = (event) => {
    this.setState({
      taskCondition: event.target.value,
    });
  };

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

  removeTask = (taskNum) => {
    let task = this.state.task;
    let curTaskNum = taskNum - 1;
    console.log("Delet dis", curTaskNum);
    task.splice(curTaskNum, 1);

    console.log(task[curTaskNum], task.length);
    for (let i = curTaskNum; i < task.length; i++) {
      console.log(task[i].idNum, i, task.length);
      task[i].idNum = i + 1;
    }

    this.setState({
      task,
    });
  };

  render() {
    let task = this.state.task.map((task, index) => {
      return (
        <Task
          timeSig={task}
          key={index}
          addCondition={this.addCondition}
          removeTask={this.removeTask}
        />
      );
    });
    return (
      <div className="tasks__panel">
        <div>
          <label>Choose a Task for:</label>
          <select onChange={this.handleChangeTask}>
            {/* {task.map(item => (
              <option value={item.id}>item.name</option>
            ))} */}
          </select>
          <button onClick={this.handleTaskSelect}>Select</button>
        </div>{" "}
        <br />
        {this.state.iSBool ? <div>Insert Something</div> : null}
        {this.state.clefList ? (
          <div>
            <label>Create a condition for clef:</label>
            <select onChange={this.handleConditions}>
              <option value="none">Select</option>
              <option value="Set up a G clef">Set up a G clef</option>
              <option value="Set up a F clef">Set up a F clef</option>
            </select>
            <button onClick={() => this.taskList()}>Create Task</button>
          </div>
        ) : null}
        {this.state.timeSigList ? (
          <div>
            <label>
              Create a condition for time signature:
              <br /> Make a{this.state.up} <br />
              {this.state.down} <br />
              time signature
            </label>

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
            <button onClick={() => this.taskList()}>Create Task</button>
          </div>
        ) : null}
        {this.state.keySigList ? (
          <div>
            <label>Create a condition for key signature: Set up key of</label>

            <select value="null" onChange={this.handleConditions}>
              {" "}
              key
              <option value="none">Select</option>
              <option value="Set key signature to key of C">C</option>
              <option value="Set key signature to key of D">D</option>
              <option value="Set key signature to key of E">E</option>
              <option value="Set key signature to key of F">F</option>
              <option value="Set key signature to key of G">G</option>
              <option value="Set key signature to key of A">A</option>
              <option value="Set key signature to key of B">B</option>
            </select>

            <button onClick={() => this.taskList()}>Create Task</button>
          </div>
        ) : null}
        {task}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkSheet);
