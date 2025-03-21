import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Dashboard/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Sidebar from "../components/navigation/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
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

const router = createBrowserRouter([
	{
		element: (
			<ProtectedRoute>
				<>
					<Navbar />
					<Sidebar />
				</>
			</ProtectedRoute>
		),

		errorElement: <ErrorPage />, // Display error page if an error occurs
		children: [
			{
				path: "/home",
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/invoice", // New route for InvoiceForm
				element: (
					<ProtectedRoute>
						<InvoiceForm />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/aipricing", // New route for InvoiceForm
				element: (
					<ProtectedRoute>
						<AiPricingPage />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/addcampaign",
				element: (
					<ProtectedRoute>
						<AddCampaign />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/allcampaigns",
				element: (
					<ProtectedRoute>
						<AllCampaigns />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/getBillBoards",
				element: (
					<ProtectedRoute>
						<GetBillBoards />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/billBoards",
				element: (
					<ProtectedRoute>
						<Billboards />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},

			{
				path: "/lease",
				element: (
					<ProtectedRoute>
						<AllLeaseAgreements />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/newLease",
				element: (
					<ProtectedRoute>
						<NewLeaseAgreement />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/viewLease",
				element: (
					<ProtectedRoute>
						<ViewLeaseAgreement />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/client",
				element: (
					<ProtectedRoute>
						<Client />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/getClient",
				element: (
					<ProtectedRoute>
						<AllClients />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/clientStatus",
				element: (
					<ProtectedRoute>
						<ClientStatus />
					</ProtectedRoute>
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
