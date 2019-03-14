import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchRepos, setCursorColor, resetCursorColor } from '../../redux/actions';

import ResponsiveContainer from '../ResponsiveContainer';
import Repo from './Repo';
import FeatherIcon from '../FeatherIcon';
import { Colors, Neutrals } from '../../constants';

const RepoListContainer = styled.div`
  position: relative;
  text-align: center;
`;

const SectionList = ResponsiveContainer();
const List = styled(SectionList)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  align-items: stretch;

  margin: 0 auto;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin: 0;
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    margin: 0;
  }
`;

const PALETTE = [
  { from: Colors.orange.light, to: Colors.orange.dark },
  { from: Colors.green.light, to: Colors.green.dark },
  { from: Colors.red.light, to: Colors.red.dark },
  { from: Colors.blue.light, to: Colors.blue.dark },
  { from: Colors.yellow.light, to: Colors.yellow.dark },
];

const renderRepoContents = repo => (
  <>
    <Repo.Title>
      <div className="main">
        {repo.fork && (
          <FeatherIcon
            name="git-branch"
            style={{ filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))' }}
          />
        )}
        <span>{repo.name}</span>
      </div>
      <div className="sub">{repo.description}</div>
    </Repo.Title>

    <Repo.Stats>
      <figure>
        <FeatherIcon
          name="star"
          filled
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))' }}
        />
        <figcaption>{repo.stargazers_count}</figcaption>
      </figure>
      <figure>
        <FeatherIcon name="eye" style={{ filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))' }} />
        <figcaption>{repo.watchers_count}</figcaption>
      </figure>
      <figure>
        <FeatherIcon
          name="git-branch"
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))' }}
        />
        <figcaption>{repo.forks_count}</figcaption>
      </figure>
    </Repo.Stats>

    <Repo.Footer>
      <span>{repo.language}</span>
      <span>{repo.license && repo.license.name}</span>
    </Repo.Footer>
  </>
);

const RepoList = ({
  id,

  repos,
  loading,
  error,
  fetchRepos: fetchReposAction,
  setCursorColor: setCursorColorAction,
  resetCursorColor: resetCursorColorAction,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    fetchReposAction();
  }, []);

  return (
    <RepoListContainer id={id}>
      <h2>Projects</h2>
      <List>
        {repos
          .filter(repo => !repo.archived)
          .slice(0, 8)
          .map(repo => (
            <Repo
              key={repo.id}
              href={repo.html_url || null}
              target="_blank"
              rel="noopener noreferrer"
              palette={PALETTE}
              loading={loading}
              onMouseEnter={() => setCursorColorAction(Neutrals.white.medium)}
              onMouseLeave={resetCursorColorAction}
            >
              {repo.empty && (
                <Repo.Stats>
                  <FeatherIcon
                    name="more-horizontal"
                    size="2em"
                    style={{ filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))' }}
                  />
                </Repo.Stats>
              )}
              {!repo.empty && renderRepoContents(repo)}
            </Repo>
          ))}
        {error && (
          <Repo
            palette={PALETTE}
            onMouseEnter={() => setCursorColorAction(Neutrals.white.medium)}
            onMouseLeave={resetCursorColorAction}
            center
          >
            <h3>Error while fetching repositories</h3>
          </Repo>
        )}
        <Repo
          href="https://github.com/Schlipak"
          target="_blank"
          rel="noopener noreferrer"
          palette={PALETTE}
          onMouseEnter={() => setCursorColorAction(Neutrals.white.medium)}
          onMouseLeave={resetCursorColorAction}
          center
        >
          <h2>{t('repos.seeMore')}</h2>
        </Repo>
      </List>
    </RepoListContainer>
  );
};
RepoList.propTypes = {
  id: PropTypes.string,

  repos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),

  fetchRepos: PropTypes.func.isRequired,
  setCursorColor: PropTypes.func.isRequired,
  resetCursorColor: PropTypes.func.isRequired,
};

RepoList.defaultProps = {
  id: null,
  error: null,
};

const mapStateToProps = state => ({ ...state.repos });
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchRepos,
    setCursorColor,
    resetCursorColor,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoList);
