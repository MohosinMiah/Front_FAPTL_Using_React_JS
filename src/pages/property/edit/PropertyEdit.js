import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { DashboardLayout } from "../../../components/Layout";
import './PropertyEdit';

const PropertyEdit = () => {


    const [property,setProperty] = useState([]);
	let { id } = useParams();

    const [formValue, setformValue] = useState({
        name: '',
        code: '',
        type: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        note: '',
        rent_amount: '',
        size: '',
        link: '',
        has_parking: '',
        has_security_gard: '',
        isActive: '',
      });

	  const handleSubmit = async(e) => {
		// store the states in the form data
		e.preventDefault();
		const loginFormData = new FormData();
		loginFormData.append("name", formValue.name)
		loginFormData.append("code", formValue.code)
		loginFormData.append("rent_amount", formValue.rent_amount)
		loginFormData.append("size", formValue.size)
		
		const token = localStorage.getItem('access_token');
		let errors = null;
		try {
		  // make axios post request
		  const response = await axios({
			method: 'GET',
			url: 'https://faptl.americanbestit.com/api/v1/properties'+id,
			data: loginFormData,
			headers: { 'Content-Type': 'multipart/form-data' , 'Authorization' : `Bearer ${token}` },
		  });
		 console.log( response );
			swal("Success", "Property Added Successfully", "success", {
				buttons: false,
				timer: 20454500,
				});

		} catch(error) {
			
			swal("Failed", "Please Enter Required Field Data, Code name would be Unique", "error");
		  console.log(error);
		 
		}
	  }
    
      const handleChange = (event) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
      }


	  useEffect(() => {
		  fetchProperty();
		}, []);
		const fetchProperty = () => {
		  const api = 'https://faptl.americanbestit.com/api/v1/properties/'+id; 
		  const token = localStorage.getItem('access_token');
		  axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
		  .then(res => {
			setProperty(res.data);
			console.log(res.data);
		 
		  }).catch((error) => {
			console.log(error);
		});
  
	  }


  return (
    <DashboardLayout>
      <h2>Property ID = {id}</h2>
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
					value={property.name}
					onChange={handleChange}
				/>

				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="code"
					name="code"
					label="code"
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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