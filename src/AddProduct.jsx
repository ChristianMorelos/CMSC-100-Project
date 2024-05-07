import { useState } from "react";
export default function AddProduct(props) {
    const [prodId, setId] = useState('');
    const [prodName, setName] = useState('');
    const [prodDesc, setDesc] = useState('');
    const [prodType, setType] = useState(1);
    const [prodQty, setQty] = useState(1);

    
    const form = document.getElementById("form-values");


    //
    function validateFields(){

         //check if any of the input fields are empty 
        if (prodId == "" || prodName == "" || prodDesc == "") {
            //alert message for incomplete fields
            alert("Please fill out all of the fields first");
            return;
        }

        //print validated fields
        console.log("Product Id: " + prodId);
        console.log("Product Name: " + prodName);
        console.log("Product Description: " + prodDesc);
        console.log("Product Type: " + prodType);
        console.log("Product Quantity: " + prodQty);
        
        //reset values
        setId("");
        setName("");
        setDesc("");
        setType(1);
        setQty(1);
    }

  return (
    <>

    <h1 id="title">Add a Product</h1>

    <form id="form-values" >
        <div id="form">
            <label className="product-field" for="prodId">Product Id:</label>
            <input value={prodId} type="text" onChange={e => setId(e.target.value)} id="prodId" name="prodId" required/>

            <label className="product-field" for="prodName">Product Name:</label>
            <input value={prodName} type="text" onChange={e => setName(e.target.value)} id="prodName" name="prodName" required/>

            <label className="product-field" for="productDesc">Product Description:</label>
            <input value={prodDesc} type="text" onChange={e => setDesc(e.target.value)} id="productDesc" name="productDesc" required/>

            <label className="product-field" for="prodType">Product Type:</label>
            <input value={prodType} type="number" onChange={e => setType(e.target.value)} id="prodType" name="prodType" required/>

            <label className="product-field" for="prodQuantity">Product Quantity:</label>
            <input value={prodQty} type="number" onChange={e => setQty(e.target.value)} id="prodQuantity" name="prodQuantity" required/>
        </div>
       
       
        
    </form>

    <button id="addProduct" onClick={validateFields}>Add Product</button>

  


    
    
      


    </>
  );
}
