import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Route, Switch, NavLink, withRouter } from "react-router-dom";

import asyncComponent from "../../hoc/asyncComponent/asyncComponent";

const CharactersView = asyncComponent(() => {
  return import("../Character/CharactersView");
});

const Character = asyncComponent(() => {
  return import("../Character/CharacterView");
});

const StarshipsView = asyncComponent(() => {
  return import("../Starship/StarshipsView");
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    top: 0,
    left: 0,
    zIndex: 999,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#234375",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    color: "white",
    marginLeft: 10,
    fontWeight: 700,
    cursor: 'pointer'
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const Layout = (props) => {
  const classes = useStyles();
  const handleHomeButtonClick = () => {
    props.history.push("/");
  };
  let routes = (
    <>
      <Route path="/characters" exact component={CharactersView} />
      <Route path="/character" component={Character} />
      <Route path="/starships" component={StarshipsView} />
      <Route path="/" exact component={CharactersView} />
    </>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{
          top: " 0",
          left: "0",
          zIndex: "999",
          boxShadow: " 0 2px 4px 0 rgba(0, 0, 0, 0.08)",
          backgroundColor: "#234375",
        }}
        className={clsx(classes.appBar)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            onClick={handleHomeButtonClick}
          >
            StarWars
          </Typography>
          <NavLink to={"starships"}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Starships
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
      <Switch>{routes}</Switch>
    </div>
  );
};

export default withRouter(Layout);
