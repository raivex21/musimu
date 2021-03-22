import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAnnouncementList } from "../features/announcementSlice";
import Announcement from "./Announcement";
import Pagination from "@material-ui/lab/Pagination";

const announcementCount = 10;

function AnnouncementList(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const announcements = useSelector(
    (state) => state.announcement.announcements
  );

  const count = Math.ceil(announcements.length / announcementCount);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAnnouncementList(token));
  }, [token, dispatch]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paging = (page - 1) * announcementCount;

  console.log(announcements);

  const global = announcements.filter((item) => {
    if (item.classroom_id === props.id) {
      return item;
    } else if (item.isGlobal === true) {
      return item;
    }
  });
  return (
    <div className="announcements">
      <div className="announcement__container">
        {global &&
          global.slice(paging, paging + announcementCount).map((item) => {
            return (
              <Announcement
                title={item.name}
                content={item.content}
                avatar={item.avatar}
                key={item.id}
              />
            );
          })}
      </div>
      <div className="announcement__footer">
        <Pagination
          count={count}
          siblingCount={0}
          color="secondary"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default AnnouncementList;
