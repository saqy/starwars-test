import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    minHeight: 1200,
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
   
  },
  contentBg:{
    backgroundColor: "rgba(49, 68, 89, 0.75)",
    borderRadius: 10,
    padding: theme.spacing(5),
  },
}));

const ContentView = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid  className={classes.contentBg} container spacing={3}>
          {props.children}
        </Grid>
      </Container>
    </main>
  );
};

export default ContentView;
