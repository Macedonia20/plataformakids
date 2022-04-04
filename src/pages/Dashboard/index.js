import React, { Component } from "react";
import { Col, Modal,  ModalHeader, Row, Card, Input, ModalFooter, Label, CardBody, CardTitle, CardImg, CardText, Container, Button, CardColumns } from "reactstrap";

import telegram from "../../assets/images/lock.png";
import youtube from "../../assets/images/youtube.png";
import instagram from "../../assets/images/instagram.png";
import meusqgrs from "../../assets/images/diamond.png";
import lives from "../../assets/images/qgr/lives.jpg";
import batismo from "../../assets/images/time.png";

import api from '../../services/api';

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
            ],

            modal_standard: false,
        }
      
    }

    async abrirModalEdicao(idDesafios) {
        const options = this.getOptions();
        await api.get(`/videos/${idDesafios}`, options)
        .then(({ data })=> {
          
          this.abrirModal();
          
          setTimeout(() => {
            this.setValueId('idDesafios', idDesafios);
            this.setValueId('nome', (data.nome));
            this.setValueId('url', data.url);
            this.setValueId('descricao', data.descricao);
            this.setValueId('dia', data.dia);
            this.setValueId('pontos', data.pontos);
           }, 500);
        });
    
      }

    render() {
        const { modal_standard } = this.state;

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="" breadcrumbItems={this.state.breadcrumbItems} />
                    <Row>
                        <Col lg={6}>
                            <h4 className="my-3">DESAFIOS</h4>
                            <Card expand
                                style={{
                                  background:"green",
                                }}
                            >
                                <Button
                                    color="#3d8116"
                                    onClick={() => this.setState({ modal_standard: true })}
                                >
                                    <Row>
                                        <Col md={4} className="d-flex align-items-center justify-content-center">
                                            <CardImg
                                                src={meusqgrs} 
                                                alt="Meus QGR's" 
                                                style={{ width: 59 }}
                                            />
                                        </Col>
                                        <Col md={8}>
                                            <CardBody>
                                                <CardTitle>
                                                    <h1>FINALIZADO</h1>
                                                </CardTitle>
                                            {/* <CardText>Vamos alcançar 250 mil quarteis generais!</CardText>
                                                <div className="d-grid mb-2">
                                                    <Button
                                                        color="primary"
                                                        className="btn btn-success btn-lg btn-block"
                                                        onClick={()=> window.open("/qgr", "_self")}
                                                    >
                                                        LOCALIZAR OU CADASTRAR
                                                    </Button>
                                                </div> */}
                                            </CardBody>
                                        </Col>
                                    </Row>
                                </Button>
                            </Card>
                        </Col>
                    </ Row>
                    <Row>
                        <Col lg={6}>
                            {/* <h4 className="my-3">INFORMAÇÕES SOBRE O BATISMO</h4> */}
                            <Card 
                              expand
                                style={{
                                 background:"purple",
                                }}
                            >
                                <Button
                                 color="#3d8116"
                                 onClick={() => this.setState({ modal_standard: true })}
                                >
                                <Row className="no-gutters align-items-center">
                                <Col md={4} className="d-flex align-items-center justify-content-center">
                                    <CardImg 
                                        className="img-fluid"
                                        src={batismo} 
                                        alt="Batismos" 
                                        style={{ width: 59 }} 
                                    />
                                </Col>
                                <Col md={8}>
                                    <CardBody>
                                        <CardTitle><h1>PENDENTE</h1></CardTitle>
                                        {/* <CardText>Dicas, dúvidas, lives, formulários, documentos e mais...</CardText> */}
                                        {/* <div className="d-grid mb-2">
                                            <Button
                                                color="primary"
                                                className="btn btn-success btn-lg btn-block"
                                                onClick={()=> window.open("/batismo", "_self")}
                                            >
                                                VER MAIS
                                            </Button>
                                        </div> */}
                                    </CardBody>
                                </Col>
                            </Row>
                        </Button>
                    </Card>
                </Col>
            </ Row>
                    
                    <Row>
                        <Col lg={6}>
                            {/* <h4 className="my-3">CANAL NO TELEGRAM</h4> */}
                            <Card
                             expand
                             style={{
                              background:"gray",
                             }}
                         >
                             
                        <Button
                          onClick={() => this.setState({ modal_standard: true })}
                        >
                        <Row className="no-gutters align-items-center">
                
                            <Col md={4} className="d-flex align-items-center justify-content-center">
                                <CardImg 
                                className="img-fluid" 
                                src={telegram} 
                                alt="Skote" 
                                style={{ width: 59 }} 
                            />
                            </Col>
                            <Col md={8}>
                                <CardBody>
                                    <CardTitle><h1>TRANCADO</h1></CardTitle>
                                    {/* <CardText>Vamos comunicar as novidades, não fique de fora!</CardText> */}
                                    {/* <div className="d-grid mb-2">
                                        <Button
                                            color="primary"
                                            className="btn btn-success btn-lg btn-block"
                                            onClick={()=> window.open("https://t.me/+MvZDueHce5tmMWI5", "_blank")}
                                        >
                                            ENTRAR NO GRUPO
                                        </Button>
                                    </div> */}
                                </CardBody>
                            </Col>
                            </Row>
                        </Button>         
                    </Card>
                            {/* <Card>
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
                            </Card> */}
                            {/* <Card>
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
                            </Card> */}
                        </Col>
                    </ Row>
                    {/* <Row>
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
                    </ Row> */}
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
                <Modal isOpen={modal_standard}  >
                    <ModalHeader toggle={() => this.setState({ modal_standard: false })}>
                     
                        <Row className="mb-3">
                            <Label className="">Digite o código do desafio</Label>
                            <Input />
                        </Row>
                    </ModalHeader>

                    <ModalFooter>
                        <Button
                        type="button"
                        onClick={this.abrirModal}
                        color="light"
                        className="waves-effect"
                        >
                        Fechar
                    </Button>
                        <Button
                        type="button"
                        color="primary" className="waves-effect waves-light"
                        onClick={() => this.cadastrarOuEditarVideos()}
                        >
                        Verificar codígo
                    </Button>
                    </ModalFooter>
                </Modal>       
            </React.Fragment>
        );
    }
}

export default Dashboard;


