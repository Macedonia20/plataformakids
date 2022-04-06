import PropTypes from 'prop-types';
import React from "react";

import CardFinalizado from './CardFinalizado';
import CardPendente from './CardPendente';
import CardTrancado from './CardTrancado';

const Cards = props => {
  const { desafio } = props;
  return (
    <React.Fragment>
      {desafio.status === 'finalizado' ?
          (
              <CardFinalizado desafio={desafio} />
          ) 
          : 
          (<></>)
      }

      {desafio.status === 'pendente' ?
          (
              <CardPendente desafio={desafio} />
          ) 
          : 
          (<></>)
      }

      {!desafio.status ?
          (
              <CardTrancado desafio={desafio} />
          )
          : 
          (<></>)
      }
    </React.Fragment>
  )
}

Cards.propTypes = {
  desafio: PropTypes.object
}

export default Cards;
