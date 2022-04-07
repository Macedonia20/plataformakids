import React, { useState } from "react";
import { Modal, ModalHeader, Row, Label, CardBody, Input, Button } from "reactstrap"
import { toast } from 'react-toastify';
import api from "../../../services/api";


const ModalTrancado = ({
    modal_standard,
    setModalStandard,
    desafio,
    reloadDadas
}) => {
    const [codigo, setCodigo] = useState("")

    function handleTextArea(text) {
        if (text.length > 0) {
            setCodigo(text)
        }
    }

    async function changeStatusDesafio() {
        try {
            let obj = '';
            if (localStorage.getItem("authUser")) {
                obj = JSON.parse(localStorage.getItem("authUser"));
            }

            const options = {
                headers: { "Authorization": `Bearer ${obj.token}` }
            }
            await api.get(`/desafios/validar/${desafio.codigo_secreto}`, options)


        } catch (err) {

        }
    }

    function handleCloseModal() {

        setModalStandard()
        setCodigo("")
    }
    function handleConferirCodigo() {

        const newcode = codigo.toUpperCase()

        if (newcode === desafio.codigo_secreto) {
            // primeiro abrir toast de confirmação toast
            console.log("Código validado com sucesso")
            toast.success("Código validado com sucesso")
            // modificar o status do desafio para pendente (api)
            changeStatusDesafio()
            //Fechar esse modal e abrir o próximo
            setModalStandard()

            //Recarrear dados
            reloadDadas()

        } else {
            console.log("Código Inválido, Tente novamente")
            toast.error("Código Inválido, Tente novamente")
        }
    }
    return (
        <Modal isOpen={modal_standard}  >
            <ModalHeader toggle={() => handleCloseModal()} >
                <Row className="mb-3">
                    <Label className=""><h1>Desbloquear {desafio.nome}</h1></Label>
                    <CardBody>
                        <div>
                            <iframe
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${desafio.url}`}
                                title="YouTube video player"
                                // frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            // allowfullscreen
                            />
                        </div>
                        <Label className=""><p>Digite o código secreto</p></Label>

                        <Input type="text"
                            placeholder="Digite aqui..."
                            defaultValue={codigo}
                            onChange={(event) => handleTextArea(event.target.value)}
                        />
                        <br />
                        <div className="d-grid mb-3">
                            <Button
                                color="primary"
                                className="btn btn-primary btn-lg btn-block"
                                onClick={handleConferirCodigo}
                            >
                                Validar código
                            </Button>
                        </div>
                    </CardBody>
                </Row>
            </ModalHeader>
        </Modal>
    )
}

export default ModalTrancado