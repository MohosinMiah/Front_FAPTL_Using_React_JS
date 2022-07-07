import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import './PropertyUnitAdd';
const PropertyAdd =  () => {


	const [ name, setName ] = useState('');
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
	const [ has_security_gard, setSecurityGard ] = useState( 0 );
	const [ isActive, setActive ] = useState( 1 );



	  const handleSubmit = async(e) => {
		// store the states in the form data
		e.preventDefault();

		try {
			 addProperty();

		} catch(error) {
			
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
            headers: {"Authorization" : `Bearer ${token}`}
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
      <h2>Property Unit  Add</h2>
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
					label="Property Name"
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

export default PropertyAdd;