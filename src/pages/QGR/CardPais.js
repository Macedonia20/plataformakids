import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, Row ,CardBody} from "reactstrap";
import { Link } from "react-router-dom";

const CardPais = props => {
  // const { qgr } = props;
  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card>
          <Link to="/qgr/pais/br" className="text-dark">
            <CardBody>
              <div className="text-center">
                  <div className="flex-1">
                      <h5 className="text-truncate">BRASIL</h5>
                  </div>
              </div>

              <hr className="my-4" />

              <Row className="text-center">
                  <div className="col-6">
                      <p className="text-muted mb-2">QGR's</p>
                      <h5>18654</h5>
                  </div>
                  <div className="col-6">
                      <p className="text-muted mb-2">Generais</p>
                      <h5>17633</h5>
                  </div>
              </Row>

              <br />

              <div className="d-grid mb-2">
                <button className="btn btn-primary btn-sm btn-block">
                    Ver mais
                </button>
              </div>
            </CardBody>
          </Link>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardPais.propTypes = {
  qgr: PropTypes.object
}

export default CardPais
