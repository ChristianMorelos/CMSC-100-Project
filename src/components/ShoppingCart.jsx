import '/src/styles/ShoppingCart.css'

function ShoppingCart({ onClose }) {
    return (
    <>
        <div className='shopping-cart'>
            <div className='blur-side' onClick={onClose}>
            </div>
            <div className='cart-div'>
                <div className='cart-head'>
                    <h1>Shopping Cart</h1>
                    <i class='bx bx-x' onClick={onClose}></i>
                </div>
                <div className='cart-item-div'>
                <div className='cart-img-div'>
                    <img src='https://cdn.forumcomm.com/dims4/default/0bf5ed0/2147483647/strip/true/crop/5100x3393+0+0/resize/1602x1066!/quality/90/?url=https%3A%2F%2Fforum-communications-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Faa%2F1d%2F1d862937452abf90205e423428f4%2Ftomatoes-stock-image.jpg'/>
                </div>
                <div className='cart-name-price-div'>
                    <h3>TomatoTomatoTomatoTomatoTomatoTomato</h3>
                    <a>P999.99</a>
                </div>
                <div className='cart-qty-div'>
                    <div className='qty-btn' id='minus-btn'>
                    <button><i class='bx bx-minus'></i></button>
                    </div>
                    <div className='qty'>
                    999
                    </div>
                    <div className='qty-btn' id='plus-btn'>
                    <button><i class='bx bx-plus'></i></button>
                    </div>
                </div>
                <div className='cartItem' id='delete-div'>
                    <button className='delete-btn'><i class='bx bx-x'></i></button>
                </div>
                </div>
                <div className='cart-item-div'>
                <div className='cart-img-div'>
                    <img src='https://cdn.forumcomm.com/dims4/default/0bf5ed0/2147483647/strip/true/crop/5100x3393+0+0/resize/1602x1066!/quality/90/?url=https%3A%2F%2Fforum-communications-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Faa%2F1d%2F1d862937452abf90205e423428f4%2Ftomatoes-stock-image.jpg'/>
                </div>
                <div className='cart-name-price-div'>
                    <h3>Tomato</h3>
                    <a>P999</a>
                </div>
                <div className='cart-qty-div'>
                    <div className='qty-btn' id='minus-btn'>
                    <button><i class='bx bx-minus'></i></button>
                    </div>
                    <div className='qty'>
                    999
                    </div>
                    <div className='qty-btn' id='plus-btn'>
                    <button><i class='bx bx-plus'></i></button>
                    </div>
                </div>
                <div className='cartItem' id='delete-div'>
                    <button className='delete-btn'><i class='bx bx-x'></i></button>
                </div>
                </div>
                <div className='cart-checkout-div'>
                <div className='totalPrice-div'>
                    TOTAL: P9999.99
                </div>
                <div className='checkout-btn-div'>
                    <button>Checkout</button>
                </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ShoppingCart;