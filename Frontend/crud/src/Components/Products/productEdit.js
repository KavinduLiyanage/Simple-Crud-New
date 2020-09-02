import React, {Component} from 'react';
import axios from "axios";
import {serverUrl} from "../config";

class ProductEdit extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            productName: "",
            productDescription: "",
            productQnt: 0
        };
    }

    componentDidMount() {
        axios
            .get(serverUrl + "/products/edit/" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    productName: response.data.productName,
                    productDescription: response.data.productDescription,
                    productQnt: response.data.productQnt
                });

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    updateInput(key, value) {
        this.setState({
            [key]: value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const products = {
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productQnt: this.state.productQnt
        };

        axios
            .post(serverUrl + "/products/update/" + this.props.match.params.id, products)
            .then((res) => console.log(res.data));

        this.setState({
            productName: "",
            productDescription: "",
            productQnt: ""
        });
        window.location = "/products";
    }

    render() {
        return (
            <div className="container" style={{ maxWidth: "40%"}}>
                <h3 align="center">Edit Product Details</h3><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" className="form-control"
                               value={this.state.productName}
                               onChange={(e) => this.updateInput("productName", e.target.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Product Description</label>
                        <textarea type="text" className="form-control"
                                  value={this.state.productDescription}
                                  onChange={(e) => this.updateInput("productDescription", e.target.value)}
                                  required/>
                    </div>
                    <div className="form-group">
                        <label>Product Quantity</label>
                        <input type="number" className="form-control"
                               value={this.state.productQnt}
                               onChange={(e) => this.updateInput("productQnt", e.target.value)}
                               required/>
                    </div> <br/>
                    <button type="submit" className="btn btn-primary btn-block">Update Product</button>
                </form>
            </div>
        );
    }
}

export default ProductEdit;