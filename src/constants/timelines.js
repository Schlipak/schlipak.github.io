import React from 'react';
import styled from 'styled-components';

const EventTitle = styled.h4`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
  margin-top: 0;
  margin-bottom: 0.25em;

  > .location,
  > .title {
    font-weight: normal;
    font-size: 0.9em;
  }

  > .location::before {
    content: ', ';
  }

  > .title {
    font-style: italic;

    &::before {
      content: '\00a0-\00a0';
    }
  }
`;

export const education = [
  {
    id: 1,
    content: (
      <>
        <EventTitle>
          <span>Griffith College Dublin</span>
          <span className="location">Dublin</span>
          <span className="title">Computing</span>
        </EventTitle>
        <p>
          Année à l’étranger pendant la 4ème année à Epitech. Programme varié similaire à un DUT.
        </p>
      </>
    ),
    date: 'Sept. 2017 - Jun. 2018',
  },
  {
    id: 2,
    content: (
      <>
        <EventTitle>
          <span>Epitech</span>
          <span className="location">Toulouse / Paris</span>
          <span className="title">Expert en Informatique</span>
        </EventTitle>
        <p>
          Enseignement très technique basé sur la réalisation de projets. Favorise l’ouverture
          d’esprit et la curiosité pour les nouvelles technologies. Apprend à apprendre.
        </p>
      </>
    ),
    date: 'Oct. 2015 - Présent',
    left: true,
  },
  {
    id: 3,
    content: (
      <>
        <EventTitle>
          <span>Université Paul Sabatier</span>
          <span className="location">Toulouse</span>
          <span className="title">DUT Informatique</span>
        </EventTitle>
        <p>
          Cursus académique donnant des bases solides dans le monde de l’informatique mais aussi des
          compétences transversales telles que la communication ou le droit.
        </p>
      </>
    ),
    date: 'Sept. 2013 - Jul. 2015',
  },
];

export const experience = [
  {
    id: 1,
    content: (
      <>
        <EventTitle>
          <span>Samsung Campus</span>
          <span className="location">Saint-Ouen</span>
          <span className="title">Assistant pédagogique</span>
        </EventTitle>
        <p>
          Formation gratuite aux métiers du web, offerte aux non-bacheliers. Encadrement et
          accompagnement pédagogique des première années.
        </p>
        <p>
          <em>Technologies : PHP, JavaScript, HTML, CSS</em>
        </p>
      </>
    ),
    date: 'Sept. 2018 - Fév. 2019',
  },
  {
    id: 2,
    content: (
      <>
        <EventTitle>
          <span>Facilecomm</span>
          <span className="location">Labège</span>
          <span className="title">Développeur web front-end</span>
        </EventTitle>
        <p>
          Travail en équipe sur ShippingBo, une solution de gestion logistique pour les e-commerces.
        </p>
        <p>
          <em>Technologies: JavaScript (Ember.js), Ruby on Rails</em>
        </p>
      </>
    ),
    date: 'Avr. 2017 - Jul. 2017',
    left: true,
  },
  {
    id: 3,
    content: (
      <>
        <EventTitle>
          <span>Visibily</span>
          <span className="location">Toulouse / Paris</span>
          <span className="title">Développeur web full-stack</span>
        </EventTitle>
        <p>
          Projet de fin d’étude, mené en condition de start-up. Plateforme web d’automatisation
          d’interactions et promotion sur Instagram pour les influenceurs et les agences marketing.
        </p>
        <p>
          <em>Technologies : Ruby on Rails, JavaScript (Ember.js), Heroku, PostgreSQL, Redis</em>
        </p>
      </>
    ),
    date: 'Nov. 2016 - Fév. 2019',
  },
  {
    id: 4,
    content: (
      <>
        <EventTitle>
          <span>Sciences Po</span>
          <span className="location">Toulouse</span>
          <span className="title">Développeur web full-stack</span>
        </EventTitle>
        <p>
          Analyse des besoins de l’équipe administrative et conception d’une application de gestion
          des paiements des intervenants de l’école.
        </p>
        <p>
          <em>Technologies : PHP (Symfony)</em>
        </p>
      </>
    ),
    date: 'Avr. 2015 - Jul. 2015',
    left: true,
  },
];
