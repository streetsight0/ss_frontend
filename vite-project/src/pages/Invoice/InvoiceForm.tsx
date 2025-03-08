import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";
import CustomDropdown from "../../components/DropDown/DropDown";
import CustomTextField from "../../components/Input field/InputField";
import CustomButton from "../../components/Button/Button";
import { Box, Stack } from "@mui/material";
import logo from "../../assets/logo1.png"

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
    const [message, setMessage] = useState("");
	const [clients, setClients] = useState<ClientData[]>([]); // Store full client data
	const [companyNames, setCompanyNames] = useState<string[]>([]);

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
	// Generate PDF for the invoice
	const generatePDF = () => {
		const doc = new jsPDF();

		// Add logo to the top left (replace with your actual logo path)

		doc.addImage(logo, "PNG", 10, 10, 40, 50); // x, y, width, height

		// Header: Title or company name
		doc.setFontSize(40);
		doc.setFont("helvetica", "bold");
		doc.text("INVOICE DETAILS", 270, 25); // Title in the header
		doc.setFontSize(12);
		doc.text("Your Company Name", 70, 60); // Company name under the title

		doc.setFontSize(18).text("Address:IG road chickmanglur ", 20, 20);
		doc.setFontSize(18).text("Invoice", 20, 40);
		doc.setFontSize(12);
		doc.text(`Client: ${invoiceDetails.client}`, 20, 80);
		doc.text(`Company Name: ${invoiceDetails.companyName}`, 20, 90);
		doc.text(`Invoice Number: ${invoiceDetails.invoiceNumber}`, 20, 100);
		doc.text(`Month: ${invoiceDetails.month}`, 20, 110);
		doc.text(`Location: ${invoiceDetails.location}`, 20, 120);
		doc.text(`Amount: ${invoiceDetails.amount}`, 20, 130);
		doc.text(
			`Total Amount(incl 12% tax): ${invoiceDetails.totalAmount}`,
			20,
			140
		);

		// Footer: Contact info or copyright
		doc.setFontSize(10);
		doc.setFont("helvetica", "normal");
		doc.text("Your Company Contact: info@company.com", 40, 170);
		doc.text("www.company.com", 40, 180);
		doc.text("© 2025 Your Company Name. All rights reserved.", 20, 190);
		doc.save("invoice.pdf");
	};

	// Preview PDF without downloading
	const previewPDF = () => {
		const doc = new jsPDF();
		doc.setFontSize(18).text("Invoice", 20, 20);
		doc.setFontSize(12);
		doc.text(`Client: ${invoiceDetails.client}`, 20, 40);
		doc.text(`Company Name: ${invoiceDetails.companyName}`, 20, 50);
		doc.text(`Invoice Number: ${invoiceDetails.invoiceNumber}`, 20, 60);
		doc.text(`Month: ${invoiceDetails.month}`, 20, 70);
		doc.text(`Location: ${invoiceDetails.location}`, 20, 80);
		doc.text(`Amount: ${invoiceDetails.amount}`, 20, 90);
		doc.text(`Total Amount: ${invoiceDetails.totalAmount}`, 20, 100);
		doc.output("dataurlnewwindow"); // Opens the PDF in a new window
	};

	// Handle sending email
	// Handle sending email
	const handleSendEmail = async () => {
		const doc = new jsPDF();

		// Header: Title or company name
		doc.setFontSize(18);
		doc.setFont("helvetica", "bold");
		doc.text("INVOICE DETAILS", 20, 20); // Title at the top

		// Optional: Add logo to the top left (replace with your actual logo path)
		doc.addImage(logo, "PNG", 10, 10, 40, 50); // x, y, width, height

		// Company Name and Address
		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		doc.text("Your Company Name", 70, 60);
		doc.text("Address: IG road, Chickmanglur", 20, 80);

		// Main Invoice Content
		doc.setFontSize(12);
		doc.text(`Client: ${invoiceDetails.client}`, 20, 100);
		doc.text(`Company Name: ${invoiceDetails.companyName}`, 20, 110);
		doc.text(`Invoice Number: ${invoiceDetails.invoiceNumber}`, 20, 120);
		doc.text(`Month: ${invoiceDetails.month}`, 20, 130);
		doc.text(`Location: ${invoiceDetails.location}`, 20, 140);
		doc.text(`Amount: ${invoiceDetails.amount}`, 20, 150);
		doc.text(
			`Total Amount (incl 12% tax): ${invoiceDetails.totalAmount}`,
			20,
			160
		);

		// Footer Content: Add current date
		const pageHeight = doc.internal.pageSize.height;
		const footerText = `Date: ${new Date().toLocaleDateString()}`;

		// Footer at the bottom of the page
		doc.setFontSize(10);
		doc.text(footerText, 20, pageHeight - 20); // Footer text

		// Convert PDF to Blob
		const pdfBlob = doc.output("blob");

		// Create FormData to send the file
		const formData = new FormData();
		formData.append("pdf", pdfBlob, "invoice.pdf"); // Attach PDF
		formData.append("to", invoiceDetails.email); // Recipient email
		formData.append("subject", `Vancouver Campaign Invoice ${invoiceDetails.invoiceNumber}`);
		formData.append(
			"body",
			`Hi ${invoiceDetails.client},\nYour invoice for the campaign advertisement for this month is ready.Please take a moment to review the details.\n Your total payable amount, including all taxes, is ${invoiceDetails.totalAmount}.Please make the payment by the 21st of this month to avoid any late fees.Amount\nBest regards,\nTeam Steet Sight`
		);

		try {
			await axios.post(`${BASE_URL}/api/invoice/sendInvoiceEmail`, formData, {
				headers: { "Content-Type": "multipart/form-data" }, // Ensure it's sent as FormData
			});
			setMessage("Invoice email sent successfully!"); // Set success message
		} catch (error) {
			setMessage("Failed to send invoice email. Please try again."); // Set error message
		}
	};

	return (
		<Box sx={{ p: 10 }}>
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
				<CustomButton
					label="Send Email"
					icon={<span></span>}
					onClick={handleSendEmail}
				/>
				{message && <div className="notification">{message}</div>}
			</Stack>
		</Box>
	);
};

export default InvoiceForm;
