import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, CardBody, Button, Row, CardImg, CardText, CardTitle } from "reactstrap";
import diamante from "../../assets/images/diamond.png";

const CardFinalizado = props => {
  const { desafio } = props;
  return (
    <React.Fragment>
      <Row>
          <Col lg={6}>
              <Card
                  style={{
                    background:"green",
                  }}
              >
                  <Button
                      color="#3d8116"
                  >
                      <Row>
                          <Col md={4} className="d-flex align-items-center justify-content-center">
                              <h3 style={{ color: '#fff' }}>+{desafio.pontos}&nbsp;</h3>
                              <CardImg
                                  src={diamante} 
                                  alt="Pontos"
                                  style={{ width: 60 }}
                              />
                          </Col>
                          <Col md={8}>
                                <CardBody>
                                    <CardTitle style={{ color: '#fff', fontSize: '30px' }}>
                                        {desafio.nome}
                                    </CardTitle>
                                    <CardText style={{ color: '#fff' }}>
                                        FINALIZADO
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

CardFinalizado.propTypes = {
  desafio: PropTypes.object
}

export default CardFinalizado;
