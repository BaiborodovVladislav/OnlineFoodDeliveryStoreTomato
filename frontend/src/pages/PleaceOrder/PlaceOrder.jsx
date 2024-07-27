import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

	const { getTotalCartAmount } = useContext(StoreContext)

	return (
		<form className='pleace-order'>
			<div className="pleace-order-left">
				<p className="title">Delevery Information</p>
				<div className="multi-fields">
					<input type="text" placeholder='First Name' />
					<input type="text" placeholder='Last Name' />
				</div>
				<input type="email" placeholder='Email Adress' />
				<input type="text" placeholder='Street' />
				<div className="multi-fields">
					<input type="text" placeholder='City' />
					<input type="text" placeholder='State' />
				</div>
				<div className="multi-fields">
					<input type="text" placeholder='Zip code' />
					<input type="text" placeholder='Country' />
				</div>
				<input type="text" placeholder='Phone' />
			</div>
			<div className="pleace-order-rigth">
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
				</div>
				<button className='cart-total-button '>PROCEED TO PAYMENT</button>
			</div>

		</form >
	)
}

export default PlaceOrder
