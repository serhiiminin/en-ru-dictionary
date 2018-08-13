import PropTypes from 'prop-types';

const wordFormShape = PropTypes.shape({
  en: PropTypes.string,
  ru: PropTypes.string,
  transcription: PropTypes.string,
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      example: PropTypes.string,
    })
  )
});

export { wordFormShape }
