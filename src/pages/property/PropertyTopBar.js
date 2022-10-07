import { Link, useParams } from "react-router-dom";

const PropertyTopBar = () => {
	let { id } = useParams();

return (
<div className="Property-TopBar">

	<div className="container">
		<div id="top-nav" className="d-flex justify-content-start">
			<Link to={"/propertyunit/" + id + "/add"} className="theme-btn"> Add Unit
			</Link>
			<Link to="/propertyunit/list" className="theme-btn">All Units
			</Link>
			<Link to={"/property/list"} className="theme-btn"> Property List</Link>
		</div>
	</div>
</div>
)
}

export default PropertyTopBar;