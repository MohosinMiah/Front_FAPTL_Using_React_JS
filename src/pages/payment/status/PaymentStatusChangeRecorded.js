
import axios from 'axios';
import { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import swal from 'sweetalert';
const PaymentStatusChangeRecorded = () => {

	let { id } = useParams();

    useEffect(() => { 
        updateRecordedStatus();
      }, []);
      const updateRecordedStatus = async () => {
        const api = 'http://127.0.0.1:8000/api/v1/payment/change/recorded/'+id; 
        const token = localStorage.getItem('access_token');
        await axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          console.log(res.data);
          swal("Success", "Payment Recorded", "success", {
			buttons: false,
			timer: 2000,
			})

        }).catch((error) => {
            swal("Failed", "Fail To Recored", "error");
      });

    }

    function handleBackNav()  {
        // history.back();
        window.location.href = "/payment/list/pending";
    }

  return(

        <div>
            { <Redirect to={"/payment/list/pending"} />}
        </div>
  )
}

export default PaymentStatusChangeRecorded;