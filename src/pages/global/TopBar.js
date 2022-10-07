import axios from 'axios';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
// import './TopBar.css';
import "../../components/TopBar.css";

const TopBar = () => {
    return (
        <div className="TopBar">
            <div className="container">
            <div className="toptitle">Affordable Off-Campus Student Housing in Houston, TX</div>
            </div>
        </div>
    )
}

export default TopBar;