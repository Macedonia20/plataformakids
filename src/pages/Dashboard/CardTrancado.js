import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, CardBody, Button, Row, CardImg, CardText, CardTitle } from "reactstrap";
import cadeado from "../../assets/images/lock.png";

const CardTrancado = props => {
  const { desafio } = props;

  
  return (
    <React.Fragment>
      <Row>
          <Col lg={6}>
              <Card
                style={{
                background:"gray",
                }}
                  >
                      
                  <Button>
                      <Row className="no-gutters align-items-center">
              
                          <Col md={4} className="d-flex align-items-center justify-content-center">
                              <CardImg 
                              className="img-fluid" 
                              src={cadeado} 
                              alt="Trancado" 
                              style={{ width: 59 }} 
                          />
                          </Col>
                          <Col md={8}>
                              <CardBody>
                                  <CardTitle style={{ color: '#fff', fontSize: '30px' }}>
                                      {desafio.nome}
                                  </CardTitle>
                                  <CardText style={{ color: '#fff' }}>
                                      TRANCADO
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

CardTrancado.propTypes = {
  desafio: PropTypes.object
}

export default CardTrancado
