import { Link } from "react-router-dom";

const PropertyTopBar = () => {

return (
<div className="TopBar">
	<div className="container">
		<div id="top-nav" className="d-flex justify-content-between">
			<Link to="/propertyunit/add"> Add Unit
			</Link>
			<Link to="/propertyunit/list"> Unit Lists
			</Link>
		</div>
	</div>
</div>
)
}

export default PropertyTopBar;