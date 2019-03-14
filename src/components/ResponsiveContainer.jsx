import styled from 'styled-components';

export default (component = 'section') => styled(component)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;

  @media screen and (max-width: 1400px) {
    max-width: 1000px;
  }

  @media screen and (max-width: 900px) {
    max-width: 500px;
  }
`;