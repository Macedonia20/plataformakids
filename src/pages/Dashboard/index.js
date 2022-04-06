import React, { Component } from "react";
import { Modal, ModalHeader, Row, Input, Label, Container, Button, CardBody } from "reactstrap";
import { map } from "lodash";
import { toast } from 'react-toastify';

import ModalTrancado from "./Modal/ModalTrancado"
import ModalResposta from "./Modal/ModalResposta"
import ModalFinalizado from "./Modal/ModalFinalizado"


import api from '../../services/api';

import Cards from './Cards';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [],
            desafios: [],
            modal_standard: false,
            isLoading: false,
            desafioAberto: {}
        }
    }

    setModalStandard(bollean) {
        this.setState({ modal_standard: bollean })
    }


    async carregarDesafios() {
        try {
            let obj = '';
            if (localStorage.getItem("authUser")) {
                obj = JSON.parse(localStorage.getItem("authUser"));
            }

            const options = {
                headers: { "Authorization": `Bearer ${obj.token}` }
            }

            await api.get(`/desafios`, options)
                .then(({ data }) => {
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

    setModalOpen(desafio) {
        this.setState({ modal_standard: true })
        this.setState({ desafioAberto: desafio })

        console.log("ModalStandard", this.modal_standard)

    }


    renderModal(statusDesafio, desafioAberto) {
        switch (statusDesafio) {
            case 'trancado':
                return (
                    <ModalFinalizado
                        modal_standard={this.state.modal_standard}
                        setModalStandard={() => this.setModalStandard(false)}
                    />)
            case 'pendente':
                return (
                    <ModalResposta
                        modal_standard={this.state.modal_standard}
                        setModalStandard={() => this.setModalStandard(false)}
                    />)

            default: (
                <ModalTrancado
                    modal_standard={this.state.modal_standard}
                    setModalStandard={() => this.setModalStandard(false)}
                    desafio={desafioAberto}
                />)
                return

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
                            <span key={key} onClick={() => this.setModalOpen(desafio)}>
                                <Cards desafio={desafio} />
                            </span>
                        ))}
                    </Container>
                </div>

                {/* <ModalFinalizado 
                modal_standard={modal_standard} 
                setModalStandard={() =>this.setModalStandard(false)}>
               </ModalFinalizado> */}

                {this.renderModal(
                    this.state.desafioAberto.status,
                    this.state.desafioAberto,
                )}
            </React.Fragment>
        );
    }
}

export default Dashboard;


