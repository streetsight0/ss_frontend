import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Dashboard/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Sidebar from "../components/navigation/Sidebar";
import AllClients from '../pages/AllClients/allClients'
import Navbar from "../components/navigation/Navbar";
import AllLeaseAgreements from "../pages/LeaseAgreement/AllLeaseAgreement";
import NewLeaseAgreement from "../pages/LeaseAgreement/NewLeaseAgreement";
import InvoiceForm from "../pages/Invoice/InvoiceForm";
import AddCampaign from "../pages/AddCampaign/addcampaign";
import GetBillBoards from "../pages/getBillBoards/getBillboards"
import Billboards from "../pages/BillBoards/billboard"
import ViewLeaseAgreement from "../pages/LeaseAgreement/ViewLeaseAgreement";import AllCampaigns from "../pages/AllCampaigns/AllCampaigns";
import Client from "../pages/clients/clients"
import ClientStatus from "../pages/ClientStatus/clientStatus";
import AiPricingPage from "../pages/AiPricing/AiPricing";
import EditClient from "../pages/clients/EditClient";
const router = createBrowserRouter([
	{
		element: (

				<>
					<Navbar />
					<Sidebar />
				</>
		),

		errorElement: <ErrorPage />, // Display error page if an error occurs
		children: [
			{
				path: "/home",
				element: (
						<Home />	
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/invoice", // New route for InvoiceForm
				element: (
						<InvoiceForm />
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/aipricing", // New route for InvoiceForm
				element: (
					
						<AiPricingPage />
					
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/addcampaign",
				element: (
					
						<AddCampaign />
					
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/allcampaigns",
				element: (
					
						<AllCampaigns />
					
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/getBillBoards",
				element: (
					
						<GetBillBoards />
					
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/billBoards",
				element: (
					
						<Billboards />
					
				),
				errorElement: <ErrorPage />,
			},

			{
				path: "/lease",
				element: (
				
						<AllLeaseAgreements />
					
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/newLease",
				element: (
				
						<NewLeaseAgreement />
					
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/viewLease",
				element: (
					
						<ViewLeaseAgreement />
					
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/client",
				element: (
					
						<Client />
					
				),
				errorElement: <ErrorPage />,
			},
      {
        path: "/editclient",
        element: (
        
            <EditClient />
         
        ),
        errorElement: <ErrorPage />,
      },
			{
				path: "/getClient",
				element: (
					
						<AllClients />
					
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/clientStatus",
				element: (
					
						<ClientStatus />
					
				),
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		path: "/", // Public route for login
		element: <Login />, // Login page
		errorElement: <ErrorPage />,
	},
	{
		path: "/login", // Public route for login
		element: <Login />, // Login page
		errorElement: <ErrorPage />,
	},
	{
		path: "/register", // Public route for registration
		element: <Register />,
		errorElement: <ErrorPage />,
	},
]);

export default router;
