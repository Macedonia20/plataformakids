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

    const [openModalTrancado, setModalTrancado] = useState(false)
    const [openModalResposta, setModalResposta] = useState(false)
    const [openModalFinalizado, setModalFinalizado] = useState(false)

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
        setDesafioAberto(desafio)
        if (desafio.status === null) {
            setModalTrancado(true)
        } else if (desafio.status === 'finalizado') {
            setModalFinalizado(true)
        } else if (desafio.status === 'pendente') {
            setModalResposta(true)
        }
    }
    function handleNextModalFinalizado(desafio, nextScreen) {
        setTimeout(() => {

            if (nextScreen === 'finalizado') {
                setModalOpen(({ ...desafio, status: 'finalizado' }))
            } else {
                return
            }
        }, 700);
    }

    function optionModal(statusDesafio) {
        switch (statusDesafio) {
            case 'finalizado':
                return (
                    <ModalFinalizado
                        modal_standard={openModalFinalizado}
                        setModalStandard={setModalFinalizado}
                        desafio={desafioAberto}
                    />)
            case 'pendente':
                return (
                    <ModalResposta
                        modal_standard={openModalResposta}
                        setModalStandard={setModalResposta}
                        desafio={desafioAberto}
                        handleValidarResposta={handleValidarResposta}
                        setToggleModalFinalizado={handleNextModalFinalizado}
                    />)

            default:
                return (
                    <ModalTrancado
                        modal_standard={openModalTrancado}
                        setModalStandard={setModalTrancado}
                        desafio={desafioAberto}
                        changeStatusDesafio={changeStatusDesafio}
                        setToggleModalFinalizado={handleNextModalFinalizado}
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
                                () => {
                                    let newData = {}
                                    try {
                                        const nextCode = (desafios[++key].codigo_secreto)
                                        if (nextCode) {
                                            newData = { ...desafio, nextCode }
                                        } else {
                                            newData = desafio
                                        }
                                    } catch (err) {
                                        newData = { ...desafio, nextCode: null }
                                    }

                                    console.log(newData)
                                    setModalOpen(newData, key)
                                }
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


