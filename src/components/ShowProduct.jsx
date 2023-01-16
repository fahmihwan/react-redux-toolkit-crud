import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts, productSelectors } from "../futures/productSlice";

const ShowProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector(productSelectors.selectAll);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <div>
            <Link className="btn btn-success mb-5 btn-sm" to="add">
                add new
            </Link>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>title</th>
                            <th>price</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((d, i) => (
                            <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{d.title}</td>
                                <td>{d.price}</td>
                                <td>
                                    <Link
                                        to={`edit/${d.id}`}
                                        className="btn btn-sm mr-2 btn-primary"
                                    >
                                        edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(d.id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowProduct;
