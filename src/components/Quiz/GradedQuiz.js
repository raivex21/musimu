import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import { getGradedQuiz } from "../../features/gradeSlice";
import { Typography } from "@material-ui/core";
import { A } from "hookrouter";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function GradedQuiz() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const gradedQuizzes = useSelector((state) => state.grades.gradedQuizzes);
  const { token, userId } = useSelector((state) => state.auth);
  console.log(token);

  useEffect(() => {
    dispatch(getGradedQuiz(token));
  }, [token, dispatch]);

  return (
    <>
      <Typography variant="h5">Records</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Total Items</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Quiz Name(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gradedQuizzes.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <A href={`/profile/${row.id}`}>{row.student_name}</A>
                </TableCell>
                <TableCell align="right">{row.grade}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.quiz_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
