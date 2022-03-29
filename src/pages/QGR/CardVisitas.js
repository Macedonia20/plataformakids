import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, CardBody, Button, Row } from "reactstrap";
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';

import api from '../../services/api';

import fuzileiroReino from "../../assets/images/logo-txt-fuzileiro.png";
import iconInstagram from "../../assets/images/icon-instagram.png";
import iconWhatsapp from "../../assets/images/icon-whatsapp.png";
import emblemaQGR from "../../assets/images/emblema-qgr.png";

const CardVisitas = props => {
  const { visita } = props;

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

  function copiar(text) {
      toast.success("Whatsapp copiado!");
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
  }

  async function apagarVisita(idVisita) {
    const accessToken = JSON.parse(localStorage.getItem("authUser")).token;

    if (accessToken) {
      await api.delete(`/visitas/${idVisita}`, {
        headers: {"Authorization" : `Bearer ${accessToken}`}
      }).then(() => {
        document.getElementById(idVisita).style.display = 'none';
        toast.success(`Visita apagada!`);
      });
    }
  }

  return (
    <React.Fragment>
      <Col xl="3" sm="6" id={visita.idvisitas}>
        <Card style={{ background: '#212754' }}>
            <CardBody>
                <div className="d-flex mb-4">
                    <Avatar className="rounded-circle header-profile-user me-3" name={visita.nome} src={visita.avatar} size="80" round={true} maxInitials={2}/>
                    <div className="flex-1">
                        <img className="d-flex me-3" alt='' style={{ width: '100%' }} src={fuzileiroReino} />
                    </div>
                </div>

                <h4 className="mt-0 font-size-20">{visita.nome}</h4>
                <div>
                    {visita.instagram ? (
                      <div className="d-grid mb-3">
                          <Button
                            color="secondary"
                            outline
                            className="waves-effect btn btn-lg btn-block"
                            onClick={()=> window.open(getUrlInstagram(visita.instagram), "_blank")}
                          >
                            <img alt='instagram' style={{ width: '20px' }} src={iconInstagram} /> {visita.instagram.replace('@', '').replace('https://www.instagram.com/', '').replace('/', '')}
                          </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                    {visita.whatsapp ? (
                      <div className="d-grid mb-3">
                          <Button
                            color="secondary"
                            outline
                            className="waves-effect btn btn-lg btn-block"
                            onClick={()=> copiar(visita.whatsapp)}
                          >
                            <img alt='whatsapp' style={{ width: '20px' }} src={iconWhatsapp} /> Whatsapp
                          </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="d-flex mb-4">
                        <div>
                            <img className="d-flex me-3" style={{ width: '50px' }} src={emblemaQGR} alt='' />
                        </div>
                        <div style={{ paddingTop: '16px' }}>
                            <h4 className="mt-0 font-size-16">
                              {visita.estado} - {visita.cidade}
                            </h4>
                        </div>
                    </div>
                    <Row className="text-center">
                        <div className="d-grid mb-2">
                            <Button 
                                color="danger"
                                className="btn btn-block"
                                onClick={() => apagarVisita(visita.idvisitas)}
                            >
                                APAGAR
                            </Button>
                        </div>
                    </Row>
                </div>
            </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardVisitas.propTypes = {
  visita: PropTypes.object
}

export default CardVisitas
