import { BrowserRouter, Route, Switch } from "react-router-dom";

import AboutPage from "./about";
import HomePage from "./home";
import MembersPage from "./members";
import Netflix from "./netflix";
import ProjectsPage from "./projects";
import SettingsPage from "./settings";
import TeamsPage from "./teams";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/about/members">
          <MembersPage />
        </Route>       
         <Route path="/about/netflix">
          <Netflix />
        </Route>
        <Route path="/about/projects">
          <ProjectsPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/another/teams">
          <TeamsPage />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

    </BrowserRouter>
  );
};

export default Routes;
