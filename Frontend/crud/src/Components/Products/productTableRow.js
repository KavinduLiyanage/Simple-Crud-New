import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../config";

class ProductTableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        axios
            .delete(serverUrl + "/products/" + this.props.obj._id)
            .then(console.log("Deleted"))
            .catch((err) => console.log(err));
        window.location='/products'
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.productName}</td>
                <td className="text-center">{this.props.obj.productDescription}</td>
                <td className="text-center">{this.props.obj.productQnt}</td>
                <td>
                    <Link
                        to={"/products/edit/" + this.props.obj._id}
                        className="btn btn-outline-dark btn-sm"
                    >
                        Edit
                    </Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-outline-danger btn-sm">
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default ProductTableRow;