import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, CardBody, Button, Row, CardImg, CardText, CardTitle } from "reactstrap";
import time from "../../assets/images/time.png";

const CardPendente = props => {
  const { desafio } = props;

  
  return (
    <React.Fragment>
        <Row>
            <Col lg={6}>
                <Card
                    style={{
                        background:"purple",
                    }}
                >
                    <Button
                        color="#3d8116"
                    >
                        <Row className="no-gutters align-items-center">
                            <Col md={4} className="d-flex align-items-center justify-content-center">
                                <CardImg 
                                    className="img-fluid"
                                    src={time} 
                                    alt="Pendente" 
                                    style={{ width: 59 }} 
                                />
                            </Col>
                            <Col md={8}>
                                <CardBody>
                                        <CardTitle style={{ color: '#fff', fontSize: '30px' }}>
                                            {desafio.nome}
                                        </CardTitle>
                                        <CardText style={{ color: '#fff' }}>
                                            PENDENTE
                                        </CardText>
                                </CardBody>
                            </Col>
                        </Row>
                    </Button>
                </Card>
            </Col>
        </ Row>
    </React.Fragment>
  )
}

CardPendente.propTypes = {
  desafio: PropTypes.object
}

export default CardPendente
