
import axios from 'axios';
import { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import swal from 'sweetalert';
const TenantDelete = () => {

	let { id } = useParams();
  
    useEffect(() => {
        deleteTenant();
      }, []);

      const deleteTenant = async () => {
        const api = 'http://127.0.0.1:8000/api/v1/tenants/'+id; 
        const token = localStorage.getItem('access_token');
        await axios.delete(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          console.log(res.data);
          swal("Success", "Tenant Deleted", "success", {
			buttons: false,
			timer: 2000,
			})

        }).catch((error) => {
            swal("Failed", "Fail To Delete", "error");
      });

    }

    function handleBackNav()  {
        // history.back();
        window.location.href = "/tenant/list";

    }

  return(

        <div>
            { <Redirect to={"/tenant/list"} />}
        </div>
  )
}

export default TenantDelete;