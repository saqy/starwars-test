import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Avatar from "@material-ui/core/Avatar";

import { Visibility } from "@material-ui/icons";
import Spinner from "../UI/Spinner/Spinner";
import characterImage from "../../assets/images/characterBg.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    backgroundImage: `url(${characterImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: "1px solid #fff",
    boxShadow: "-1px 0px 7px 7px #5ca8c0",
    borderRadius: 10,
  },

  highligthCharacter9th: {
    border: "1px solid #fff",
    boxShadow: "-1px 0px 7px 7px red",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "white",
  },
  pos: {
    marginBottom: 6,
    fontSize: 20,
    color: "white",
  },
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "5px auto",
    color: "#234375",
    backgroundColor: "white",
    padding: 10,
    borderRadius: "50%",
    outline: "none",
    fontSize: 24,
    fontWeight: 700,
  },
  viewButton: {
    backgroundColor: "#234375",
    padding: 10,
    borderRadius: "50%",
    outline: "none",
    fontSize: 24,
    fontWeight: 700,
    color: "white",
  },
  info: {
    fontWeight: "bolder",
  },
}));

const Character = (props) => {
  const classes = useStyles();
  const highlight = props.id === 8 ? classes.highligthCharacter9th : "";
  let data = props.character ? (
    <>
      <CardContent>
        <Avatar alt={props.character?.name} className={classes.avatar}>
          {" "}
          {props.character?.name[0]}{" "}
        </Avatar>
        <Typography
          className={classes.title}
          component="h1"
          color="textSecondary"
          gutterBottom
        >
          {`${props.character?.name}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Born{" "}
          <span className={classes.info}>{props.character?.birth_year}</span>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Mass: <span className={classes.info}>{props.character?.mass}</span>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Heigth:{" "}
          <span className={classes.info}>{props.character?.height}</span>
        </Typography>
        {props.character?.starshipName ? (
          <Typography
            className={classes.pos}
            style={{
              border: "1px solid #fff",
              boxShadow: "-1px 0px 7px 7px red",
            }}
            color="textSecondary"
          >
            Ship Name:{" "}
            <span className={classes.info}>
              {props.character?.starshipName}
            </span>
          </Typography>
        ) : null}
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <IconButton
          className={classes.viewButton}
          onClick={props.getSelectedRow}
        >
          <Visibility />
        </IconButton>
      </CardActions>
    </>
  ) : (
    <Spinner />
  );

  return (
    <Card className={[classes.root, highlight].join(" ")} variant="outlined">
      {data}
    </Card>
  );
};

export default Character;
