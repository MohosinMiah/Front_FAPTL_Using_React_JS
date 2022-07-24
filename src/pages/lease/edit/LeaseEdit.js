import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import PropertyTopBar from '../PropertyTopBar';
import './LeaseEdit';

const LeaseEdit = () => {


	let { id } = useParams();

	const [properties, setProperties] = useState('');
	const [units, setUnits] = useState('');

	// Selected Option Dropdown Types
	const leaseTypes = [
		{value: '',      text: '--Select Lease Type--'},
		{value: 'One',   text: 'One'},
		{value: 'Two',   text: 'Two'},
		{value: 'Three', text: 'Three'},
		];
		
	const [property_id, setPropertyID]         = useState( '' );
	const [unit_id, setUnitID]                 = useState( '' );
	const [lease_type, setLeaseType]           = useState( '' );
	const [rent_amount, setRentAmount]         = useState( '' );
	const [lease_start, setLeaseStart]         = useState( '' );
	const [lease_end, setLeaseEnd]             = useState( '' );
	const [deposit_amount, setDepositAmount]   = useState('');
	const [late_fee_amount, setLateFeeAmount]  = useState('');
	const [isActive, setActive]                = useState(1);


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
	}, []);



	const fetchLease = async () => {
		const api = 'http://127.0.0.1:8000/api/v1/leases/'+id; 
		const token = localStorage.getItem('access_token');
		await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
			console.log(res.data);
			setPropertyID( res.data.property_id );
			setUnitID( res.data.unit_id );
			setLeaseType( res.data.lease_type );
			setRentAmount( res.data.rent_amount );
			setLeaseStart( res.data.lease_start );
			setLeaseEnd( res.data.lease_end );
			setDepositAmount( res.data.deposit_amount );
			setLateFeeAmount( res.data.late_fee_amount );
			setActive( res.data.active );
		
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

		
	const updateLease = () => {

		const api = 'http://127.0.0.1:8000/api/v1/lease/update/' + id;
		const token = localStorage.getItem('access_token');
		axios({
			method: 'post',
			url: api,
			data: {
			property_id: property_id,
			unit_id: unit_id,
			lease_type: lease_type,
			rent_amount: rent_amount,
			lease_start: lease_start,
			lease_end: lease_end,
			deposit_amount: deposit_amount,
			late_fee_amount: late_fee_amount,
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

			<PropertyTopBar/>
			<div className="property-add">
				<div className="container">
					<h2 className="large-heading mb-5">Lease Edit</h2>
					<form noValidate onSubmit={handleSubmit}>
						
						<div className="form-outline">
							<label className="form-label">Select Property<sup>*</sup></label>
							{console.log( property_id)}
							<select  name="property_id" className="form-control"  value={property_id}   onChange={propertyIDHandleChange}>
								{ properties != '' && properties.map(option => (
								<option key={option.id} value={option.id}>
									{option.name}
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
							<label className="form-label">Select Lease Type<sup>*</sup></label>
							<select  name="lease_type" className="form-control"  value={lease_type} onChange={e => setLeaseType(e.target.value)}>
								{ leaseTypes != '' && leaseTypes.map(option => (
								<option key={option.id} value={option.text}>
									{option.text}
								</option>
								))}
							</select>
						</div>
	
							
						<div className="form-outline">
							<label className="form-label">Rent Amount<sup>*</sup></label>
							<input type="number" name="rent_amount" className="form-control" placeholder="Rent Amount, Ex. 500 " value={rent_amount} onChange={e => setRentAmount(e.target.value)} />
						</div>
						
	
						<div className="form-outline">
							<label className="form-label">Lease Start Date<sup>*</sup></label>
							<input type="date" name="lease_start" className="form-control" value={lease_start} onChange={e => setLeaseStart(e.target.value)} />
						</div>
						
						<div className="form-outline">
							<label className="form-label">Lease End Date<sup>*</sup></label>
							<input type="date" name="lease_end" className="form-control" value={lease_end} onChange={e => setLeaseEnd(e.target.value)} />
						</div>
	
						<div className="form-outline">
							<label className="form-label">Deposit Amount<sup>*</sup></label>
							<input type="number" name="deposit_amount" placeholder="Deposit Amount, Ex. 500 " className="form-control" value={deposit_amount} onChange={e => setDepositAmount(e.target.value)} required  />
						</div>
						
	
							<button type="submit" className="form-btn btn btn-primary btn-block">Update Lease</button>
						</form>
				</div>
			</div>

    </DashboardLayout>
  )
}

export default LeaseEdit;