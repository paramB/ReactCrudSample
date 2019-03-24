import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import AddCustomer from './AddCustomer.jsx';
import DeleteCustomer from './DeleteCustomer.jsx';
import UpdateCustomer from './UpdateCustomer.jsx';

export default class CustomerList extends Component {
    constructor(props) {
        super(props);

        this.handleNewCustomerClick = this.handleNewCustomerClick.bind(this);        
        this.toggleCreateCustomerModal = this.toggleCreateCustomerModal.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.toggleDeleteCustomerModal = this.toggleDeleteCustomerModal.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.toggleEditCustomerModal = this.toggleEditCustomerModal.bind(this);
        this.handleUpdateCustomerClick = this.handleUpdateCustomerClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);

        this.state = {
            CustomerList: [], //initially CustomerList array is empty            
            CustomerName: '',
            CustomerAddress: '',
            loading: true,
            isAddCustomerModal: false,
            isDeleteCustomerModal: false,
            isEditCustomerModal: false,
            deleteId: 0,
            updateId: 0,
            currentEditCustomer: {},
            errors: {}
        };        
    }

    componentDidMount() {
        this.loadCustomerData();
    }

    //Get customers
    loadCustomerData() {
        $.ajax({
            url: "/Customer/GetCustomerList",
            type: "GET",
            success: function (data) {                
                this.setState({
                    //CustomerList: [...this.state.CustomerList, data],
                    CustomerList: data,
                    loading: false
                })
            }.bind(this)
        });
    }
    // New Customer Button Click
    handleNewCustomerClick() {
        this.setState({ isAddCustomerModal: true });
    }

    // Toggle Create Customer Modal
    toggleCreateCustomerModal() {
        this.setState({ isAddCustomerModal: !this.state.isAddCustomerModal });
    }

    // Delete Button Click
    handleDeleteClick(id) {
        this.setState({
            isDeleteCustomerModal: true,
            deleteId: id
        });        
    }

    // Toggle Delete Customer Modal
    toggleDeleteCustomerModal() {
        this.setState({ isDeleteCustomerModal: !this.state.isDeleteCustomerModal });
    }

    // Edit Button Click
    handleEditClick(customer) {
        this.setState({
            isEditCustomerModal: true,
            updateId: customer.CId,
            currentEditCustomer: customer
        });
    }

    // Toggle Edit Customer Modal
    toggleEditCustomerModal() {
        this.setState({ isEditCustomerModal: !this.state.isEditCustomerModal });
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

    // POST request to update customer
    handleUpdateCustomerClick(event) {
        event.preventDefault();
        if (this.validateForm()) {            
            let data = { 'CId': this.state.updateId, 'CName': this.state.CustomerName, 'CAddress': this.state.CustomerAddress };

            $.ajax({
                url: "/Customer/EditCustomer",
                type: "POST",
                data: data,
                success: function () {
                    this.setState({ CustomerList: [...this.state.CustomerList, data] });
                    //this.toggleEditCustomerModal()
                    window.location.reload();
                }.bind(this)
            });
        }
    }

    // Delete Customer
    handleDeleteSubmit(id) {
        $.ajax({
            url: "/Customer/Delete/" + id,
            type: "POST",
            success: function () {
                window.location.reload();
            }.bind(this)
        });
    }
    renderCustomerTable(custList) {        
        return <Table striped celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>                    
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {custList.map((customer) =>
                    <Table.Row key={customer.CId}>
                        <Table.Cell>{customer.CName}</Table.Cell>
                        <Table.Cell>{customer.CAddress}</Table.Cell>
                        <Table.Cell>
                            <Button color='yellow' onClick={this.handleEditClick.bind(this, customer)}>
                                <i className="edit icon"></i>EDIT</Button>
                        </Table.Cell>
                        <Table.Cell>
                            <Button color='red' onClick={this.handleDeleteClick.bind(this, customer.CId)}>
                                <i className="trash icon"></i>DELETE</Button>
                        </Table.Cell>
                    </Table.Row>)
                }
            </Table.Body>
        </Table>
    }

    render() {
        const custList = this.state.CustomerList;        
        let contents = this.state.loading
            ? <div style={{ paddingLeft: 35 + 'em' }}><em>Loading...</em></div>
            : this.renderCustomerTable(custList);                     
        return (
            <React.Fragment>
                <div>
                    <div><Button style={{ margin: 1 + 'em' }} primary onClick={this.handleNewCustomerClick}>New Customer</Button></div>
                    <AddCustomer show={this.state.isAddCustomerModal} onClose={this.toggleCreateCustomerModal}/>                  
                </div>
                <div>
                    <DeleteCustomer show={this.state.isDeleteCustomerModal} onClose={this.toggleDeleteCustomerModal} deleteId={this.state.deleteId} delete={this.handleDeleteSubmit}/>
                    <UpdateCustomer show={this.state.isEditCustomerModal} onClose={this.toggleEditCustomerModal} currentCustomer={this.state.currentEditCustomer}
                        errors={this.state.errors} submit={this.handleUpdateCustomerClick} handleChange={this.handleChange} />
                    {contents}    
                </div>
            </React.Fragment>
        )
    }
}