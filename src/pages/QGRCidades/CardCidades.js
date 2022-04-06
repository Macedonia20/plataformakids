import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import { Card, Col, Row, CardBody, Button } from "reactstrap";

const CardCidades = props => {

  const { qgr } = props;

  const [estado, setEstado] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const estadoParam = url.searchParams.get("s");
    setEstado(estadoParam);
  }, []);

  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card>
          <CardBody>
            <div className="text-center">
                <div className="flex-1">
                    <h5 className="text-truncate">{qgr.cidade}</h5>
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
                        className="btn btn-primary btn-block"
                        onClick={()=> window.open(`/qgrpesquisar-regiao?cidade=${qgr.cidade}&estado=${estado}`,"_self")}
                    >
                        VER QGR's
                    </Button>
                </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardCidades.propTypes = {
  qgr: PropTypes.object
}

export default CardCidades
