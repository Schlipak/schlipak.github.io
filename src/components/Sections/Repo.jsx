import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Neutrals } from '../../constants';

const generateRepoColors = palette => palette.map(
  (color, i) => css`
      &:nth-child(5n + ${i + 1})::before {
        background-color: ${color.to};
        background: linear-gradient(to bottom right, ${color.from} 0%, ${color.to} 100%);
      }
    `,
);

const generateRepoShade = (palette, options = {}) => palette.map((color, i) => {
  const { active, focus } = options;
  const shade = rgba(color.to, 0.75);

  if (active) {
    return css`
        &:nth-child(5n + ${i + 1}) {
          box-shadow: 0 0.25rem 1rem -0.25rem ${shade};
        }
      `;
  }

  if (focus) {
    return css`
        &:nth-child(5n + ${i}) {
          box-shadow: 0 1rem 2rem -0.75rem ${shade}, 0 0 0 4px ${shade};
        }
      `;
  }

  return css`
      &:nth-child(5n + ${i + 1}) {
        box-shadow: 0 1rem 2rem -0.75rem ${shade};
      }
    `;
});

const Repo = styled.a`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: ${props => (props.center && 'center') || 'space-between'};
  align-items: ${props => (props.center && 'center') || 'flex-start'};
  padding: 1em 2em;

  color: ${Neutrals.white.lighter};
  text-decoration: none;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  overflow: hidden;

  transform-origin: center;
  transform: translateY(0);

  transition-property: transform, box-shadow;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  -webkit-user-drag: none;

  ${props => props.palette && generateRepoShade(props.palette)};
  ${props => props.palette && generateRepoColors(props.palette)};

  @keyframes Animation-Repo-Loading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.75;
    }
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);

    transition-property: transform, filter;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

    transform-origin: top left;
    transform: scale(2);
    filter: brightness(100%);

    z-index: 0;

    ${props => props.loading
      && css`
        animation-name: Animation-Repo-Loading;
        animation-duration: 0.75s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      `}
  }

  &:hover,
  &:focus,
  &:focus-within {
    &::before {
      transform: scale(1);
    }
  }

  &:focus,
  &:focus-within {
    ${props => props.palette && generateRepoShade(props.palette, { focus: true })}
  }

  &:active {
    transform: translateY(2px);
    ${props => props.palette && generateRepoShade(props.palette, { active: true })};

    &::before {
      transform: scale(1.1);
      filter: brightness(90%);
    }
  }

  > * {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    z-index: 100;
  }
`;

const RepoTitle = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  > .main {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;

    > span:nth-child(2) {
      margin-left: 0.25em;
    }
  }

  > .sub {
    font-size: 0.8em;
    font-weight: normal;
  }
`;

const RepoStats = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1em;

  font-size: 1.2rem;

  > figure {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0;

    &:not(:last-of-type) {
      margin-right: 1.5em;
    }

    > figcaption {
      margin-left: 0.35em;
    }
  }
`;

const RepoFooter = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-top: 2.5rem;

  font-size: 0.9em;

  > :first-child {
    text-align: start;
  }

  > :last-child {
    text-align: end;
  }
`;

Repo.Title = RepoTitle;
Repo.Stats = RepoStats;
Repo.Footer = RepoFooter;

export default Repo;
