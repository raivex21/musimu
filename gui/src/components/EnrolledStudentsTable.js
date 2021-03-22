import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Avatar, Typography } from "@material-ui/core";
import { A } from "hookrouter";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function EnrolledStudentsTable(props) {
  const classes = useStyles();

  return (
    <div className="enrolled__table">
      <Typography variant="h5">Enrolled</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Last login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.students.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <A href={`/profile/${row.id}`}>{row.full_name}</A>
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <A href={`/profile/${row.id}`}>{row.username}</A>
                </TableCell>
                <TableCell align="right">
                  <Avatar
                    src={`${process.env.REACT_APP_AXIOS_URL}${row.avatar}`}
                  />
                </TableCell>
                <TableCell align="right">{row.last_login}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
