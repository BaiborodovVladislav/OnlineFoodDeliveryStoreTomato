import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'



const Cart = () => {

	const { cartItems, food_list, removeFromCart, url } = useContext(StoreContext)
	const { getTotalCartAmount } = useContext(StoreContext)

	const naviget = useNavigate()

	return (
		<div className="Cart">
			<div className="cart-items">
				<div className="cart-items-title">
					<p>Items</p>
					<p>Title</p>
					<p>Price</p>
					<p>Quantity</p>
					<p>Total</p>
					<p>Remove</p>
				</div>
				<br />
				<hr />
				{food_list.map((item, index) => {
					if (cartItems[item._id] > 0) {
						{
							return (
								<div className="" key={item._id}>
									<div className="cart-items-title cart-items-item" >
										<img src={url + "/images/" + item.image} alt="" />
										<p>{item.name}</p>
										<p>${item.price}</p>
										<p>{cartItems[item._id]}</p>
										<p>${cartItems[item._id] * item.price}</p>
										<p className='cross' onClick={() => removeFromCart(item._id)} >x</p>
									</div>
									<hr />
								</div>
							)
						}
					}
				})}
			</div>
			<div className="cart-bottom">
				<div className="cart-total">
					<h2>Cart Total</h2>
					<div className="cart-total-detals">
						<p>Subtotal</p>
						<p>{getTotalCartAmount()}</p>
					</div>
					<hr />
					<div className="cart-total-detals">
						<p>Delive</p>
						<p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
					</div>
					<hr />
					<div className="cart-total-detals">
						<b>Total</b>
						<b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
					</div>
					<button onClick={() => naviget("/order")}>PROCEED TO CHECKOUT</button>
				</div>

				<div className="cart-promo">
					<div className="">
						<p>If have a promo code, Enter it here</p>
						<div className="cart-promo-input">
							<input type="text" placeholder='promo code' />
							<button>APPLY</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Cart
