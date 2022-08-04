import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import PropertyTopBar from '../PropertyTopBar';
import './PropertyEdit';

const PropertyEdit = () => {


    const [property,setProperty] = useState([]);
	let { id } = useParams();
	
	const propertyTypes =  [
		{value: '', text: '-- Select Property Type --'},
		{value: 'Residential',   text: 'Residential'},
		{value: 'Business',   text: 'Business'},
		];
		
   
	const [ name, setName ] = useState( '' );
	const [ code, setCode ] = useState('');
	const [ type, setType ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ city, setCity ] = useState('');
	const [ state, setState ] = useState('');
	const [ zip, setZip ] = useState('');
	const [ note, setNote ] = useState('');
	const [ rent_amount, setRentAmount ] = useState('');
	const [ size, setSize ] = useState('');
	const [ link, setLink ] = useState('');
	const [ has_parking, setHasParking ] = useState( 0 );
	const [ has_security_gard, setHasSecurityGard ] = useState( 0 );
	const [ isActive, setActive ] = useState( 1 );
	

	const [ file_name, setFileName ] = useState([]);

	const handleSubmit = async(e) => {
	// store the states in the form data
	e.preventDefault();
	
	try {
	
		updateProperty();
	} catch(error) {
		
		console.log(error);
		
	}

	}


	useEffect(() => {
		fetchProperty();
	}, []);

	const fetchProperty = async () => {
		const api = 'http://127.0.0.1:8000/api/v1/properties/'+id; 
		const token = localStorage.getItem('access_token');
		await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
		setProperty(res.data);
		console.log(res.data);
		// Set Initial Data In States
		setName( res.data.name );
		setCode( res.data.code );
		setType( res.data.type );
		setAddress( res.data.address );
		setCity( res.data.city );
		setState( res.data.state );
		setZip( res.data.zip );
		setNote( res.data.note );
		setRentAmount( res.data.rent_amount );
		setSize( res.data.size );
		setLink( res.data.link );
		setHasParking( res.data.has_parking );
		setHasSecurityGard( res.data.has_security_gard );
		setActive( res.data.active );
		
		}).catch((error) => {
		console.log(error);
	});

	}

		
	const updateProperty = () => {

		const api = 'http://127.0.0.1:8000/api/v1/property/update/' + id;
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
			headers: {"Authorization" : `Bearer ${token}`}
			})
		.then(res => {
			console.log(res.data);
			swal("Success", "New Property Added", "success", {
			buttons: false,
			timer: 2000,
			})
		}).catch((error) => {

				swal("Failed", "Please Enter Required Field Data, Code name would be Unique", "error");

			console.log(error.response.data.errors);

			console.log(error.response.status);
			console.log(error.response.headers);
		});
	}

	const handleUploadSubmit = async (e) => {
			// store the states in the form data
		e.preventDefault();

		try {

			updatePropertyImage();

		} catch( error ) {

		  console.log(error);

		}

	}


	
	const updatePropertyImage = () => {

        const api = 'http://127.0.0.1:8000/api/v1/propertyimages';
        const token = localStorage.getItem('access_token');
		console.log("file_name" + file_name );
        axios({
            method: 'post',
            url: api,
            data: {
                file_name: file_name,
				property_id: id,
            },
            headers: {"Authorization" : `Bearer ${token}`}
          })
        .then(res => {
          console.log(res.data);
		  swal("Success", "New Property Image Added", "success", {
			buttons: false,
			timer: 2000,
			})
        }).catch((error) => {

			swal("Failed", "Fail To Upload", "error");

			console.log(error.response.data.errors);

			console.log(error.response.status);
			console.log(error.response.headers);
      });
    }


  return (
    <DashboardLayout>

			<PropertyTopBar/>
			<div className="property-add">
				<div className="container">
					<h2 className="large-heading mb-5">Property Add</h2>
					<form noValidate onSubmit={handleSubmit}>
						<div className="form-outline">
							<label className="form-label">Property Name<sup>*</sup></label>
							<input type="text" name="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Code<sup>*</sup></label>
							<input type="text" name="code" className="form-control"  value={code}  onChange={e => setCode(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Type <sup>*</sup></label>
							<select  name="type" className="form-control" value={type} onChange={e => setType(e.target.value)}>
								{ propertyTypes != '' && propertyTypes.map(option => (
								<option key={option.id} value={option.text}>
									{option.text}
								</option>
								))}
							</select>
						</div>
						<div className="form-outline">
							<label className="form-label">Address</label>
							<input type="text" name="address" className="form-control"  value={address}  onChange={e => setAddress(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">City<sup>*</sup></label>
							<input type="text" name="city" className="form-control"  value={city}  onChange={e => setCity(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">State<sup>*</sup></label>
							<input type="text" name="state" className="form-control"  value={state}  onChange={e => setState(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Zip<sup>*</sup></label>
							<input type="number" name="zip" className="form-control"  value={zip}  onChange={e => setZip(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Note<sup>*</sup></label>
							<input type="text" name="note" className="form-control"  value={zip}  onChange={e => setNote(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Rent Amount<sup>*</sup></label>
							<input type="number" name="rent_amount" className="form-control"  value={rent_amount}  onChange={e => setRentAmount(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Size<sup>*</sup></label>
							<input type="number" name="size" className="form-control"  value={size} onChange={e => setSize(e.target.value)} />
						</div>
						<div className="form-outline">
							<label className="form-label">Link<sup>*</sup></label>
							<input type="text" name="link" className="form-control"  value={link}  onChange={e => setLink(e.target.value)} />
						</div>
						<button type="submit" className="form-btn btn btn-primary btn-block">Update Property</button>
					</form>
				</div>
			</div>

    </DashboardLayout>
  )
}

export default PropertyEdit;