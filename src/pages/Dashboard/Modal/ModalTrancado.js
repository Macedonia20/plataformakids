import React, { useState } from "react";
import { Modal, ModalHeader, Row, Label, CardBody, Input, Button } from "reactstrap"
import { toast } from 'react-toastify';

const ModalTrancado = ({
    modal_standard,
    setModalStandard,
    desafio,
    changeStatusDesafio
}) => {
    const [codigo, setCodigo] = useState("")

    function handleTextArea(text) {
        if (text.length > 0) {
            setCodigo(text)
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
            toast.success("😉 Código validado com sucesso")
            // modificar o status do desafio para pendente (api)
            changeStatusDesafio(desafio)
            //Fechar esse modal e abrir o próximo
            setModalStandard()
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