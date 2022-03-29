import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, CardBody, Button } from "reactstrap";
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';

import fuzileiroReino from "../../assets/images/logo-txt-fuzileiro.png";
import iconInstagram from "../../assets/images/icon-instagram.png";
import iconWhatsapp from "../../assets/images/icon-whatsapp.png";

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

  return (
    <React.Fragment>
      <Col xl="3" sm="6">
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
