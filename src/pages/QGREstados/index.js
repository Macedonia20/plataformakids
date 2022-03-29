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
import CardEstados from "./CardEstados";
import { getShops } from "../../store/e-commerce/actions";

class QGRPesquisar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Países", link: "/qgrpesquisar" },
        { title: "Estado", link: "#" },
      ],
      qgrs: [],
      isLoading: false
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

        await api.get(`/qgrpesquisar/br`, options)
          .then(({ data })=> {
            this.setState({
              isLoading: false
            });

            this.setState({
              qgrs: data
            });
          });

        
    } catch (error) {
        toast.error("Não foi possivel cadastrar seu QGR. Tente novamente!");
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
              title="QGR's por Estado"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              {this.state.qgrs.length > 0 ? (
                <>
                  <p></p>
                  {map(this.state.qgrs, (qgr, key) => (
                    <CardEstados qgr={qgr} key={"_qgr_" + key} />
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
