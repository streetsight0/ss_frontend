import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";
import CustomDropdown from "../../components/DropDown/DropDown";
import CustomTextField from "../../components/Input field/InputField";
import CustomButton from "../../components/Button/Button";
import { Box, Stack } from "@mui/material";
import logo from "../../assets/logo1.png";
import "./InvoiceForm.css"

import "./InvoiceForm.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface InvoiceDetails {
	client: string;
	companyName: string;
	invoiceNumber: string;
	month: string;
	location: string;
	amount: string;
	totalAmount: string;
	email: string; // Added for email address
}

interface ClientData {
	client_name: string;
	company_name: string;
	additional_companies: string[];
}

const InvoiceForm: React.FC = () => {
	const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
		client: "",
		companyName: "",
		invoiceNumber: "",
		month: "",
		location: "",
		amount: "",
		totalAmount: "",
		email: "",
	});
	
	const [clients, setClients] = useState<ClientData[]>([]); // Store full client data
	const [companyNames, setCompanyNames] = useState<string[]>([]);
	const [pdfPreview, setPdfPreview] = useState<string | null>(null); // State to store PDF preview

	useEffect(() => {
		// Fetching clients data from the API
		axios
			.get(`${BASE_URL}/api/client/getclients`)
			.then((response) => {
				// Assuming response.data.data contains the client details
				if (Array.isArray(response.data.data)) {
					setClients(response.data.data); // Store full client data
				} else {
					console.error(
						"Expected an array inside 'data' but got",
						response.data
					);
				}
			})
			.catch((error) => console.error("Error fetching clients", error));

		// Generate random invoice number on mount
		setInvoiceDetails((prevState) => ({
			...prevState,
			invoiceNumber: Math.floor(Math.random() * 1000000).toString(),
		}));
	}, []);

	// Handle client change
	const handleClientChange = (value: string) => {
		setInvoiceDetails((prevState) => ({ ...prevState, client: value }));

		// Find selected client from the clients list and get its company names
		const selectedClient = clients.find(
			(client) => client.client_name === value
		);
		if (selectedClient) {
			// Extract company names (primary and additional)
			const allCompanies = [
				selectedClient.company_name,
				...selectedClient.additional_companies,
			];
			setCompanyNames(allCompanies); // Update company names for the selected client
		} else {
			setCompanyNames([]); // Reset company names if no client found
		}
	};

	// Handle company name change
	const handleCompanyChange = (value: string) => {
		setInvoiceDetails((prevState) => ({ ...prevState, companyName: value }));
	};

	// Handle general input change
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInvoiceDetails((prevState) => ({ ...prevState, [name]: value }));
	};

	// Auto-generate total amount
	const handleAutoGenerateInvoice = () => {
		const amount = parseFloat(invoiceDetails.amount || "0"); // Convert amount to a number
		const totalAmount = (amount * 1.12).toFixed(2); // Add 12% and format to 2 decimal places

		setInvoiceDetails((prevState) => ({ ...prevState, totalAmount }));
	};

const generatePDF = () => {
	const doc = new jsPDF();

	// Add logo to the top left (replace with your actual logo path)
	doc.addImage(logo, "PNG", 10, 10, 40, 40); // x, y, width, height

	// Header Section: Title, company name, and address
	doc.setFontSize(22);
	doc.setFont("helvetica", "bold");
	const title = "STREET SIGHT";
	const titleWidth = doc.getTextWidth(title); // Get the width of the title
	doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, 30); // Center the title

	doc.setFontSize(12);
	doc.setFont("helvetica", "normal");
	const companyName = "INVOICE DETAILS";
	const companyNameWidth = doc.getTextWidth(companyName); // Get the width of the company name
	doc.text(
		companyName,
		(doc.internal.pageSize.width - companyNameWidth) / 2,
		40
	); // Center the company name

	doc.setFontSize(10);
	const address = "Address: Langara 49th Ave,Vancouver";
	const addressWidth = doc.getTextWidth(address); // Get the width of the address
	doc.text(address, (doc.internal.pageSize.width - addressWidth) / 2, 50); // Center the address

	doc.line(10, 55, 200, 55); // Horizontal line for separation

	// Invoice Details Section
	doc.setFontSize(14);
	doc.setFont("helvetica", "bold");
	doc.text("Invoice Information", 20, 70);

	doc.setFontSize(12);
	doc.setFont("helvetica", "normal");
	doc.text(`Client: ${invoiceDetails.client}`, 20, 85);
	doc.text(`Company Name: ${invoiceDetails.companyName}`, 20, 100);
	doc.text(`Invoice Number: ${invoiceDetails.invoiceNumber}`, 20, 115);
	doc.text(`Month: ${invoiceDetails.month}`, 20, 130);
	doc.text(`Location: ${invoiceDetails.location}`, 20, 145);
	doc.text(`Amount: $${invoiceDetails.amount}`, 20, 160);

	// Calculate and display Total Amount including tax
	doc.setFont("helvetica", "bold");
	doc.text(
		`Total Amount (incl. 12% tax): $${invoiceDetails.totalAmount}`,
		20,
		175
	);

	doc.line(10, 185, 200, 185); // Horizontal line for separation

	// Footer: Contact info and copyright
	doc.setFontSize(10);
	doc.setFont("helvetica", "normal");

	const footerText1 = "STREET SIGHT";
	const footerText2 = "Contact: StreetSight@gmail.com"
	const footerText3 = "© 2025 STREET SIGHT. All rights reserved.";

	const footerText1Width = doc.getTextWidth(footerText1);
	const footerText2Width = doc.getTextWidth(footerText2);
	const footerText3Width = doc.getTextWidth(footerText3);

	// Position the footer texts
	doc.text(
		footerText1,
		(doc.internal.pageSize.width - footerText1Width) / 2,
		200
	);
	doc.text(
		footerText2,
		(doc.internal.pageSize.width - footerText2Width) / 2,
		210
	);
	doc.text(
		footerText3,
		(doc.internal.pageSize.width - footerText3Width) / 2,
		220
	);

	// Save the PDF
	doc.save("invoice.pdf");
};

	const previewPDF = () => {
		const doc = new jsPDF();

		// Page width for centering
		const pageWidth = doc.internal.pageSize.width;

		// Add logo (uncomment and replace `logo` with your actual image)
		// doc.addImage(logo, "PNG", 10, 10, 40, 40); // x, y, width, height

		// Header Section
		doc.setFontSize(22);
		doc.setFont("helvetica", "bold");
		const title = "STREET SIGHT";
		const titleWidth = doc.getTextWidth(title);
		doc.text(title, (pageWidth - titleWidth) / 2, 30); // Center title

		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		const companyName = " INVOICE DETAILS";
		doc.text(companyName, (pageWidth - doc.getTextWidth(companyName)) / 2, 40);

		const address = "Address: Langara 49th Ave, Vancouver";
		doc.text(address, (pageWidth - doc.getTextWidth(address)) / 2, 50);

		doc.line(10, 55, 200, 55); // Separation line

		// Invoice Details
		doc.setFontSize(14);
		doc.setFont("helvetica", "bold");
		doc.text("Invoice Information", 20, 70);

		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		doc.text(`Client: ${invoiceDetails.client}`, 20, 85);
		doc.text(`Company Name: ${invoiceDetails.companyName}`, 20, 95);
		doc.text(`Invoice Number: ${invoiceDetails.invoiceNumber}`, 20, 105);
		doc.text(`Month: ${invoiceDetails.month}`, 20, 115);
		doc.text(`Location: ${invoiceDetails.location}`, 20, 125);
		doc.text(`Amount: $${invoiceDetails.amount}`, 20, 135);

		doc.setFont("helvetica", "bold");
		doc.text(
			`Total Amount (incl. 12% tax): $${invoiceDetails.totalAmount}`,
			20,
			150
		);

		doc.line(10, 160, 200, 160); // Separation line before footer

		// Footer: Centered Contact Info
		doc.setFontSize(10);
		doc.setFont("helvetica", "normal");

		const footerText1 = "STREET SIGHT";
		const footerText2 = "Contact:Streetsight@gmail.com";
		const footerText3 = "© 2025 STREETSIGHT. All rights reserved.";

		doc.text(footerText1, (pageWidth - doc.getTextWidth(footerText1)) / 2, 175);
		doc.text(footerText2, (pageWidth - doc.getTextWidth(footerText2)) / 2, 185);
		doc.text(footerText3, (pageWidth - doc.getTextWidth(footerText3)) / 2, 195);

		// Get the PDF output as data URL and update the preview state
		const pdfDataUrl = doc.output("dataurlstring");
		setPdfPreview(pdfDataUrl); // Set the preview URL for iframe
	};


	return (
		<Box sx={{ p: 10, display: "flex", justifyContent: "space-between" }}>
			<Box sx={{ width: "60%" }}>
				<h2>Create Invoice</h2>

				<Box sx={{ mb: 2 }}>
					{/* Dropdown for clients */}
					<CustomDropdown
						options={clients.map((client) => client.client_name)}
						label="Client"
						onChange={handleClientChange}
					/>
				</Box>

				{/* Dropdown for companies */}
				<Box sx={{ mb: 2 }}>
					<CustomDropdown
						options={companyNames} // List of company names
						label="Company Name"
						onChange={handleCompanyChange} // When company changes, update the form
					/>
				</Box>

				{/* Invoice Number (auto-generated) */}
				<Box sx={{ mb: 2 }}>
					<CustomTextField
						className="invoice-text-field"
						label="Invoice Number"
						name="invoiceNumber"
						value={invoiceDetails.invoiceNumber}
						disabled
					/>
				</Box>

				{/* Dropdown for selecting the month */}
				<Box sx={{ mb: 2 }}>
					<CustomDropdown
						options={[
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December",
						]}
						label="Month"
						onChange={(value) =>
							setInvoiceDetails((prev) => ({ ...prev, month: value }))
						}
					/>
				</Box>

				{/* Location input */}
				<Box sx={{ mb: 2 }}>
					<CustomTextField
						className="invoice-text-field"
						label="Location"
						name="location"
						value={invoiceDetails.location}
						onChange={handleInputChange}
					/>
				</Box>

				{/* Amount input */}
				<Box sx={{ mb: 2 }}>
					<CustomTextField
						label="Amount"
						name="amount"
						type="number"
						value={invoiceDetails.amount}
						onChange={handleInputChange}
					/>
				</Box>

				{/* Total amount input */}
				<Box sx={{ mb: 2 }}>
					<CustomTextField
						label="Total Amount (incl of tax 12%)"
						name="totalAmount"
						type="number"
						value={invoiceDetails.totalAmount}
						disabled
					/>
				</Box>

				{/* Email input */}
				<Box sx={{ mb: 2 }}>
					<CustomTextField
						label="Email"
						name="email"
						value={invoiceDetails.email}
						onChange={handleInputChange}
					/>
				</Box>

				{/* Button to auto-generate total amount */}
				<Box sx={{ mb: 2 }}>
					<CustomButton
						label="Auto-generate Total"
						icon={<span></span>}
						onClick={handleAutoGenerateInvoice}
					/>
				</Box>

				{/* Buttons to generate PDF, preview, and send email */}
				<Stack direction="row" spacing={2} mt={2}>
					<CustomButton
						label="Download PDF"
						icon={<span></span>}
						onClick={generatePDF}
					/>
					<CustomButton
						label="Preview PDF"
						icon={<span>👀</span>}
						onClick={previewPDF}
					/>
					{/* Add more buttons as needed */}
				</Stack>
			</Box>

			<Box
				sx={{
					width: "35%",
					padding: "20px",
					border: "1px solid #ccc",
					borderRadius: "8px",
				}}
			>
				<h3>Invoice Preview</h3>
				{pdfPreview ? (
					<iframe
						src={pdfPreview}
						width="100%"
						height="500px"
						title="Invoice Preview"
					/>
				) : (
					<p>No preview available. Please generate a preview first.</p>
				)}
			</Box>
		</Box>
	);
};

export default InvoiceForm;
