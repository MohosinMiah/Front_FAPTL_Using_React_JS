import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import TopBar from '../../global/TopBar';
import './PropertyEdit';

const PropertyEdit = () => {


    const [property,setProperty] = useState([]);
	let { id } = useParams();
	
	const propertyTypes =  [
		{value: '', text: '-- Select Property Type --'},
		{value: 'Single_Unit',   text: 'Single Unit'},
		{value: 'Multi_Unit',   text: 'Multi Unit'},
		];
		
   
	const [ name, setName ] = useState( '' );
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
			if( error.response.data.message == "Unauthenticated." )
			{
				localStorage.removeItem('access_token' );
				window.location.href = "/auth/login";
			}else{
				console.log("Not Match");
			}
			console.log(error.response.data.errors);

			console.log(error.response.status);
			console.log(error.response.headers);
      });
    }


  return (
    <DashboardLayout>
			<TopBar />
			{
				property.type == "Multi Unit" &&
				<Link to={"/propertyunit/"+ id + "/add/"}  className="theme-btn "> Add New Unit</Link>
			}
				<Link to={"/propertyunit/list"} className="theme-btn" > All Units</Link>
			
				<Link to={"/property/list"} className="theme-btn "> Property List</Link>
					
			<div className="padding-top-bottom">
				<div className="container">
				<div className="">
					<h2 className="large-heading mb-5 theme-page-heading">Edit Property : {name} </h2>
					</div>
					<form noValidate onSubmit={handleSubmit}>
						<div className="form-oneline">
							<div className="form-outline">
								<label className="form-label themeLabel">Property Name<sup>*</sup></label>
								<input type="text" name="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
							</div>
						
							<div className="form-outline">
								<label className="form-label themeLabel">Type <sup>*</sup></label>
								<select  name="type" className="form-control" value={type} onChange={e => setType(e.target.value)}>
									{ propertyTypes != '' && propertyTypes.map(option => (
									<option key={option.id} value={option.text}>
										{option.text}
									</option>
									))}
								</select>
							</div>

							<div className="form-outline">
								<label className="form-label themeLabel">Size<sup>*</sup></label>
								<input type="number" name="size" className="form-control"  value={size} onChange={e => setSize(e.target.value)} />
							</div>
						</div>
						
						<div className="form-outline address">
							<label className="form-label themeLabel">Address</label>
							<input type="text" name="address" className="form-control"  value={address}  onChange={e => setAddress(e.target.value)} />
						</div>
						<div className="form-oneline">
							<div className="form-outline">
								<label className="form-label themeLabel">City<sup>*</sup></label>
								<input type="text" name="city" className="form-control"  value={city}  onChange={e => setCity(e.target.value)} />
							</div>
							<div className="form-outline">
								<label className="form-label themeLabel">State<sup>*</sup></label>
								<input type="text" name="state" className="form-control"  value={state}  onChange={e => setState(e.target.value)} />
							</div>
							<div className="form-outline">
								<label className="form-label themeLabel">Zip<sup>*</sup></label>
								<input type="number" name="zip" className="form-control"  value={zip}  onChange={e => setZip(e.target.value)} />
							</div>
						</div>

							<div className="form-outline one-line">
								<label className="form-label themeLabel">Note<sup>*</sup></label>
								<textarea name="note"  value={note} onChange={e => setNote(e.target.value)} class="form-control">{note}</textarea>
							</div>
			
						{/* <div className="form-outline">
							<label className="form-label themeLabel">Link<sup>*</sup></label>
							<input type="text" name="link" className="form-control"  value={link}  onChange={e => setLink(e.target.value)} />
						</div> */}
						<button type="submit" className="form-btn">Update Property</button>
					</form>
				</div>
			</div>

    </DashboardLayout>
  )
}

export default PropertyEdit;