import React, { Component} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            ProductName: '',
            ProductPrice: '',            
        }               
    }   

    render() {        
        return (
            <React.Fragment>
                <Modal size={'tiny'} open={this.props.show} onClose={this.props.onClose} closeOnDimmerClick={false}>
                    <Modal.Header> Create Product </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Product Name</label>
                                <input type='text' name='ProductName' placeholder='Name' onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.ProductName}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type='text' name='ProductPrice' placeholder='Price' onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.ProductPrice}</div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Create"
                            onClick={this.props.submit}
                        />       
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
            )
    }
}