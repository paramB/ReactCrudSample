import React, { Component} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class AddStore extends Component {
    constructor(props) {
        super(props);

        this.handleCreateStoreClick = this.handleCreateStoreClick.bind(this);       
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            StoreList: [],
            StoreName: '',
            StoreAddress: '',
            errors: {}
        }        
    }   

    // validation
    validateForm() {
        let errors = {}
        let formIsValid = true
        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = '*Please enter store name';
        }
        if (typeof this.state.StoreName !== "undefined") {
            if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["StoreName"] = "*Please enter alphabet characters only";
            }
        }
        if (!this.state.StoreAddress) {
            formIsValid = false;
            errors['StoreAddress'] = '*Please enter store address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    // POST request to create new Store
    handleCreateStoreClick(event) {
        event.preventDefault();
        if (this.validateForm()) { 
            let data = {
                'SName': this.state.StoreName,
                'SAddress': this.state.StoreAddress
            };
            $.ajax({
                url: "/Store/CreateStore",
                type: "POST",
                data: data,
                success: function () {
                    this.setState({ StoreList: [...this.state.StoreList, data] });
                    window.location.reload();
                    //this.props.onClose()                       
                }.bind(this)
            });
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {        
        return (
            <React.Fragment>
                <Modal size={'tiny'} open={this.props.show} onClose={this.props.onClose} closeOnDimmerClick={false}>
                    <Modal.Header> Create Store </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Store Name</label>
                                <input type='text' name='StoreName' placeholder='Name' onChange={this.handleChange} />
                                <div style={{ color: 'red' }}>{this.state.errors.StoreName}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type='text' name='StoreAddress' placeholder='Address' onChange={this.handleChange} />
                                <div style={{ color: 'red' }}>{this.state.errors.StoreAddress}</div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Create"
                            onClick={this.handleCreateStoreClick} 
                        />       
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
            )
    }
}