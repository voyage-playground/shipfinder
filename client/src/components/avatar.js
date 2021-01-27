import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

const StyledImg = styled.img`
  ${({ size }) => css`
    border-radius: 50%;
    width: ${size}px;
    height: ${size}px;
  `}
`;

// eslint-disable-next-line no-undef
const urlPrefix = process.env.REACT_APP_API_URL || window.location.origin;

const Avatar = ({ src, size }) => {
  return <StyledImg src={`${urlPrefix}/avatars/${src}.svg`} size={size} />;
};

Avatar.propTypes = {
  size: PropTypes.number,
  src: PropTypes.string,
};

Avatar.defaultProps = {
  src: '',
  size: 50,
};

export default Avatar;
