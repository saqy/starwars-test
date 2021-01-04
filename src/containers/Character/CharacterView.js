import React from "react";
import ContentView from "../../components/UI/ContentView/ContentView";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";

import BackButton from "../../components/UI/BackButton/BackButton";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Starship from "../../components/Starship/StarShip";
import characterImage from '../../assets/images/characterViewBg.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    marginBottom: 20,
    backgroundImage: `url(${characterImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 15,
    border: "2px solid #2e0723",
    boxShadow: "-1px 0px 7px 7px #5ca8c0",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "5px auto",
    color: "white",
    backgroundColor: "red",
    padding: 10,
    borderRadius: "50%",
    outline: "none",
    fontSize: 24,
    fontWeight: 700,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: 'white'
  },
  pos: {
    marginBottom: 6,
    fontSize: 20,
    color: 'white'
  },
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "50%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
  },
  info : {
    fontWeight: "bolder"
  }
}));

const Character = (props) => {
  const classes = useStyles();
  let ships =
    props.character?.starships &&
    typeof props.character?.starships[0] !== "string"
      ? props.character?.starships.map((starship, index) => (
          <Starship key={index} starship={starship} />
        ))
      : null;
  return (
    <ContentView>
      {props.character ? (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Avatar
              className={classes.large}
              alt={props.character?.name}
              style={{ margin: "5px auto" }}
            >
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
              Born <span className={classes.info} >{props.character?.birth_year}</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Body Mass: <span className={classes.info} >{props.character?.mass}</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Height: <span className={classes.info} >{props.character?.height}</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Gender: <span className={classes.info} >{props.character?.gender}</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Hair Color: <span className={classes.info} >{props.character?.hair_color}</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Skin Color: <span className={classes.info} >{props.character?.skin_color}</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Eye Color: <span className={classes.info} >{props.character?.eye_color}</span>
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      ) : (
        <Redirect to={"/"} />
      )}
      <Grid container spacing={3}>
        {ships}
      </Grid>
      <BackButton />
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    character: state.character.selectedCharacter,
  };
};

export default connect(mapStateToProps)(Character);
