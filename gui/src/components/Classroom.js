import React from "react";

function Classroom({ classroom }) {
  return (
    <div>
      {classroom?.name}
      {classroom?.teacher_name}
    </div>
  );
}

export default Classroom;
