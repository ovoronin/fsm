import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Menu() {
  return (<div>
    <Typography variant="h3">FSM demos</Typography>
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/old">
          <ListItemText primary="A Wizard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/old-skip">
          <ListItemText primary="A Wizard with page skipping" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/fsm">
          <ListItemText primary="FSM Wizard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/fsm-skip">
          <ListItemText primary="FSM Wizard with page skipping" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/fsm-skip-guard">
          <ListItemText primary="FSM Wizard with page skipping (guards)" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/xstate">
          <ListItemText primary="FSM Wizard with page skipping (xstate)" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/xstate-optional">
          <ListItemText primary="FSM Wizard with optional page (xstate)" />
        </ListItemButton>
      </ListItem>
    </List>
  </div>)
}