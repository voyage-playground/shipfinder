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
const Avatar = ({ src, size }) => {
  return <StyledImg src={src} size={size} />;
};

Avatar.propTypes = {
  size: PropTypes.number,
  src: PropTypes.string,
  defaultColor: PropTypes.string,
};

Avatar.defaultProps = {
  defaultColor: '',
  src: '',
  size: 50,
};

export default Avatar;
