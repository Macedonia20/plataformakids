import React, { Component } from 'react';
import { Container, Row, Col, Card, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { ToastContainer, toast } from 'react-toastify';

import brasil from "../../assets/images/brasil.jpeg";

import api from '../../services/api';

import CardRoteador from "./CardRoteador";

class Roteadores extends Component {

    constructor(props) {
        super(props);
        this.state = {
          qgrs: [],
          isLoading: true,
        };
      }

    async carregarRoteadores () {
        try {
            let obj = '';
            if (localStorage.getItem("authUser")) {
              obj = JSON.parse(localStorage.getItem("authUser"));
            }
    
            const options = {
              headers: {"Authorization" : `Bearer ${obj.token}`}
            }
    
            await api.get(`/qgr?roteador=true`, options)
            .then(({ data })=> {
                this.setState({
                    isLoading: false
                });
    
                this.setState({
                    qgrs: data
                });
            }); 
        } catch (error) {
            toast.error("Nenhum QGR disponivel nesta região!");
        }
    }
    
    componentDidMount() {
        this.carregarRoteadores();
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <div className="">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center my-5">
                                    <h1 className="fw-bold text-error">
                                        <img src={brasil} alt="" style={{ width: '100px', borderRadius: 10 }} />
                                    </h1>
                                    <h3 className="">Roteadores de estado</h3>
                                    <Row>
                                        {this.state.qgrs.length > 0 ? (
                                            <>
                                            <strong style={{ color: 'white' }}>Quartel General do Reino</strong>
                                            <br /><br />
                                            {map(this.state.qgrs, (qgr, key) => (
                                                <CardRoteador qgr={qgr} key={"_qgr_" + key} />
                                            ))}
                                            </>
                                        ) : (
                                            <>
                                            {!this.state.isLoading ? (
                                                <Card>
                                                <Alert color="info" className="mb-0" role="alert">
                                                    Estamos aguardando os QGR's dessa região aceitarem os termos de exibição.
                                                </Alert>
                                                </Card>
                                            ) : (
                                                <></>
                                            )}
                                            </>
                                        )}
                                    </Row>
                                    <div className="">
                                        <Link to="/login" className="btn btn-success waves-effect waves-light" >plataformaqgr.com.br</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Roteadores;