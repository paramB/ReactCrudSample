import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class AddSale extends Component {
    constructor(props) {
        super(props);

        this.handleCreateSaleClick = this.handleCreateSaleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            SaleList: [],
            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoreDropdownList: [],
            customerId: '',
            productId: '',
            storeId: '',
            dateSold: '',
            errors: {}
        }
    }

    componentDidMount() {
        //GET: Customers
        $.ajax({
            url: "/Sale/GetCustomerList",
            type: "GET",
            success: function (data) {
                this.setState({ CustomerDropdownList: data})
            }.bind(this)
        });
        //GET: Products
        $.ajax({
            url: "/Sale/GetProductList",
            type: "GET",
            success: function (data) {
                this.setState({ ProductDropdownList: data})
            }.bind(this)
        });
        //GET: Stores
        $.ajax({
            url: "/Sale/GetStoreList",
            type: "GET",
            success: function (data) {
                this.setState({ StoreDropdownList: data})
            }.bind(this)
        });
    }

    // validation
    validateForm() {
        let errors = {}
        let formIsValid = true
        if (!this.state.customerId) {
            formIsValid = false;
            errors['customerId'] = '*Please select customer';
        }

        if (!this.state.productId) {
            formIsValid = false;
            errors['productId'] = '*Please select product'
        }

        if (!this.state.storeId) {
            formIsValid = false;
            errors['storeId'] = '*Please select store'
        }

        if (!this.state.dateSold) {
            formIsValid = false;
            errors['dateSold'] = '*Please enter the sale date'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    // POST request to create new sale
    handleCreateSaleClick(event) {
        event.preventDefault();
        if (this.validateForm()) {
            let data = {
                'CId': this.state.customerId,
                'PId': this.state.productId,
                'SId': this.state.storeId,
                'DateSold': this.state.dateSold
            };

            $.ajax({
                url: "/Sale/CreateSale",
                type: "POST",
                data: data,
                success: function (response) {
                    this.setState({
                        SaleList: [...this.state.SaleList, response]
                    });
                    window.location.reload()
                    //this.props.onClose()                       
                }.bind(this)
            });
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        let custList = [{ CId: '', CName: 'Select Customer' }].concat(this.state.CustomerDropdownList);        
        let proList = [{ PId: '', PName: 'Select Product' }].concat(this.state.ProductDropdownList);
        let storeList = [{ SId: '', SName: 'Select Store' }].concat(this.state.StoreDropdownList);        

        let customerOption = custList.map((c) => <option key={c.CId} value={c.CId}>{c.CName}</option>);
        let productOption = proList.map((p) => <option key={p.PId} value={p.PId}>{p.PName}</option>);
        let storeOption = storeList.map((s) => <option key={s.SId} value={s.SId}>{s.SName}</option>);

        return (
            <React.Fragment>
                <Modal size={'tiny'} open={this.props.show} closeOnDimmerClick={false}>
                    <Modal.Header> Create Sale </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type='text' name='dateSold' placeholder='DD/MM/YYYY' onChange={this.handleChange} />
                                <div style={{ color: 'red' }}>{this.state.errors.dateSold}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Customer</label>
                                <select name='customerId' onChange={this.handleChange}>
                                    {customerOption}
                                </select>
                                <div style={{ color: 'red' }}>{this.state.errors.customerId}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Product</label>
                                <select name='productId' onChange={this.handleChange}>
                                    {productOption}
                                </select>
                                <div style={{ color: 'red' }}>{this.state.errors.productId}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Store</label>
                                <select name='storeId' onChange={this.handleChange}>
                                    {storeOption}
                                </select>
                                <div style={{ color: 'red' }}>{this.state.errors.storeId}</div>
                            </Form.Field>                                
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Create"
                            onClick={this.handleCreateSaleClick}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}