
import axios from 'axios';
import { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import swal from 'sweetalert';
const PropertyDelete = () => {

	let { id } = useParams();
    useEffect(() => {
        deleteProperty();
      }, []);
      const deleteProperty = async () => {
        const api = 'https://faptl.americanbestit.com/api/v1/properties/'+id; 
        const token = localStorage.getItem('access_token');
        await axios.delete(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          console.log(res.data);
          swal("Success", "Property Deleted", "success", {
			buttons: false,
			timer: 2000,
			})

        }).catch((error) => {
            swal("Failed", "Fail To Delete", "error");
      });

    }

    function handleBackNav()  {
        // history.back();
        window.location.href = "/property/list";

    }

  return(

        <div>
            { <Redirect to={"/property/list"} />}
        </div>
  )
}

export default PropertyDelete;