import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import PacmanLoader from 'react-spinners/PacmanLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = ({ loading }) => (
  <div className="sweet-loading">
    <PacmanLoader
      css={override}
      size={32}
      color={'#303f9f'}
      loading={loading}
    />
  </div>
);

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;
