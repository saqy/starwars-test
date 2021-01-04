import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import starshipImage from "../../assets/images/starship.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${starshipImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: "1px solid #fff",
    boxShadow: "-1px 0px 7px 7px red",
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "white",
  },
  pos: {
    marginBottom: 6,
    fontSize: 16,
    color: "white",
  },
  info: {
    fontWeight: "bolder",
  },
}));

const Starship = (props) => {
  const classes = useStyles();
  let ship = (
    <Grid item xs={6} md={4} lg={4}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            component="h1"
            color="textSecondary"
            gutterBottom
          >
            {`${props.starship.name}`}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Model: <span className={classes.info}>{props.starship.model}</span>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Manufacturer :{" "}
            <span className={classes.info}>{props.starship.manufacturer}</span>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Cost in Credits:{" "}
            <span className={classes.info}>
              {props.starship.cost_in_credits}
            </span>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Starship Class:{" "}
            <span className={classes.info}>
              {props.starship.starship_class}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
  return ship;
};

export default Starship;
