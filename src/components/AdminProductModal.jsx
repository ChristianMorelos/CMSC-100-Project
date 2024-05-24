import React, { useEffect, useState } from 'react';

function AdminProductModal({ setIsModalOpen, prodDet }) {
  const [prodName, setName] = useState(prodDet.productName);
  const [prodPrice, setPrice] = useState(prodDet.productPrice);
  const [prodImg, setImg] = useState(prodDet.productImg);
  const [prodDesc, setDesc] = useState(prodDet.productDescription);
  const [prodType, setType] = useState(prodDet.productType);
  const [prodQty, setQty] = useState(prodDet.productQuantity);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Product types object
  const productTypes = {
    1: "Staple",
    2: "Fruits and Vegetables",
    3: "Livestock",
    4: "Seafood",
    5: "Others",
  };

  return (
    <>
      <div className='blur-bg' onClick={handleCloseModal}>
        <div className='product-modal'>
          <i className='bx bx-x' onClick={handleCloseModal}></i>
          <div className='modal-img-div'>
            <img src={prodImg} alt={prodName} />
          </div>
          <div className='modal-info-div'>
            <h1>{prodName}</h1>
            <h6><b>Description:</b><br/> {prodDesc}</h6>
            <h6><b>Type:</b> {productTypes[prodType]}</h6>
            <h6><b>Price:</b> {prodPrice}</h6>
            <h6><b>Stock Left:</b> {prodQty}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProductModal;
