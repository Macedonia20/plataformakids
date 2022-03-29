import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Label, Input } from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import api from '../../services/api';

import EstadosCidades from './cidades.json';
import Paises from './nome_pais.json';

import Breadcrumbs from '../../components/Common/Breadcrumb';

class QGRFuzileiro extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                // { title : "QGR", link : "/qgr-menu" },
                // { title : "Cadastro", link : "#" },
            ],
            estado: [],
            cidades: [],
            cidadeSelecionada: '',
            funcao: 'general',
            instagram: '',
            bairro: '',
            nome: '',
            descricao: '',
            pais: '',
            termo: false,
            grupowhatsapp: ''
        }
    }

    informarEstado = (event) => {
        const estadoSelecionado = event.target.value;
        this.state.estado = estadoSelecionado;
        this.setState({
            estado: estadoSelecionado
        });
        this.exibirCidades(estadoSelecionado);
    }
    
    exibirCidades = (estadoSelecionado) => {
        const { estados } = EstadosCidades;
        estados.map((estado) => {
          if (estado.sigla === estadoSelecionado) {
            this.setState({
                cidades: estado.cidades
            });
          }
        });
    }

    setPais = (text) => {
        console.log('setPais; ', text);
        const paisSelecionado = text;
        this.state.pais = paisSelecionado;
        this.setState({
            pais: paisSelecionado
        });
    }

    setCidadeSelecionada = (event) => {
        this.state.cidadeSelecionada = event.target.value;
    }

    setFuncao = (event) => {
        this.state.funcao = event.target.value;
    }

    setInstagram = (event) => {
        this.state.instagram = event.target.value;
    }

    setWhatsapp = (event) => {
        this.state.whatsapp = event.target.value;
    }

    setGrupowhatsapp = (event) => {
        this.state.grupowhatsapp = event.target.value;
    }

    setBairro = (event) => {
        this.state.bairro = event.target.value;
    }

    setDescricao = (event) => {
        this.state.descricao = event.target.value;
    }

    setNome = (event) => {
        this.setState({ nome: event.target.value });
    }

    setTermo = () => {
        this.setState({ termo: !this.state.termo });
    }

    async cadastrarQGR () {
        let objUsuario = {};
        if (localStorage.getItem("authUser")) {
            objUsuario = JSON.parse(localStorage.getItem("authUser"));
        }

        const paisSelecionado = document.getElementById('select-pais').value;
        let estadoSelecionado = '';
        let cidadeSelecionada = ''

        if (paisSelecionado === 'Brasil') {
            estadoSelecionado = document.getElementById('estado').value;
            cidadeSelecionada = document.getElementById('cidade').value;
        } else {
            estadoSelecionado = document.getElementById('estadoExterior').value;
            cidadeSelecionada = document.getElementById('cidadeExterior').value;
        }

        const novoQGR = {
            pais: paisSelecionado,
            estado: estadoSelecionado,
            cidade: cidadeSelecionada,
            funcao: document.getElementById('funcao').value,
            instagram: document.getElementById('instagram').value,
            whatsapp: document.getElementById('whatsapp').value,
            grupowhatsapp: document.getElementById('grupowhatsapp').value,
            bairro: document.getElementById('bairro').value,
            nome: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            email: objUsuario.email,
            termo: document.getElementById('termo').checked
        }

        if (!novoQGR.funcao) {
            toast.error("Escolha um caminho, General, Anfitrião ou Fuzileiro.");
            return;
        }

        if (!novoQGR.estado || novoQGR.estado === 'Selecionar estado') {
            toast.error("Escolha um estado.");
            return;
        }

        if (!novoQGR.cidade || novoQGR.estado === 'Selecionar cidade') {
            toast.error("Escolha uma cidade.");
            return;
        }

        if (!novoQGR.bairro) {
            toast.error("Bairro ou região, obrigatório.");
            return;
        }

        if (!novoQGR.instagram && !novoQGR.whatsapp) {
            toast.error("Informe o instagram ou o whatsapp para visitantes de encontrarem.");
            return;
        }
        
        if (!novoQGR.termo) {
            toast.error("Você precisa aceitar o termo.");
            return;
        }

        try {
            const options = {
                headers: {"Authorization" : `Bearer ${objUsuario.token}`}
            }

            await api.post('/qgrcadastro', novoQGR, options)
            .then(() => {
                window.open("/qgr", "_self");
            });
        } catch (error) {
            const { status } = error.response;
            if (status === 401) {
                window.open("/login", "_self");
            }

            toast.error("Não foi possivel cadastrar seu QGR. Tente novamente!");
        }
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Quartel General do Reino" breadcrumbItems={this.state.breadcrumbItems} />

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">Agora você precisa tomar uma decisão:</h4>
                                    <p className="card-title-desc"></p>

                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Escolha um caminho</Label>
                                        <Col md={10}>
                                            <select className="form-control" onChange={this.setFuncao} id="funcao">
                                                <option value="general" selected>Sou General, vou abrir minha casa e liderar</option>
                                                <option value="anfitriao">Sou Anfitrião, vou abrir minha casa para um General</option>
                                            </select>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Nome do QGR</Label>
                                        <Col md={10}>
                                            <Input
                                                required
                                                type="text" 
                                                placeholder="Dê um nome para o QGR" 
                                                onChange={this.setNome}
                                                id="nome"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Fale um pouco sobre o seu QGR</Label>
                                        <Col md={10}>
                                            <Input placeholder="Digite aqui..." onChange={this.setDescricao}
                                                type="textarea"
                                                style={{ height: 110 }}
                                                maxLength='600'
                                                id="descricao"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Instagram</Label>
                                        <Col md={10}>
                                            <Input type="text" placeholder=" Digite seu instagram @usuario" onChange={this.setInstagram} id="instagram"/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Whatsapp</Label>
                                        <Col md={10}>
                                            <Input type="text" placeholder=" Digite seu whatsapp" onChange={this.setWhatsapp} id="whatsapp"/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Grupo Whatsapp</Label>
                                        <Col md={10}>
                                            <Input type="text" placeholder=" Digite o link do grupo de Whatsapp" onChange={this.setGrupowhatsapp} id="grupowhatsapp"/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label"></Label>
                                        <Col md={10}>
                                            <p className="text-muted m-b-15">
                                                Informe a localização do seu QGR.
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">País</Label>
                                        <Col md={10}>
                                            <Typeahead
                                                inputProps={{ id : 'select-pais', autocomplete: 'naocarregar' }}
                                                clearButton
                                                id="select-pais"
                                                labelKey="name"
                                                style={{ color: 'white !important' }}
                                                onChange={(text) => { this.setPais(text[0])}}
                                                options={Paises}
                                                placeholder="Digite seu país"
                                            />
                                        </Col>
                                    </Row>
                                    { this.state.pais === '' ? (
                                        <>
                                        </>
                                    ) : (
                                    <>
                                        { this.state.pais === 'Brasil' ? (
                                            <>
                                                <Row className="mb-3">
                                                    <Label className="col-md-2 col-form-label">Estado</Label>

                                                    <Col md={10}>
                                                        <select className="form-control" onChange={this.informarEstado} id="estado">
                                                            <option value="">Selecionar estado</option>
                                                            <option value="AC">Acre</option>
                                                            <option value="AL">Alagoas</option>
                                                            <option value="AP">Amapá</option>
                                                            <option value="AM">Amazonas</option>
                                                            <option value="BA">Bahia</option>
                                                            <option value="CE">Ceará</option>
                                                            <option value="DF">Distrito Federal</option>
                                                            <option value="ES">Espírito Santo</option>
                                                            <option value="GO">Goiás</option>
                                                            <option value="MA">Maranhão</option>
                                                            <option value="MT">Mato Grosso</option>
                                                            <option value="MS">Mato Grosso do Sul</option>
                                                            <option value="MG">Minas Gerais</option>
                                                            <option value="PA">Pará</option>
                                                            <option value="PB">Paraíba</option>
                                                            <option value="PR">Paraná</option>
                                                            <option value="PE">Pernambuco</option>
                                                            <option value="PI">Piauí</option>
                                                            <option value="RJ">Rio de Janeiro</option>
                                                            <option value="RN">Rio Grande do Norte</option>
                                                            <option value="RS">Rio Grande do Sul</option>
                                                            <option value="RO">Rondônia</option>
                                                            <option value="RR">Roraima</option>
                                                            <option value="SC">Santa Catarina</option>
                                                            <option value="SP">São Paulo</option>
                                                            <option value="SE">Sergipe</option>
                                                            <option value="TO">Tocantins</option>
                                                            <option value="EX">Estrangeiro</option>
                                                        </select>
                                                    </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                    <Label className="col-md-2 col-form-label">Cidade</Label>
                                                    <Col md={10}>
                                                        <select className="form-control" onChange={this.setCidadeSelecionada} id="cidade">
                                                            <option value="">Selecionar cidade</option>
                                                            { this.state.cidades.length > 1 ? (
                                                                <>
                                                                {this.state.cidades.map((cidade) => {
                                                                    return (
                                                                    <>
                                                                        <option key={`${cidade}`} value={`${cidade}`}>{`${cidade}`}</option>
                                                                    </>
                                                                    )
                                                                })}
                                                                </>
                                                            ) : ( <></> )}
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : (
                                            <>
                                                <Row className="mb-3">
                                                    <Label htmlFor="example-text-input" className="col-md-2 col-form-label">Estado</Label>
                                                    <Col md={10}>
                                                        <Input type="text" placeholder="Digite o seu estado" onChange={this.setEstadoInput} id="estadoExterior"/>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Label htmlFor="example-text-input" className="col-md-2 col-form-label">Cidade</Label>
                                                    <Col md={10}>
                                                        <Input type="text" placeholder="Digite a sua cidade" onChange={this.setCidadeInput} id="cidadeExterior"/>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
                                        
                                        <Row className="mb-3">
                                            <Label className="col-md-2 col-form-label">Bairro / Região</Label>
                                            <Col md={10}>
                                                <Input type="text" placeholder=" Digite seu bairro ou região" onChange={this.setBairro} id="bairro"/>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Label className="col-md-2 col-form-label"></Label>
                                            <Col md={10}>
                                                <div className="form-check mb-2">
                                                    <Col md={10}>
                                                        <Input type="checkbox" className="form-check-input input-mini" id="termo" onChange={this.setTermo} />
                                                        <Label className="form-check-label" for="termo">Eu aceito divulgar as informações do meu instagram, whatsapp e a localização do meu QGR. 🚨</Label>
                                                    </Col>
                                                </div>
                                            </ Col>
                                        </Row>
                                    </>
                                    )}
                                    { this.state.termo ? (
                                        <div className="d-grid mb-2">
                                            <Button
                                                color="primary"
                                                className="btn btn-success btn-lg btn-block"
                                                onClick={this.cadastrarQGR}
                                            >
                                                CADASTRAR
                                            </Button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default QGRFuzileiro;