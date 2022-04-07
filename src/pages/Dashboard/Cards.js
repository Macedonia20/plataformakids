import PropTypes from 'prop-types';
import React from "react";

import CardFinalizado from './CardFinalizado';
import CardPendente from './CardPendente';
import CardTrancado from './CardTrancado';

const Cards = props => {
  const { desafio } = props;

  function renderCards(desafio) {
    switch (desafio.status) {
      case 'finalizado':
        return (
          <CardFinalizado desafio={desafio} />
        );
      case 'pendente':
        return (
          <CardPendente desafio={desafio} />
        );

      default:
        return (
          <CardTrancado desafio={desafio} />
        );
    }
  }
  return (
    <React.Fragment>
      {renderCards(desafio)}
    </React.Fragment>
  )
}

Cards.propTypes = {
  desafio: PropTypes.object
}

export default Cards;
