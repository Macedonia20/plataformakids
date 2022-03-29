import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, CardImg, Alert, Card } from "reactstrap";
import { map } from "lodash";

import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/SyncAlt';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import api from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import loading from "../../assets/images/qgr/loading.gif";

//Import Card
import CardGeneral from "./CardGeneral";
import CardVisitas from "./CardVisitas";
import { getShops } from "../../store/e-commerce/actions";

class QGRPesquisar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        // { title: "Cidades", link: `/qgrpesquisar-cidade?s=${this.state.pesquisaParam}` },
        // { title: "...", link: "#" },
      ],
      qgrs: [],
      visitas: [],
      isLoading: true,
      estadoParam : '',
      cidadeParam : '',
      paisParam: '',
      pesquisaParam : '',
      filtroStatus : 'QGR'
    };
  }

  async carregarQGR () {
    try {
        let obj = '';
        if (localStorage.getItem("authUser")) {
          obj = JSON.parse(localStorage.getItem("authUser"));
        }

        const options = {
          headers: {"Authorization" : `Bearer ${obj.token}`}
        }

        const url = new URL(window.location.href);
        const params = url.searchParams.get("s");
        const estado = url.searchParams.get("estado");
        const cidade = url.searchParams.get("cidade");
        const pais = url.searchParams.get("pais");

        this.setState({
          pesquisaParam: params
        });

        this.setState({
          estadoParam: estado
        });

        this.setState({
          cidadeParam: cidade
        });

        this.setState({
          paisParam: pais
        });

        await api.get(`/qgr?pais=${pais}&cidade=${cidade}&estado=${estado}&pagina=0`, options)
        .then(({ data })=> {
            this.setState({
                isLoading: false
            });

            this.setState({
                qgrs: data
            });
        });

        await api.get(`/visitas?cidade=${cidade}&estado=${estado}`, options)
        .then(({ data })=> {
            this.setState({
                isLoading: false
            });

            this.setState({
                visitas: data
            });
        });

        
    } catch (error) {
        toast.error("Nenhum QGR disponivel nesta região!");
    }
  }

  componentDidMount() {
    this.carregarQGR();
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={`${this.state.filtroStatus === 'QGR'? "QGR's": "Visitantes"} ${this.state.cidadeParam || this.state.estadoParam || this.state.paisParam}`}
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              {this.state.qgrs.length > 0 && this.state.filtroStatus === 'QGR' ? (
                <>
                  <strong style={{ color: 'white' }}>QGR's localizados nesta região.</strong>
                  <hr />
                  {map(this.state.qgrs, (qgr, key) => (
                    <CardGeneral qgr={qgr} key={"_qgr_" + key} />
                  ))}
                </>
              ) : (
                <>
                  {!this.state.isLoading && this.state.filtroStatus === 'QGR' ? (
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
              {this.state.visitas.length > 0 && this.state.filtroStatus === 'Fuzileiro' ? (
                <>
                  <strong style={{ color: 'white' }}>Pessoas que buscam um QGR´s</strong>
                  <hr />
                  {map(this.state.visitas, (visita, key) => (
                    <CardVisitas visita={visita} key={"_visita_" + key} numeroVisita={key} />
                  ))}
                </>
              ) : (
                <>
                  {!this.state.isLoading && this.state.filtroStatus === 'Fuzileiro' ? (
                    <Card>
                      <Alert color="info" className="mb-0" role="alert">
                          Por enquanto não encontramos visitantes para os QGR's dessa região...
                      </Alert>
                    </Card>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {this.state.isLoading ? (
                <>
                  <p>Verificando se existem QGR's que podem ser exibidos... <CardImg src={loading} alt="Carregando..." style={{ width: '40px' }}/></p>
                </>
              ) : (
                <></>
              )}
            </Row>
          </Container>
        </div>
        <div 
          style={{
            right: 20,
            bottom: 20,
            position: 'fixed',
            zIndex: 9999
          }}
          onClick={() => {
            if (this.state.filtroStatus === 'QGR') {
              this.setState({
                filtroStatus : 'Fuzileiro'
              });
            } else {
              this.setState({
                filtroStatus : 'QGR'
              });
            }
          }}
        >
            <Fab
              variant="extended"
            >
              <NavigationIcon sx={{ mr: 1 }} />
              {this.state.filtroStatus === 'QGR'? 'VER Visitantes': "VER QGR's" }
            </Fab>
        </div>
      </React.Fragment>
    );
  }
}

QGRPesquisar.propTypes = {
  shops: PropTypes.array,
  onGetShops: PropTypes.func,
};

const mapStateToProps = ({ Ecommerce }) => ({
  shops: Ecommerce.shops,
});

const mapDispatchToProps = (dispatch) => ({
  onGetShops: () => dispatch(getShops()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QGRPesquisar);
