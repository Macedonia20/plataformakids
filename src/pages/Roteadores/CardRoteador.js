import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, CardBody, Button } from "reactstrap";
import Avatar from 'react-avatar';

import EstadosCidades from '../QGRFuzileiro/cidades.json';

import generalReino from "../../assets/images/logo-txt-general.png";
import emblemaQGR from "../../assets/images/emblema-qgr.png";
import iconInstagram from "../../assets/images/icon-instagram.png";
import iconWhatsapp from "../../assets/images/icon-whatsapp.png";

const CardRoteador = props => {
  const { qgr } = props;

  function getUrlInstagram (instagram) {
    let dominioInstagram = 'https://www.instagram.com/';
    // @onsoares
    if (instagram.includes('@')) {
        const tagSemArroba = instagram.replace('@', '');
        return dominioInstagram + tagSemArroba;
    }
    
    // https://www.instagram.com/onsoares/
    if (instagram.includes('https')) {
        return instagram;
    }

    // onsoares
    if (!instagram.includes('@') && !instagram.includes('https')) {
        return dominioInstagram + instagram;
    }
  }

  function getWhatsapp (whatsapp) {
    if (whatsapp.includes('chat')) {
      return 'Entrar no grupo';
    }

    return whatsapp;
  }

  function abrirLink (value) {
    if (value.includes('https://chat')) {
      window.open(value, "_blank");
    }

    if (value.includes('chat')) {
      window.open(`https://${value}`, "_blank");
    }
  }

  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card>
            {/* email toolbar */}
            <CardBody>
                <div className="d-flex mb-4">
                    <Avatar className="rounded-circle header-profile-user me-3" name={qgr.nome} src={qgr.avatar} size="80" round={true} maxInitials={2}/>
                    <div className="flex-1">
                        <img className="d-flex me-3" style={{ width: '100%' }} src={generalReino} alt="Generic placeholder" />
                    </div>
                </div>

                <h4 className="mt-0 font-size-20">{qgr.nome}</h4>
                <div>
                    {qgr.instagram ? (
                      <div className="d-grid mb-3">
                          <Button
                            color="secondary"
                            outline
                            className="waves-effect btn btn-lg btn-block"
                            onClick={()=> window.open(getUrlInstagram(qgr.instagram), "_blank")}
                          >
                            <img className="" alt='instagram' style={{ width: '20px' }} src={iconInstagram} /> {qgr.instagram.replace('@', '').replace('https://www.instagram.com/', '').replace('/', '')}
                          </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                    {qgr.whatsapp ? (
                      <div className="d-grid mb-3">
                          <Button
                            color="secondary"
                            outline
                            className="waves-effect btn btn-lg btn-block"
                            onClick={()=> abrirLink(qgr.whatsapp)}
                          >
                            <img alt='instagram' style={{ width: '20px' }} src={iconWhatsapp} /> {getWhatsapp(qgr.whatsapp)}
                          </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                    {qgr.grupowhatsapp ? (
                      <div className="d-grid mb-3">
                          <Button
                            color="secondary"
                            outline
                            className="waves-effect btn btn-lg btn-block "
                            onClick={()=> window.open(qgr.grupowhatsapp, "_blank")}
                          >
                            <img alt='instagram' style={{ width: '20px' }} src={iconWhatsapp} /> Entrar no grupo
                          </Button>
                      </div>
                    ): (
                      <>
                      </>
                    )}
                    <div className="d-flex mb-4">
                        <div className="">
                            <img className="d-flex me-3" alt='QGR' style={{ width: '50px' }} src={emblemaQGR} />
                        </div>
                        <div className="" style={{ paddingTop: '25px' }}>
                            <h4 className="mt-0 font-size-16">
                              Roteador de {EstadosCidades.estados.find(state => state.sigla === qgr.estado)?.nome ?? ''}
                            </h4>
                        </div>
                    </div>
                    
                </div>
            </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardRoteador.propTypes = {
  qgr: PropTypes.object
}

export default CardRoteador
