import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { WordsList } from '../../components';
import routes from '../../routes';

class WordsListContainer extends Component {
  static propTypes = {
    fetchWords: PropTypes.func.isRequired,
    cleanWords: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchWords()
  }

  componentWillUnmount() {
    this.props.cleanWords();
  }

  render() {
    return (
      <Switch>
        <Route exact path={routes.words.list.all} component={WordsList}/>
        <Route exact path={routes.words.list.preview} render={() => 'Preview'}/>
        <Route exact path={routes.words.list.edit} render={() => 'Edit'}/>
      </Switch>
    )
  }
}

export default WordsListContainer;
