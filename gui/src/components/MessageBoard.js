import {
  Avatar,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBoardMessages, createBoardMessage } from "../features/boardSlice";

function MessageBoard(props) {
  const dispatch = useDispatch();
  const { boardMessages, error, loading } = useSelector((state) => state.board);
  const { token, userId } = useSelector((state) => state.auth);
  const [seconds, setSeconds] = React.useState(0);
  const [newMessage, setNewMessage] = React.useState("");

  console.log(boardMessages);
  console.log(props.id);

  useEffect(() => {
    dispatch(getBoardMessages(token, props.id));
    if (error !== null) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        dispatch(getBoardMessages(token, props.id));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [token, dispatch, props.id]);

  const changeMessage = (e) => {
    setNewMessage(e.target.value);
  };
  const sendMessage = () => {
    const formData = {
      message: newMessage,
      user: userId,
      board: props.id,
    };
    dispatch(createBoardMessage(token, formData, props.id));
    setNewMessage("");
  };
  return (
    <>
      {boardMessages.classroom === props.id ? (
        <div className="messageBoard">
          <div className="messageBoard__header">
            <Typography variant="subtitle2">
              {boardMessages.classroom_name} Message Board
            </Typography>
          </div>
          <div className="messageBoard__body">
            {boardMessages.messages?.map((message) => (
              <div key={message.id} className="messageBoard__message">
                <Avatar
                  src={`${process.env.REACT_APP_AXIOS_URL}${message.avatar}`}
                >
                  J
                </Avatar>
                <div className="messageBoard__sender">
                  <Typography variant="subtitle2">
                    {message.user_name}
                  </Typography>
                  <Typography variant="caption">{message.timestamp}</Typography>
                  <div className="messageBoard__container">
                    <Typography variant="body2">{message.message}</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="messageBoard__send">
            <input
              value={newMessage}
              onChange={changeMessage}
              placeholder="SEND MESSAGE"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MessageBoard;
