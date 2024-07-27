import "./LoginPopup.css"
import { useContext, useState } from 'react'
import { assets } from "../../assets/frontend_assets/assets.js"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"


// eslint-disable-next-line react/prop-types
const LoginPopup = ({ setShowLogin }) => {

	const { url, setToken } = useContext(StoreContext)


	const [currentState, setCurrentState] = useState("Login")
	const [data, setData] = useState({
		name: "",
		email: "",
		password: ""
	})

	const onChangeHandler = (e) => {
		const name = e.target.name
		const value = e.target.value
		setData(data => ({ ...data, [name]: value }))
	}

	const onLogin = async (event) => {

		event.preventDefault()

		let newUrl = url

		if (currentState === "Login") {
			newUrl += "/api/user/login"
		} else {
			// eslint-disable-next-line no-unused-vars
			newUrl += "/api/user/register"
		}
		const response = await axios.post(newUrl, data)

		if (response.data.success) {
			setToken(response.data.token)
			localStorage.setItem("token", response.data.token)

			setShowLogin(false)
		} else {
			alert(response.data.message)
		}
	}




	return (
		<div className="Login-Popup">
			<form onSubmit={onLogin} action="" className="login-popup-container">
				<div className="login-popup-title">
					<h2>{currentState}</h2>
					<img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross" />
				</div>
				<div className="login-popup-inputs">
					{currentState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />}
					<input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
					<input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Your password" required />
				</div>
				<button type="submit">{currentState === "Sign Up" ? "Create account" : "Login"}</button>
				<div className="login-popup-condition">
					<input type="checkbox" required />
					<p>By creating an account, I consent to the processing of my personal data in accordance with the <span>Privacy Policy</span></p>
				</div>
				{currentState === "Login"
					? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
					: <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
				}
			</form>
		</div>
	)
}

export default LoginPopup
