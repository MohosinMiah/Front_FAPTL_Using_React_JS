import axios from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import TopBar from '../../global/TopBar';
import './PropertyAdd.css';
const PropertyAdd = () => {

const isActives = [
	{value: '',      text: '-- Select Is Active --'},
	{value: 'YES',   text: 'YES'},
	{value: 'NO',   text: 'NO'},
	];
	
const propertyTypes =  [
	{value: '', text: '-- Select Property Type --'},
	{value: 'Single_Unit',   text: 'Single Unit'},
	{value: 'Multi_Unit',   text: 'Multi Unit'},
	];
	
	const [name, setName] = useState('');
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

		const api = 'http://127.0.0.1:8000/api/v1/properties';
		const token = localStorage.getItem('access_token');
		axios({
			method: 'post',
			url: api,
			data: {
				name: name,
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

				if( error.response.data.message == "Unauthenticated." )
				{
					localStorage.removeItem('access_token' );
					window.location.href = "/auth/login";
				}else{
					console.log("Not Match");
				}

			});

	}

	return (
		<DashboardLayout>
			<TopBar />
			<div className="padding-top-bottom" id="property-add">
				<div className="container">
					<h2 className="large-heading mb-5 theme-page-heading">Property Add</h2>
					<br />
					<form noValidate onSubmit={handleSubmit}>
					<div className="form-oneline">
						<div className="form-outline">
							<label className="form-label themeLabel">Property Name<sup>*</sup></label>
							<input type="text" name="name" className="form-control" onChange={e => setName(e.target.value)} />
						</div>

						<div className="form-outline">
							<label className="form-label themeLabel">Type <sup>*</sup></label>
							<select  name="type" className="form-control"  onChange={e => setType(e.target.value)}>
								{ propertyTypes != '' && propertyTypes.map(option => (
								<option key={option.id} value={option.text}>
									{option.text}
								</option>
								))}
							</select>
						</div>

						<div className="form-outline">
							<label className="form-label themeLabel">Size<sup>*</sup></label>
							<input type="number" name="size" className="form-control" onChange={e => setSize(e.target.value)} />
						</div>
					</div>
						<div className="form-outline address">
							<label className="form-label themeLabel">Address</label>
							<input type="text" name="address" className="form-control" onChange={e => setAddress(e.target.value)} />
						</div>
						<div className="form-oneline">
							<div className="form-outline">
								<label className="form-label themeLabel">City<sup>*</sup></label>
								<input type="text" name="city" className="form-control" onChange={e => setCity(e.target.value)} />
							</div>
							<div className="form-outline">
								<label className="form-label themeLabel">State<sup>*</sup></label>
								<input type="text" name="state" className="form-control" onChange={e => setState(e.target.value)} />
							</div>
							<div className="form-outline">
								<label className="form-label themeLabel">Zip<sup>*</sup></label>
								<input type="number" name="zip" className="form-control" onChange={e => setZip(e.target.value)} />
							</div>
						</div>
						
						<div className="form-outline one-line">
							<label className="form-label themeLabel">Note</label>
							<textarea name="note"  value={note} onChange={e => setNote(e.target.value)} className="form-control"></textarea>
						</div>

						{/* <div className="form-outline">
							<label className="form-label themeLabel">Link</label>
							<input type="text" name="link" className="form-control" onChange={e => setLink(e.target.value)} />
						</div> */}
						<button type="submit" className="form-btn">Add Property</button>
					</form>
				</div>
			</div>

		</DashboardLayout>
	)
}

export default PropertyAdd;