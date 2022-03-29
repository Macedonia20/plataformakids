import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, Row, CardBody, Button } from "reactstrap";

import EstadosCidades from '../QGRFuzileiro/cidades.json';

const CardEstados = props => {
  const { qgr } = props;
  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card>
          <CardBody>
            <div className="text-center">
                <div className="flex-1">
                    <h5 className="text-truncate">{EstadosCidades.estados.find(state => state.sigla === qgr.estado)?.nome ?? ''}</h5>
                    <p className="text-muted">
                      <b>{qgr.total}</b> - QGR´s na região
                    </p>
                </div>
            </div>

            <hr className="my-4" />

            <Row className="text-center">
                <div className="d-grid mb-2">
                    <Button
                        color="primary"
                        className="btn btn-success btn-block"
                        onClick={()=> window.open(`/qgrpesquisar-cidade?s=${qgr.estado}`,"_self")}
                    >
                        VER CIDADES
                    </Button>
                </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardEstados.propTypes = {
  qgr: PropTypes.object
}

export default CardEstados
