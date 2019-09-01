import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import AddStore from './AddStore.jsx';
import DeleteStore from './DeleteStore.jsx';
import UpdateStore from './UpdateStore.jsx';

export default class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreList: [],
            loading: true,
            isAddStoreModal: false,
            isDeleteStoreModal: false,
            isEditStoreModal: false,
            deleteId: 0,
            updateId: 0,
            currentEditStore: {},
            errors: {}
        };

        this.handleNewStoreClick = this.handleNewStoreClick.bind(this);
        this.toggleCreateStoreModal = this.toggleCreateStoreModal.bind(this);
        this.handleCreateStoreClick = this.handleCreateStoreClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.toggleDeleteStoreModal = this.toggleDeleteStoreModal.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.toggleEditStoreModal = this.toggleEditStoreModal.bind(this);
        this.handleUpdateStoreClick = this.handleUpdateStoreClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);        
    }

    componentDidMount() {
        this.loadStoreData();
    }

    //Get Stores
    loadStoreData() {
        $.ajax({
            url: "/Store/GetStoreList",
            type: "GET",
            success: function (data) {
                this.setState({
                    StoreList: data,
                    loading: false
                })
            }.bind(this)
        });
    }

    toggleCreateStoreModal() {
        this.setState({ isAddStoreModal: !this.state.isAddStoreModal });
    }

    toggleEditStoreModal() {
        this.setState({ isEditStoreModal: !this.state.isEditStoreModal });
    }

    toggleDeleteStoreModal() {
        this.setState({ isDeleteStoreModal: !this.state.isDeleteStoreModal });
    }

    handleNewStoreClick() {
        this.setState({ isAddStoreModal: true });
    }

    handleEditClick(store) {
        this.setState({
            isEditStoreModal: true,
            currentEditStore: store,
            updateId: store.SId
        });
    }

    handleDeleteClick(id) {
        this.setState({
            isDeleteStoreModal: true,
            deleteId: id
        });
    }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //validate form
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

    //POST request: add
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
                    this.loadStoreData();
                    this.toggleCreateStoreModal();
                }.bind(this)
            });
        }
    }

    //POST request: update
    handleUpdateStoreClick() {
        if (this.validateForm()) {
            let data = {
                'SId': this.state.updateId,
                'SName': this.state.StoreName,
                'SAddress': this.state.StoreAddress
            };

            $.ajax({
                url: "/Store/EditStore",
                type: "POST",
                data: data,
                success: function () {
                    this.loadStoreData();
                    this.toggleEditStoreModal();                    
                }.bind(this)
            });
        }
    }

    //delete
    handleDeleteSubmit(id) {
        const currentList = this.state.StoreList;
        this.setState({
            StoreList: currentList.filter(store => store.SId !== id),
        });

        $.ajax({
            url: "/Store/Delete/" + id,
            type: "POST",
            success: function(response) {
                if (response == true) {
                    console.log('store successfully deleted.');
                    this.toggleDeleteStoreModal();
                } else {
                    this.setState({
                        StoreList: currentList,
                    });
                }
            }.bind(this)
        });
    }

    renderStoreTable(storeList) {
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
                {storeList.map(store =>
                    <Table.Row key={store.SId}>
                        <Table.Cell>{store.SName}</Table.Cell>
                        <Table.Cell>{store.SAddress}</Table.Cell>
                        <Table.Cell>
                            <Button className="ui yellow button" onClick={this.handleEditClick.bind(this, store)}>
                                <i className="edit icon"></i>EDIT</Button>
                        </Table.Cell>
                        <Table.Cell>
                            <Button className="ui red button" onClick={this.handleDeleteClick.bind(this, store.SId)}>
                                <i className="trash icon"></i>DELETE</Button>
                        </Table.Cell>
                    </Table.Row>)
                }
            </Table.Body>
        </Table>
    }

    render() {
        const storeList = this.state.StoreList;
        let contents = this.state.loading
            ? <div style={{ paddingLeft: 35 + 'em' }}><em>Loading...</em></div>
            : this.renderStoreTable(storeList);

        return (
            <React.Fragment>
                <div>
                    <div><Button style={{ margin: 1 + 'em' }} primary onClick={this.handleNewStoreClick}>New Store</Button></div>
                    <AddStore
                        show={this.state.isAddStoreModal}
                        onClose={this.toggleCreateStoreModal}
                        submit={this.handleCreateStoreClick}
                        errors={this.state.errors}
                        handleChange={this.handleChange}
                    />
                </div>
                <div>
                    {contents}
                    <DeleteStore
                        show={this.state.isDeleteStoreModal}
                        onClose={this.toggleDeleteStoreModal}
                        deleteId={this.state.deleteId}
                        delete={this.handleDeleteSubmit} />
                    <UpdateStore
                        show={this.state.isEditStoreModal}
                        onClose={this.toggleEditStoreModal}
                        currentStore={this.state.currentEditStore}
                        errors={this.state.errors}
                        submit={this.handleUpdateStoreClick}
                        handleChange={this.handleChange}
                    />
                    
                </div>
            </React.Fragment>
        )
    }
}