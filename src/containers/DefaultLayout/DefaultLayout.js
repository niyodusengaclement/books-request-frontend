import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import sidebar from '../Sidebar/PastorSidebar';
import AdminSide from '../Sidebar/AdminSidebar';
// routes config
import routes from '../../routes';
import AuthService from '../../services/AuthToken';
import { connect } from 'react-redux';
import { findPastorChurches, findDistricts, checkTimetable } from '../../utils/Others';
import ErrorPage from '../../views/Pages/ErrorPage';
import { userInfo } from '../../utils/Account';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  componentDidMount() {
    this.props.getTimetable();
    const token = AuthService.isLoggedIn();
    if(token === false) {
      return this.props.history.push('/login');
    }
    const { role } = userInfo();
    if(role === 'pastor') {
      return this.props.getChurches();
    }
    return this.props.getDistricts();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  hasError = () => <ErrorPage error={this.props.error} />

  signOut(e) {
    e.preventDefault();
    localStorage.removeItem('access_token');
    this.props.history.push('/login');
  }

  render() {
    const { role } = userInfo();
    const { churches, districts, fields } = this.props;
    const kids = churches.length > 0 ? churches.map(({ church_name, church_id }) => {
      return {
        name: church_name[0].toUpperCase() + church_name.slice(1),
        url: `/create-request?churchId=${church_id}&churchName=${church_name[0].toUpperCase() + church_name.slice(1)}`,
        icon: "icon-star",
        children: [
          {
          name: 'Requests report ' ,
          url: `/get-requests?churchId=${church_id}&churchName=${church_name[0].toUpperCase() + church_name.slice(1)}`,
          },
          {
          name: 'Create a Request' ,
          url: `/create-request?churchId=${church_id}&churchName=${church_name[0].toUpperCase() + church_name.slice(1)}`,
          },        
        ]
      }
    }) : null;
    const districtKids = districts.length > 0 ? districts.map(({ district }) => {
      return {
        name: district[0].toUpperCase() + district.slice(1),
        url: `/district-requests?districtName=${district}`,
        icon: "icon-star",
      }
    }) : null;
    const menuName = kids !== null ? 'Churches' : 'Districts';
    // const menu = 
    const children = kids !== null ? [kids] : [districtKids];
    
    const sidemenu = {
      items: [
        ...sidebar.items,
        {
          name: menuName,
          url: '#',
          icon: 'icon-home',
          children: children[0]
        },
      ]
    }

    const fieldsLink = fields.length > 0 ? fields.map(({ field }) => {
      return {
        name: field.toUpperCase(),
        url: `/field-requests?fieldName=${field}`,
        icon: "icon-star",
      }
    }) : null;

    const AdminSidebar = {
      items: [
        ...AdminSide.items,
        {
          name: 'Fields',
          url: '#',
          icon: 'icon-home',
          children: fieldsLink
        },
      ]
    }

    if (this.props.isLoading) return this.loading();
    
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense fallback={this.loading()}>
            <AppSidebarNav navConfig={role === 'admin' || role === 'union' ? AdminSidebar : sidemenu} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/404" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}
const mapState = ({ churches, districts, timetable }) => ({
  churches: churches.pastorChurches,
  isLoading: churches.isLoading || districts.isLoading,
  isLoaded: churches.isLoaded || districts.isLoaded,
  error: churches.error || districts.error,
  districts: districts.districts,
  fields: districts.fields,
  timetable: timetable.timetable,
});

export default connect(mapState, {
  getChurches: findPastorChurches,
  getDistricts: findDistricts,
  getTimetable: checkTimetable,
})(DefaultLayout);
