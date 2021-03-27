import React from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { navigate } from "hookrouter";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import QueueMusicOutlinedIcon from "@material-ui/icons/QueueMusicOutlined";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

import { Typography } from "@material-ui/core";

export default function SidebarMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState("");
  const { is_teacher, userId } = useSelector((state) => state.auth);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate(Links[index]);
  };

  const Links = [
    "/",
    "quiz",
    "/simulator",
    "/modules",
    `/profile/${userId}`,
    "/teachers",
  ];

  return (
    <>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <HomeOutlinedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography type="body2" style={{ color: "#16c79a" }}>
                Home
              </Typography>
            }
          />
        </ListItem>
        {is_teacher === false ? null : (
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <AssignmentOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography type="body2" style={{ color: "#16c79a" }}>
                  Quizzes
                </Typography>
              }
            />
          </ListItem>
        )}
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <QueueMusicOutlinedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography type="body2" style={{ color: "#16c79a" }}>
                Simulator
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <DescriptionRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography type="body2" style={{ color: "#16c79a" }}>
                Modules
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <AccountBoxRoundedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography type="body2" style={{ color: "#16c79a" }}>
                Profile
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
            <AssignmentIndIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography type="body2" style={{ color: "#16c79a" }}>
                Teachers
              </Typography>
            }
          />
        </ListItem>
      </List>
    </>
  );
}
