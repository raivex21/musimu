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
import { getUserList } from "../features/userSlice";
import { Avatar, Typography } from "@material-ui/core";
import { A } from "hookrouter";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Teachers() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const { token, userId } = useSelector((state) => state.auth);
  console.log(users);

  useEffect(() => {
    dispatch(getUserList(token));
  }, [token, dispatch]);

  const teachers = users.filter((item) => item.is_teacher === true);

  return (
    <>
      <div className="teacher__container">
        <Typography variant="h5">Teacher</Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Teacher Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Last Login</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <A href={`/profile/${row.id}`}>{row.full_name}</A>
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    <A href={`/profile/${row.id}`}>{row.username}</A>
                  </TableCell>
                  <TableCell align="right">
                    <Avatar src={`${row.avatar}`} />
                  </TableCell>
                  <TableCell align="right">{row.last_login}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
