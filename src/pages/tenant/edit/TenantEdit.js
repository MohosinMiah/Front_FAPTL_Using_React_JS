import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import './TenantEdit';

const TenantEdit = () => {


    const [tenant,setTenant] = useState([]);
	let { id } = useParams();

   
	// Selected Option Dropdown Types
	const types = [
		{value: '', text: '--Select Type--'},
		{value: 'Residential', text: 'Residential'},
		{value: 'Business', text: 'Business'},
		];

	const genders = [
		{value: '', text: '--Select Gender--'},
		{value: 'Male', text: 'Male'},
		{value: 'Female', text: 'Female'},
		{value: 'Other', text: 'Other'},
		];


	const marits = [
		{value: '', text: '--Select Marid Status--'},
		{value: 'Marid', text: 'Marid'},
		{value: 'UnMarid', text: 'UnMarid'},
		{value: 'Other', text: 'Other'},
		];
	
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [date_of_birth, setDateOfBirth] = useState('');
	const [id_number, setIdNumber] = useState('');
	const [passport_number, setPassportNumber] = useState('');
	const [phone, setPhone] = useState('');
	const [tenant_number, setTenantNumber] = useState('');
	const [gender, setGender] = useState('');
	const [marit_status, setMaritStaus] = useState('');
	const [email, setEmail] = useState('');

	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [postal_code, setPostalCode] = useState('');

	const [business_name, setBusinessName] = useState('');
	const [registration_number, setRegistrationNumber] = useState('');
	const [business_address, setBusinessAddress] = useState('');

	const [emergency_contact_name, setEmergencyContactName] = useState('');
	const [emergency_contact_phone, setEmergencyContactPhone] = useState('');
	const [emergency_contact_email, setEmergencyContactEmail] = useState('');


	const handleSubmit = async(e) => {
	// store the states in the form data
	e.preventDefault();
	
	try {
	
		updateTenant();
	} catch(error) {
		
		console.log(error);
		
	}

	}


	useEffect(() => {
		fetchTenant();
	}, []);

	const fetchTenant = async () => {
		const api = 'http://127.0.0.1:8000/api/v1/tenants/'+id; 
		const token = localStorage.getItem('access_token');
		await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
		setTenant(res.data);
		console.log(res.data);
		// Set Initial Data In States
		setName( res.data.name );
		setType( res.data.type );
		setDateOfBirth( res.data.date_of_birth );
		setIdNumber( res.data.id_number );
		setPassportNumber( res.data.passport_number );
		setPhone( res.data.phone );
		setTenantNumber( res.data.tenant_number );
		setGender( res.data.gender );

		setMaritStaus( res.data.marit_status );
		setEmail( res.data.email );

		setCity( res.data.city );
		setState( res.data.state );
		setCountry( res.data.country );
		setPostalCode( res.data.postal_code );

		setBusinessName( res.data.business_name );
		setRegistrationNumber( res.data.registration_number );
		setBusinessAddress( res.data.business_address );

		setEmergencyContactName( res.data.emergency_contact_name );
		setEmergencyContactPhone( res.data.emergency_contact_phone );
		setEmergencyContactEmail( res.data.emergency_contact_email );
		
		}).catch((error) => {
		console.log(error);
	});

	}

		
	const updateTenant = () => {

		const api = 'http://127.0.0.1:8000/api/v1/tenant/update/' + id;
		const token = localStorage.getItem('access_token');
		axios({
			method: 'post',
			url: api,
			data: {
				name: name,
				type: type,
				date_of_birth: date_of_birth,
				id_number: id_number,
				passport_number: passport_number,
				phone: phone,
				tenant_number: tenant_number,
				gender: gender,
				marit_status: marit_status,
				email: email,

				city: city,
				state: state,
				country: country,
				postal_code: postal_code,

				business_name: business_name,
				registration_number: registration_number,
				business_address: business_address,

				emergency_contact_name: emergency_contact_name,
				emergency_contact_phone: emergency_contact_phone,
				emergency_contact_email: emergency_contact_email,
			},
			headers: {"Authorization" : `Bearer ${token}`}
			})
		.then(res => {
			console.log(res.data);
			swal("Success", "Tenant Updated successfully", "success", {
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






  return (
    <DashboardLayout>
			<div className="property-edit">
				<div className="container">
					<h2 className="large-heading mb-5">Tenant Edit</h2>
					<form noValidate onSubmit={handleSubmit}>
						<div className="form-outline">
							<label className="form-label">Tenant Name<sup>*</sup></label>
							<input type="text" name="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
						</div>

						<div className="form-outline">
							<label className="form-label">Type<sup>*</sup></label>
							<select  name="type" className="form-control"  value={type} onChange={e => setType(e.target.value)}>
								{types.map(option => (
								<option key={option.value} value={option.value}>
									{option.text}
								</option>
								))}
							</select>
						</div>

						<div className="form-outline">
							<label className="form-label">Date Of Birth<sup>*</sup></label>
							<input type="date" name="date_of_birth" className="form-control" value={date_of_birth} onChange={e => setDateOfBirth(e.target.value)} />
						</div>
						
						<div className="form-outline">
							<label className="form-label">ID Number<sup>*</sup></label>
							<input type="text" name="id_number" className="form-control" value={id_number} onChange={e => setIdNumber(e.target.value)} />
						</div>
						
						
						<div className="form-outline">
							<label className="form-label">passport_number</label>
							<input type="text" name="passport_number" className="form-control"  value={passport_number}  onChange={e => setPassportNumber(e.target.value)} />
						</div>
						
						<div className="form-outline">
							<label className="form-label">Phone<sup>*</sup></label>
							<input type="text" name="phone" className="form-control"  value={phone}   onChange={e => setPhone(e.target.value)} />
						</div>

												
						<div className="form-outline">
							<label className="form-label">Tenant Number<sup>*</sup></label>
							<input type="number" name="tenant_number" className="form-control"  value={tenant_number}  onChange={e => setTenantNumber(e.target.value)} />
						</div>

						<div className="form-outline">
							<label className="form-label">Gender<sup>*</sup></label>
							<select  name="type" className="form-control"  value={gender} onChange={e => setGender(e.target.value)}>
								{genders.map(option => (
								<option key={option.value} value={option.value}>
									{option.text}
								</option>
								))}
							</select>
						</div>

						<div className="form-outline">
							<label className="form-label">Marid Status</label>
							<select  name="type" className="form-control"  value={marit_status} onChange={e => setMaritStaus(e.target.value)}>
								{marits.map(option => (
								<option key={option.value} value={option.value}>
									{option.text}
								</option>
								))}
							</select>
						</div>

						<div className="form-outline">
							<label className="form-label">Email</label>
							<input type="email" name="email" className="form-control"  value={email}  onChange={e => setEmail(e.target.value)} />
						</div>



						<div className="form-outline">
							<label className="form-label">City</label>
							<input type="text" name="city" className="form-control"  value={city}   onChange={e => setCity(e.target.value)} />
						</div>
						
						<div className="form-outline">
							<label className="form-label">State</label>
							<input type="text" name="state" className="form-control"  value={state}  onChange={e => setState(e.target.value)} />
						</div>
						
						<div className="form-outline">
							<label className="form-label">Country</label>
							<input type="text" name="country" className="form-control" value={country}   onChange={e => setCountry(e.target.value)} />
						</div>	

						<div className="form-outline">
							<label className="form-label">Postal Code</label>
							<input type="text" name="postal_code" className="form-control"  value={postal_code}  onChange={e => setPostalCode(e.target.value)} />
						</div>

						


						<div className="form-outline">
							<label className="form-label">Business Name</label>
							<input type="text" name="business_name" className="form-control"  value={business_name} onChange={e => setBusinessName(e.target.value)} />
						</div>
						
						<div className="form-outline">
							<label className="form-label">Registration Number</label>
							<input type="text" name="registration_number" className="form-control"  value={registration_number}  onChange={e => setRegistrationNumber(e.target.value)} />
						</div>	

						<div className="form-outline">
							<label className="form-label">Business Address</label>
							<input type="text" name="business_address" className="form-control"  value={business_address} onChange={e => setBusinessAddress(e.target.value)} />
						</div>




						<div className="form-outline">
							<label className="form-label">Emergency Contact Name</label>
							<input type="text" name="emergency_contact_name" className="form-control"   value={emergency_contact_name}  onChange={e => setEmergencyContactName(e.target.value)} />
						</div>
						
						<div className="form-outline">
							<label className="form-label">Emergency Contact Phone</label>
							<input type="text" name="emergency_contact_phone" className="form-control"   value={emergency_contact_phone}  onChange={e => setEmergencyContactPhone(e.target.value)} />
						</div>	

						<div className="form-outline">
							<label className="form-label">Emergency Contact Email</label>
							<input type="text" name="emergency_contact_email" className="form-control"   value={emergency_contact_email}  onChange={e => setEmergencyContactEmail(e.target.value)} />
						</div>




						<button type="submit" className="form-btn btn btn-primary btn-block">Update Tenant</button>
					</form>
				</div>
			</div>

    </DashboardLayout>
  )
}

export default TenantEdit;