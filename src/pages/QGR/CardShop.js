import PropTypes from 'prop-types';
import React from "react";
import { Card, Col, Row ,CardBody, Button} from "reactstrap";

const CardShop = props => {
  const { qgr, handleModal } = props;

  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <CardBody>
          <div className="text-center">
              {/* <Avatar name={qgr.nome} size="50" round={true} maxInitials={2}/> */}
              {/* <img src={shop.img} alt="img-1" className="" width={200}/> */}
              <div className="flex-1">
                  <h5 className="text-dark">#{qgr.idqgr} - {qgr.nome ?? qgr.userName}</h5>
                  <p className="text-muted">
                      {/* <i className="mdi mdi-account me-1"></i>  */} {qgr.nivel === 'M'?'Marechal':'General'}
                  </p>
              </div>
          </div>

          <hr className="my-4" />

          <Row className="text-center">
              <div className="col-4">
                  <p className="text-muted mb-2">Estado</p>
                  <h5>{qgr.estado}</h5>
              </div>
              <div className="col-8">
                  <p className="text-muted mb-2">Cidade</p>
                  <h5>{qgr.cidade}</h5>
              </div>
          <hr className="my-4" />

          <Button size="sm" color="primary" onClick={(e) => {e.preventDefault(); handleModal(true, qgr)}}>EDITAR</Button>
          </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardShop.propTypes = {
  qgr: PropTypes.object,
  handleModal: PropTypes.func,
}

export default CardShop
