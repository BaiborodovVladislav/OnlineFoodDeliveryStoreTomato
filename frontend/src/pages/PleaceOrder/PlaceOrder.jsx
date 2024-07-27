import './PlaceOrder.css'
import { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

	const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		phone: "",
	})

	const onChangeHandler = (e) => {
		const name = e.target.name
		const value = e.target.value
		setData(data => ({ ...data, [name]: value }))
	}

	const placeOrder = async (event) => {

		event.preventDefault()
		let orderItems = []
		food_list.map((item) => {
			if (cartItems[item._id] > 0) {
				let itemInfo = item;
				itemInfo["quantity"] = cartItems[item._id];
				orderItems.push(itemInfo)
			}
		})
		let orderData = {
			userId: localStorage.getItem("userId"),
			address: data,
			items: orderItems,
			amount: getTotalCartAmount() + 2,
		}
		let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })

		if (response.data.success) {
			const { session_url } = response.data
			window.location.replace(session_url);
		} else {
			console.error(response.data);
			alert("Error")
		}
	}

	return (
		<form onSubmit={placeOrder} className='pleace-order'>
			<div className="pleace-order-left">
				<p className="title">Delevery Information</p>
				<div className="multi-fields">
					<input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' />
					<input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' />
				</div>
				<input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Email Adress' />
				<input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />
				<div className="multi-fields">
					<input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder='City' />
					<input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder='State' />
				</div>
				<div className="multi-fields">
					<input required name="zipCode" value={data.zipCode} onChange={onChangeHandler} type="text" placeholder='Zip code' />
					<input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' />
				</div>
				<input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' />
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
				<button type='submit' className='cart-total-button '>PROCEED TO PAYMENT</button>
			</div>

		</form >
	)
}

export default PlaceOrder
