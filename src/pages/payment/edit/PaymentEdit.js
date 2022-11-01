import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import TopBar from '../../global/TopBar';
import './PaymentEdit';

const PaymentEdit = () => {


let { id } = useParams();

const [properties, setProperties] = useState('');
const [units, setUnits] = useState('');
const [tenants, setTenants] = useState('');

// Selected Option Dropdown Types

const statusOption = [
	{value: '',      text: '-- Select Payment Status --'},
	{value: 'PENDING',   text: 'PENDING'},
	{value: 'RECORDED',   text: 'RECORDED'},
	{value: 'DEPOSITED',   text: 'DEPOSITED'},
];

const paymentPurpose = [
	{value: '',      text: '-- Select Payment Purpose --'},
	{value: 'Rent',   text: 'Rent'},
	{value: 'Prorated_Rent',   text: 'Prorated Rent'},
	{value: 'Security_Deposit',   text: 'Security Deposit'},
	{value: 'Damage',   text: 'Damage'},
	{value: 'Other',   text: 'Other'},
];


	const [property_id, setPropertyID]         = useState( '' );
	const [unit_id, setUnitID]                 = useState( '' );
	const [tenant_id, setTenantID]             = useState( '' );
	
	const [payment_amount, setPaymentAmount]         = useState( '' );
	const [payment_purpose, setPaymentPurpose] = useState( '' );
	const [payment_date, setPaymentDate]         = useState( '' );
	const [payment_note, setPaymentNote]         = useState( '' );
	const [status, setStatus]             = useState( '' );


	const handleSubmit = async(e) => {
	// store the states in the form data
	e.preventDefault();
	
	try {
	
		updatePayment();
	} catch(error) {
		
		console.log(error);
	}

	}


	useEffect(() => {
		fetchPayment();
		fetchProperties();
		fetchUnits();
		fetchTenants()
	}, []);



	const fetchPayment = async () => {
		const api = 'https://api.americanbestit.com/api/v1/payments/'+id; 
		const token = localStorage.getItem('access_token');
		await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
			console.log(res.data);
			setPropertyID( res.data.property_id );
			setUnitID( res.data.unit_id );
			setTenantID( res.data.tenant_id );

			setPaymentAmount( res.data.payment_amount );
			setPaymentPurpose( res.data.payment_purpose );
			setPaymentDate( res.data.payment_date );
			setPaymentNote( res.data.payment_note );
			setStatus( res.data.status );
		}).catch((error) => {
			
		console.log(error);
	});

	}
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

// Load Unit Lists
const fetchUnits = async () => {
	const api = 'https://api.americanbestit.com/api/v1/propertyunits'; 
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
		
	const updatePayment = () => {

		const api = 'https://api.americanbestit.com/api/v1/payment/update/' + id;
		const token = localStorage.getItem('access_token');
		axios({
			method: 'post',
			url: api,
			data: {
				property_id: property_id,
				unit_id: unit_id,
				tenant_id: tenant_id,
				
				payment_purpose: payment_purpose,
				payment_amount: payment_amount,
				payment_date: payment_date,
				payment_note: payment_note,
				status: status,
			},
			headers: {"Authorization" : `Bearer ${token}`}
			})
		.then(res => {
			console.log(res.data);
			swal("Success", "Payment Updated", "success", {
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



	const propertyIDHandleChange = ( e ) => {
		console.log("Property Id Changed " + e.target.value);
		const propertyID = e.target.value;
		setPropertyID( e.target.value );
		// After Changed PropertyIDHandleChange We Have To Load Associate Property Unit List
		
		fetchUnitsByPropertyID( propertyID );
	}

  return (
    <DashboardLayout>

		<TopBar />
			<div className="padding-top-bottom">
				<div className="container">
					<div className="">
						<h2 className="large-heading mb-5 theme-page-heading">Edit Payment</h2>
						</div>
					<form noValidate onSubmit={handleSubmit}>
						
				<div className="form-oneline">

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
						<label className="form-label">Payment Amount<sup>*</sup></label>
						<input type="number" name="payment_amount" className="form-control" placeholder="Payment Amount, Ex. 500 " value={payment_amount} onChange={e => setPaymentAmount(e.target.value)} />
					</div>

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
	
				</div>
				<div className="form-oneline">

					<div className="form-outline">
						<label className="form-label">Select Property  Unit</label>
						<select  name="unit_id" className="form-control"  value={unit_id} onChange={e => setUnitID(e.target.value)}>
							{ units != '' && units.map(option => (
							<option key={option.id} value={option.id}>
								{option.id} - {option.name}
							</option>
							))}
						</select>
					</div>

					<div className="form-outline">
						<label className="form-label">Payment  Date<sup>*</sup></label>
						<input type="date" name="payment_date" className="form-control" value={payment_date} onChange={e => setPaymentDate(e.target.value)} />
					</div>

					<div className="form-outline">
						<label className="form-label">Payment Purpose <sup>*</sup></label>
						<select  name="payment_purpose" className="form-control"  value={payment_purpose} onChange={e => setPaymentPurpose(e.target.value)} >
							{ paymentPurpose != '' && paymentPurpose.map(option => (
							<option key={option.text} value={option.text}>
								{option.text}
							</option>
							))}
						</select>
					</div>
				</div>

				<div className="form-outline one-line">
						<label className="form-label">Payment Status <sup>*</sup></label>
						<select  name="status" className="form-control"  value={status} onChange={e => setStatus(e.target.value)} >
							{ statusOption != '' && statusOption.map(option => (
							<option key={option.text} value={option.text}>
								{option.text}
							</option>
							))}
						</select>
					</div>

					<div className="form-outline one-line">
							<label className="form-label">Payment  Note</label>
							<textarea name="payment_note"  value={payment_note} onChange={e => setPaymentNote(e.target.value)} className="form-control"></textarea>
					</div>

						<button type="submit" className="form-btn">Update payment</button>
						</form>	
				</div>
			</div>


    </DashboardLayout>
  )
}

export default PaymentEdit;