import React, { Component } from 'react';
import { Container, Row, Col, CardColumns, Card, CardImg, CardBody, Button } from "reactstrap";

import checkin from "../../assets/images/qgr/check-in.jpg";
import expandir from "../../assets/images/qgr/plano-expansao.jpg";
import pesquisarqgr from "../../assets/images/qgr/pesquisarqgr.png";
import meusqgrs from "../../assets/images/qgr/meusqgrs.png";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class QGRMenu extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Opções", link : "#" },
                { title : "QGR", link : "#" },
            ],
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Menu QGR" breadcrumbItems={this.state.breadcrumbItems} />
                    <Row>
                        <Col sm={12}>
                            {/* <h4 className="my-3">Manutenção</h4> */}
                            <CardColumns>
                                <Card>
                                    <CardImg top src={meusqgrs} alt="Cadastrar meu QGR" />
                                    <CardBody>
                                    <div className="d-grid mb-2">
                                        <Button
                                            color="primary"
                                            className="btn btn-success btn-lg btn-block"
                                            onClick={()=> window.open("/qgr","_self")}
                                        >
                                            LOCALIZAR OU CADASTRAR
                                        </Button>
                                    </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardImg top src={checkin} alt="Skote" />
                                    <CardBody>
                                    <div className="d-grid mb-2">
                                        <Button
                                            color="primary"
                                            className="btn btn-secondary btn-lg btn-block "
                                        >
                                            Aguarde o comando...
                                        </Button>
                                    </div>
                                    </CardBody>
                                </Card>
                                
                                <Card>
                                    <CardImg top src={pesquisarqgr} alt="Pesquisar QGR's" />
                                    <CardBody>
                                    <div className="d-grid mb-2">
                                        <Button
                                            color="primary"
                                            className="btn btn-success btn-lg btn-block"
                                            onClick={()=> window.open("/qgrpesquisar","_self")}
                                        >
                                            VER MAIS
                                        </Button>
                                    </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardImg top src={expandir} alt="Skote" />
                                    <CardBody>
                                    <div className="d-grid mb-2">
                                        <Button
                                            color="primary"
                                            className="btn btn-secondary btn-lg btn-block "
                                        >
                                            Aguarde o comando...
                                        </Button>
                                    </div>
                                    </CardBody>
                                </Card>
                            </ CardColumns>
                        </ Col>
                    </ Row>
                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default QGRMenu;