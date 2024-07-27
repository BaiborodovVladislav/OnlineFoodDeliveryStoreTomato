import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PleaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'


const App = () => {

	const [Showlogin, setShowLogin] = useState(false)

	return (
		<>
			{Showlogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
			<div className='app'>
				<Navbar setShowLogin={setShowLogin} />
				<Routes >
					<Route path='/' element={<Home />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/order' element={<PlaceOrder />} />
				</Routes>
			</div>
			<Footer />
		</>
	)
}

export default App
