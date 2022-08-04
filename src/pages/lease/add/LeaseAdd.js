import axios from 'axios';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import './LeaseAdd.css';
const LeaseAdd = () => {


	const [properties, setProperties] = useState('');
	const [units, setUnits] = useState('');
	const [tenants, setTenants] = useState('');
	


	// Selected Option Dropdown Types
	const willPay = [
		{value: '',      text: '--Will Pay--'},
		{value: 'YES',   text: 'YES'},
		{value: 'NO',   text: 'NO'},
		];


useEffect(() => {
	fetchProperties();
	fetchTenants();
}, []);

// Load Property Lists
const fetchProperties = async () => {
	const api = 'https://faptl.americanbestit.com/api/v1/properties'; 
	const token = localStorage.getItem('access_token');
	await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
	.then(res => {
		console.log("Property List");
		console.log(res.data);
		let modifyPropertyList = [{id: '', name: '--Select Property--'}, ...res.data];
		setProperties( modifyPropertyList );	

	}).catch((error) => {

	console.log(error);
});

}
	
// Load Tenant Lists
const fetchTenants = async () => {
	const api = 'https://faptl.americanbestit.com/api/v1/tenants'; 
	const token = localStorage.getItem('access_token');
	await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
	.then(res => {
		console.log("Tenant List");
		console.log(res.data);
		let modifyTenantList = [{id: '', name: '--Select Tenant--'}, ...res.data];
		setTenants( modifyTenantList );	

	}).catch((error) => {

	console.log(error);
});

}


const [property_id, setPropertyID]         = useState( '' );
const [unit_id, setUnitID]                 = useState( '' );
const [tenant_id, setTenantID]             = useState( '' );
const [will_pay, setWillPay]               = useState( '' );
const [total_will_pay, setTotalWillPay]    = useState( '' );
const [rent_amount, setRentAmount]         = useState( '' );
const [lease_start, setLeaseStart]         = useState( '' );
const [lease_end, setLeaseEnd]             = useState( '' );
const [deposit_amount, setDepositAmount]   = useState('');
const [late_fee_amount, setLateFeeAmount]  = useState('');
const [isActive, setActive]                = useState(1);



const handleSubmit = async (e) => {
	// store the states in the form data
	e.preventDefault();

	try {
		addLease();

	} catch (error) {

	}

}


const addLease = () => {

	const api = 'https://faptl.americanbestit.com/api/v1/leases';
	const token = localStorage.getItem('access_token');
	axios({
		method: 'post',
		url: api,
		data: {
			property_id: property_id,
			unit_id: unit_id,
			tenant_id: tenant_id,
			will_pay: will_pay,
			rent_amount: rent_amount,
			total_will_pay: total_will_pay,
			lease_start: lease_start,
			lease_end: lease_end,
			deposit_amount: deposit_amount,
			late_fee_amount: late_fee_amount,
			isActive: isActive,
		},
		headers: { "Authorization": `Bearer ${token}` }
	})
		.then(res => {
			console.log(res.data);
			swal("Success", "New Lease Updated", "success", {
				buttons: false,
				timer: 2000,
			})
		}).catch((error) => {

			swal("Failed", "Please Enter Required Field Data.", "error");

			console.log(error.response.data.errors);

			console.log(error.response.status);
			console.log(error.response.headers);
		});
}

// Load Property Unit List Based On Property ID
const fetchUnitsByPropertyID = async ( propertyID ) => {
	const api = 'https://faptl.americanbestit.com/api/v1/lease/unit_list/property/' + propertyID; 
	const token = localStorage.getItem('access_token');
	await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
	.then(res => {
		console.log("Unit List");
		console.log(res.data);
		let modifyPropertyUnitList = [{id: '', name: '--Select Type--'}, ...res.data];
		setUnits( modifyPropertyUnitList );	

	}).catch((error) => {
		setUnits( [ {id: '', name: '--Select Unit--'} ] );	

	// console.log(error);
});

}



const propertyIDHandleChange = ( e ) => {
	console.log("Property Id Changed " + e.target.value);
	const propertyID = e.target.value;
	setPropertyID( e.target.value );
	// After Changed PropertyIDHandleChange We Have To Load Associate Property Unit List
	
	fetchUnitsByPropertyID( propertyID );
}

	return (
		<DashboardLayout>

			<div className="padding-top-bottom">
				<div className="container">
					<h2 className="large-heading mb-5">Lease Add</h2>
					<form noValidate onSubmit={handleSubmit}>
						
					<div className="form-outline">
						<label className="form-label">Select Property<sup>*</sup></label>
						<select  name="property_id" className="form-control"  value={property_id} onChange={propertyIDHandleChange}>
							{ properties != '' && properties.map(option => (
							<option key={option.id} value={option.id}>
								{option.id} - {option.name}
							</option>
							))}
						</select>
					</div>

					<div className="form-outline">
						<label className="form-label">Select Property  Unit<sup>*</sup></label>
						<select  name="unit_id" className="form-control"  value={unit_id} onChange={e => setUnitID(e.target.value)}>
							{ units != '' && units.map(option => (
							<option key={option.id} value={option.id}>
								{option.id} - {option.name}
							</option>
							))}
						</select>
					</div>

					<div className="form-outline">
						<label className="form-label">Select Tenant<sup>*</sup></label>
						<select  name="tenant_id" className="form-control"  value={tenant_id} onChange={e => setTenantID(e.target.value)}>
							{ tenants != '' && tenants.map(option => (
							<option key={option.id} value={option.id}>
								{option.id} - {option.name}
							</option>
							))}
						</select>
					</div>

					<div className="form-outline">
						<label className="form-label">Rent Amount<sup>*</sup></label>
						<input type="number" name="rent_amount" className="form-control" placeholder="Rent Amount, Ex. 500 " value={rent_amount} onChange={e => setRentAmount(e.target.value)} />
					</div>
					
					
					<div className="form-outline">
						<label className="form-label">Select Will Pay <sup>*</sup></label>
						<select  name="will_pay" className="form-control"  value={will_pay} onChange={e => setWillPay(e.target.value)}>
							{ willPay != '' && willPay.map(option => (
							<option key={option.id} value={option.text}>
								{option.text}
							</option>
							))}
						</select>
					</div>


					<div className="form-outline">
						<label className="form-label">Total Will Pay<sup>*</sup></label>
						<input type="number" name="total_will_pay" className="form-control" placeholder="Rent Amount, Ex. 500 " value={total_will_pay} onChange={e => setTotalWillPay(e.target.value)} />
					</div>


					<div className="form-outline">
						<label className="form-label">Lease Start Date<sup>*</sup></label>
						<input type="date" name="lease_start" className="form-control" value={lease_start} onChange={e => setLeaseStart(e.target.value)} />
					</div>
					
					<div className="form-outline">
						<label className="form-label">Lease End Date<sup>*</sup></label>
						<input type="date" name="lease_end" className="form-control" value={lease_end} onChange={e => setLeaseEnd(e.target.value)} />
					</div>

					{/* <div className="form-outline">
						<label className="form-label">Deposit Amount<sup>*</sup></label>
						<input type="number" name="deposit_amount" placeholder="Deposit Amount, Ex. 500 " className="form-control" value={deposit_amount} onChange={e => setDepositAmount(e.target.value)} required  />
					</div> */}
					

						<button type="submit" className="form-btn btn btn-primary btn-block">Add Lease</button>
					</form>
				</div>
			</div>

		</DashboardLayout>
	)
}

export default LeaseAdd;