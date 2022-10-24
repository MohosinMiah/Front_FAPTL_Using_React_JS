import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";

import LeaseAdd from './lease/add/LeaseAdd';
import LeaseEdit from "./lease/edit/LeaseEdit";
import LeaseDelete from "./lease/LeaseDelete";
import LeaseList from './lease/LeaseList';
import MembersPage from "./members";
import Netflix from "./netflix";
import PaymentAdd from "./payment/add/PaymentAdd";
import PaymentEdit from "./payment/edit/PaymentEdit";
import PaymentDelete from "./payment/PaymentDelete";

import PaymentStatusChangeDeposited from "./payment/status/PaymentStatusChangeDeposited";

import Logout from "./Logout";
import PaymentListPending from "./payment/PaymentListPending";
import PaymentListRecorded from "./payment/PaymentListRecorded";
import PaymentListReport from "./payment/PaymentListReport";
import PaymentStatusChangeRecorded from './payment/status/PaymentStatusChangeRecorded';
import PropertyAdd from "./property/add/PropertyAdd";
import PropertyUnitDetail from "./property/detail/PropertyUnitDetail";
import PropertyEdit from "./property/edit/PropertyEdit";
import PropertyDelete from "./property/PropertyDelete";
import PropertyList from "./property/PropertyList";
import PropertyUnitAdd from "./propertyunit/add/PropertyUnitAdd";
import PropertyUnitAddCopy from "./propertyunit/copy/PropertyUnitAddCopy";
import PropertyUnitEdit from "./propertyunit/edit/PropertyUnitEdit";
import PropertyUnitDelete from "./propertyunit/PropertyUnitDelete";
import PropertyUnitList from "./propertyunit/PropertyUnitList";
import SettingsPage from "./settings";
import TenantAdd from './tenant/add/TenantAdd';
import TenantEdit from "./tenant/edit/TenantEdit";
import TenantDelete from "./tenant/TenantDelete";
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
	<Route path="/property/:id/units/">
			<PropertyUnitDetail />
		</Route>
		
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

		<Route path="/propertyunit/:id/copy">
			<PropertyUnitAddCopy />
		</Route>
				
		<Route path="/propertyunit/delete/:id">
			<PropertyUnitDelete />
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
			<TenantDelete />
		</Route>


		<Route path="/tenant/:id">
			<TenantEdit />
		</Route>
		
		{/* Property Tenant End  */}


		{/* Lease  Start   */}

		<Route path="/lease/list">
			<LeaseList />
		</Route>
		<Route path="/lease/add">
			<LeaseAdd />
		</Route>

				
		<Route path="/lease/delete/:id">
			<LeaseDelete />
		</Route>


		<Route path="/lease/:id">
			<LeaseEdit />
		</Route>
		
		{/* Lease End  */}


		{/* Payment  Start   */}

		<Route exact  path="/payment/list">
			<PaymentListReport />
		</Route> 


		<Route exact  path="/payment/report">
			<PaymentListReport />
		</Route> 
		

		<Route exact  path="/payment/add">
			<PaymentAdd />
		</Route>

			
		<Route exact  path="/payment/delete/:id">
			<PaymentDelete />
		</Route>


		<Route exact  path="/payment/:id">
			<PaymentEdit />
		</Route>

		
		<Route exact  path="/payment/status/recorded/:id">
			<PaymentStatusChangeRecorded />
		</Route>

		
		<Route exact  path="/payment/status/deposited/:id">
			<PaymentStatusChangeDeposited />
		</Route>
		
		
		<Route exact  path="/payment/list/pending">
			<PaymentListPending />
		</Route> 

		<Route exact  path="/payment/list/recorded">
			<PaymentListRecorded />
		</Route> 


		{/* Payment End  */}

		<Route path="/auth/login">
		<Login />
		</Route>

		<Route path="/logout">
		<Logout/>
		</Route>

		<Route path="/settings">
			<SettingsPage />
		</Route>
		
		<Route path="/">
			<PaymentListReport />
		</Route>

	</Switch>

	</BrowserRouter>
);
};

export default Routes;
