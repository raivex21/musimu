import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StudentList from "./StudentList";
import EnrollStudent from "./EnrollStudent";
import ClassroomModule from "./Modules/ClassroomModule";
import ClassroomQuizList from "./Quiz/ClassroomQuizList";
import AnnouncementList from "./AnnouncementList";
import GradedQuiz from "./Quiz/GradedQuiz";
import EnrolledStudentsTable from "../components/EnrolledStudentsTable";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Classroom({ classroom }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const { is_teacher } = useSelector((state) => state.auth);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSelectStudent = (id) => {
    setSelectedStudent(id);
  };

  return (
    <div className="classroom__detail">
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="Quizzes" {...a11yProps(1)} />
            <Tab label="Modules" {...a11yProps(2)} />
            <Tab label="Students" {...a11yProps(3)} />
            <Tab label="Announcements" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className="enrollments__tab">
            <EnrollStudent
              id={classroom?.id}
              selectedStudent={selectedStudent}
              students={classroom?.students}
            />
            <div className="enrollments__studentlist">
              <StudentList onSelectStudent={onSelectStudent} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ClassroomQuizList
            level={classroom?.level_id}
            classroomQuizzes={classroom?.quizzes}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ClassroomModule level={classroom?.level_id} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <EnrolledStudentsTable students={classroom?.students} />

          {is_teacher && <GradedQuiz />}
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AnnouncementList
            global={false}
            inClassroom={true}
            id={classroom.id}
          />
        </TabPanel>
      </div>
    </div>
  );
}
