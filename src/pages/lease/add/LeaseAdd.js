import axios from 'axios';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import './LeaseAdd.css';
const LeaseAdd = () => {


const [properties, setProperties] = useState('');



	// Selected Option Dropdown Types
	const types = [
		{value: '', text: '--Select Type--'},
		{value: 'Residential', text: 'Residential'},
		{value: 'Business', text: 'Business'},
	  ];


	useEffect(() => {
		fetchProperties();
	}, []);

	const fetchProperties = async () => {
		const api = 'http://127.0.0.1:8000/api/v1/properties'; 
		const token = localStorage.getItem('access_token');
		await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
console.log(res.data);
			setProperties( res.data );	

		}).catch((error) => {

		console.log(error);
	});

	}
	  

	const [property_id, setPropertyID]         = useState( '' );
	const [unit_id, setUnitID]                 = useState( '' );
	const [lease_type, setLeaseType]           = useState( '' );
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

		const api = 'http://localhost:3000/api/v1/properties';
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




	return (
		<DashboardLayout>

			<div className="Lease-add">
				<div className="container">
					<h2 className="large-heading mb-5">Lease Add</h2>
					<form noValidate onSubmit={handleSubmit}>
						
					<div className="form-outline">
						<label className="form-label">Type<sup>*</sup></label>
						<select  name="property_id" className="form-control"  value={property_id} onChange={e => setPropertyID(e.target.value)}>
							{ properties != '' && properties.map(option => (
							<option key={option.id} value={option.name}>
								{option.name}
							</option>
							))}
						</select>
					</div>

						
						<button type="submit" className="form-btn btn btn-primary btn-block">Add Lease</button>
					</form>
				</div>
			</div>

		</DashboardLayout>
	)
}

export default LeaseAdd;