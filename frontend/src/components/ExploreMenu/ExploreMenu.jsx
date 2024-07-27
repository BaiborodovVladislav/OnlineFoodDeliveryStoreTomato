import { menu_list } from '../../assets/frontend_assets/assets'
import './ExploreMenu.css'
import PropTypes from 'prop-types';

const ExploreMenu = ({ category, setCategory }) => {



	return (
		<div className='explore' id='explore-menu'>
			<div className="text-menu">
				<h1>Explore our Menu</h1>
				<p className='explore-text'>Choose from diverse featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your domestic experience.</p>
			</div>
			<div className="explore-menu-list">
				{menu_list.map((item, index) => (
					<div className='explore-menu-list-item' onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index}>
						<img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
						<p>{item.menu_name}</p>
					</div>
				))}
			</div>
			<hr />
		</div>
	)
}

ExploreMenu.propTypes = {
	category: PropTypes.string.isRequired,
	setCategory: PropTypes.func.isRequired
};

export default ExploreMenu