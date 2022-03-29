import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, Row, CardBody, Button } from "reactstrap";

const CardBrasil = props => {
  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card>
          <CardBody>
            <div className="text-center">
                <div className="flex-1">
                    <h5 className="text-truncate">BRASIL</h5>
                    <p className="text-muted">
                      <b>+ 20 mil</b> - QGR´s
                    </p>
                </div>
            </div>

            <hr className="my-4" />

            <Row className="text-center">
                <div className="d-grid mb-2">
                    <Button
                        color="primary"
                        className="btn btn-success btn-block"
                        onClick={()=> window.open("/qgrpesquisar-br","_self")}
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

CardBrasil.propTypes = {
  qgr: PropTypes.object
}

export default CardBrasil
