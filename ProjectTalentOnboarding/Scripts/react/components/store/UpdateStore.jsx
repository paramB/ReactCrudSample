import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class UpdateStore extends Component {
    constructor(props) {
        super(props);        
        this.state = {};        
    }
    
    render() {       
        return (            
            <React.Fragment>
                <Modal size={'tiny'} open={this.props.show} closeOnDimmerClick={false}>
                    <Modal.Header> Edit Store </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>                                
                                <label>Store Name</label>
                                <input type='text' name='StoreName' placeholder='Name' defaultValue={this.props.currentStore.SName} onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.StoreName}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type='text' name='StoreAddress' placeholder='Address' defaultValue={this.props.currentStore.SAddress} onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.StoreAddress}</div>
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