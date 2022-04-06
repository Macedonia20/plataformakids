import  React from "react";
import { Modal, ModalHeader, Row, Label, CardBody, Button  } from "reactstrap"

const ModalResposta = ({
    modal_standard,
     setModalStandard
    }) => {
    return (
        <Modal isOpen={modal_standard}  >
        <ModalHeader toggle={() => setModalStandard()} >
            <Row className="mb-3">
                <Label className=""><h1> Desafio 1</h1></Label>
                <CardBody>
                <div>
                     <iframe
                        width="100%" 
                        height="200"
                        src="https://www.youtube.com/embed/7HDocgT2y3g" 
                        title="YouTube video player" 
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen 
                    />
                </div>
                <textarea 
                    rows="7"
                    class="form-control" 
                    placeholder="Escreva aqui..." 
                />
                    <br/>
                    <div className="d-grid mb-3">
                        <Button
                            color="primary"
                            className="btn btn-primary btn-lg btn-block "
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