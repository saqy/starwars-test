import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import ContentView from "../../components/UI/ContentView/ContentView";
import Character from "../../components/Character/Character";

import Fab from "@material-ui/core/Fab";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import { updateObject } from "../../shared/utility";

const useStyles = makeStyles((theme) => ({
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 400,
  },
  pageNavButtons: {
    position: "fixed",
    backgroundColor: "#234375",
    padding: 10,
    borderRadius: "50%",
    outline: "none",
    fontSize: 24,
    fontWeight: 700,
    color: "white",
  },

  fabNext: {
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },

  fabPre: {
    bottom: theme.spacing(4),
    right: theme.spacing(20),
  },

  fabPage: {
    bottom: theme.spacing(4),
    right: theme.spacing(12),
  },
}));

const CharactersView = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.loadCharacters(null);
  }, []);

  useEffect(() => {}, [props.characters]);

  const getSelectedRow = (character) => {
    props.onSelectCharacter(character);
    props.history.push(`character`);
  };

  const handlePrevious = () => {
    props.loadCharacters(props.previous);
  };

  const handleNext = () => {
    props.loadCharacters(props.next);
  };

  let data = null;
  if (props.characters) {
    data = props.characters?.map((elm, index) => {
      let character = {
        ...elm,
        id: index,
      };
      if (index === 8) {
        character = updateObject(character, {
          starshipName: character.starships[0]?.name,
        });
      }

      return (
        <Grid key={index} item xs={3} md={3} lg={3}>
          <Character
            character={character}
            getSelectedRow={() => getSelectedRow(character)}
            id={index}
          />
        </Grid>
      );
    });
  }

  if (props.loading) {
    data = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className={classes.error}>{props.error?.message}</p>;
  }

  let nextButton = (
    <Fab
      color="default"
      className={[classes.fabNext, classes.pageNavButtons].join(" ")}
      onClick={handleNext}
      aria-label="next"
      disabled={!props.next}
    >
      <SkipNextIcon />
    </Fab>
  );

  let previousButton = (
    <Fab
      color="default"
      className={[classes.fabPre, classes.pageNavButtons].join(" ")}
      onClick={handlePrevious}
      aria-label="back"
      disabled={!props.previous}
    >
      <SkipPreviousIcon />
    </Fab>
  );

  let pageButton = props.page ? (
    <Fab
      color="default"
      className={[classes.fabPage, classes.pageNavButtons].join(" ")}
      aria-label="next"
    >
      {props.page}
    </Fab>
  ) : null;

  return (
    <ContentView>
      {errorMessage}
      {data}
      {previousButton}
      {pageButton}
      {nextButton}
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCharacters: (url) => dispatch(actions.fetchCharacter(url)),
    onSelectCharacter: (character) =>
      dispatch(actions.selectCharacter(character)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.character.loading,
    error: state.character.error,
    characters: state.character.characters,
    next: state.character.next,
    previous: state.character.previous,
    count: state.character.count,
    page: state.character.page,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(CharactersView);
