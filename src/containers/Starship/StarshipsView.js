import React from "react";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import Starship from "../../components/Starship/StarShip";
import ContentView from "../../components/UI/ContentView/ContentView";
import { Redirect } from "react-router-dom";
import BackButton from "../../components/UI/BackButton/BackButton";

const StarshipsView = (props) => {
  let data = props.starships ? (
    props.starships?.map((starship, i) => (
      <Starship key={i} starship={starship} />
    ))
  ) : (
    <Redirect to={"/"} />
  );

  return (
    <ContentView>
      <h1>Starships</h1>
      <Grid container spacing={3}>
        {data}
      </Grid>
      <BackButton />
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    starships: state.starship.starships,
  };
};

export default connect(mapStateToProps)(StarshipsView);
