import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets';

const Footer = () => {
	return (
		<div className='Footer' id='footer'>
			<div className="Footer-content">
				<div className="Footer-contant-left">
					<img src={assets.logo} alt="logo" />
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis rerum dolor possimus ipsa! Laborum quas nostrum facilis beatae ducimus? Maxime autem provident nostrum laborum quod, officia placeat est rerum soluta.</p>
					<div className="Footer-sochial-icons">
						<img src={assets.facebook_icon} alt="facebook" />
						<img src={assets.linkedin_icon} alt="linkedin" />
						<img src={assets.twitter_icon} alt="twitter" />
					</div>
				</div>
				<div className="Footer-contant-center">
					<h2 className="Company">Company</h2>
					<ul>
						<li>Home</li>
						<li>About us</li>
						<li>Delivery</li>
						<li>Privacy policy</li>
					</ul>
				</div>
				<div className="Footer-content-right">
					<h2>Get in touch</h2>
					<ul>
						<li>+1-121-456-2123</li>
						<li>Contact@tomato.com</li>
					</ul>
				</div>
			</div>
			<hr />
			<p className="Footer-copyrigh">Copyright 2024 Tomato.com - All Rights Reserved</p>
		</div>
	)
}

export default Footer
