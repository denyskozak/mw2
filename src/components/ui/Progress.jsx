import React from 'react';
import PropTypes from 'prop-types';
import './Progress.css';

export const Progress = ({ value = 0, color = 'primary', className = '', id, disableAnimation = false, ...props }) => {
  const clamped = Math.max(0, Math.min(100, Number(value)));
  const transition = disableAnimation ? 'none' : undefined;
  return (
    <div id={id} className={`progress ${className}`} {...props}>
      <div
        className={`progress-fill ${color}`}
        style={{ width: `${clamped}%`, transition }}
      />
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  disableAnimation: PropTypes.bool,
};
