import  React from "react";
import { Modal, ModalHeader, Row, Label, CardBody, Input, Button  } from "reactstrap"

const ModalTrancado = ({
    modal_standard,
     setModalStandard
    }) => {
    return (
        <Modal isOpen={modal_standard}  >
        <ModalHeader toggle={() => setModalStandard()} >
            <Row className="mb-3">
                <Label className=""><h1>Desbloquear Desafio 1</h1></Label>
                <CardBody>
                <Label className=""><p>Digite o código secreto</p></Label>

                    <Input placeholder="Digite aqui..." />
                    <br/>
                    <div className="d-grid mb-3">
                        <Button
                            color="primary"
                            className="btn btn-primary btn-lg btn-block "
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