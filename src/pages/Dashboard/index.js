import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardTitle, CardImg, CardText, Container, Button, CardColumns } from "reactstrap";

import telegram from "../../assets/images/telegram.jpeg";
import youtube from "../../assets/images/youtube.png";
import instagram from "../../assets/images/instagram.png";
import meusqgrs from "../../assets/images/qgr/meusqgrs.png";
import lives from "../../assets/images/qgr/lives.jpg";
import batismo from "../../assets/images/qgr/batismo.jpg";

import { Link } from "react-router-dom";


//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                // { title : "QGR", link : "/" },
                // { title : "Home", link : "/dashboard" },
            ],
            reports : [
                { icon : "ri-stack-line", title : "Number of Sales", value : "1452", rate : "2.4%", desc : "From previous period" },
                { icon : "ri-store-2-line", title : "Sales Revenue", value : "$ 38452", rate : "2.4%", desc : "From previous period" },
                { icon : "ri-briefcase-4-line", title : "Average Price", value : "$ 15.4", rate : "2.4%", desc : "From previous period" },
            ]
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="" breadcrumbItems={this.state.breadcrumbItems} />
                    <Row>
                        <Col lg={6}>
                            <h4 className="my-3">LOCALIZAR OU CADASTRAR MEU QGR</h4>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={4}>
                                        <CardImg className="img-fluid" src={meusqgrs} alt="Meus QGR's" />
                                    </Col>
                                    <Col md={8}>
                                        <CardBody>
                                            <CardTitle>Localize ou cadastre seu QGR</CardTitle>
                                            <CardText>Vamos alcançar 250 mil quarteis generais!</CardText>
                                            <div className="d-grid mb-2">
                                                <Button
                                                    color="primary"
                                                    className="btn btn-success btn-lg btn-block"
                                                    onClick={()=> window.open("/qgr", "_self")}
                                                >
                                                    LOCALIZAR OU CADASTRAR
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </ Row>
                    <Row>
                        <Col lg={6}>
                            <h4 className="my-3">INFORMAÇÕES SOBRE O BATISMO</h4>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={4}>
                                        <CardImg className="img-fluid" src={batismo} alt="Batismos" />
                                    </Col>
                                    <Col md={8}>
                                        <CardBody>
                                            <CardTitle>Mais informações</CardTitle>
                                            <CardText>Dicas, dúvidas, lives, formulários, documentos e mais...</CardText>
                                            <div className="d-grid mb-2">
                                                <Button
                                                    color="primary"
                                                    className="btn btn-success btn-lg btn-block"
                                                    onClick={()=> window.open("/batismo", "_self")}
                                                >
                                                    VER MAIS
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </ Row>
                    
                    <Row>
                        <Col lg={6}>
                            <h4 className="my-3">CANAL NO TELEGRAM</h4>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={4}>
                                        <CardImg className="img-fluid" src={telegram} alt="Skote" />
                                    </Col>
                                    <Col md={8}>
                                        <CardBody>
                                            <CardTitle>Entre no grupo do Telegram</CardTitle>
                                            <CardText>Vamos comunicar as novidades, não fique de fora!</CardText>
                                            <div className="d-grid mb-2">
                                                <Button
                                                    color="primary"
                                                    className="btn btn-success btn-lg btn-block"
                                                    onClick={()=> window.open("https://t.me/+MvZDueHce5tmMWI5", "_blank")}
                                                >
                                                    ENTRAR NO GRUPO
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={4}>
                                        <CardImg className="img-fluid" src={youtube} alt="Skote" />
                                    </Col>
                                    <Col md={8}>
                                        <CardBody>
                                            <CardTitle>Entre no canal do Youtube</CardTitle>
                                            <CardText>Novidades, lançamentos e muito mais!</CardText>
                                            <div className="d-grid mb-2">
                                                <Button
                                                    color="primary"
                                                    className="btn btn-danger btn-lg btn-block"
                                                    onClick={()=> window.open("https://www.youtube.com/channel/UCHmlUAxdaFB_E6_-KfyKKiQ", "_blank")}
                                                >
                                                    ASSISTIR YOUTUBE
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={4}>
                                        <CardImg className="img-fluid" src={instagram} alt="Skote" />
                                    </Col>
                                    <Col md={8}>
                                        <CardBody>
                                            <CardTitle>Acompanhe o nosso instagram</CardTitle>
                                            <CardText>Lives, Storys um conteúdo especial!</CardText>
                                            <div className="d-grid mb-2">
                                                <Button
                                                    color="primary"
                                                    className="btn btn-primary btn-lg btn-block"
                                                    onClick={()=> window.open("https://www.instagram.com/plataformaqgr", "_blank")}
                                                >
                                                    VER INSTAGRAM
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </ Row>
                    <Row>
                        <h4 className="my-3">LIVES</h4>
                        <CardColumns>
                            <Card>
                                <CardImg top src={lives} alt="Skote" />
                                <CardBody>
                                <div className="d-grid mb-3">
                                <Link className="btn btn-success btn-lg btn-block " to="/lives">
                                    VER MAIS
                                </Link>
                                </div>
                                </CardBody>
                            </Card>
                        </CardColumns>
                    </ Row>
                    {/* <h4 className="my-3">CONHEÇA AS PATENTES DO REINO</h4> */}
                    {/* <Row>
                        <Col lg={6}>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={4}>
                                        <CardImg className="img-fluid" src={imgMR} alt="Skote" />
                                    </Col>
                                    <Col md={8}>
                                        <CardBody>
                                            <CardTitle>Marechal do Reino (MR)</CardTitle>
                                            <CardText>Os Marechais estão tocando o terror na terra em grande escala, lidere mais de 12 QGR's</CardText>
                                            
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={4}>
                                        <CardImg className="img-fluid" src={imgGR} alt="Skote" />
                                    </Col>
                                    <Col md={8}>
                                        <CardBody>
                                            <CardTitle>General do Reino (GR)</CardTitle>
                                            <CardText>Sua casa é uma grande arma, vamos avançar todos os níveis.</CardText>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={4}>
                                        <CardImg className="img-fluid" src={imgFR} alt="Skote" />
                                    </Col>
                                    <Col md={8}>
                                        <CardBody>
                                            <CardTitle>Fuzieleiro do Reino (FR)</CardTitle>
                                            <CardText>Seu treino é intensivo falta pouco para avançarmos na guerra.</CardText>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row> */}
                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
