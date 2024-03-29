import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import TopBar from '../../global/TopBar';
import './PropertyUnitEdit';

const PropertyEdit = () => {


    const [property,setProperty] = useState([]);

	let { id } = useParams();
	// Selected Option Dropdown Types
	const types = [
		{value: '', text: '--Select Type--'},
		{value: 'Residential', text: 'Residential'},
		{value: 'Business', text: 'Business'},
	  ];

	const unitTypes = [
		{value: '', text: '--Select Unit Type--'},
		{value: 'Normal', text: 'Normal'},
		{value: 'Studio', text: 'Studio'},
		{value: 'Duplex', text: 'Duplex'},
		];

	const isAvailables = [
		{value: '', text: '--Select Is Available--'},
		{value: "YES", text: "YES"},
		{value: "NO", text: "NO"},
		];

	const isFeatureds = [
		{value: '', text: '--Select Is Featured--'},
		{value: "YES", text: "YES"},
		{value: "NO", text: "NO"},
		];
	
	const isActives = [
		{value: '', text: '--Select Is Active--'},
		{value: "YES", text: "YES"},
		{value: "NO", text: "NO"},
		];
	// All Property Unit Variable initialized
	const [ type, setType ] = useState('');
	const [ name, setName ] = useState('');
	const [ floor, setFloor ] = useState('');
	const [ rent, setRent ] = useState('');
	const [ unit_type, setUnitType ] = useState('');
	const [ size, setSize ] = useState('');
	const [ total_room, setTotalRoom ] = useState('');
	const [ bed_room, setBedRoom ] = useState( '' );
	const [ bath_room, setBathRoom ] = useState( '' );
	const [ balcony, setBalcony ] = useState( '' );
	const [ note, setNote ] = useState( '' );
	const [ isAvailable, setIsAvailable ] = useState( '' );
	const [ isFeatured, setIsFeatured ] = useState( '' );
	const [ isActive, setIsActive ] = useState( '' );
	
	  const handleSubmit = async(e) => {
		// store the states in the form data
		e.preventDefault();
		
		try {
		
			updatePropertyUnit();
		} catch(error) {
			
		  console.log(error);
		 
		}

	  }


	  useEffect(() => {
		  fetchPropertyUnit();
		}, []);
		const fetchPropertyUnit = async () => {
		  const api = 'https://api.americanbestit.com/api/v1/propertyunits/'+id; 
		  const token = localStorage.getItem('access_token');
		  await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		  .then(res => {
			setProperty(res.data);
			console.log(res.data);
			// Set Initial Data In States
			setType( res.data.type );
			setName( res.data.name );
			setFloor( res.data.floor );
			setRent( res.data.rent );
			setUnitType( res.data.unit_type );
			setSize( res.data.size );
			setTotalRoom( res.data.total_room );
			setBedRoom( res.data.bed_room );
			setBathRoom( res.data.bath_room );
			setBalcony( res.data.balcony );
			setNote( res.data.note );
			setIsAvailable( res.data.isAvailable );
			setIsFeatured( res.data.isFeatured );
			setIsActive( res.data.isActive );
		 
		  }).catch((error) => {
			console.log(error);
		});
  
	  }

		
		const updatePropertyUnit = () => {
		const api = 'https://api.americanbestit.com/api/v1/propertyunit/update/' + id;
		const token = localStorage.getItem('access_token');
		axios({
			method: 'post',
			url: api,
			data: {
                type: type,
                name: name,
                floor: floor,
                rent: rent,
                unit_type: unit_type,
                size: size,
                total_room: total_room,
                bed_room: bed_room,
				bath_room: bath_room,
				balcony: balcony,
				note: note,
				isAvailable: isAvailable,
				isFeatured: isFeatured,
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


  return (
    <DashboardLayout>
		<TopBar />
			<div className="padding-top-bottom">
				<div className="container">
					<div className="">
						<h1 className="large-heading mb-5 theme-page-heading" > Edit Property Unit : {name}</h1>
					</div>
						<form noValidate onSubmit={handleSubmit}>
				
							{/* <div className="form-outline">
								<label className="form-label themeLabel">Type<sup>*</sup></label>
								<select  name="type" className="form-control"  value={type} onChange={e => setType(e.target.value)}>
									{types.map(option => (
									<option key={option.value} value={option.value}>
										{option.text}
									</option>
									))}
								</select>
							</div> */}
							<div className="form-outline">
								<label className="form-label themeLabel">Unit</label>
								<input type="text" name="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
							</div>
							<div className="form-outline">
									<label className="form-label themeLabel">Rent Amount<sup>*</sup></label>
									<input type="number" name="rent" className="form-control" value={rent} onChange={e => setRent(e.target.value)} />
								</div>
							<div className="form-oneline">
								<div className="form-outline">
									<label className="form-label themeLabel">Floor</label>
									<input type="number" name="floor" className="form-control" value={floor} onChange={e => setFloor(e.target.value)} />
								</div>
			
							</div>
							{/* <div className="form-outline">
								<label className="form-label themeLabel">Unit Type<sup>*</sup></label>
								<select  name="unit_type" className="form-control"  value={unit_type} onChange={e => setUnitType(e.target.value)} required>
									{unitTypes != '' && unitTypes.map(option => (
									<option key={option.value} value={option.value}>
										{option.text}
									</option>
									))}
								</select>

							</div> */}
							
							<div className="form-oneline">
								<div className="form-outline">
									<label className="form-label themeLabel">Size</label>
									<input type="number" name="size" className="form-control" value={size} onChange={e => setSize(e.target.value)} />
								</div>

								<div className="form-outline">
									<label className="form-label themeLabel">Total Room</label>
									<input type="number" name="total_room" className="form-control" value={total_room} onChange={e => setTotalRoom(e.target.value)} />
								</div>
								
							</div>

							<div className="form-oneline">
								<div className="form-outline">
										<label className="form-label themeLabel">Bed Room</label>
										<input type="number" name="bed_room" className="form-control" value={bed_room} onChange={e => setBedRoom(e.target.value)} />
								</div>
								<div className="form-outline">
									<label className="form-label themeLabel">Bath Room</label>
									<input type="number" name="bath_room" className="form-control"  value={bath_room} onChange={e => setBathRoom(e.target.value)} />
								</div>
								<div className="form-outline">
									<label className="form-label themeLabel">balcony</label>
									<input type="number" name="balcony" className="form-control"  value={balcony}  onChange={e => setBalcony(e.target.value)} />
								</div>
							</div>
				

							<div className="form-oneline">
								<div className="form-outline">
									<label className="form-label themeLabel">Is Available</label>
									<select  name="isAvailable" className="form-control"  value={isAvailable} onChange={e => setIsAvailable(e.target.value)}>
										{isAvailables != '' && isAvailables.map(option => (
										<option key={isAvailables.value} value={option.value}>
											{option.text}
										</option>
										))}
									</select>
								</div>

										
							<div className="form-outline form-oneline">
								<label className="form-label themeLabel">Note</label>
								<textarea name="note"  className="form-control"   onChange={e => setNote(e.target.value)} value={note} >  </textarea>
							</div>
							
								{/* <div className="form-outline">
									<label className="form-label themeLabel">Is Featured</label>
									<select  name="isFeatured" className="form-control"  value={isFeatured} onChange={e => setIsFeatured(e.target.value)}>
									{isFeatureds != '' && isFeatureds.map(option => (
										<option key={option.value} value={option.value} >
											{option.text}
										</option>
										))}
									</select>
								</div> */}
								{/* <div className="form-outline">
									<label className="form-label themeLabel">Is Active</label>
									<select  name="isActive" className="form-control"  value={isActive} onChange={e => setIsActive(e.target.value)}>
									{isActives != ''  && isActives.map(option => (
										<option key={option.value} value={option.value}>
											{option.text}
										</option>
										))}
									</select>
								</div> */}
							</div>
							<button type="submit" className="form-btn">Update Property Unit</button>
						</form>
				</div>
			</div>
    </DashboardLayout>
  )
}

export default PropertyEdit;