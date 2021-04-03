import React, { useEffect } from "react";
import { getConvoList } from "../features/convoSlice";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { createConvoMessage, getConvoDetail } from "../features/convoSlice";

function Inbox() {
  const dispatch = useDispatch();
  const convos = useSelector((state) => state.convo.convos);
  const convoDetail = useSelector((state) => state.convo.convoDetail);
  const { token, userId } = useSelector((state) => state.auth);
  const [currentConvo, setCurrentConvo] = React.useState({});
  const [newMessage, setNewMessage] = React.useState("");

  useEffect(() => {
    dispatch(getConvoList(token, userId));

    dispatch(getConvoDetail(token, currentConvo.id));
  }, [userId, token, dispatch, currentConvo]);

  const openConvo = (convo) => {
    console.log(convo);
    setCurrentConvo(convo);
  };

  console.log(currentConvo);
  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const send = () => {
    const formData = {
      convo: convoDetail.id,
      user: userId,
      message: newMessage,
    };
    dispatch(createConvoMessage(token, formData, userId));
    const current = convos.filter((item) => item.id === currentConvo.id);
    console.log(current[0]);
    setCurrentConvo(current[0]);
    setNewMessage("");
  };

  const selected = (current) => {
    if (current === currentConvo?.id) return "selected-item";
    else {
      return null;
    }
  };

  console.log(convoDetail);
  return (
    <div className="inbox">
      <div className="inbox__container">
        <div className="inbox__senders">
          <div className="inbox__senders-head">
            <Typography variant="h5">Conversations</Typography>
          </div>

          {convos?.map((item) =>
            userId === item.user1 ? (
              <div
                key={item.id}
                onClick={() => openConvo(item)}
                className={`convo__partner ${selected(item.id)}`}
              >
                <Typography variant="subtitle2">{item.user2_name}</Typography>
              </div>
            ) : (
              <div
                key={item.id}
                onClick={() => openConvo(item)}
                className={`convo__partner ${selected(item.id)}`}
              >
                <Typography variant="subtitle2">{item.user1_name}</Typography>
              </div>
            )
          )}
        </div>
        <div className="inbox__content">
          <div className="inbox__head">
            {userId === convoDetail?.user1 ? (
              <Typography variant="h6">{convoDetail?.user2_name}</Typography>
            ) : (
              <Typography variant="h6">{convoDetail?.user1_name}</Typography>
            )}
          </div>
          <div className="inbox__body">
            {convoDetail !== null &&
              convoDetail?.messages?.map((item) => (
                <div
                  className={
                    item.user === userId
                      ? "inbox__message self"
                      : "inbox__message"
                  }
                >
                  {userId !== item.user ? (
                    <>
                      <Avatar
                        src={`${process.env.REACT_APP_AXIOS_URL}${item.avatar}`}
                      ></Avatar>
                      <div className="inbox__message-text">
                        <Typography variant="subtitle2">
                          {item.message}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="inbox__message-text">
                        <Typography variant="subtitle2">
                          {item.message}
                        </Typography>
                      </div>
                      <Avatar
                        src={`${process.env.REACT_APP_AXIOS_URL}${item.avatar}`}
                      ></Avatar>
                    </>
                  )}
                </div>
              ))}
          </div>
          <div className="inbox__newMessage">
            {convoDetail !== null && (
              <>
                <input
                  value={newMessage}
                  placeholder="New Message"
                  onChange={handleNewMessage}
                />
                <button onClick={send}>Send</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
