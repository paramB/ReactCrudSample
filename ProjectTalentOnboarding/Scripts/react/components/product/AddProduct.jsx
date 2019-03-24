import React, { Component} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.handleCreateProductClick = this.handleCreateProductClick.bind(this);       
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            ProductList: [],
            ProductName: '',
            ProductPrice: '',
            errors: {}
        }        
    }
    // validation
    validateForm() {
        let errors = {}
        let formIsValid = true
        if (!this.state.ProductName) {
            formIsValid = false;
            errors['ProductName'] = '*Please enter product name';
        }
        if (!this.state.ProductPrice) {
            formIsValid = false;
            errors['ProductPrice'] = '*Please enter product price'
        }
        if (typeof this.state.ProductPrice !== "undefined") {
            if (!this.state.ProductPrice.match(/^\d+(\.\d{1,2})?$/)) {
                formIsValid = false;
                errors["ProductPrice"] = "*Please enter numbers only";
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid
    }

    // POST request to create new product
    handleCreateProductClick(event) {        
        event.preventDefault();
        if (this.validateForm()) {
            let data = {
                'PName': this.state.ProductName,
                'Price': this.state.ProductPrice
            };
            $.ajax({
                url: "/Product/CreateProduct",
                type: "POST",
                data: data,
                success: function () {
                    this.setState({ ProductList: [...this.state.ProductList, data] });                    
                    window.location.reload();
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
                    <Modal.Header> Create Product </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Product Name</label>
                                <input type='text' name='ProductName' placeholder='Name' onChange={this.handleChange} />
                                <div style={{ color: 'red' }}>{this.state.errors.ProductName}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type='text' name='ProductPrice' placeholder='Price' onChange={this.handleChange} />
                                <div style={{ color: 'red' }}>{this.state.errors.ProductPrice}</div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Create"
                            onClick={this.handleCreateProductClick} 
                        />       
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
            )
    }
}