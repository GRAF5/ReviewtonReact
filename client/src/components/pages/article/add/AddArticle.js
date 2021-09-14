import { useState } from "react";
import Autocorrect from "../../../input/autocorrect/Autocorrect";


function AddArticle(props){
    const [product, setProduct] = useState(
        {
            name: ""            
        }
    );
    function handleProductInput(e){
        const {id, value} = e.target;
        setProduct({...product, [id]:value});
    }
    return(
    <div className="page-with">
        <div className="page-container">
            <div className="page-wrapper">
                <h1 className="page-name">Добавление Статьи</h1>
                <Autocorrect id="name" label="Продукт" placeholder="Продукт" options={["Украина","США","Германия"]} onChange={(e) => handleProductInput(e)} helperText="Выбирете или создайте продукт о котором вы хотите написать" value={product.name}/>
            </div>
        </div>
    </div>)
}

export default AddArticle;