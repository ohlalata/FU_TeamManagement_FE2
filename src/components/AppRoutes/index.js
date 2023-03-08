import React from "react";
import { Route, Routes } from "react-router-dom";
import Team from "../../pages/Team";
import Course from "../../pages/Course";
import CurrentCourse from "../../pages/CurrentCourse";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Course />} />
      <Route path="/course" element={<Course />} />
      <Route path="/CurrentCourse" element={<CurrentCourse />} />
      <Route path="/team" element={<Team />} />
    </Routes>
  );
};

export default AppRoutes;
