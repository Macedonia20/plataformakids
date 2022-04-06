import  React, {useState} from "react";
import { Modal,  ModalHeader, Row, Label, CardBody, Input, Button  } from "reactstrap"

const ModalTrancado = ({
     modal_standard,
     setModalStandard,
     desafio
        }) => {
     console.log("O QUE VEM", desafio)
        const [codigo, setCodigo ]  = useState("")

        function handleTextArea(text) {
            if (text.length >0) {
                setCodigo(text)
            }
        }


        function handleConferirCodigo() {
           const newCode = codigo.toUpperCase() 
           if (desafio.codigosecreto === newCode) {
               // primeiro abrir toast de confirmação toast
               // modificar o status do desafio para pendente
               //
           }
        }
    return (
        <Modal isOpen={modal_standard}  >
        <ModalHeader toggle={() => setModalStandard()} >
            <Row className="mb-3">
                <Label className=""><h1>Desbloquear</h1></Label>
                <CardBody>
                <Label className=""><p>Digite o código secreto</p></Label>
                
                    <Input type="text"
                        placeholder="Digite aqui..."    
                        defaultValue={codigo}
                        onChange={(value)=> handleTextArea(value)}
                    />
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