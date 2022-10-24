/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "./NavSidebar.css";

export const NavSidebar = () => {
	const history = useHistory();
	const location = useLocation();
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [propertyActive, setPropertyActive] = useState(false);
	const [tenantActive, setTenantActive] = useState(false);
	const [leaseActive, setLeaseActive] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<React.Fragment>
			
		</React.Fragment>
	);
};
