
import axios from 'axios';
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import swal from 'sweetalert';
const Logout = () => {

	let { id } = useParams();

    useEffect(() => {
        logout();
      }, []);
      const logout = async () => {
        const api = 'https://api.americanbestit.com/api/v1/logout'; 
        const token = localStorage.getItem('access_token');
        await axios.post(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          localStorage.removeItem('access_token' );
          console.log(res.data);
          swal("Success", "Logout", "success", {
			buttons: false,
			timer: 2000,
			})

        }).catch((error) => {
            swal("Failed", "Fail To Logout", "error");
      });

    }

    function handleBackNav()  {
        // history.back();
        window.location.href = "/auth/login";

    }

  return(

        <div>
            { window.location.href = "/auth/login" }
        </div>
  )
}

export default Logout;