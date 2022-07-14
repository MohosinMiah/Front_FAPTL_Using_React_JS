import { Link, useParams } from "react-router-dom";

const PropertyTopBar = () => {
	let { id } = useParams();

return (
<div className="TopBar">

	<div className="container">
		<div id="top-nav" className="d-flex justify-content-between">
			<Link to={"/propertyunit/" + id + "/add"}> Add Unit
			</Link>
			<Link to="/propertyunit/list"> Unit Lists
			</Link>
		</div>
	</div>
</div>
)
}

export default PropertyTopBar;