import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import './PropertyAdd.css';
const PropertyAdd = () => {


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
			addProperty();

		} catch (error) {

		}

	}


	const addProperty = () => {

		const api = 'https://faptl.americanbestit.com/api/v1/properties';
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
				swal("Success", "New Property Updated", "success", {
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

			<div className="property-add">
				<div className="container">
					<h2 className="large-heading mb-5">Property Add</h2>
					<form noValidate onSubmit={handleSubmit}>
						<div className="form-outline">
							<label className="form-label">Property Name<sup>*</sup></label>
							<input type="text" name="name" className="form-control" onChange={e => setName(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Code<sup>*</sup></label>
							<input type="text" name="code" className="form-control" onChange={e => setCode(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Type<sup>*</sup></label>
							<input type="text" name="type" className="form-control" onChange={e => setType(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Address</label>
							<input type="text" name="address" className="form-control" onChange={e => setAddress(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">City<sup>*</sup></label>
							<input type="text" name="city" className="form-control" onChange={e => setCity(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">State<sup>*</sup></label>
							<input type="text" name="state" className="form-control" onChange={e => setState(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Zip<sup>*</sup></label>
							<input type="number" name="zip" className="form-control" onChange={e => setZip(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Note<sup>*</sup></label>
							<input type="text" name="note" className="form-control" onChange={e => setNote(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Rent Amount<sup>*</sup></label>
							<input type="number" name="rent_amount" className="form-control" onChange={e => setRentAmount(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Size<sup>*</sup></label>
							<input type="number" name="size" className="form-control" onChange={e => setSize(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Link<sup>*</sup></label>
							<input type="text" name="link" className="form-control" onChange={e => setLink(e.target.value)} />
						</div>
						<button type="submit" className="form-btn btn btn-primary btn-block">Add Property</button>
					</form>
				</div>
			</div>

		</DashboardLayout>
	)
}

export default PropertyAdd;