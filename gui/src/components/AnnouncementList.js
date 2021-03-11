import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAnnouncementList } from "../features/announcementSlice";
import Announcement from "./Announcement";
import Pagination from "@material-ui/lab/Pagination";
import { toggle } from "../features/updateSlice";

const announcementCount = 10;

function AnnouncementList() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const update = useSelector((state) => state.update.isUpdated);

  const announcements = useSelector(
    (state) => state.announcement.announcements
  );

  console.log(update);
  const count = Math.ceil(announcements.length / announcementCount);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAnnouncementList(token));
  }, [update, token, dispatch]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paging = (page - 1) * announcementCount;

  const sortedAnnouncements = announcements.slice().sort((a, b) => b.id - a.id);
  console.log(announcements);
  console.log(sortedAnnouncements);
  //   const pagedAnnouncements = announcements.slice(paging, paging + 5);
  //   console.log(pagedAnnouncements);
  return (
    <div className="announcements">
      <div className="announcement__container">
        {sortedAnnouncements &&
          sortedAnnouncements
            .slice(paging, paging + announcementCount)
            .map((item) => {
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
