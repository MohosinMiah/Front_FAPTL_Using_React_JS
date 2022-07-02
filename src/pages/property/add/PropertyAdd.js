import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import { DashboardLayout } from "../../../components/Layout";
const PropertyAdd = () => {



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

      const handleSubmit = (event) => {
        // we will fill this in the coming paragraph
      }
    
      const handleChange = (event) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
      }


      const addProduct = () => {

        const api = 'https://faptl.americanbestit.com/api/v1/properties'; 
        const token = localStorage.getItem('access_token');
        axios({
            method: 'post',
            url: api,
            data: {
                name: 'Fred',
                code: '444',
                type: 'residentila',
                address: 'residentila',
                city: 'residentila',
                state: 'residentila',
                zip: 123,
                note: 'residentila',
                rent_amount: 2565,
                size: 111,
            },
            headers: {"Authorization" : `Bearer ${token}`}
          })
        .then(res => {
          console.log(res.data);
       
        }).catch((error) => {
          console.log(error);
      });

    }

  return (
    <DashboardLayout>
      <h2>Property Add</h2>
      <form
        noValidate onSubmit={handleSubmit}>
						<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						name="name"
                        type="text"
						label="Property Name"
                        value={formValue.name}
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
						type="password"
						value={formValue.code}
                        onChange={handleChange}
						/>
						<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						>
						Sign In
						</Button>
            </form>

 
    </DashboardLayout>
  )
}

export default PropertyAdd;