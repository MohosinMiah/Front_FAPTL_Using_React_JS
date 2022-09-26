
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BodyWrapper from "./BodyWrapper";
import { NavSidebar } from "./NavSidebar";

export const DashboardLayout = ({ children }) => {
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
			<aside className={isMenuOpen ? 'dvLeft open': 'dvLeft'}>
				<div className="dvlogo text-center"><a href="index"> <img src="/logo.png" alt="For A Place To Live Logo" /></a></div>
				<nav className="navigation" id="menubar">
					<ul className="nav flex-column flex-nowrap" id="ulmenu">
						<li className="nav-item">
							<Link to={"/"} className="nav-link" >Dashboard</Link>
						</li>
						<li className="nav-item mainDropdown">
							<Link to={"/property/list"} className="nav-link collapsed">Properties</Link>
							<span onClick={() => setPropertyActive(!propertyActive)} className="menuExpand"> {propertyActive ?   '-' : '+'  }</span>
							<div className={propertyActive ? 'collapse show' : 'collapse'} id="properties">
								<ul className="flex-column nav">
									<li className="nav-item">
										<Link to={"/property/add"} className="nav-link collapsed" >Property Add</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav-item">
							<Link to={"/propertyunit/list"} className="nav-link collapsed">Property Unit</Link>
						</li>
						<li className="nav-item mainDropdown">
							<Link to={"/tenant/list"} className="nav-link collapsed" >Tenants</Link>
							{/* <span data-toggle="collapse" data-target_="#tenants"   onClick={() => setTenantActive(!tenantActive)}  className={tenantActive ? 'fa fa-plus minus' : 'fa fa-plus sub'} aria-expanded="false"></span> */}
							<span onClick={() => setTenantActive(!tenantActive)} className="menuExpand"> {tenantActive ?   '-' : '+'  }</span>

							<div className={tenantActive ? 'collapse show' : 'collapse'} id="tenants">
								<ul className="flex-column nav">
									<li className="nav-item">
										<Link to={"/tenant/add"} className="nav-link collapsed" >Add Tenant</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav-item mainDropdown">
							<Link to={"/lease/list"} className="nav-link collapsed" >Lease</Link>
							{/* <span data-toggle="collapse" data-target_="#lease"   onClick={() => setLeaseActive(!leaseActive)}  className={leaseActive ? 'fa fa-plus minus' : 'fa fa-plus sub'} aria-expanded="false"></span> */}
							<span onClick={() => setLeaseActive(!leaseActive)} className="menuExpand"> {leaseActive ?   '-' : '+'  }</span>

							<div className={leaseActive ? 'collapse show' : 'collapse'}  id="lease">
								<ul className="flex-column nav">
									<li className="nav-item">
										<Link to={"/lease/add"} className="nav-link collapsed" >Add Lease</Link>
									</li>
								</ul>
							</div>
						</li>

						<li className="nav-item mainDropdown">
							<Link to={"/payment/list"} className="nav-link collapsed" >Payment</Link>
							{/* <span data-toggle="collapse" data-target_="#payment"   onClick={() => setPaymentActive(!paymentActive)}  className={paymentActive ? 'fa fa-plus minus' : 'fa fa-plus sub'} aria-expanded="false"></span> */}
							<span onClick={() => setPaymentActive(!paymentActive)} className="menuExpand"> {paymentActive ?   '-' : '+'  }</span>

							<div className={paymentActive ? 'collapse show' : 'collapse'}  id="payment">
								<ul className="flex-column nav">
									<li className="nav-item">
										<Link to={"/payment/add"} className="nav-link collapsed" >Add Payment</Link>
									</li>
								</ul>
							</div>
						</li>
						{token === null &&  <li className="nav-item"><Link to={"/auth/login"} className="nav-link collapsed">Login</Link></li> }
						{token !== null &&  <li className="nav-item"><Link to={"/logout"} className="nav-link collapsed">Logout</Link></li> }
					</ul>
				</nav>
				<div className="settings-bottom">
				<Link to={"/settings"} className="nav-link collapsed">Settings</Link>
				</div>
			</aside>
			
	
		</BodyWrapper>
	);
};
