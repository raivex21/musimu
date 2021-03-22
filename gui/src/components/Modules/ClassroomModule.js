import React, { useEffect } from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Avatar } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { getModules } from "../../features/moduleSlice";
import { useDispatch, useSelector } from "react-redux";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";

function ClassroomModule(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const modules = useSelector((state) => state.modules.modules);

  const moduleList = modules.filter((item) => item.level === props.level);
  useEffect(() => {
    dispatch(getModules(token));
  }, []);

  return (
    <div className="modules">
      {moduleList?.map((item) => {
        return (
          <div className="module__item">
            <div className="module__name">
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <p>{item.name}</p>
            </div>

            <div className="module__link">
              <SystemUpdateAltIcon />
              <a href={`${item.module}`}>Download</a>
            </div>
            <p>{item.created}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ClassroomModule;
