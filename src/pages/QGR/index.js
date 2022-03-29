import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  Container, 
  Row, 
  Card, 
  CardImg, 
  CardBody, 
  Button, 
  CardColumns, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Label, 
  Col, 
  Input, 
  Spinner,
} from "reactstrap";
import { map } from "lodash";

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import api from '../../services/api';

import Paises from '../QGRFuzileiro/nome_pais.json';

import { ToastContainer, toast } from 'react-toastify';
import novoqgr from "../../assets/images/qgr/cadastrar-qgr.jpg";
import pesquisarqgr from "../../assets/images/qgr/pesquisarqgr.png";
import loading from "../../assets/images/qgr/loading.gif";

import EstadosCidades from '../QGRFuzileiro/cidades.json';

import CardGeneral from "./CardGeneral";
import CardVisitas from "./CardVisitas";
import { getShops } from "../../store/e-commerce/actions";

const initialState = {
  breadcrumbItems: [
    // { title: "QGR", link: "#" },
    { title: "Cadastrados", link: "#" },
  ],
  qgrs: [],
  visitas: [],
  qgr: {},
  currentQGR: {},
  isLoading: true,
  modalIsOpen: false,
  name: '',
  description: '',
  whatsapp: '',
  grupowhatsapp: '',
  instagram: '',
  country: '',
  district: '',
  state: '',
  city: '',
  stateOutsider: '',
  cityOutsider: '',
  cities: [],
  states: [],
  isUpdating: false,
  status: false,
  termo: true
}
class EcommerceShops extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleField = (fieldName, event) => {
    this.setState({ [fieldName]: event.target.value });
  } 

  getQGR = async (qgrid) => {
    const accessToken = JSON.parse(localStorage.getItem("authUser")).token;

    if (accessToken) {
      const { data } = await api.get(`/qgrshow/${qgrid}`, {
        headers: {"Authorization" : `Bearer ${accessToken}`}
      });
  
      return data;
    }
  }

  carregarQGR = async () => {
    try {
        let obj = '';
        let email = '';
        if (localStorage.getItem("authUser")) {
          obj = JSON.parse(localStorage.getItem("authUser"));
          email = obj.email;
        }

        const options = {
          headers: {"Authorization" : `Bearer ${obj.token}`}
        }

        await api.get(`/qgrlista/${email}`, options)
          .then(({ data })=> {
            this.setState({
              isLoading: false
            });

            this.setState({
              qgrs: data
            });

            this.carregarVisitas(15502);
          });

        
    } catch (error) {
        toast.error("Não foi possível encontrar seus QGR's. Tente novamente!");
    }
  }

  carregarVisitas = async (id) => {
    try {
        let obj = '';
        if (localStorage.getItem("authUser")) {
          obj = JSON.parse(localStorage.getItem("authUser"));
        }

        const options = {
          headers: {"Authorization" : `Bearer ${obj.token}`}
        }

        await api.get(`/visitas/${id}`, options)
          .then(({ data })=> {
            this.setState({
              isLoading: false
            });

            this.setState({
              visitas: data
            });
          });

        
    } catch (error) {
        toast.error("Não foi possível encontrar seus QGR's. Tente novamente!");
    }
  }

  updateQGR = async () => {
    try {
      if (!document.getElementById('select-pais').value) {
        toast.error("Confirme o Pais do seu QGR!");
        return;
      }

      this.setState({ isUpdating: true });
      const accessToken = JSON.parse(localStorage.getItem("authUser")).token;

      if (accessToken) {
        await api.put(`/qgrupdate/${this.state.currentQGR.idqgr}`, {
          nome: this.state.name,
          descricao: this.state.description,
          whatsapp: this.state.whatsapp,
          grupowhatsapp: this.state.grupowhatsapp,
          instagram: this.state.instagram,
          pais: this.state.country,
          estado: this.state.country === ('Brasil' || 'BR') ? this.state.state : this.state.stateOutsider,
          cidade: this.state.country === ('Brasil' || 'BR') ? this.state.city : this.state.cityOutsider,
          ativo: this.state.status,
          bairro: this.state.district,
        }, {
          headers: {"Authorization" : `Bearer ${accessToken}`}
        });
        
        this.setState({ isUpdating: false });
        toast.success('QGR editado com sucesso!');
        this.setState(initialState);
        this.componentDidMount();
      }
      
    } catch (error) {
      this.setState({ isUpdating: false });
      toast.error("Não foi possível atualizar seu QGR. Tente novamente!");
    }
  }

  componentDidMount() {
    this.carregarQGR();
    this.setState({
      states: EstadosCidades.estados.map(state => ({
        key: state.sigla,
        name: state.nome
      }))
    });
  }

  handleModal = (value, qgr = null) => {
    this.setState({ modalIsOpen: !!value, qgr }, async () => await this.populateModal());
  }

  handleModalClose = (value, qgr = null) => {
    this.setState({ modalIsOpen: !!value, qgr });
  }

  setTermoForms = () => {
    this.setState({ termo: document.getElementById('termo').checked });
    window.scrollTo(0,document.body.scrollHeight);
  }
  
  changeStatus = () => {
    this.setState({ changeStatus: true });
  }

  informarEstado = (event) => {
    const estadoSelecionado = event.target.value;
    this.setState({
        state: estadoSelecionado
    }, () => {
      this.exibirCidades(estadoSelecionado);
    });
  }

  exibirCidades = (estadoSelecionado) => {
    this.setState({
        cities: EstadosCidades.estados.find(state => state.sigla === estadoSelecionado)?.cidades ?? []
    });
  }

  setPais = (text) => {
    const paisSelecionado = text;
    this.setState({
        country: paisSelecionado
    });
}

  async populateModal() {
    if (this.state.qgr) {
      const currentQGR = await this.getQGR(this.state.qgr?.idqgr);
      
      this.setState({ currentQGR }, () => {
        this.setState({
          name: currentQGR.nome ?? "",
          description: currentQGR.descricao ?? "",
          whatsapp: currentQGR.whatsapp ?? "",
          grupowhatsapp: currentQGR.grupowhatsapp ?? "",
          instagram: currentQGR.instagram ?? "",
          country: currentQGR.pais ?? "",
          district: currentQGR.bairro ?? "",
          state: this.state.states.find(
            state => state.key === currentQGR.estado || 
            state.name === currentQGR.estado)?.key ?? "",
          city: currentQGR.cidade ?? "",
          stateOutsider: currentQGR.estado ?? "",
          cityOutsider: currentQGR.cidade ?? "",
          status: !!currentQGR.ativo ?? ""
        }, () => {
          if (this.state.state) this.exibirCidades(this.state.state);
        })
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title="QGR"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              {this.state.qgrs.length > 0 ? (
                <>
                  <p>Meus QGR's</p>
                  {map(this.state.qgrs, (qgr, key) => (
                    <CardGeneral handleModal={this.handleModal} qgr={qgr} key={"_qgr_" + key} />
                  ))}
                </>
              ) : (
                <></>
              )}
              {this.state.qgrs.length > 0 ? (
                <>
                  <p>Meus interesses de visita ...</p>
                  {map(this.state.visitas, (visita, key) => (
                    <CardVisitas visita={visita} key={"_qgr_" + key} />
                  ))}
                </>
              ) : (
                <></>
              )}
              {this.state.isLoading ? (
                <>
                  <p>Verificando se existem QGR's cadastrados... <CardImg src={loading} alt="Carregando..." style={{ width: '40px' }}/></p>
                </>
              ) : (
                <></>
              )}
              <Row>
                  <p>Cadastrar um QGR</p>
                  <CardColumns>
                    <Card>
                        <CardImg top src={novoqgr} alt="Cadastrar meu QGR" />
                        <CardBody>
                        <div className="d-grid mb-2">
                            <Button
                                color="primary"
                                className="btn btn-success btn-lg btn-block"
                                onClick={()=> window.open("/qgr-ou-fuzileiro","_self")}
                            >
                                CADASTRAR
                            </Button>
                        </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardImg top src={pesquisarqgr} alt="Pesquisar um QGR" />
                        <CardBody>
                        <div className="d-grid mb-2">
                            <Button
                                color="primary"
                                className="btn btn-success btn-lg btn-block"
                                onClick={()=> window.open("/qgrpesquisar","_self")}
                            >
                                LOCALIZAR
                            </Button>
                        </div>
                        </CardBody>
                    </Card>
                  </CardColumns>
                </Row>
            </Row>
          </Container>

          <Modal size="lg" scrollable centered isOpen={this.state.modalIsOpen}>
            <ModalHeader>
                {this.state.currentQGR?.nome}
            </ModalHeader>
            <ModalBody>
              <Row className="mb-3">
                  <Label className="col-md-2 col-form-label"></Label>
                  <Col md={10}>
                      <div className="form-check mb-2">
                          <Col md={10}>
                              <Input type="checkbox" defaultChecked={this.state.termo} className="form-check-input input-mini" id="termo" onChange={this.setTermoForms} />
                              <Label className="form-check-label" for="termo">Eu aceito divulgar as informações do meu instagram, whatsapp e a localização do meu QGR. 🚨</Label>
                          </Col>
                      </div>
                  </ Col>
              </Row>
              <Row className="mb-3">
                  <Label className="col-md-2 col-form-label">Nome do QGR</Label>
                  <Col md={10}>
                      <Input
                          required
                          type="text" 
                          placeholder="Digite o nome do QGR" 
                          value={this.state.name} 
                          onChange={(e) => this.handleField("name", e)} 
                      />
                  </Col>
              </Row>
              <Row className="mb-3">
                  <Label className="col-md-2 col-form-label">Fale um pouco sobre o seu QGR</Label>
                  <Col md={10}>
                      <Input 
                        placeholder="Digite aqui..." 
                        value={this.state.description} 
                        onChange={(e) => this.handleField("description", e)} 
                        type="textarea"
                        style={{ height: 110 }}
                        maxLength='600'
                      />
                  </Col>
              </Row>  
              <Row className="mb-3">
                  <Label className="col-md-2 col-form-label">Instagram</Label>
                  <Col md={10}>
                      <Input
                          required
                          type="text" 
                          placeholder="Digite o Instagram do QGR" 
                          value={this.state.instagram} 
                          onChange={(e) => this.handleField("instagram", e)} 
                      />
                  </Col>
              </Row>                              
              <Row className="mb-3">
                  <Label className="col-md-2 col-form-label">WhatsApp</Label>
                  <Col md={10}>
                      <Input
                          required
                          type="text" 
                          placeholder="Digite o WhatsApp do General" 
                          value={this.state.whatsapp} 
                          onChange={(e) => this.handleField("whatsapp", e)} 
                      />
                  </Col>
              </Row>   
              <Row className="mb-3">
                  <Label className="col-md-2 col-form-label">Grupo WhatsApp</Label>
                  <Col md={10}>
                      <Input
                          required
                          type="text" 
                          placeholder="Digite o link do grupo" 
                          value={this.state.grupowhatsapp} 
                          onChange={(e) => this.handleField("grupowhatsapp", e)} 
                      />
                  </Col>
              </Row>                                         
              <Row className="mb-3">
                <p className="text-muted m-b-15">
                    Informe a localização disponível
                </p>
                <Label className="col-md-2 col-form-label">País</Label>
                <Col md={10}>
                    <Typeahead
                        inputProps={{ id : 'select-pais', autocomplete: 'naocarregar' }}
                        clearButton
                        id="select-pais"
                        style={{ color: 'white !important' }}
                        onChange={(text) => { this.setPais(text[0])}}
                        options={Paises}
                        placeholder="Digite seu país"
                    />
                </Col>                
            </Row>
            {this.state.country === 'Brasil' || this.state.country === 'BR' ? (
              <>
                  <Row className="mb-3">
                      <Label className="col-md-2 col-form-label">Estado</Label>
                      <Col md={10}>
                          <select className="form-control" onChange={this.informarEstado} value={this.state.state} id="estado">
                            {
                              this.state.states?.map(state => 
                                <option key={state.key} value={state.key}>{state.name}</option>
                              )
                            }
                          </select>
                      </Col>
                  </Row>
                  <Row className="mb-3">
                      <Label className="col-md-2 col-form-label">Cidade</Label>
                      <Col md={10}>
                          <select className="form-control" onChange={(e) => this.handleField('city', e)} value={this.state.city} id="cidade">
                              <option value="">Selecionar cidade</option>
                              { this.state.cities?.length > 0 ? (
                                  <>
                                  {this.state.cities?.map((city) =>
                                    <option key={city} value={city}>{city}</option>
                                  )}
                                  </>
                              ) : null}
                          </select>
                      </Col>
                  </Row>
              </>
            ) : (
              <>
                  <Row className="mb-3">
                      <Label className="col-md-2 col-form-label">Estado</Label>
                      <Col md={10}>
                          <Input
                              required
                              type="text" 
                              placeholder="Digite seu estado" 
                              value={this.state.stateOutsider} 
                              onChange={(e) => this.handleField("stateOutsider", e)} 
                          />
                      </Col>
                  </Row>
                  <Row className="mb-3">
                      <Label className="col-md-2 col-form-label">Cidade</Label>
                      <Col md={10}>
                          <Input
                              required
                              type="text" 
                              placeholder="Digite sua cidade" 
                              value={this.state.cityOutsider} 
                              onChange={(e) => this.handleField("cityOutsider", e)} 
                          />
                      </Col>
                  </Row>
              </>
            )}
            <Row className="mb-3">
                <Label className="col-md-2 col-form-label">Bairro / Região</Label>
                <Col md={10}>
                    <Input
                        required
                        type="text" 
                        placeholder="Digite seu bairro ou região" 
                        value={this.state.district} 
                        onChange={(e) => this.handleField("district", e)} 
                    />
                </Col>
            </Row>
            
            <Modal isOpen={this.state.changeStatus}>
              <ModalHeader>
                Desativar {this.state.currentQGR?.nome}
              </ModalHeader>
                <ModalBody>
                  Deseja realmente desativar este QGR? <br/>
                  Atenção, esta opção não poderá ser revertida!
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => this.setState({ changeStatus: false })}>
                    Não
                  </Button>
                  {' '}
                  <Button color="primary" onClick={() => {
                    this.setState({ status: false }, () => this.updateQGR());
                  }}>
                    Sim
                  </Button>
                </ModalFooter>
              </Modal>           
            </ModalBody> 
            
                <ModalFooter className="d-flex flex-row justify-content-between">
                  <Button
                    color="danger"
                    onClick={this.changeStatus}>
                    {
                      this.state.isUpdating ? <Spinner size="sm" /> : 'Desativar QGR'
                    }
                  </Button>
                  {' '}


                  <div>
                    <Button
                      color="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState(initialState);
                        this.componentDidMount();
                        this.handleModalClose(false);
                      }}>
                      Fechar
                    </Button>
                    {' '}
                    { this.state.termo ? (
                        <Button
                          color="success"
                          onClick={this.updateQGR}>
                          {
                            this.state.isUpdating ? <Spinner size="sm" /> : 'Salvar'
                          }
                        </Button>
                    ) : (
                      <></>
                    )}
                    {' '}
                  </div>

                </ModalFooter>
              
            
            
        </Modal>
        
        </div>
      </React.Fragment>
    );
  }
}

EcommerceShops.propTypes = {
  shops: PropTypes.array,
  onGetShops: PropTypes.func,
};

const mapStateToProps = ({ Ecommerce }) => ({
  shops: Ecommerce.shops,
});

const mapDispatchToProps = (dispatch) => ({
  onGetShops: () => dispatch(getShops()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EcommerceShops);
