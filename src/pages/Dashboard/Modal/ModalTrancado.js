import React, { useState } from "react";
import { Modal, ModalHeader, Row, Label, CardBody, Input, Button } from "reactstrap"
import { toast } from 'react-toastify';

const ModalTrancado = ({
    modal_standard,
    setModalStandard,
    desafio,
    changeStatusDesafio,
    setToggleModalFinalizado
}) => {
    const [codigo, setCodigo] = useState("")

    function handleTextArea(text) {
        if (text.length > 0) {
            setCodigo(text)
        }
    }


    function handleCloseModal() {
        setModalStandard(false)
        setCodigo("")
    }
    function handleConferirCodigo() {

        const newcode = codigo.toUpperCase()
        const codeCorrect = desafio.codigo_secreto.toUpperCase()

        if (newcode === codeCorrect) {
            // primeiro abrir toast de confirmação toast
            toast.success("😉 Código validado com sucesso")
            // modificar o status do desafio para pendente (api)
            changeStatusDesafio(desafio)
            //Fechar esse modal e abrir o próximo
            setModalStandard(false)
            //Abrindo o proximo Modal
            setToggleModalFinalizado(desafio, 'pendente')
        } else {
            toast.error("❌ Código Inválido, Tente novamente")
            setCodigo("")
        }
    }
    return (
        <Modal isOpen={modal_standard}  >
            <ModalHeader toggle={() => handleCloseModal()} >
                <Row className="mb-3">
                    <Label className=""><h1>Desbloquear {desafio.nome}</h1></Label>
                    <CardBody>

                        <Label className=""><p>Digite o código secreto</p></Label>

                        <Input type="text"
                            placeholder="Digite aqui..."
                            value={codigo}
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