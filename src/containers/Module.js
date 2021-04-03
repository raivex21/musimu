import React, { useEffect, useState } from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useRadioGroup,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { getModules } from "../features/moduleSlice";
import { useDispatch, useSelector } from "react-redux";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import { getGradeLevel } from "../features/schoolSlice";
import { makeStyles } from "@material-ui/core/styles";
import { createModule } from "../features/moduleSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "50%",
    margin: "10px 0",
  },
  textField: {
    minWidth: "100%",
    margin: "10px 0",
  },
  buttonStyle: {
    minWidth: "100%",
    margin: "10px 0",
    height: "3rem",
  },
}));

function Module() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token, userId, is_teacher } = useSelector((state) => state.auth);
  const { modules, loading, error } = useSelector((state) => state.modules);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState("");
  const [desc, setDesc] = useState("");
  const [search, setSearch] = useState("");

  const levels = useSelector((state) => state.school.gradeLevel);
  useEffect(() => {
    dispatch(getModules(token));
    dispatch(getGradeLevel(token));
  }, [token, dispatch]);
  const handleChange = (event) => {
    setLevel(event.target.value);
  };
  const upload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const uploadModule = () => {
    // const formData = {
    //   name: name,
    //   description: desc,
    //   module: file,
    //   level: level,
    //   uploader: userId,
    // };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("module", file);
    formData.append("level", level);
    formData.append("uploader", userId);
    dispatch(createModule(token, formData));
  };

  console.log(file);

  return (
    <div className="modules">
      {loading ? (
        <div className="loading">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <TextField
            id="outlined-basic"
            label="Search Module"
            variant="outlined"
            className={classes.textField}
            onChange={handleSearch}
            size="small"
          />
          {modules
            ?.filter((item) => {
              if (item.name === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              } else {
                return null;
              }
            })
            .map((item) => {
              return (
                <div key={item.id} className="module__item">
                  <div className="module__name">
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                  </div>
                  <div className="module__detail">
                    <div className="module__link">
                      <SystemUpdateAltIcon />
                      <a href={`${item.module}`}>Download</a>
                    </div>
                    <p>Date uploaded:{item.created}</p>
                  </div>
                </div>
              );
            })}
        </>
      )}
      {is_teacher && (
        <div className="module__upload">
          <Typography variant="h6">Upload Module</Typography>
          <div className="upload__input">
            <TextField
              id="outlined-basic"
              label="Quiz Title"
              variant="outlined"
              className={classes.textField}
              onChange={handleName}
              size="small"
            />
            <TextField
              id="desc"
              label="Description"
              variant="outlined"
              multiline
              className={classes.textField}
              onChange={handleDesc}
              size="small"
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="select-outlined-label">Grade Level</InputLabel>
              <Select
                size="small"
                color="primary"
                labelId="select-outlined-label"
                id="select-outlined"
                value={level}
                onChange={handleChange}
                label="Grade Level"
              >
                {levels?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div className="module__file">
              <input onChange={upload} type="file" name="module" />
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.buttonStyle}
              onClick={uploadModule}
            >
              Upload
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Module;
