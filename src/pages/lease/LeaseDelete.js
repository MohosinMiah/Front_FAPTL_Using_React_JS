
import axios from 'axios';
import { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import swal from 'sweetalert';
const LeaseDelete = () => {

	let { id } = useParams();
    useEffect(() => {
        deleteLease();
      }, []);
      const deleteLease = async () => {
        const api = 'https://api.americanbestit.com/api/v1/leases/'+id; 
        const token = localStorage.getItem('access_token');
        await axios.delete(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          console.log(res.data);
          swal("Success", "Lease Deleted", "success", {
			buttons: false,
			timer: 2000,
			})

        }).catch((error) => {
            swal("Failed", "Fail To Delete", "error");
      });

    }

    function handleBackNav()  {
        // history.back();
        window.location.href = "/lease/list";

    }

  return(

        <div>
            { <Redirect to={"/lease/list"} />}
        </div>
  )
}

export default LeaseDelete;