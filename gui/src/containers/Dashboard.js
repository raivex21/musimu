import React, { useState } from "react";
import EnrollmentsList from "../components/EnrollmentsList";
import { useSelector } from "react-redux";

import ClassroomList from "../components/ClassroomList.js";
import StudentList from "../components/StudentList";
import AnnouncementList from "../components/AnnouncementList";
import CreateClassroom from "../components/CreateClassroom";
import CreateAnnouncement from "../components/CreateAnnouncement";
import EditClassroom from "../components/EditClassroom";
import { Avatar } from "@material-ui/core";

function Dashboard() {
  const { is_teacher, avatar, first_name, last_name } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="dashboard">
      <div className="dashboard__main">
        <div className="dashboard__head">
          <div className="dashboard__teacher">
            <Avatar src={`http://127.0.0.1:8000${avatar}`} />
            <div className="teacher__name">
              <h3>{`${first_name} ${last_name}`}</h3>
            </div>
          </div>
          <div className="head__buttons">
            <CreateClassroom />
            <EditClassroom />

            <CreateAnnouncement />
          </div>
        </div>
        <div className="dashboard__classrooms">
          {is_teacher ? <ClassroomList /> : <EnrollmentsList />}
        </div>
        <div className="dashboard__students">
          <div className="dashboard__students-search">
            <StudentList />
          </div>

          <div className="dashboard__students-profile">profile</div>
        </div>
      </div>

      <div className="dashboard__announcement">
        <div className="announcement__header">Announcements</div>

        <AnnouncementList />
      </div>
    </div>
  );
}

export default Dashboard;
