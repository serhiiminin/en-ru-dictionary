import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Fade, CircularProgress } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import moment from 'moment';
import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';
import routes from '../../routes';
import { ButtonWithRouter } from '..';

const WordItemInList = props => {
  const { classes, isChecked, id, onWordCheck, en, ua, transcription, linkToWord, dateCreated, loading } = props;

  return (
    <div className={`${classes.word} ${isChecked && classes.wordChosen} ${loading && classes.wordLoading}`}>
      <div>
        <Checkbox
          onChange={() => onWordCheck(id)}
          checked={isChecked}
          disabled={loading}
        />
      </div>
      <div className={classes.wordText}>
        <span>{en && <Link className={classes.linkToWord} to={linkToWord}>{en}</Link>}</span>
        {transcription && ` - ${transcription}`}
        {ua && ` - ${ua}`}
        {loading && (
          <Fade in={loading} style={{ transitionDelay: loading ? '300ms' : '' }}>
            <CircularProgress color='secondary' size={20} />
          </Fade>
        )}
      </div>
      <div className={classes.wordTime}>
        {(dateCreated && moment(dateCreated).fromNow()) || '–'}
      </div>
      <div>
        <ButtonWithRouter
          to={urljoin(routes.words.list.root, id, 'edit')}
          disabled={loading}
          title='Edit'
          variant="fab"
          mini
        >
          <Edit/>
        </ButtonWithRouter>
      </div>
    </div>
  );
};

WordItemInList.propTypes = {
  classes: classesShape,
  id: PropTypes.string,
  en: PropTypes.string,
  ua: PropTypes.string,
  transcription: PropTypes.string,
  linkToWord: PropTypes.string,
  dateCreated: PropTypes.string,
  onWordCheck: PropTypes.func,
  isChecked: PropTypes.bool,
  loading: PropTypes.bool,
};

WordItemInList.defaultProps = {
  classes: classesDefaultProps,
  id: null,
  en: null,
  ua: null,
  onWordCheck: null,
  transcription: null,
  linkToWord: null,
  dateCreated: null,
  isChecked: null,
  loading: null,
};

export default WordItemInList;
