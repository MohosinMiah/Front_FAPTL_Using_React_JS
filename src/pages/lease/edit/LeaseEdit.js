import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import './LeaseEdit';

const LeaseEdit = () => {


	let { id } = useParams();

	const [properties, setProperties] = useState('');
	const [units, setUnits] = useState('');
	const [tenants, setTenants] = useState('');

	// Selected Option Dropdown Types
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
	

const [property_id, setPropertyID]         = useState( '' );
const [unit_id, setUnitID]                 = useState( '' );
const [tenant_id, setTenantID]             = useState( '' );

const [rent_amount, setRentAmount]         = useState( '' );

const [security_deposit, setSecurityDeposit] = useState( '' );
const [pet_security_deposit, setPetSecurityDeposit]         = useState( '' );


const [invoice_starting_date, setInvoiceStartingDate] = useState( '' );
const [invoice_amount, setInvoiceAmount] = useState( '' );
const [prorated_amount, setProratedAmount] = useState( '' );
const [prorated_starting_date, setProratedStartingDate] = useState( '' );



const [lease_start, setLeaseStart]         = useState( '' );
const [lease_end, setLeaseEnd]             = useState( '' );

const [isActive, setIsActive]                = useState(1);



	const handleSubmit = async(e) => {
	// store the states in the form data
	e.preventDefault();
	
	try {
	
		updateLease();
	} catch(error) {
		
		console.log(error);
	}

	}


	useEffect(() => {
		fetchLease();
		fetchProperties();
		fetchUnits();
		fetchTenants()
	}, []);



	const fetchLease = async () => {
		const api = 'http://127.0.0.1:8000/api/v1/leases/'+id; 
		const token = localStorage.getItem('access_token');
		await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
			console.log(res.data);
			setPropertyID( res.data.property_id );
			setUnitID( res.data.unit_id );
			setTenantID( res.data.tenant_id );
			setRentAmount( res.data.rent_amount );

			setSecurityDeposit( res.data.security_deposit );
			setPetSecurityDeposit( res.data.pet_security_deposit );


			setInvoiceStartingDate( res.data.invoice_starting_date );
			setInvoiceAmount( res.data.invoice_amount );
			setProratedAmount( res.data.prorated_amount );
			setProratedStartingDate( res.data.prorated_starting_date );


			setLeaseStart( res.data.lease_start );
			setLeaseEnd( res.data.lease_end );

			setIsActive( res.data.isActive );
		
		}).catch((error) => {
			
		console.log(error);
	});

	}
// Load Property Lists
const fetchProperties = async () => {
	const api = 'http://127.0.0.1:8000/api/v1/properties'; 
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

// Load Unit Lists
const fetchUnits = async () => {
	const api = 'http://127.0.0.1:8000/api/v1/propertyunits'; 
	const token = localStorage.getItem('access_token');
	await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
	.then(res => {
		console.log("Unit List");
		console.log(res.data);
		let modifyPropertyList = [{id: '', name: '--Select Property Unit --'}, ...res.data];
		setUnits( modifyPropertyList );	

	}).catch((error) => {

	console.log(error);
});

}

// Load Tenant Lists
const fetchTenants = async () => {
	const api = 'http://127.0.0.1:8000/api/v1/tenants'; 
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
		
	const updateLease = () => {

		const api = 'http://127.0.0.1:8000/api/v1/lease/update/' + id;
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




				invoice_starting_date: invoice_starting_date,
				invoice_amount: invoice_amount,
				prorated_amount: prorated_amount,
				prorated_starting_date: prorated_starting_date,



				lease_start: lease_start,
				lease_end: lease_end,
			
				isActive: isActive,
			},
			headers: {"Authorization" : `Bearer ${token}`}
			})
		.then(res => {
			console.log(res.data);
			swal("Success", "Lease Updated", "success", {
			buttons: false,
			timer: 2000,
			})
		}).catch((error) => {

				swal("Failed", "Please Enter Required Field Data", "error");

			console.log(error.response.data.errors);

			console.log(error.response.status);
			console.log(error.response.headers);
		});
	}

	const handleUploadSubmit = async (e) => {
			// store the states in the form data
		e.preventDefault();

	}


	// Load Property Unit List Based On Property ID
	const fetchUnitsByPropertyID = async ( propertyID ) => {
		const api = 'http://127.0.0.1:8000/api/v1/lease/unit_list/property/' + propertyID; 
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

			<div className="padding-top-bottom" id="property-add">
				<div className="container">
					<h2 className="large-heading mb-5 theme-page-heading">Edit Lease</h2>
					<form noValidate onSubmit={handleSubmit}>
						
					<div className="form-oneline">
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

						<div className="form-outline">
							<label className="form-label themeLabel">Select Property  Unit<sup>*</sup></label>
							<select  name="unit_id" className="form-control"  value={unit_id} onChange={e => setUnitID(e.target.value)}>
								{ units != '' && units.map(option => (
								<option key={option.id} value={option.id}>
									{option.name}
								</option>
								))}
							</select>
						</div>

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


					<hr style={{borderTopWidth: "5px"}}/> 
					<div className="form-oneline">

						<div className="form-outline">
							<label className="form-label themeLabel">Invoice Start Date<sup>*</sup></label>
							<input type="date" name="invoice_starting_date" className="form-control" value={invoice_starting_date} onChange={e => setInvoiceStartingDate(e.target.value)} />
						</div>

						<div className="form-outline">
							<label className="form-label themeLabel">Invoice Amount<sup>*</sup></label>
							<input type="number" name="invoice_amount" className="form-control" placeholder="Invoice Amount, Ex. 500 " value={invoice_amount} onChange={e => setInvoiceAmount(e.target.value)} />
						</div>



						<div className="form-outline">
							<label className="form-label themeLabel">Prorated Rent<sup>*</sup></label>
							<input type="number" name="prorated_amount" className="form-control" placeholder="Prorated Amount, Ex. 500 " value={prorated_amount} onChange={e => setProratedAmount(e.target.value)} />
						</div>

						<div className="form-outline">
							<label className="form-label themeLabel">Prorated Start Date<sup>*</sup></label>
							<input type="date" name="prorated_starting_date" className="form-control" value={prorated_starting_date} onChange={e => setProratedStartingDate(e.target.value)} />
						</div>
					</div>
					<hr style={{borderTopWidth: "5px"}}/> 


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
						<button type="submit" className="form-btn">Update Lease</button>
					</form>
				</div>
			</div>


    </DashboardLayout>
  )
}

export default LeaseEdit;