import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import AddProduct from './AddProduct.jsx';
import DeleteProduct from './DeleteProduct.jsx';
import UpdateProduct from './UpdateProduct.jsx';

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.handleNewProductClick = this.handleNewProductClick.bind(this);
        this.toggleCreateProductModal = this.toggleCreateProductModal.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.toggleDeleteProductModal = this.toggleDeleteProductModal.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.toggleEditProductModal = this.toggleEditProductModal.bind(this);
        this.handleUpdateProductClick = this.handleUpdateProductClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);

        this.state = {
            ProductList: [], //initially ProductList array is empty
            loading: true,
            isAddProductModal: false,
            isDeleteProductModal: false,
            isEditProductModal: false,
            deleteId: 0,
            updateId: 0,
            currentEditProduct: {},
            errors: {}
        };
    }

    componentDidMount() {
        this.loadProductData();
    }

    //Get products
    loadProductData() {
        $.ajax({
            url: "/Product/GetProductList",
            type: "GET",
            success: function (data) {
                this.setState({ ProductList: data, loading: false })
            }.bind(this)
        });
    }

    handleNewProductClick() {
        this.setState({ isAddProductModal: true });
    }

    // Toggle Create Product Modal
    toggleCreateProductModal() {
        this.setState({ isAddProductModal: !this.state.isAddProductModal });
    }

    // Delete button click
    handleDeleteClick(id) {
        this.setState({
            isDeleteProductModal: true,
            deleteId: id
        });
    }

    // Toggle Delete Product Modal
    toggleDeleteProductModal() {
        this.setState({ isDeleteProductModal: !this.state.isDeleteProductModal });
    }

    // Edit button click
    handleEditClick(product) {
        this.setState({
            isEditProductModal: true,
            currentEditProduct: product,
            updateId: product.PId
        });
    }
    // Toggle Edit Product Modal
    toggleEditProductModal() {
        this.setState({ isEditProductModal: !this.state.isEditProductModal });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }  

    // validate form
    validateForm() {
        let errors = {}
        let formIsValid = true
        if (!this.state.ProductName) {
            formIsValid = false;
            errors['ProductName'] = '*Please enter the product name';
        }
        if (!this.state.ProductPrice) {
            formIsValid = false;
            errors['ProductPrice'] = '*Please enter the product price'
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

    // POST request to update Product
    handleUpdateProductClick() {        
        if (this.validateForm) {            
            let data = { 'PId': this.state.updateId, 'PName': this.state.ProductName, 'Price': this.state.ProductPrice };

            $.ajax({
                url: "/Product/EditProduct",
                type: "POST",
                data: data,
                success: function () {
                    this.setState({ ProductList: [...this.state.ProductList, data] });
                    //this.toggleEditProductModal()
                    window.location.reload();
                }.bind(this)
            });
        }
    }

    // Delete Product
    handleDeleteSubmit(id) {
        $.ajax({
            url: "/Product/Delete/" + id,
            type: "POST",
            success: function () {
                window.location.reload();
            }.bind(this)
        });
    }

    renderProductTable(proList) {
        return <Table striped celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {proList.map(product =>
                    <Table.Row key={product.PId}>
                        <Table.Cell>{product.PName}</Table.Cell>
                        <Table.Cell>{product.Price}</Table.Cell>
                        <Table.Cell>
                            <Button className="ui yellow button" onClick={this.handleEditClick.bind(this, product)}>
                                <i className="edit icon"></i>EDIT</Button>
                        </Table.Cell>
                        <Table.Cell>
                            <Button className="ui red button" onClick={this.handleDeleteClick.bind(this, product.PId)}>
                                <i className="trash icon"></i>DELETE</Button>
                        </Table.Cell>
                    </Table.Row>)
                }
            </Table.Body>
        </Table>
    }

    render() {
        const proList = this.state.ProductList;
        let contents = this.state.loading
            ? <div style={{ paddingLeft: 35 + 'em' }}><em>Loading...</em></div>
            : this.renderProductTable(proList);

        return (
            <React.Fragment>
                <div>
                    <div><Button style={{ margin: 1 + 'em' }} primary onClick={this.handleNewProductClick}>New Product</Button></div>
                    <AddProduct show={this.state.isAddProductModal} onClose={this.toggleCreateProductModal} />
                </div>
                <div>
                    <DeleteProduct show={this.state.isDeleteProductModal} onClose={this.toggleDeleteProductModal} deleteId={this.state.deleteId} delete={this.handleDeleteSubmit}/>
                    <UpdateProduct show={this.state.isEditProductModal} onClose={this.toggleEditProductModal} currentProduct={this.state.currentEditProduct}
                        errors={this.state.errors} submit={this.handleUpdateProductClick} handleChange={this.handleChange} />
                    {contents}
                </div>
            </React.Fragment>
        )
    }
}