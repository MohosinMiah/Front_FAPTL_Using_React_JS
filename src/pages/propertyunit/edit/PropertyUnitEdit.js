import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import './PropertyUnitEdit';

const PropertyEdit = () => {


    const [property,setProperty] = useState([]);
	let { id } = useParams();

   
	const [ name, setName ] = useState( '');
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
		
			updatePropertyUnit();
		} catch(error) {
			
		  console.log(error);
		 
		}

	  }


	  useEffect(() => {
		  fetchPropertyUnit();
		}, []);
		const fetchPropertyUnit = async () => {
		  const api = 'https://faptl.americanbestit.com/api/v1/propertyunits/'+id; 
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

		
		const updatePropertyUnit = () => {

		const api = 'https://faptl.americanbestit.com/api/v1/property/update/' + id;
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


  return (
    <DashboardLayout>
      <h2>Property ID = {id}</h2>
	  { console.log("Name "+ name)}

	  <form
			noValidate
			onSubmit={handleSubmit}
			>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="name"
					name="name"
					type="text"
					label="Name"
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="code"
					name="code"
					label="code"
					value={code}
					onChange={e => setCode(e.target.value)}
				/>


				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="type"
					name="type"
					label="type"
					type="text"
					value={type}
					onChange={e => setType(e.target.value)}
				/>

				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="address"
					name="address"
					label="address"
					type="text"
					value={address}
					onChange={e => setAddress(e.target.value)}
				/>


				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="city"
					name="city"
					label="city"
					type="text"
					value={city}
					onChange={e => setCity(e.target.value)}
				/>


				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="state"
					name="state"
					label="state"
					type="text"
					value={state}
					onChange={e => setState(e.target.value)}
				/>

				 <TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="zip"
					name="zip"
					label="zip"
					type="text"
					value={zip}
					onChange={e => setZip(e.target.value)}
				/>


				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="note"
					name="note"
					label="note"
					type="text"
					value={note}
					onChange={e => setNote(e.target.value)}
				/>


				
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="rent_amount"
					name="rent_amount"
					label="rent_amount"
					type="number"
					value={rent_amount}
					onChange={e => setRentAmount(e.target.value)}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="size"
					name="size"
					label="size"
					type="number"
					value={size}
					onChange={e => setSize(e.target.value)}
				/>


				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="link"
					name="link"
					label="link"
					type="text"
					value={link}
					onChange={e => setLink(e.target.value)}
				/> 


				<Button
					type="submit"
					
					variant="contained"
					color="primary"
					>
					Add Property
				</Button>
            </form>

    </DashboardLayout>
  )
}

export default PropertyEdit;