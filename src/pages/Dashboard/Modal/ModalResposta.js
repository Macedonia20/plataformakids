import React from "react";
import { Modal, ModalHeader, Row, Label, CardBody, Button, FormText } from "reactstrap"
import api from "../../../services/api";

const ModalResposta = ({
    modal_standard,
    setModalStandard,
    desafio,
    reloadDadas
}) => {

    const [valueTextArea, setValueTextArea] = React.useState('');

    function onChangeTextArea(text) {
        setValueTextArea(text)
    }

    async function handleValidarResposta() {

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

            setModalStandard()

            reloadDadas()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Modal isOpen={modal_standard}  >
            <ModalHeader toggle={() => setModalStandard()} >
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
                                // frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            // allowfullscreen
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
                                onClick={handleValidarResposta}
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