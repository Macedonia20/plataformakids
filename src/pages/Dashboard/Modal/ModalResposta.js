import React from "react";
import { Modal, ModalHeader, Row, Label, CardBody, Button, FormText } from "reactstrap"

import { toast } from 'react-toastify';


const ModalResposta = ({
    modal_standard,
    setModalStandard,
    desafio,
    handleValidarResposta,
    setToggleModalFinalizado
}) => {

    const [valueTextArea, setValueTextArea] = React.useState('');


    function onChangeTextArea(text) {
        setValueTextArea(text)
    }

    async function handleSendRespost() {
        if (valueTextArea.length < 1) {
            toast.error('😕 Digite sua resposta')
        } else {
            await handleValidarResposta(valueTextArea, desafio)
            setModalStandard(false)
            toast.success('🥳 Uuuuaall, Parabéns, bora para póximo nível')
            setToggleModalFinalizado(desafio, 'finalizado')
        }
    }

    function handleCloseModal() {
        setModalStandard(false)

    }

    return (
        <Modal isOpen={modal_standard}  >
            <ModalHeader toggle={() => handleCloseModal()} >
                <Row className="mb-3">
                    <Label className="">
                        <h1> {desafio.nome}</h1>
                    </Label>
                    <CardBody>
                        <div>
                            <iframe
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${desafio.url}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                        <br />
                        <FormText>
                            <textarea
                                rows="5"
                                className="form-control"
                                placeholder="Escreva aqui..."
                                value={valueTextArea}
                                onChange={(event) => onChangeTextArea(event.target.value)}
                            />
                        </FormText>
                        <br />
                        <div className="d-grid mb-3">
                            <Button
                                color="primary"
                                className="btn btn-primary btn-lg btn-block"
                                onClick={() => handleSendRespost()}
                            >
                                RESPONDER DESAFIO
                            </Button>
                        </div>
                    </CardBody>
                </Row>
            </ModalHeader>
        </Modal>
    )
}

export default ModalResposta