import React from 'react';
import styled from 'styled-components';

const ScrollSnap = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 0;
`;

export default props => <ScrollSnap {...props} />;
