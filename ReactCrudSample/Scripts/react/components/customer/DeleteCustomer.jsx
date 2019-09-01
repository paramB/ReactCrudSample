import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {};        
    }
    
    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.show} size='mini'>
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content>
                        <p>
                            Do you really want to delete this customer?
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel</Button>                        
                        <Button className='ui red button'
                            icon='x'
                            labelPosition='right'
                            content='Delete'
                            onClick={() => this.props.delete(this.props.deleteId)}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}