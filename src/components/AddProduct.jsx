import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveProduct } from "../futures/productSlice";

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(saveProduct({ title, price }));
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
                <button className="btn btn-primary">submit</button>
            </form>
        </div>
    );
};

export default AddProduct;
