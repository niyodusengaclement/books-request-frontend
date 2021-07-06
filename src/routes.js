import React from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Churches = React.lazy(() => import("./views/Churches/Churches"));
const SendRequest = React.lazy(() =>
  import("./views/Pages/Request/SendRequest")
);
const GetRequest = React.lazy(() => import("./views/Pages/Request/GetRequest"));
const AllRequests = React.lazy(() =>
  import("./views/Pages/Request/AllRequests")
);
const DistrictRequests = React.lazy(() =>
  import("./views/Pages/Request/DistrictRequests")
);
const Timetable = React.lazy(() => import("./views/Pages/Timetable"));
const AddBook = React.lazy(() => import("./views/Pages/Books/AddBook"));
const FieldRequests = React.lazy(() =>
  import("./views/Pages/Request/FieldRequests")
);
const OtherBooks = React.lazy(() => import("./views/Pages/Books/OtherBooks"));
const GetOtherRequests = React.lazy(() =>
  import("./views/Pages/Request/GetOtherRequests")
);
const AddPastorChurch = React.lazy(() =>
  import("./views/Pages/Pastor/AddPastorChurch")
);
const Profile = React.lazy(() => import("./views/Pages/Pastor/Profile"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/create-request", name: "Request", component: SendRequest },
  {
    path: "/create-request/:churchId/:churchName",
    name: "Request",
    component: SendRequest,
  },
  { path: "/get-requests", name: "Request", component: GetRequest },
  { path: "/all-requests", name: "All Request", component: AllRequests },
  {
    path: "/district-requests",
    name: "District Request",
    component: DistrictRequests,
  },
  {
    path: "/churches",
    exact: true,
    name: "Churches & Pastors",
    component: Churches,
  },
  {
    path: "/timetable",
    exact: true,
    name: "Time management",
    component: Timetable,
  },
  { path: "/add-book", exact: true, name: "Add book", component: AddBook },
  {
    path: "/field-requests",
    exact: true,
    name: "Field Requests",
    component: FieldRequests,
  },
  {
    path: "/other-books",
    exact: true,
    name: "Other Books",
    component: OtherBooks,
  },
  {
    path: "/other-books-requests",
    exact: true,
    name: "Other Books Requests",
    component: GetOtherRequests,
  },
  {
    path: "/add-pastor-or-church",
    exact: true,
    name: "Add Pastor or Church",
    component: AddPastorChurch,
  },
  { path: "/profile", exact: true, name: "Profile", component: Profile },
];

export default routes;
