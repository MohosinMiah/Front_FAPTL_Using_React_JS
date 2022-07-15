import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";

import HomePage from "./home";
import MembersPage from "./members";
import Netflix from "./netflix";
import PropertyAdd from "./property/add/PropertyAdd";
import PropertyEdit from "./property/edit/PropertyEdit";
import PropertyDelete from "./property/PropertyDelete";
import PropertyList from "./property/PropertyList";
import PropertyUnitAdd from "./propertyunit/add/PropertyUnitAdd";
import PropertyUnitEdit from "./propertyunit/edit/PropertyUnitEdit";
import PropertyUnitList from "./propertyunit/PropertyUnitList";
import SettingsPage from "./settings";
import TenantAdd from './tenant/add/TenantAdd';
import TenantList from "./tenant/TenantList";
const Routes = () => {
return (
	<BrowserRouter>
	<Switch>
		<Route path="/about/members">
			<MembersPage />
		</Route>       
		<Route path="/about/netflix">
		<Netflix />
		</Route>

		{/* Property  Start  */}
		{/* <Route path="/property">
			<PropertyList />
		</Route> */}

		<Route path="/property/list">
			<PropertyList />
		</Route>

		<Route path="/property/add">
			<PropertyAdd />
		</Route>
		
				
		<Route path="/property/delete/:id">
			<PropertyDelete />
		</Route>

		<Route path="/property/:id">
			<PropertyEdit />
		</Route>

				{/* Property  End  */}


		{/* Property Unit Start  */}

		<Route path="/propertyunit/list">
			<PropertyUnitList />
		</Route>
		<Route path="/propertyunit/:id/add">
			<PropertyUnitAdd />
		</Route>

				
		<Route path="/propertyunit/delete/:id">
			<PropertyDelete />
		</Route>

		<Route path="/propertyunit/:id">
			<PropertyUnitEdit />
		</Route>
		{/* Property Unit End  */}


		{/* Property Tenant  Start   */}

		<Route path="/tenant/list">
			<TenantList />
		</Route>
		<Route path="/tenant/add">
			<TenantAdd />
		</Route>

				
		<Route path="/tenant/delete/:id">
			<PropertyDelete />
		</Route>


		<Route path="/tenant/:id">
			<PropertyUnitEdit />
		</Route>
		
		{/* Property Tenant End  */}



		<Route path="/auth/login">
		<Login />
		</Route>

		<Route path="/settings">
		<SettingsPage />
		</Route>

		<Route path="/logout">
		</Route>
		
		<Route path="/">
		<HomePage />
		</Route>
	</Switch>

	</BrowserRouter>
);
};

export default Routes;
