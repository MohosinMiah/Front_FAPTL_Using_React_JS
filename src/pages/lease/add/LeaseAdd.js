import axios from 'axios';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import TopBar from '../../global/TopBar';
import './LeaseAdd.css';


const LeaseAdd = () => {


	const [properties, setProperties] = useState('');
	const [units, setUnits] = useState('');
	const [tenants, setTenants] = useState('');
	const [selectedOption, setSelectedOption] = useState(null);



	// Selected Option Dropdown Types
	const willPay = [
		{value: '',      text: '-- Will Pay --'},
		{value: 'YES',   text: 'YES'},
		{value: 'NO',   text: 'NO'},
		];

	const isActives = [
		{value: '',      text: '-- Select Is Active --'},
		{value: 'YES',   text: 'YES'},
		{value: 'NO',   text: 'NO'},
		];

	const options = [
		{ value: '17', label: 'Chocolate' },
		{ value: '18', label: 'Strawberry' },
		{ value: '19', label: 'Vanilla' }
		];

useEffect(() => {
	fetchProperties();
	fetchTenants();
}, []);

// Load Property Lists
const fetchProperties = async () => {
	const api = 'https://api.americanbestit.com/api/v1/properties'; 
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
	const api = 'https://api.americanbestit.com/api/v1/tenants'; 
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

const [rent_amount, setRentAmount]         = useState( '' );
const [security_deposit, setSecurityDeposit] = useState( '' );
const [pet_security_deposit, setPetSecurityDeposit]         = useState( '' );
const [lease_start, setLeaseStart]         = useState( '' );
const [lease_end, setLeaseEnd]             = useState( '' );

const [property_name, setPropertyName ] = useState( '' );

const [isActive, setIsActive]                = useState(1);



const handleSubmit = async (e) => {
	// store the states in the form data
	e.preventDefault();

	try {
		addLease();

	} catch (error) {

	}

}


const addLease = () => {

	const api = 'https://api.americanbestit.com/api/v1/leases';
	const token = localStorage.getItem('access_token');
	axios({
		method: 'post',
		url: api,
		data: {
			property_id: property_id,
			unit_id: unit_id,
			tenant_id: tenant_id,
			
			rent_amount: rent_amount,
			
			security_deposit: security_deposit,
			pet_security_deposit: pet_security_deposit,
			
			lease_start: lease_start,
			lease_end: lease_end,
			
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
	const api = 'https://api.americanbestit.com/api/v1/lease/unit_list/property/' + propertyID; 
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

const fetchProperty = async ( id ) => {
		const api = 'https://api.americanbestit.com/api/v1/properties/'+id; 
		const token = localStorage.getItem('access_token');
		await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
		// Set Initial Data In States
		setPropertyName( res.data.name );
		console.log( "Fetch Property " );
		console.log(  res.data.name );
		}).catch((error) => {
		console.log(error);
	});

}
const propertyIDFKHandleChange = ( e ) => {

}
const propertyIDHandleChange = ( e ) => {
	console.log("Property Id Changed " +  e.target.value );
	const propertyID = e.target.value;
	setPropertyID( propertyID );
	fetchProperty( propertyID );
	// After Changed PropertyIDHandleChange We Have To Load Associate Property Unit List
	fetchUnitsByPropertyID( propertyID );
}

	return (
		<DashboardLayout>
		<TopBar />
			<div className="padding-top-bottom" id="property-add">
				<div className="container">
					<h2 className="large-heading mb-5 theme-page-heading">Lease Add</h2>
					<form noValidate onSubmit={handleSubmit}>
				<div className="form-oneline">


				<div className="form-outline">
						<label className="form-label themeLabel">Select Tenant<sup>*</sup></label>
						<select  name="tenant_id" className="form-control"  value={tenant_id} onChange={e => setTenantID(e.target.value)}>
							{ tenants != '' && tenants.map(option => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
							))}
						</select>
					</div>



					<div className="form-outline">
						<label className="form-label themeLabel">Select Property<sup>*</sup></label>
						<select  name="property_id" className="form-control"  value={property_id} onChange={propertyIDHandleChange}>
							{ properties != '' && properties.map(option => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
							))}
						</select>
					</div>
			
				{/* <div className="form-outline">
					<label className="form-label themeLabel">Select Property - { property_name } <sup>*</sup></label>
				
					<input
						name="property_id"
						className="form-control"
						list="datalistOptions"
						id="exampleDataList"
						placeholder="Type to search..."
						value={property_id}
						onChange={propertyIDHandleChange}
					/>
					<datalist id="datalistOptions">
							{ properties != '' && properties.map(option => (
							<option key={option.id}  value={option.id} />
							))}
					</datalist>
				</div> */}

					<div className="form-outline">
						<label className="form-label themeLabel">Select Property  Unit</label>
						<select  name="unit_id" className="form-control"  value={unit_id} onChange={e => setUnitID(e.target.value)}>
							{ units != '' && units.map(option => (
							<option key={option.id} value={option.id}>
								 {option.name}
							</option>
							))}
						</select>
					</div>

					
				</div>
				<div className="form-oneline">
					<div className="form-outline">
						<label className="form-label themeLabel">Rent Amount<sup>*</sup></label>
						<input type="number" name="rent_amount" className="form-control" placeholder="Rent Amount, Ex. 500 " value={rent_amount} onChange={e => setRentAmount(e.target.value)} />
					</div>
					
					<div className="form-outline">
						<label className="form-label themeLabel">Security Deposit<sup>*</sup></label>
						<input type="number" name="security_deposit" className="form-control" placeholder="Security Deposit, Ex. 200 " value={security_deposit} onChange={e => setSecurityDeposit(e.target.value)} />
					</div>

					<div className="form-outline">
						<label className="form-label themeLabel">Pet Security Deposit</label>
						<input type="number" name="pet_security_deposit" className="form-control" placeholder="Pet Security Deposit, Ex. 200 " value={pet_security_deposit} onChange={e => setPetSecurityDeposit(e.target.value)} />
					</div>
				</div>
				<div className="form-oneline">
					<div className="form-outline">
						<label className="form-label themeLabel">Lease Start Date<sup>*</sup></label>
						<input type="date" name="lease_start" className="form-control" value={lease_start} onChange={e => setLeaseStart(e.target.value)} />
					</div>
					
					<div className="form-outline">
						<label className="form-label themeLabel">Lease End Date<sup>*</sup></label>
						<input type="date" name="lease_end" className="form-control" value={lease_end} onChange={e => setLeaseEnd(e.target.value)} />
					</div>


				</div>
						<button type="submit" className="form-btn">Add Lease</button>
					</form>
				</div>
			</div>

		</DashboardLayout>
	)
}

export default LeaseAdd;