
import axios from 'axios';
import React, { useEffect, useState } from "react";
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
	const [ isloginSuccess, setIsLoginSuccess ] = useState(false);
	useEffect(() => {
        fetchProperty();
      }, []);

      const fetchProperty = () => {
        const api = 'http://127.0.0.1:8000/api/v1/properties';
        const token = localStorage.getItem('access_token');
        axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
		  setIsLoginSuccess(true);
        }).catch((error) => {
			console.log( error);
			console.log( typeof( error.response.data.message ) );
			console.log( error.response.data.message );

			if( error.response.data.message == "Unauthenticated." )
			{
				console.log( "MOHOSIN 2 " );
				localStorage.removeItem('access_token' );
				window.location.href = "/auth/login";
			
			}else{
				console.log("Not Match");
			}

      });

    }

	return (
		<BodyWrapper>
				<NavSidebar />
		{ isloginSuccess == true &&
		
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
		}

		{ isloginSuccess == true &&
			<aside className={isMenuOpen ? 'dvLeft open': 'dvLeft'}>
				<div className="dvlogo text-center"><a href="/"> <img src="/logo.png" alt="For A Place To Live Logo" /></a></div>
				<nav className="navigation" id="menubar">
					<ul className="nav flex-column flex-nowrap" id="ulmenu">
						<li className="nav-item">
							<Link to={"/payment/add"} className="nav-link" >Collect Payments</Link>
						</li>
						<li className="nav-item">
							<Link to={"/"} className="nav-link" >Report</Link>
						</li>
						<li className="nav-item">
							<Link to={"/payment/list/pending"} className="nav-link collapsed" >Pending Payments</Link>
						</li>
						<li className="nav-item">
							<Link to={"/payment/list/recorded"} className="nav-link collapsed" >Recorded Payments</Link>
						</li>

						<hr />
						
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
						
						{token === null &&  <li className="nav-item"><Link to={"/auth/login"} className="nav-link collapsed">Login</Link></li> }
						{token !== null &&  <li className="nav-item"><Link to={"/logout"} className="nav-link collapsed">Logout</Link></li> }
					</ul>
				</nav>
				<div className="settings-bottom">
				<Link to={"/settings"} className="nav-link collapsed">Settings</Link>
				</div>
			</aside>
		}
		</BodyWrapper>
	);
};
