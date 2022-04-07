import React from "react";
import { Modal, ModalHeader, Row, Label, CardBody, Button } from "reactstrap"

const ModalFinalizado = ({
    modal_standard,
    setModalStandard,
    desafio,
    proximoCodigo
}) => {
    return (
        <Modal isOpen={modal_standard}  >
            <ModalHeader toggle={() => setModalStandard()} >
                <Row className="mb-3">
                    <Label className="">
                        <h1>{desafio.nome} finalizado</h1>
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
                        {proximoCodigo === null
                            ? <p>Parabens você concluiu todos desafios</p>
                            :
                            <p>Parabéns pela sua conquita você ganhou <br />
                                <strong>{desafio.pontos} </strong>
                                no próximo desafio útileze o código
                                <b> {proximoCodigo}.</b>
                            </p>
                        }
                        <br />
                        <div className="d-grid mb-3">
                            <Button
                                color="primary"
                                className="btn btn-primary btn-lg btn-block "
                                onClick={() => setModalStandard()}
                            >
                                FECHAR
                            </Button>
                        </div>
                    </CardBody>
                </Row>
            </ModalHeader>
        </Modal>
    )
}

export default ModalFinalizado