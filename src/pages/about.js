
import { Link, Route, Switch } from "react-router-dom";


import Child from './child';
const AboutPage = () => {

  return (
    <div>
      <h2>About Page </h2>
      
      <ul>
          <li>
            <Link to="/about/netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/modus-create">Modus Create</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/:id" children={<Child />} />
        </Switch>
    </div>
  )
}

export default AboutPage;