import React, { Component} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);        
        this.state = {            
            CustomerName: '',
            CustomerAddress: '',            
        }        
    }   

    render() {        
        return (
            <React.Fragment>
                <Modal size={'tiny'} open={this.props.show} onClose={this.props.onClose} closeOnDimmerClick={false}>
                    <Modal.Header> Create Customer </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Customer Name</label>
                                <input type='text' name='CustomerName' placeholder='Name' onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.CustomerName}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type='text' name='CustomerAddress' placeholder='Address' onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.CustomerAddress}</div>
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