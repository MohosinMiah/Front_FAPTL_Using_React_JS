import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import TopBar from '../../global/TopBar';
import './PropertyUnitAdd';

const PropertyAdd =  () => {
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
	const [ property_id, setPropertyID ] = useState( id );
	const [ type, setType ] = useState(types[0].value);
	const [ name, setName ] = useState('');
	const [ floor, setFloor ] = useState('');
	const [ rent, setRent ] = useState('');
	const [ unit_type, setUnitType ] = useState(unitTypes[0].value);
	const [ size, setSize ] = useState('');
	const [ total_room, setTotalRoom ] = useState('');
	const [ bed_room, setBedRoom ] = useState( '' );
	const [ bath_room, setBathRoom ] = useState( '' );
	const [ balcony, setBalcony ] = useState( '' );
	const [ note, setNote ] = useState( '' );
	const [ isAvailable, setIsAvailable ] = useState( 'YES' );
	const [ isFeatured, setIsFeatured ] = useState( '' );
	const [ isActive, setIsActive ] = useState( 'YES' );



	// store the states in the form data
	  const handleSubmit = async(e) => {
		e.preventDefault();
		try {
			addPropertyUnit();

		} catch(error) {
			
		}
	
	  }
    
	// Handle Submotted data
      const addPropertyUnit = () => {

        const api = 'http://127.0.0.1:8000/api/v1/propertyunits'; 
        const token = localStorage.getItem('access_token');
        axios({
            method: 'post',
            url: api,
            data: {
                property_id: property_id,
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
		  swal("Success", "New Property Unit Added", "success", {
			buttons: false,
			timer: 2000,
			})
			window.location.href = "/property/"+ property_id + "/units";

        }).catch((error) => {

				swal("Failed", "Please Enter Required Field Data.", "error");

			console.log(error.response.data.errors);

			console.log(error.response.status);
			console.log(error.response.headers);
      });

    }

  return (
    <DashboardLayout>
		<TopBar />
		<div className="padding-top-bottom" id="lease-add">
				<div className="container">
				<h2 className="large-heading mb-5">Add Property Unit Under Property ID =   {property_id} </h2>
				<form noValidate onSubmit={handleSubmit}>
					<div className="form-outline">
						<label className="form-label">Property ID <sup>*</sup></label>
						<input type="text" name="property_id" className="form-control" value={property_id}  readOnly />
					</div>
					{/* <div className="form-outline">
						<label className="form-label">Type<sup>*</sup></label>
						<select  name="type" className="form-control"  value={type} onChange={e => setType(e.target.value)}>
							{types.map(option => (
							<option key={option.value} value={option.value}>
								{option.text}
							</option>
							))}
						</select>
					</div> */}
					<div className="form-outline">
						<label className="form-label">Name<sup>*</sup></label>
						<input type="text" name="name" className="form-control" onChange={e => setName(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Floor<sup>*</sup></label>
						<input type="number" name="floor" className="form-control" onChange={e => setFloor(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Rent Amount<sup>*</sup></label>
						<input type="number" name="rent" className="form-control" onChange={e => setRent(e.target.value)} />
					</div>
					{/* <div className="form-outline">
						<label className="form-label">Unit Type<sup>*</sup></label>
						<select  name="unit_type" className="form-control"   value={unit_type} onChange={e => setUnitType(e.target.value)} required>
							{unitTypes.map(option => (
							<option key={option.value} value={option.value}>
								{option.text}
							</option>
							))}
						</select>

					</div> */}
					<div className="form-outline">
						<label className="form-label">Size<sup>*</sup></label>
						<input type="number" name="size" className="form-control" onChange={e => setSize(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Total Room<sup>*</sup></label>
						<input type="number" name="total_room" className="form-control" onChange={e => setTotalRoom(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Bed Room</label>
						<input type="number" name="bed_room" className="form-control" onChange={e => setBedRoom(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Bath Room</label>
						<input type="number" name="bath_room" className="form-control" onChange={e => setBathRoom(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">balcony</label>
						<input type="number" name="balcony" className="form-control" onChange={e => setBalcony(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Note</label>
						<textarea name="note" className="form-control" onChange={e => setNote(e.target.value)} ></textarea>
					</div>
					<div className="form-outline">
						<label className="form-label">Is Available</label>
						<select  name="isAvailable" className="form-control"  value={isAvailable} onChange={e => setIsAvailable(e.target.value)}>
							{isAvailables.map(option => (
							<option key={isAvailables.value} value={option.value}>
								{option.text}
							</option>
							))}
						</select>
					</div>
					{/* <div className="form-outline">
						<label className="form-label">Is Featured</label>
						<select  name="isFeatured" className="form-control"  value={isFeatured} onChange={e => setIsFeatured(e.target.value)}>
							{isFeatureds.map(option => (
							<option key={option.value} value={option.value}>
								{option.text}
							</option>
							))}
						</select>
					</div> */}
					<div className="form-outline">
						<label className="form-label">Is Active</label>
						<select  name="isActive" className="form-control"  value={isActive} onChange={e => setIsActive(e.target.value)}>
							{isActives.map(option => (
							<option key={option.value} value={option.value}>
								{option.text}
							</option>
							))}
						</select>
					</div>
					
					<button type="submit" className="form-btn">Add Property Unit</button>
				</form>
			</div>
		</div>
    </DashboardLayout>
  )
}

export default PropertyAdd;