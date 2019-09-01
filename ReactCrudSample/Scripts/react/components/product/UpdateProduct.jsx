import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {};        
    }     
    
    render() {       
        return (            
            <React.Fragment>
                <Modal size={'tiny'} open={this.props.show} closeOnDimmerClick={false}>
                    <Modal.Header> Edit Product </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>                                
                                <label>Product Name</label>
                                <input type='text' name='ProductName' placeholder='Name' defaultValue={this.props.currentProduct.PName} onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.ProductName}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type='text' name='ProductPrice' placeholder='Price' defaultValue={this.props.currentProduct.Price} onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.ProductPrice}</div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Update"
                            onClick={this.props.submit}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }

} 