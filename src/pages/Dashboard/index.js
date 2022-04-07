import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
//Import Tost
import { toast } from 'react-toastify';

import ModalTrancado from "./Modal/ModalTrancado"
import ModalResposta from "./Modal/ModalResposta"
import ModalFinalizado from "./Modal/ModalFinalizado"


import api from '../../services/api';

import Cards from './Cards';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

const Dashboard = () => {

    const [desafios, setDesafios] = useState([])
    const [modal_standard, setModal_Standart] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [desafioAberto, setDesafioAberto] = useState(null)
    const [nextCode, setNextCode] = useState(null)

    //Chando Status Modal Trancado
    async function changeStatusDesafio(desafio) {
        let obj = '';
        if (localStorage.getItem("authUser")) {
            obj = JSON.parse(localStorage.getItem("authUser"));
        }

        const options = {
            headers: { "Authorization": `Bearer ${obj.token}` }
        }
        await api.get(`/desafios/validar/${desafio.codigo_secreto}`, options)
        await carregarDesafios()
    }

    async function handleValidarResposta(valueTextArea, desafio) {

        try {
            let obj = '';
            if (localStorage.getItem("authUser")) {
                obj = JSON.parse(localStorage.getItem("authUser"));
            }

            const options = {
                headers: { "Authorization": `Bearer ${obj.token}` }
            }

            const dataBody = {
                respostaDesafio: valueTextArea
            }

            await api.put(`/desafios/${desafio.iddesafios_usuarios}`, dataBody, options)
            await carregarDesafios()


        } catch (err) {
            console.error(err)
        }
    }

    function setModalStandard(bollean) {
        setModal_Standart(bollean)
    }

    async function carregarDesafios() {
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
                    setIsLoading(false)

                    setDesafios(data)
                });

        } catch (error) {
            toast.error("Nenhum Desafio disponivel!");
        }
    }

    function setModalOpen(desafio, key) {
        setModal_Standart(true)
        setDesafioAberto(desafio)
    }


    function optionModal(statusDesafio) {
        switch (statusDesafio) {
            case 'finalizado':
                return (
                    <ModalFinalizado
                        modal_standard={modal_standard}
                        setModalStandard={() => setModalStandard(false)}
                        desafio={desafioAberto}
                        proximoCodigo={nextCode}
                    />)
            case 'pendente':
                return (
                    <ModalResposta
                        modal_standard={modal_standard}
                        setModalStandard={() => setModalStandard(false)}
                        desafio={desafioAberto}
                        handleValidarResposta={handleValidarResposta}
                    />)

            default:
                return (
                    <ModalTrancado
                        modal_standard={modal_standard}
                        setModalStandard={() => setModalStandard(false)}
                        desafio={desafioAberto}
                        changeStatusDesafio={changeStatusDesafio}
                    />)
        }
    }

    useEffect(() => {
        async function loadData() {
            await carregarDesafios()
        }
        loadData()
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {desafios.map((desafio, key) => (
                        <span
                            key={key}
                            onClick={
                                () => setModalOpen(desafio, key)
                            }>
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
    )
}

export default Dashboard;


