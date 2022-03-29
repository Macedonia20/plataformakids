import React, { Component } from 'react';
import { Container, Row, Col, CardColumns, Card, CardImg, CardBody, Button } from "reactstrap";

import img3 from "../../assets/images/qgr/blog.jpg";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Mensagens", link : "#" },
                { title : "Blog", link : "#" },
            ],
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Blog" breadcrumbItems={this.state.breadcrumbItems} />
                    <Row>
                        <Col sm={12}>
                            {/* <h4 className="my-3">Cards Columns</h4> */}
                            <CardColumns>
                                <Card>
                                    <CardImg top src={img3} alt="Skote" />
                                    <CardBody>
                                    <div className="d-grid mb-3">
                                        <Button
                                            color="primary"
                                            className="btn btn-secondary btn-lg btn-block "
                                        >
                                            Aguarde o comando...
                                        </Button>
                                    </div>
                                    </CardBody>
                                </Card>
                            </ CardColumns>
                        </ Col>
                    </ Row>
                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default Blog;