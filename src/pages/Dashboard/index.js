import React, { Component } from "react";
import { Modal,  ModalHeader, Row, Input, Label, Container, Button, CardBody } from "reactstrap";
import { map } from "lodash";
import { toast } from 'react-toastify';

import api from '../../services/api';

import Cards from './Cards';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [],
            desafios: [],
            modal_standard: false,
            isLoading: false
        }
    }

    async carregarDesafios () {
        try {
            let obj = '';
            if (localStorage.getItem("authUser")) {
              obj = JSON.parse(localStorage.getItem("authUser"));
            }
    
            const options = {
              headers: {"Authorization" : `Bearer ${obj.token}`}
            }

            await api.get(`/desafios`, options)
            .then(({ data })=> {
                this.setState({
                    isLoading: false
                });
    
                this.setState({
                    desafios: data
                });
            });
            
        } catch (error) {
            toast.error("Nenhum Desafio disponivel!");
        }
      }

    componentDidMount() {
        this.carregarDesafios();
    }

    render() {
        const { modal_standard } = this.state;

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="DESAFIOS" breadcrumbItems={this.state.breadcrumbItems} />
                        {map(this.state.desafios, (desafio, key) => (
                            <span  key={key} onClick={() => this.setState({ modal_standard: true })}>
                                <Cards desafio={desafio} />
                            </span>
                        ))}
                    </Container> 
                </div>
                <Modal isOpen={modal_standard}  >
                    <ModalHeader toggle={() => this.setState({ modal_standard: false })}>
                        <Row className="mb-3">
                            <Label className="">Digite o código secreto do desafio</Label>
                            <CardBody>
                                <Input placeholder="Digite aqui..." />
                                <br/>
                                <div className="d-grid mb-3">
                                    <Button
                                        color="primary"
                                        className="btn btn-primary btn-lg btn-block "
                                    >
                                        Aguarde o comando...
                                    </Button>
                                </div>
                            </CardBody>
                        </Row>
                    </ModalHeader>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Dashboard;


