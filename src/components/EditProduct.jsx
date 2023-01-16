import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getProducts,
    productSelectors,
    updateProduct,
} from "../futures/productSlice";

const EditProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate("/");
    const { id } = useParams();

    const product = useSelector((state) =>
        productSelectors.selectById(state, id)
    );

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateProduct({ id, title, price }));
        navigate("/");
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input w-full max-w-xs "
                />
                <input
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input w-full max-w-xs "
                />
                <button className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditProduct;
