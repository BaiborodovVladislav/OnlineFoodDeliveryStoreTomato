import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

	const [cartItems, setCartItems] = useState({});
	const [token, setToken] = useState("")
	const url = "http://localhost:4444"
	const [food_list, setFoodList] = useState([]);


	const addToCart = (itemId) => {
		if (!cartItems[itemId]) {
			setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
		} else {
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
	}

	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
	}


	const getTotalCartAmount = () => {
		return Object.keys(cartItems).reduce((total, itemId) => {
			const item = food_list.find(food => food._id === itemId);
			if (item) {
				total += item.price * cartItems[itemId];
			}
			return total;
		}, 0);
	};


	const fetchFoodList = async () => {

		const response = await axios.get(url + "/api/food/list");
		setFoodList(response.data.data);

	}

	useEffect(() => {
		async function loadData() {
			await fetchFoodList();
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
			}
		}
		loadData();
	}, [])

	const contextValue = {
		food_list,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		url,
		token,
		setToken,
	}


	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

StoreContextProvider.propTypes = {
	children: PropTypes.node
};

export default StoreContextProvider;
