import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, CardImg } from "reactstrap";
import { map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import api from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import loading from "../../assets/images/qgr/loading.gif";

//Import Card
import CardCidades from "./CardCidades";
import { getShops } from "../../store/e-commerce/actions";

class QGRPesquisar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Estado", link: "/qgrpesquisar-br" },
        { title: "Cidade", link: "#" },
      ],
      qgrs: [],
      isLoading: false,
      estadoParam : ''
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

        this.setState({
          estadoParam: params
        });

        await api.get(`/qgrpesquisar/br/cidades?s=${params}`, options)
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
              title={`QGR's por cidades em ( ${this.state.estadoParam} )`}
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              {this.state.qgrs.length > 0 ? (
                <>
                  <p></p>
                  {map(this.state.qgrs, (qgr, key) => (
                    <CardCidades qgr={qgr} key={"_qgr_" + key} />
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
            </Row>
          </Container>
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
