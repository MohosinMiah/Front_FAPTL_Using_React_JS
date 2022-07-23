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
	  

	const [name, setName] = useState('');
	const [code, setCode] = useState('');
	const [type, setType] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [note, setNote] = useState('');
	const [rent_amount, setRentAmount] = useState('');
	const [size, setSize] = useState('');
	const [link, setLink] = useState('');
	const [has_parking, setHasParking] = useState(0);
	const [has_security_gard, setSecurityGard] = useState(0);
	const [isActive, setActive] = useState(1);



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
				name: name,
				code: code,
				type: type,
				address: address,
				city: city,
				state: state,
				zip: zip,
				note: note,
				rent_amount: rent_amount,
				size: size,
				link: link,
				has_parking: has_parking,
				has_security_gard: has_security_gard,
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
						<select  name="type" className="form-control"  value={type} onChange={e => setType(e.target.value)}>
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