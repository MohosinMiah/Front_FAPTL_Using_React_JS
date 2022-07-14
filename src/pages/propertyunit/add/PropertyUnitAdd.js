import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import PropertyTopBar from '../../property/PropertyTopBar';
import './PropertyUnitAdd';

const PropertyAdd =  () => {
	let { id } = useParams();


	const [ property_id, setPropertyID ] = useState( id );
	const [ type, setType ] = useState('');
	const [ name, setName ] = useState('');
	const [ floor, setFloor ] = useState('');
	const [ rent, setRent ] = useState('');
	const [ unit_type, setUnitType ] = useState('');
	const [ zip, setZip ] = useState('');
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
			addPropertyUnit();

		} catch(error) {
			
		}
	
	  }
    

      const addPropertyUnit = () => {

        const api = 'https://faptl.americanbestit.com/api/v1/propertyunits'; 
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
        }).catch((error) => {

				swal("Failed", "Please Enter Required Field Data.", "error");

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
				<h2 className="large-heading mb-5">Add Property Unit Under Property ID =   {property_id} </h2>
				<form noValidate onSubmit={handleSubmit}>
					<div className="form-outline">
						<label className="form-label">Property ID <sup>*</sup></label>
						<input type="text" name="property_id" className="form-control" value={property_id}  readonly />
					</div>
					<div className="form-outline">
						<label className="form-label">Type<sup>*</sup></label>
						<input type="text" name="type" className="form-control" onChange={e => setType(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Name</label>
						<input type="text" name="name" className="form-control" onChange={e => setName(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Floor<sup>*</sup></label>
						<input type="text" name="floor" className="form-control" onChange={e => setFloor(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Rent Amount<sup>*</sup></label>
						<input type="number" name="rent" className="form-control" onChange={e => setRent(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Unit Type<sup>*</sup></label>
						<input type="text" name="unit_type" className="form-control" onChange={e => setUnitType(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Size<sup>*</sup></label>
						<input type="number" name="size" className="form-control" onChange={e => setSize(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Total Room<sup>*</sup></label>
						<input type="number" name="total_room" className="form-control" onChange={e => setTotalRoom(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Bed Room<sup>*</sup></label>
						<input type="number" name="bed_room" className="form-control" onChange={e => setBedRoom(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Bath Room<sup>*</sup></label>
						<input type="number" name="bath_room" className="form-control" onChange={e => setBathRoom(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">balcony<sup>*</sup></label>
						<input type="number" name="balcony" className="form-control" onChange={e => setBalcony(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Note</label>
						<input type="text" name="note" className="form-control" onChange={e => setNote(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Is Available</label>
						<input type="text" name="isAvailable" className="form-control" onChange={e => setIsAvailable(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Is Featured</label>
						<input type="text" name="isFeatured" className="form-control" onChange={e => setIsFeatured(e.target.value)} />
					</div>
					<div className="form-outline">
						<label className="form-label">Is Active</label>
						<select class="form-control"name="isActive" className="form-control" onChange={e => setIsActive(e.target.value)} >
							<option value="1">Yes</option>
							<option value="0">No</option>
						</select>
					</div>
					
					<button type="submit" className="form-btn btn btn-primary btn-block">Add Property</button>
				</form>
			</div>
		</div>
    </DashboardLayout>
  )
}

export default PropertyAdd;