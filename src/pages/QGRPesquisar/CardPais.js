import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, Row, CardBody, Button } from "reactstrap";

const CardPais = props => {
  const { qgrPaises } = props;
  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card>
          <CardBody>
            <div className="text-center">
                <div className="flex-1">
                    <h5 className="text-truncate">{qgrPaises.pais}</h5>
                    <p className="text-muted">
                      <b>{qgrPaises.total}</b> - QGR´s na região
                    </p>
                </div>
            </div>

            <hr className="my-4" />

            <Row className="text-center">
                <div className="d-grid mb-2">
                    <Button
                        color="primary"
                        className="btn btn-block"
                        onClick={()=> window.open(`/qgrpesquisar-regiao?pais=${qgrPaises.pais}`,"_self")}
                    >
                        PESQUISAR
                    </Button>
                </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardPais.propTypes = {
  qgrPaises: PropTypes.object
}

export default CardPais
