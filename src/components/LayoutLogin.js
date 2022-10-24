
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BodyWrapper from "./BodyWrapper";
import { NavSidebar } from "./NavSidebar";

export const DashboardLayoutLogin = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [propertyActive, setPropertyActive] = useState(false);
	const [tenantActive, setTenantActive] = useState(false);
	const [leaseActive, setLeaseActive] = useState(false);
	const [paymentActive, setPaymentActive] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	var token = localStorage.getItem('access_token');

	

	return (
		<BodyWrapper>
			<NavSidebar />
			<div className="dvRight">
				<header>
					<div className="mobile-top">
						<div className="row text-center mx-0 justify-content-between">
							<div className="col-5 col-md-3 col-sm-4 align-self-center">
								<a href="/"><img src="/logo.png" alt="For A Place To Live Logo" /></a>
							</div>
							<div className="col-2 col-lg-1 align-self-center">
								<div className="hamburger menu-icon" onClick={ () => setIsMenuOpen(!isMenuOpen)}>
									<div className={isMenuOpen ? 'menu-icon-in open': 'menu-icon-in'}>
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				{children}
			</div>
			
		</BodyWrapper>
	);
};
