import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import AddProduct from './AddProduct.jsx';
import DeleteProduct from './DeleteProduct.jsx';
import UpdateProduct from './UpdateProduct.jsx';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductList: [],
            loading: true,
            isAddProductModal: false,
            isDeleteProductModal: false,
            isEditProductModal: false,
            deleteId: 0,
            updateId: 0,
            currentEditProduct: {},
            errors: {}
        };

        this.handleNewProductClick = this.handleNewProductClick.bind(this);
        this.toggleCreateProductModal = this.toggleCreateProductModal.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.toggleDeleteProductModal = this.toggleDeleteProductModal.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.toggleEditProductModal = this.toggleEditProductModal.bind(this);
        this.handleCreateProductClick = this.handleCreateProductClick.bind(this);
        this.handleUpdateProductClick = this.handleUpdateProductClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);        
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
                this.setState({
                    ProductList: data,
                    loading: false
                })
            }.bind(this)
        });
    }
  
    toggleCreateProductModal() {
        this.setState({ isAddProductModal: !this.state.isAddProductModal });
    }

    toggleDeleteProductModal() {
        this.setState({ isDeleteProductModal: !this.state.isDeleteProductModal });
    }
    
    toggleEditProductModal() {
        this.setState({ isEditProductModal: !this.state.isEditProductModal });
    }

    handleNewProductClick() {
        this.setState({ isAddProductModal: true });
    }

    handleDeleteClick(id) {
        this.setState({
            isDeleteProductModal: true,
            deleteId: id
        });
    }
    
    handleEditClick(product) {
        this.setState({
            isEditProductModal: true,
            currentEditProduct: product,
            updateId: product.PId
        });
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

    // POST request: add
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
                    this.loadProductData();
                    this.toggleCreateProductModal();
                }.bind(this)
            });
        }
    }

    // POST request: update
    handleUpdateProductClick() {        
        if (this.validateForm) {            
            let data = {
                'PId': this.state.updateId,
                'PName': this.state.ProductName,
                'Price': this.state.ProductPrice
            };
            $.ajax({
                url: "/Product/EditProduct",
                type: "POST",
                data: data,
                success: function () {
                    this.loadProductData();
                    this.toggleEditProductModal();                    
                }.bind(this)
            });
        }
    }

    // Delete Product
    handleDeleteSubmit(id) {
        const currentList = this.state.ProductList;

        this.setState({
            ProductList: currentList.filter(product => product.PId!== id),
        });

        $.ajax({
            url: "/Product/Delete/" + id,
            type: "POST",
            success: function (response) {
                if (response == true) {
                    console.log('product successfully deleted.');
                    this.toggleDeleteProductModal();
                } else {
                    this.setState({
                        ProductList: currentList,
                    });
                }
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
                    <AddProduct
                        show={this.state.isAddProductModal}
                        onClose={this.toggleCreateProductModal}
                        submit={this.handleCreateProductClick}
                        errors={this.state.errors}
                        handleChange={this.handleChange}
                    />
                </div>
                <div>
                    {contents}
                    <DeleteProduct
                        show={this.state.isDeleteProductModal}
                        onClose={this.toggleDeleteProductModal}
                        deleteId={this.state.deleteId}
                        delete={this.handleDeleteSubmit}
                    />
                    <UpdateProduct
                        show={this.state.isEditProductModal}
                        onClose={this.toggleEditProductModal}
                        currentProduct={this.state.currentEditProduct}
                        errors={this.state.errors}
                        submit={this.handleUpdateProductClick}
                        handleChange={this.handleChange}
                    />                    
                </div>
            </React.Fragment>
        )
    }
}