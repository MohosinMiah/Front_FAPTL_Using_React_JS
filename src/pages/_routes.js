import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";

import HomePage from "./home";
import MembersPage from "./members";
import Netflix from "./netflix";
import PropertyList from "./property/PropertyList";
import SettingsPage from "./settings";
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
		<Route path="/property/list">
			<PropertyList />
		</Route>
		<Route path="/property">
			<PropertyList />
		</Route>

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
