import React from "react";
import ClassroomDetail from "../containers/ClassroomDetail";
import Dashboard from "../containers/Dashboard";
import CreateQuiz from "../containers/CreateQuiz";
import QuizDetail from "../components/Quiz/QuizDetail";
import Module from "../containers/Module";
import Profile from "../containers/Profile";
import Simulator from "../simulator/Simulator.jsaaa";
import Teachers from "../components/Teachers";
import Inbox from "../containers/Inbox";
import CreateTask from "../containers/CreateTask";
import LessonCreator from "../components/LessonCreator";
import AddLesson from "../components/AddLesson";
import Lesson from "../components/Lesson";

const PrivateRoutes = {
  "/": () => <Dashboard />,
  "/classroom/:id": ({ id }) => <ClassroomDetail id={id} />,
  "/simulator": () => <Simulator />,
  "/quiz/:id": ({ id }) => <QuizDetail id={id} />,
  "/quiz": () => <CreateQuiz />,
  "/modules": () => <Module />,
  "/profile/:id": ({ id }) => <Profile id={id} />,
  "/teachers": () => <Teachers />,
  "/inbox": () => <Inbox />,
  "/create-lesson": () => <LessonCreator />,
  "/lesson/:id": ({ id }) => <Lesson id={id} />,
  "/add-lesson": () => <AddLesson />,
  "/task": () => <CreateTask />,

  "*": () => <div>Error 404. Page Not Found.</div>,
};

export default PrivateRoutes;
