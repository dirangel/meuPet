import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import PetsIcon from "@mui/icons-material/Pets";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>

    <ListItem button component={Link} to="/agendamentos">
      <ListItemIcon>
        <AddAlarmIcon />
      </ListItemIcon>
      <ListItemText primary="Agendamentos" />
    </ListItem>

    <ListItem button component={Link} to="/clientes">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItem>

    <ListItem button component={Link} to="/petshop">
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <ListItemText primary="Pet Shop" />
    </ListItem>

    <ListItem button component={Link} to="/servicos">
      <ListItemIcon>
        <SettingsApplicationsIcon />
      </ListItemIcon>
      <ListItemText primary="Serviços" />
    </ListItem>
  </div>
);
