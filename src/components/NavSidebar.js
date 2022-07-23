/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "./NavSidebar.css";
export const NavSidebar = () => {
const history = useHistory();
const location = useLocation();
const [isSidebarOpen, setIsSidebarOpen] = useState(true);

return (
	<React.Fragment>
	{/* Sidebar Overlay */}
	<div
		onClick={() => setIsSidebarOpen(false)}
		className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
		isSidebarOpen ? "block" : "hidden"
		}`}
	/>

	
	<div className="mobile-nav">
		<button
		className="btn-menu"
		onClick={(): void => setIsSidebarOpen(true)}
		type="button"
		>
		<Icon name="burger" className="w-6 h-6" />
		</button>
	</div>

	{/* Sidebar */}
	<div
		className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
		isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
		}`}
	>
		<div className="flex items-center justify-center text-center py-6">
		<span className="mx-2 text-2xl font-semibold text-black">
		<img src="/logo.png" alt="Logo" />
		</span>
		</div>

		{/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
		<Navigation
		activeItemId={location.pathname}
		onSelect={({ itemId }) => {
			history.push(itemId);
		}}
		items={[
			{
			title: "Home",
			itemId: "/home",
			// Optional
			elemBefore: () => <Icon name="coffee" />
			},
			{
			title: "Property Setting",
			itemId: "/property",
			elemBefore: () => <Icon name="user" />,
			subNav: [
				{
				title: "Properties",
				itemId: "/property/list",
				// Optional
				elemBefore: () => <Icon name="cloud-snow" />
				},
				{
				title: "Add New",
				itemId: "/property/add",
				elemBefore: () => <Icon name="coffee" />
				}
			]
			},

			{
				title: "Property Unit",
				itemId: "/propertyunit",
				elemBefore: () => <Icon name="user" />,
				subNav: [
					{
					title: "propertyunits",
					itemId: "/propertyunit/list",
					// Optional
					elemBefore: () => <Icon name="cloud-snow" />
					},
					{
					title: "Add New",
					itemId: "/propertyunit/add",
					elemBefore: () => <Icon name="coffee" />
					}
				]
			},


			{
				title: "Tenant Settings",
				itemId: "/tenant",
				elemBefore: () => <Icon name="user" />,
				subNav: [
					{
					title: "Tenant List",
					itemId: "/tenant/list",
					// Optional
					elemBefore: () => <Icon name="cloud-snow" />
					},
					{
					title: "Add New",
					itemId: "/tenant/add",
					elemBefore: () => <Icon name="coffee" />
					}
				]
			},

			{
				title: "Lease Settings",
				itemId: "/lease",
				elemBefore: () => <Icon name="user" />,
				subNav: [
					{
					title: "Lease List",
					itemId: "/lease/list",
					// Optional
					elemBefore: () => <Icon name="cloud-snow" />
					},
					{
					title: "Add New",
					itemId: "/lease/add",
					elemBefore: () => <Icon name="coffee" />
					}
				]
			},


			{
			title: "Authentication",
			itemId: "/auth",
			subNav: [
				{
				title: "Login",
				itemId: "/auth/login"
				// Optional
				// elemBefore: () => <Icon name="calendar" />
				}
			]
			}
		]}


		/>




		<div className="absolute bottom-0 w-full my-8">
		<Navigation
			activeItemId={location.pathname}
			items={[
			{
				title: "Settings",
				itemId: "/settings",
				elemBefore: () => <Icon name="activity" />
			}
			]}
			onSelect={({ itemId }) => {
			history.push(itemId);
			}}
		/>
		</div>
	</div>
	</React.Fragment>
);
};
