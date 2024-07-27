import { useEffect, useState } from 'react'
import axios from "axios"
import "./List.css"
import { toast } from "react-toastify"

const List = ({ url }) => {


	const [list, setList] = useState([])

	const fetchList = async () => {
		try {
			const response = await axios.get(`${url}/api/food/list`)
			console.log('Response Data:', response.data)
			if (response.data.success) {
				setList(response.data.data)
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			toast.error('Failed to fetch data')
			console.error('Error fetching data:', error)
		}
	}

	const removeFood = async (foodId) => {
		try {
			const response = await axios.post(`${url}/api/food/remove`, { ids: [foodId] })
			await fetchList();
			if (response.data.success) {
				toast.success(response.data.message)
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			toast.error('Failed to remove food')
			console.error('Error removing food:', error)
		}
	}

	useEffect(() => {
		fetchList()
	}, [])

	return (
		<div className='list add flex-col'>
			<p>All Foods list</p>
			<div className="list-table">
				<div className="list-table-format title">
					<b>Image</b>
					<b>Name</b>
					<b>Category</b>
					<b>Price</b>
					<b>Action</b>
				</div>
				{list.length > 0 ? (
					list.map((item, index) => (
						<div key={index} className="list-table-format">
							<img src={`${url}/images/` + item.image} alt={item.name} />
							<p>{item.name}</p>
							<p>{item.category}</p>
							<p>${item.price}</p>
							<p onClick={() => removeFood(item._id)} className='cursor'>X</p>
						</div>
					))
				) : (
					<p>No items found</p>
				)}
			</div>
		</div>
	)
}

export default List
