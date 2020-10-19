import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Registered from './pages/Registered';
import Delete from './pages/Delete';
import Page404 from './pages/Page404';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />

                <Route path="/success" component={Registered} />
                <Route path="/delete/:id" component={Delete} />

                <Route path="/login" component={Login} />
                <Route path="/user/:id" component={Dashboard} />

                <Route component={Page404} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;