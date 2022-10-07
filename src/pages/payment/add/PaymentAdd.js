import axios from 'axios';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import TopBar from '../../global/TopBar';
import './PaymentAdd.css';
const PaymentAdd = () => {


	const [properties, setProperties] = useState('');
	const [units, setUnits] = useState('');
	const [tenants, setTenants] = useState('');
	


	// Selected Option Dropdown Types

	const statusOption = [
		{value: '',      text: '-- Select Payment Status --'},
		{value: 'PENDING',   text: 'PENDING'},
		{value: 'COMPLETE',   text: 'COMPLETE'},
		];

	const paymentPurpose = [
		{value: '',      text: '-- Select Payment Status --'},
		{value: 'Rent',   text: 'Rent'},
		{value: 'Damage',   text: 'Damage'},
		{value: 'Others',   text: 'Others'},
		];

		
useEffect(() => {
	fetchProperties();
	fetchTenants();
}, []);

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


const [property_id, setPropertyID]         = useState( '' );
const [unit_id, setUnitID]                 = useState( '' );
const [tenant_id, setTenantID]             = useState( '' );

const [payment_amount, setPaymentAmount]         = useState( '' );
const [payment_purpose, setPaymentPurpose] = useState( '' );
const [payment_date, setPaymentDate]         = useState( '' );
const [payment_note, setPaymentNote]         = useState( '' );
const [status, setStatus]             = useState( '' );



const handleSubmit = async (e) => {
	// store the states in the form data
	e.preventDefault();

	try {
		addPayment();

	} catch (error) {

	}

}


const addPayment = () => {

	const api = 'http://127.0.0.1:8000/api/v1/payments';
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
		headers: { "Authorization": `Bearer ${token}` }
	})
		.then(res => {
			console.log(res.data);
			swal("Success", "New payment Updated", "success", {
				buttons: false,
				timer: 2000,
			})
		}).catch((error) => {

			swal("Failed", "PPayment Enter Required Field Data.", "error");

			console.log(error.response.data.errors);

			console.log(error.response.status);
			console.log(error.response.headers);
		});
}

// Load Property Unit List Based On Property ID
const fetchUnitsByPropertyID = async ( propertyID ) => {
	const api = 'http://127.0.0.1:8000/api/v1/payment/unit_list/property/' + propertyID; 
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
			<div className="padding-top-bottom" id="property-add">
				<div className="container">
					<h2 className="large-heading mb-5 theme-page-heading">Payment Add</h2>
					<form noValidate onSubmit={handleSubmit}>
				<div className="form-oneline" >
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
				</div>
				<div className="form-oneline" >
					<div className="form-outline">
						<label className="form-label">Payment Amount<sup>*</sup></label>
						<input type="number" name="payment_amount" className="form-control" placeholder="Payment Amount, Ex. 500 " value={payment_amount} onChange={e => setPaymentAmount(e.target.value)} />
					</div>
					
					
					<div className="form-outline">
						<label className="form-label">Payment  Date<sup>*</sup></label>
						<input type="date" name="payment_date" className="form-control" value={payment_date} onChange={e => setPaymentDate(e.target.value)} />
					</div>
				</div>
				<div className="form-oneline" >
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


					<div className="form-outline">
						<label className="form-label">Status <sup>*</sup></label>
						<select  name="isActive" className="form-control"  value={status} onChange={e => setStatus(e.target.value)} >
							{ statusOption != '' && statusOption.map(option => (
							<option key={option.text} value={option.text}>
								{option.text}
							</option>
							))}
						</select>
					</div>

				</div>


				<div className="form-outline one-line">
						<label className="form-label">Payment  Note</label>
						<textarea name="payment_note"  value={payment_note} onChange={e => setPaymentNote(e.target.value)} class="form-control"></textarea>
					</div>

					<button type="submit" className="form-btn">Add payment</button>
					</form>
				</div>
			</div>

		</DashboardLayout>
	)
}

export default PaymentAdd;