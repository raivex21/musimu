import React, { useEffect } from "react";
import { getInbox } from "../features/messageSlice";
import { useSelector, useDispatch } from "react-redux";

function Inbox() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.inbox);
  const { token, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getInbox(token, userId));
  }, [userId, token, dispatch]);

  const convos = [...new Set(messages.map((item) => item.receiver))];
  console.log(convos);
  console.log(messages);
  return (
    <div className="inbox">
      <div className="inbox__container">
        <div className="inbox__senders"></div>
        <div className="inbox__content">
          <div className="inbox__head"></div>
          <div className="inbox__body"></div>
          <div className="inbox__newMessage"></div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
