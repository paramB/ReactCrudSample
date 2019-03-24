import React, { Component} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);

        this.handleCreateCustomerClick = this.handleCreateCustomerClick.bind(this);       
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            CustomerList: [],
            CustomerName: '',
            CustomerAddress: '',
            errors: {}
        }        
    }    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    // validate form
    validateForm() {
        let errors = {}
        let formIsValid = true
        if (!this.state.CustomerName) {
            formIsValid = false;
            errors['CustomerName'] = '*Please enter customer name';
        }
        if (typeof this.state.CustomerName !== "undefined") {
            if (!this.state.CustomerName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors['CustomerName'] = '*Please enter alphabet characters only';
            }
        }
        if (!this.state.CustomerAddress) {
            formIsValid = false;
            errors['CustomerAddress'] = '*Please enter customer address';
        }
        this.setState({
            errors: errors
        });
        return formIsValid
    }

    // POST request to create new customer
    handleCreateCustomerClick(event) {        
        event.preventDefault();
        if (this.validateForm()) {            
            let data = {
                'CName': this.state.CustomerName,
                'CAddress': this.state.CustomerAddress
            };
            $.ajax({
                url: "/Customer/CreateCustomer",
                type: "POST",
                data: data,
                success: function (response) {
                    this.setState({ CustomerList: [...this.state.CustomerList, response] });
                    window.location.reload();
                    //this.props.onClose()                    
                }.bind(this)
            });
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
                                <input type='text' name='CustomerName' placeholder='Name' onChange={this.handleChange} />
                                <div style={{ color: 'red' }}>{this.state.errors.CustomerName}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type='text' name='CustomerAddress' placeholder='Address' onChange={this.handleChange} />
                                <div style={{ color: 'red' }}>{this.state.errors.CustomerAddress}</div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Create"
                            onClick={this.handleCreateCustomerClick} 
                        />       
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
            )
    }
}