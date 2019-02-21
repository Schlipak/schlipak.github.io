import React from 'react';
import PropTypes from 'prop-types';

const FeatherIcon = ({
  size, filled, color, name, style,
}) => (
  <svg
    width={size}
    height={size}
    fill={filled ? color : 'transparent'}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <use xlinkHref={`/img/feather-sprite.svg#${name}`} />
  </svg>
);

FeatherIcon.propTypes = {
  size: PropTypes.string,
  filled: PropTypes.bool,
  color: PropTypes.string,
  name: PropTypes.string,

  style: PropTypes.objectOf(PropTypes.string),
};

FeatherIcon.defaultProps = {
  size: '1em',
  filled: false,
  color: 'currentColor',
  name: 'circle',

  style: {},
};

export default FeatherIcon;
