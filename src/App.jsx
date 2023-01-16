import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ShowProduct from "./components/ShowProduct";

function App() {
    return (
        <BrowserRouter>
            <div className="w-full flex p-5">
                <Routes>
                    <Route path="/" element={<ShowProduct />} />
                    <Route path="add" element={<AddProduct />} />
                    <Route path="edit/:id" element={<EditProduct />} />
                </Routes>

                {/* <div className="w-1/2">
                    <AddProduct />
                </div>
                <div className="w-1/2">
                    <ShowProduct />
                </div> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
