import React, { Component } from "react";
import { Row, Col, Button, Container, Label, Input } from "reactstrap";

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Paises from '../QGRFuzileiro/nome_pais.json';
import EstadosCidades from '../QGRFuzileiro/cidades.json';

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

import { ToastContainer, toast } from 'react-toastify';

// action
import { registerUser, registerUserFailed, apiError } from '../../store/actions';

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import './style.css';

import api from '../../services/api';

// import images
import logodark from "../../assets/images/logo-kids.png";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nome: "",
            password: "",
            pais: "",
            estado: [],
            cidades: [],
         
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleSubmit(event, values) {
        if(!this.validarCampos()) {
            return;
        };
        // console.log('registerUser');
        // this.props.registerUser(values)
        try {
            await api.post('/usuarios', {
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.password
            }).then(() => {
                window.location.href = "/login?cadastroSucesso";
            });
        } catch (error) {
            toast.error("Email já cadastrado efetue seu login.");
        }

        const paisSelecionado = document.getElementById('select-pais').value;
    }

    setNome = (event) => {
        this.state.nome = event.target.value;
    }

    setEmail = (event) => {
        this.state.email = event.target.value;
    }

    setSenha = (event) => {
        this.state.password = event.target.value;
    }

    setConfirmeSenha = (event) => {
        this.state.confirmeSenha = event.target.value;
    }

    setPais = (text) => {
        console.log('setPais; ', text);
        const paisSelecionado = text;
        this.state.pais = paisSelecionado;
        this.setState({
            pais: paisSelecionado
        });
    }

    validarCampos = () => {
        const validacaoOK = true;
        if (!this.state.nome) {
            toast.error("Nome obrigatório");
            return false;
        }

        if (!this.state.email) {
            toast.error("Email obrigatório");
            return false;
        }

        if (!this.state.password) {
            toast.error("Senha obrigatório");
            return false;
        }

        return validacaoOK;
    }

    componentDidMount() {
        this.props.registerUserFailed("");
        this.props.apiError("");
        document.body.classList.add("auth-body-bg");
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <ToastContainer />
                        <Row className="g-0">
                            <Col lg={4}>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center">
                                                        <div>
                                                            <Link to="#" className="logo"><img src={logodark} height="100" alt="logo" /></Link>
                                                        </div>

                                                        <h4 className="font-size-18 mt-4">Cadastrarrrrrrrrrrrrrrrrrrr Conta</h4>
                                                        {/* <p className="text-muted">Get your free Nazox account now.</p> */}
                                                    </div>

                                                    <div className="p-2 mt-5">
                                                        <AvForm onValidSubmit={this.handleSubmit} className="form-horizontal" >

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="nome">Nome</Label>
                                                                <AvField name="nome" value={this.state.nome} onChange={this.setNome} type="text" className="form-control" placeholder="Digite seu nome" />
                                                            </div>
                                                            
                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="useremail">Email</Label>
                                                                <AvField name="email" value={this.state.email} onChange={this.setEmail} type="email" className="form-control" placeholder="Digite seu email" />
                                                            </div>

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="userpassword">Senha</Label>
                                                                <AvField name="password" value={this.state.password} onChange={this.setSenha} type="password" className="form-control" placeholder="Digite sua senha" />
                                                            </div>
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
                                                                            <Label className="form-check-label" for="termo">Eu aceito os termos de uso! 🚨</Label>
                                                                        </Col>
                                                                    </div>
                                                                </ Col>
                                                            </Row>
                                                        </>
                                                            )}

                                                           <div className="text-center">
                                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">{this.props.loading ? "Carregando ..." : "Cadastrar"}</Button>
                                                            </div>

                                                            {/* <div className="mt-4 text-center">
                                                                <p className="mb-0">Ao se cadastrar você concorda com os <Link to="#" className="text-primary">Termos de uso</Link></p>
                                                            </div> */}
                                                        </AvForm>
                                                    </div>
                                                    <div className="mt-5 text-center">
                                                        <p>Já tem conta? <Link to="/login" className="fw-medium text-primary"> Login</Link> </p>
                                                        <p>{new Date().getFullYear()} © Pablo Marçal. <i className="mdi mdi-home-automation text-success"></i></p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="authentication-bg">
                                    {/* <div className="bg-overlay"></div> */}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {

    const { user, registrationError, loading } = state.Account;
    return { user, registrationError, loading };
}

export default connect(mapStatetoProps, { registerUser, apiError, registerUserFailed })(Register);
