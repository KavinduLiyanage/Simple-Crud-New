import React, {Component} from 'react';
import axios from "axios";
import {serverUrl, TOKEN_ID} from "../config";
import ProductTableRow from "./productTableRow"

class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        axios
            .get(serverUrl + "/products/"+ localStorage.getItem(TOKEN_ID))
            .then((response) => {
                this.setState({
                    products: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    productList() {
        return this.state.products.map(function (object, i) {
            return <ProductTableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 30 , maxWidth: "70%"}}>
                <h3 align="center">Products List</h3>
                <table className="table table-striped table-hover" style={{ marginTop: 20 }}>
                    <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody >{this.productList()}</tbody>
                </table>
            </div>
        );
    }
}

export default ProductsList;