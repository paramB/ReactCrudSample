import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class UpdateSale extends Component {
    constructor(props) {
        super(props);     
        
        this.state = {
            SaleList: [],
            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoreDropdownList: []            
        };
    }

    componentDidMount() {    
        //GET: Customers
        $.ajax({
            url: "/Sale/GetCustomerList",
            type: "GET",
            success: function (data) {
                this.setState({ CustomerDropdownList: data })
            }.bind(this)
        });
        //GET: Products
        $.ajax({
            url: "/Sale/GetProductList",
            type: "GET",
            success: function (data) {
                this.setState({ ProductDropdownList: data })
            }.bind(this)
        });
        //GET: Stores
        $.ajax({
            url: "/Sale/GetStoreList",
            type: "GET",
            success: function (data) {
                this.setState({ StoreDropdownList: data })
            }.bind(this)
        });
    }   

    render() {        
        let custList = [].concat(this.state.CustomerDropdownList);
        let proList = [].concat(this.state.ProductDropdownList);
        let storeList = [].concat(this.state.StoreDropdownList);

        let customerOption = custList.map((c) => <option key={c.CId} value={c.CId} label={c.CName}>{c.CName}</option>);
        let productOption = proList.map((p) => <option key={p.PId} value={p.PId} label={p.PName}>{p.PName}</option>);
        let storeOption = storeList.map((s) => <option key={s.SId} value={s.SId} label={s.SName}>{s.SName}</option>);        

        return (
            <React.Fragment>
                <Modal size={'tiny'} open={this.props.show} closeOnDimmerClick={false}>
                    <Modal.Header> Edit Sale </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type='text' name='dateSold' defaultValue={this.props.formattedDate} onChange={this.props.handleChange} />
                                <div style={{ color: 'red' }}>{this.props.errors.dateSold}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Customer</label>
                                <select name='customerId' defaultValue={this.props.currentSale.CId} onChange={this.props.handleChange}>
                                    {customerOption}
                                </select>
                                <div style={{ color: 'red' }}>{this.props.errors.customerId}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Product</label>
                                <select name='productId' defaultValue={this.props.currentSale.PId} onChange={this.props.handleChange}>
                                    {productOption}
                                </select>
                                <div style={{ color: 'red' }}>{this.props.errors.productId}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Store</label>
                                <select name='storeId' defaultValue={this.props.currentSale.SId} onChange={this.props.handleChange}>
                                    {storeOption}
                                </select>
                                <div style={{ color: 'red' }}>{this.props.errors.storeId}</div>
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