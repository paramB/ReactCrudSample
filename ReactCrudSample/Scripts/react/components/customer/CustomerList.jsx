import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import AddCustomer from './AddCustomer.jsx';
import DeleteCustomer from './DeleteCustomer.jsx';
import UpdateCustomer from './UpdateCustomer.jsx';

export default class CustomerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CustomerList: [],  
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

        this.handleNewCustomerClick = this.handleNewCustomerClick.bind(this);        
        this.toggleCreateCustomerModal = this.toggleCreateCustomerModal.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.toggleDeleteCustomerModal = this.toggleDeleteCustomerModal.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.toggleEditCustomerModal = this.toggleEditCustomerModal.bind(this);
        this.handleUpdateCustomerClick = this.handleUpdateCustomerClick.bind(this);
        this.handleCreateCustomerClick = this.handleCreateCustomerClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);            
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
                    CustomerList: data,
                    loading: false
                })
            }.bind(this)
        });
    }

    toggleCreateCustomerModal() {
        this.setState({ isAddCustomerModal: !this.state.isAddCustomerModal });
    }

    toggleEditCustomerModal() {
        this.setState({ isEditCustomerModal: !this.state.isEditCustomerModal });
    }

    toggleDeleteCustomerModal() {
        this.setState({ isDeleteCustomerModal: !this.state.isDeleteCustomerModal });
    }

    handleNewCustomerClick() {
        this.setState({
            isAddCustomerModal: true
        });
    }

    handleEditClick(customer) {
        this.setState({
            isEditCustomerModal: true,
            updateId: customer.CId,
            currentEditCustomer: customer
        });
    }

    handleDeleteClick(id) {
        this.setState({
            isDeleteCustomerModal: true,
            deleteId: id
        });        
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

    // POST request: add
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
                success: function () {
                    console.log('customer successfully added.');
                    this.loadCustomerData();                   
                    this.toggleCreateCustomerModal();
                }.bind(this)
            });
        }
    }

    // POST request: update
    handleUpdateCustomerClick(event) {
        event.preventDefault();
        if (this.validateForm()) {            
            let data = {
                'CId': this.state.updateId,
                'CName': this.state.CustomerName,
                'CAddress': this.state.CustomerAddress
            };
            $.ajax({
                url: "/Customer/EditCustomer",
                type: "POST",
                data: data,
                success: function () {
                    console.log('customer successfully updated.');
                    this.loadCustomerData();
                    this.toggleEditCustomerModal();                 
                }.bind(this)
            });
        }
    }

    // Delete Customer
    handleDeleteSubmit(id) {
        const currentList = this.state.CustomerList;

        this.setState({
            CustomerList: currentList.filter(customer => customer.CId !== id),
        });

        $.ajax({
            url: "/Customer/Delete/" + id,
            type: "POST",
            success: function (response) {                
                if (response == true) {
                    console.log('customer successfully deleted.');
                    this.toggleDeleteCustomerModal();
                } else {
                    this.setState({
                        CustomerList: currentList,
                    });
                }
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
                    <AddCustomer
                        custData={this.state.CustomerList}
                        show={this.state.isAddCustomerModal}
                        onClose={this.toggleCreateCustomerModal}
                        submit={this.handleCreateCustomerClick}
                        handleChange={this.handleChange}
                        errors={this.state.errors}
                    />                  
                </div>
                <div>
                    {contents} 
                    <DeleteCustomer
                        show={this.state.isDeleteCustomerModal}
                        onClose={this.toggleDeleteCustomerModal}
                        deleteId={this.state.deleteId}
                        delete={this.handleDeleteSubmit}
                    />
                    <UpdateCustomer
                        show={this.state.isEditCustomerModal}
                        onClose={this.toggleEditCustomerModal}
                        currentCustomer={this.state.currentEditCustomer}
                        errors={this.state.errors}
                        submit={this.handleUpdateCustomerClick}
                        handleChange={this.handleChange}
                    />                       
                </div>
            </React.Fragment>
        )
    }
}