import React, { useState, useEffect } from "react";
import { Modal,  ModalHeader, Row, Input, Label, Container, Button, CardBody } from "reactstrap";
import { map } from "lodash";
import { toast } from 'react-toastify';

import ModalTrancado from "./Modal/ModalTrancado"
import ModalResposta from "./Modal/ModalResposta"
import ModalFinalizado from "./Modal/ModalFinalizado"


import api from '../../services/api';

import Cards from './Cards';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

const Dashboard = () => {


    const [breadcrumbItems, setBreadcrumbItems] = useState([])
    const [ desafios, setDesafios] = useState([])
    const [modal_standard, setModal_Standart] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [desafioAberto, setDesafioAberto] = useState(null)

    function setModalStandard(bollean) {
        setModal_Standart(bollean)
    }


    async function carregarDesafios () {
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
                setIsLoading(false)
                
                setDesafios(data)
            });
            
        } catch (error) {
            toast.error("Nenhum Desafio disponivel!");
        }
      }

      function setModalOpen(numeroDesafio, codigoDesafio, desafio) {

          console.log('DESAFIO', desafio)
         setModal_Standart(true)
         setDesafioAberto(desafio)
      }


      function optionModal(statusDesafio) {
          switch ( statusDesafio ){
              case 'trancado': 
                return (
                <ModalFinalizado
                    modal_standard={modal_standard} 
                    setModalStandard={() =>setModalStandard(false)}
                />)
              case 'pendente': 
                return ( 
                <ModalResposta 
                    modal_standard={modal_standard} 
                    setModalStandard={() =>setModalStandard(false)}
                    desafio={desafioAberto}
                />)

              default: 
                return ( 
                    <ModalTrancado 
                        modal_standard={modal_standard} 
                        setModalStandard={() =>setModalStandard(false)} 
                    />)
          }
      }

    //   renderModal(statusDesafio) {
    //       if(statusDesafio) {
    //           return this.optionModal(statusDesafio)
    //       } else {
    //           return null
    //       }
    //   }
   useEffect(()=>{
       async function loadData() {

           await carregarDesafios()
       }

       loadData()

   }, [])

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="DESAFIOS" breadcrumbItems={breadcrumbItems} />
                        {map(desafios, (desafio, key) => (
                            <span  key={key} onClick={() => setModalOpen(desafio.iddesafios, desafio.codigo_secreto, desafio)}>
                                <Cards desafio={desafio} />
                            </span>
                        ))}
                    </Container> 
                </div>
              {
                  desafioAberto !== null && (
                    optionModal(desafioAberto.status)
                  )
              }
             
            </React.Fragment>
        );
    }

export default Dashboard;


