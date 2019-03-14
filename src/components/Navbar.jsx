import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import CursorLink from './CursorLink';
import FeatherIcon from './FeatherIcon';
import { Neutrals, Theme } from '../constants';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;

  font-size: 1rem;
  background-color: ${Neutrals.white.medium};

  overflow-y: auto;
  z-index: 900;

  &:hover,
  &:focus-within {
    & > ul > li > :first-child > :first-child {
      opacity: 0.9;
    }

    & span {
      margin: 0 1em;
      max-width: 13ch;
      opacity: 0.75;
    }
  }

  @media screen and (max-width: 900px) {
    font-size: 0.75em;

    &:hover,
    &:focus-within {
      & span {
        margin: 0 0.25em;
      }
    }
  }

  @media (max-width: 900px) and (-webkit-min-device-pixel-ratio: 0) {
    height: calc(100vh - 56px);
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1em 0;
  margin: 0;
  flex-shrink: 0;

  list-style: none;
  background-color: ${props => props.background};
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;

  color: #2f3542;
  white-space: nowrap;
  overflow: hidden;

  & > :first-child {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0 1em;
    width: 100%;
  }

  & span {
    display: inline-block;
    position: relative;
    margin: 0;
    max-width: 0;
    opacity: 0;

    transition-property: max-width, margin, opacity;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: max-width, margin;
  }
`;

const LINKS = [
  { title: 'navbar.home', href: '#home', icon: 'home' },
  { title: 'navbar.skills', href: '#skills', icon: 'book-open' },
  { title: 'navbar.projects', href: '#projects', icon: 'code' },
  { title: 'navbar.experience', href: '#experience', icon: 'briefcase' },
  { title: 'navbar.contact', href: '#contact', icon: 'mail' },
];

const Navbar = ({ color, accent }) => {
  const { t } = useTranslation();

  return (
    <Nav>
      {/* Logo */}
      <NavList>
        {LINKS.map(link => (
          <NavItem key={link.href}>
            <CursorLink
              href={link.href}
              color={color}
              accent={accent}
              targetOpacity={0.75}
              additionalChildren={<span>{t(link.title)}</span>}
            >
              <FeatherIcon name={link.icon} size="1.5em" />
            </CursorLink>
          </NavItem>
        ))}
      </NavList>
      <NavList background={Neutrals.white.dark}>
        <NavItem>
          <CursorLink
            href="https://github.com/Schlipak/schlipak.github.io"
            color={color}
            accent={accent}
            targetOpacity={0.75}
            additionalChildren={<span>{t('navbar.github')}</span>}
            external
          >
            <FeatherIcon name="github" size="1.5em" />
          </CursorLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

Navbar.propTypes = {
  color: PropTypes.string,
  accent: PropTypes.string,
};

Navbar.defaultProps = {
  color: Neutrals.white.lighter,
  accent: Theme.primary.light,
};

export default Navbar;
