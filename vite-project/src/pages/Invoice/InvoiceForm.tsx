import React, { useState, useEffect } from "react";
import "./InvoiceForm.css";
import { jsPDF } from "jspdf";
import apiClient from "../../utils/axiosConfig";
import CustomDropdown from "../../components/DropDown/DropDown";
import CustomTextField from "../../components/Input field/InputField";
import CustomButton from "../../components/Button/Button";
import { Box, Stack, Typography } from "@mui/material";
import logo from "../../assets/logo1.png";
import noti from "../../assets/notif.mp3";
import BackButton from "../../assets/Icons/BackBlack.png";
import SuccessPopup from "../../components/EmailMessage/SuccessPopup";
import { useNavigate } from "react-router-dom";
import { useValidToken } from "../../hooks/useValidToken";

interface InvoiceDetails {
	client: string;
	clientName: string;
	companyName: string;
	invoiceNumber: string;
	month: string;
	location: string;
	amount: string;
	totalAmount: string;
	email: string;
}

interface ClientData {
	_id: string;
	client_name: string;
	company_name: string;
	additional_companies: string[];
}

const InvoiceForm: React.FC = () => {
	const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
		client: "",
		clientName: "",
		companyName: "",
		invoiceNumber: "",
		month: "",
		location: "",
		amount: "",
		totalAmount: "",
		email: "",
	});
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [clients, setClients] = useState<ClientData[]>([]);
	const [companyNames, setCompanyNames] = useState<string[]>([]);
	const [pdfPreview, setPdfPreview] = useState<string | null>(null);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const isTokenValid = useValidToken();

	useEffect(() => {
		if (!isTokenValid) return;
		
		setInvoiceDetails({
			client: "",
			clientName: "",
			companyName: "",
			invoiceNumber: "",
			month: "",
			location: "",
			amount: "",
			totalAmount: "",
			email: "",
		});

	apiClient
		.get("/api/client/getclients")
		.then((response) => {
			if (Array.isArray(response.data.data)) {
				setClients(response.data.data);
			} else {
				console.error(
					"Expected an array inside 'data' but got",
					response.data
				);
			}
		})
		.catch((error) => console.error("Error fetching clients", error));
		setInvoiceDetails((prevState) => ({
			...prevState,
			invoiceNumber: Math.floor(Math.random() * 1000000).toString(),
		}));
	}, []);

	const handleClientChange = async (value: string) => {
		const selectedClient = clients.find(
			(client) => client.client_name === value
		);

		if (selectedClient) {
			setInvoiceDetails((prevState) => ({
				...prevState,
				client: selectedClient._id,
				clientName: selectedClient.client_name,
			}));

			const allCompanies = [
				selectedClient.company_name,
				...selectedClient.additional_companies,
			];
			setCompanyNames(allCompanies);

			setInvoiceDetails((prevState) => ({
				...prevState,
				companyName: allCompanies.length > 0 ? allCompanies[0] : "",
			}));

		try {
			const response = await apiClient.get(
				`/api/campaign/getcampaigns/${selectedClient._id}`
			);
			const campaigns = response.data.campaigns;

				if (campaigns.length > 0) {
					setInvoiceDetails((prevState) => ({
						...prevState,
						amount: campaigns[0].campaign_rent_monthly.toString(),
					}));

					const locations = response.data.billboardLocations || [];
					if (locations.length > 0) {
						setInvoiceDetails((prevState) => ({
							...prevState,
							location: locations[0],
						}));
					} else {
						setInvoiceDetails((prevState) => ({
							...prevState,
							location: "",
						}));
					}
				} else {
					setInvoiceDetails((prevState) => ({
						...prevState,
						amount: "",
						location: "",
					}));
				}
			} catch (error) {
				console.error("Error fetching campaigns", error);
				setInvoiceDetails((prevState) => ({
					...prevState,
					amount: "",
					location: "",
				}));
			}
		}
	};

	const handleCompanyChange = (value: string) => {
		setInvoiceDetails((prevState) => ({ ...prevState, companyName: value }));
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInvoiceDetails((prevState) => ({ ...prevState, [name]: value }));
	};

	useEffect(() => {
		const amount = parseFloat(invoiceDetails.amount || "0");
		const totalAmount = (amount * 1.12).toFixed(2);

		setInvoiceDetails((prevState) => ({ ...prevState, totalAmount }));
	}, [invoiceDetails.amount]);

	const generatePDF = () => {
		const doc = new jsPDF();

		doc.addImage(logo, "PNG", 10, 10, 40, 40);

		doc.setFontSize(22);
		doc.setFont("helvetica", "bold");
		const title = "STREET SIGHT";
		const titleWidth = doc.getTextWidth(title);
		doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, 30);

		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		const companyName = "INVOICE DETAILS";
		const companyNameWidth = doc.getTextWidth(companyName);
		doc.text(
			companyName,
			(doc.internal.pageSize.width - companyNameWidth) / 2,
			40
		);

		doc.setFontSize(10);
		const address = "Address: Langara 49th Ave,Vancouver";
		const addressWidth = doc.getTextWidth(address);
		doc.text(address, (doc.internal.pageSize.width - addressWidth) / 2, 50);

		doc.line(10, 55, 200, 55);
		doc.setFontSize(14);
		doc.setFont("helvetica", "bold");
		doc.text("Invoice Information", 20, 70);

		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		doc.text(`Client: ${invoiceDetails.clientName}`, 20, 85);
		doc.text(`Company Name: ${invoiceDetails.companyName}`, 20, 100);
		doc.text(`Invoice Number: ${invoiceDetails.invoiceNumber}`, 20, 115);
		doc.text(`Month: ${invoiceDetails.month}`, 20, 130);
		doc.text(`Location: ${invoiceDetails.location}`, 20, 145);
		doc.text(`Amount: $${invoiceDetails.amount}`, 20, 160);

		doc.setFont("helvetica", "bold");
		doc.text(
			`Total Amount (incl. 12% tax): $${invoiceDetails.totalAmount}`,
			20,
			175
		);

		doc.line(10, 185, 200, 185);
		doc.setFontSize(10);
		doc.setFont("helvetica", "normal");

		const footerText1 = "STREET SIGHT";
		const footerText2 = "Contact: StreetSight@gmail.com";
		const footerText3 = "© 2025 STREET SIGHT. All rights reserved.";

		const footerText1Width = doc.getTextWidth(footerText1);
		const footerText2Width = doc.getTextWidth(footerText2);
		const footerText3Width = doc.getTextWidth(footerText3);

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

		doc.save("invoice.pdf");
		const pdfBlob = doc.output("blob");

		return pdfBlob;
	};

	const previewPDF = async () => {
		const invoiceData = {
			invoiceNumber: invoiceDetails.invoiceNumber,
			client: invoiceDetails.client,
			companyName: invoiceDetails.companyName,
			month: invoiceDetails.month,
			totalAmount: parseFloat(invoiceDetails.totalAmount),
			location: invoiceDetails.location,
			amount: parseFloat(invoiceDetails.amount),
		};

		try {
			const response = await apiClient.post(
				"/api/invoice/createinvoices",
				invoiceData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				console.log("Invoice successfully created in DB:", response.data);
			} else {
				console.error("Failed to create invoice in DB");
			}
			const doc = new jsPDF();

			const pageWidth = doc.internal.pageSize.width;
			doc.setFontSize(22);
			doc.setFont("helvetica", "bold");
			const title = "STREET SIGHT";
			const titleWidth = doc.getTextWidth(title);
			doc.text(title, (pageWidth - titleWidth) / 2, 30);

			doc.setFontSize(12);
			doc.setFont("helvetica", "normal");
			const companyName = " INVOICE DETAILS";
			doc.text(
				companyName,
				(pageWidth - doc.getTextWidth(companyName)) / 2,
				40
			);

			const address = "Address: Langara 49th Ave, Vancouver";
			doc.text(address, (pageWidth - doc.getTextWidth(address)) / 2, 50);

			doc.line(10, 55, 200, 55);
			doc.setFontSize(14);
			doc.setFont("helvetica", "bold");
			doc.text("Invoice Information", 20, 70);

			doc.setFontSize(12);
			doc.setFont("helvetica", "normal");
			doc.text(`Client: ${invoiceDetails.clientName}`, 20, 85);
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

			doc.line(10, 160, 200, 160);
			doc.setFontSize(10);
			doc.setFont("helvetica", "normal");

			const footerText1 = "STREET SIGHT";
			const footerText2 = "Contact:Streetsight@gmail.com";
			const footerText3 = "© 2025 STREETSIGHT. All rights reserved.";

			doc.text(
				footerText1,
				(pageWidth - doc.getTextWidth(footerText1)) / 2,
				175
			);
			doc.text(
				footerText2,
				(pageWidth - doc.getTextWidth(footerText2)) / 2,
				185
			);
			doc.text(
				footerText3,
				(pageWidth - doc.getTextWidth(footerText3)) / 2,
				195
			);

			const pdfDataUrl = doc.output("dataurlstring");
			setPdfPreview(pdfDataUrl);
		} catch (error) {
			console.error("Error saving invoice to DB or generating PDF:", error);
		}
	};
	const playNotificationSound = () => {
		const audio = new Audio(noti);
		audio.play();
	};

	useEffect(() => {
		if (showConfirmation) {
			playNotificationSound();
		}
	}, [showConfirmation]);

	const handleSendEmail = async () => {
		const doc = new jsPDF();

		doc.addImage(logo, "PNG", 10, 10, 40, 40);

		doc.setFontSize(22);
		doc.setFont("helvetica", "bold");
		const title = "STREET SIGHT";
		const titleWidth = doc.getTextWidth(title);
		doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, 30);

		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		const companyName = "INVOICE DETAILS";
		const companyNameWidth = doc.getTextWidth(companyName);
		doc.text(
			companyName,
			(doc.internal.pageSize.width - companyNameWidth) / 2,
			40
		);

		doc.setFontSize(10);
		const address = "Address: Langara 49th Ave,Vancouver";
		const addressWidth = doc.getTextWidth(address);
		doc.text(address, (doc.internal.pageSize.width - addressWidth) / 2, 50);

		doc.line(10, 55, 200, 55);

		doc.setFontSize(14);
		doc.setFont("helvetica", "bold");
		doc.text("Invoice Information", 20, 70);

		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		doc.text(`Client: ${invoiceDetails.clientName}`, 20, 85);
		doc.text(`Company Name: ${invoiceDetails.companyName}`, 20, 100);
		doc.text(`Invoice Number: ${invoiceDetails.invoiceNumber}`, 20, 115);
		doc.text(`Month: ${invoiceDetails.month}`, 20, 130);
		doc.text(`Location: ${invoiceDetails.location}`, 20, 145);
		doc.text(`Amount: $${invoiceDetails.amount}`, 20, 160);

		doc.setFont("helvetica", "bold");
		doc.text(
			`Total Amount (incl. 12% tax): $${invoiceDetails.totalAmount}`,
			20,
			175
		);

		doc.line(10, 185, 200, 185);
		doc.setFontSize(10);
		doc.setFont("helvetica", "normal");

		const footerText1 = "STREET SIGHT";
		const footerText2 = "Contact: StreetSight@gmail.com";
		const footerText3 = "© 2025 STREET SIGHT. All rights reserved.";

		const footerText1Width = doc.getTextWidth(footerText1);
		const footerText2Width = doc.getTextWidth(footerText2);
		const footerText3Width = doc.getTextWidth(footerText3);

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
		const pdfBlob = doc.output("blob");

		const formData = new FormData();
		formData.append("pdf", pdfBlob, "invoice.pdf");
		formData.append("to", invoiceDetails.email);
		formData.append(
			"subject",
			`Vancouver Campaign Invoice ${invoiceDetails.invoiceNumber}`
		);
		formData.append(
			"body",
			`Hi ${invoiceDetails.clientName},\nYour invoice for the campaign advertisement for this month is ready.Please take a moment to review the details.\n Your total payable amount, including all taxes, is ${invoiceDetails.totalAmount}.Please make the payment by the 21st of this month to avoid any late fees.Amount\nBest regards,\nTeam Steet Sight`
		);

	try {
		await apiClient.post("/api/invoice/sendInvoiceEmail", formData, {
				headers: { "Content-Type": "multipart/form-data" },
		});

		setShowConfirmation(true);
		setTimeout(() => {
			setShowConfirmation(false);

			navigate("/invoice");
		}, 3000);
	} catch (error) {
		setMessage("Failed to send invoice email. Please try again.");
	}
	};

	return (
		<div className="campaign-form">
			<div className="conatiner">
				<div>
					<div className="campaign-header">
						<img
							src={BackButton}
							alt="Back"
							className="back-icon"
							onClick={() => navigate(-1)}
						/>
						<h2>Generate Invoice</h2>
					</div>

					<Box sx={{ mb: 2, mt: 4 }}>
					<CustomDropdown
							className="custom-input-field dropdown-width"
							options={clients.map((client) => client.client_name)}
							label="Select Client"
							onChange={handleClientChange}
							placeholder="Select a client"
						/>
					</Box>

					<Box sx={{ mb: 2 }}>
						<CustomDropdown
							className="custom-input-field"
							options={companyNames} // List of company names
							label="Company Name"
							onChange={handleCompanyChange} // When company changes, update the form
							placeholder="Select a company"
						/>
					</Box>

					{/* Invoice Number (auto-generated) */}
					<Box sx={{ mb: 2 }}>
						<CustomTextField
							label="Invoice Number"
							name="invoiceNumber"
							value={invoiceDetails.invoiceNumber}
							disabled
							className="custom-input-field"
						/>
					</Box>

					{/* Dropdown for selecting the month */}
					<Box sx={{ mb: 2 }}>
						<CustomDropdown
							className="custom-input-field"
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
							placeholder="Select a month"
						/>
					</Box>

					{/* Location input */}
					<Box sx={{ mb: 2 }}>
						<CustomTextField
							label="Location"
							name="location"
							value={invoiceDetails.location || ""}
							onChange={handleInputChange}
							className="custom-input-field"
							placeholder="Enter location"
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
							className="custom-input-field"
							placeholder="Enter amount"
						/>
					</Box>

					{/* Total amount input */}
					<Box sx={{ mb: 2 }}>
						<CustomTextField
							label="Total Amount (incl of 12% tax)"
							name="totalAmount"
							type="number"
							value={invoiceDetails.totalAmount}
							disabled
							className="custom-input-field"
							placeholder="Enter amount"
						/>
					</Box>

					{/* Email input */}
					<Box sx={{ mb: 3 }}>
						<CustomTextField
							label="Email"
							name="email"
							value={invoiceDetails.email}
							onChange={handleInputChange}
							className="custom-input-field"
							placeholder="Enter client's email"
						/>
					</Box>

					<Stack direction="row" spacing={2} mt={2}>
						<CustomButton
							className="sendemial"
							label="Download PDF"
							icon={<span></span>}
							onClick={generatePDF}
							sx={{ height: "51px", width: "48%" }}
						/>

						<CustomButton
							className="sendemial"
							label="Send Email"
							icon={<span></span>}
							onClick={handleSendEmail}
							sx={{ height: "51px", width: "48%" }}
						/>
						{message && <div className="notification">{message}</div>}
					</Stack>
				</div>
				<Box
					sx={{
						width: "488px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Box
						className="pdf-preview"
						sx={{
							mt: 5,
							width: "400px",
							height: "670px", // Increased height for better fit
							border: "1px solid #ccc",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#f9f9f9",
							padding: 2,
							borderRadius: "10px",
							boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
							overflow: "hidden", // Prevent extra space
						}}
					>
						{pdfPreview ? (
							<iframe
								src={pdfPreview}
								width="100%"
								height="100%" // Ensures full height usage
								style={{
									border: "none",
									transform: "scale(1)", // Prevent scaling issues
								}}
								title="Invoice Preview"
							/>
						) : (
							<Typography variant="body1" color="textSecondary">
								Select to generate preview
							</Typography>
						)}
					</Box>
					<Box
						className="preview-container"
						sx={{
							width: "400px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							gap: 2,
							marginTop: 3.5, // Space between preview and buttons
						}}
					>
						<CustomButton
							className="preview-button"
							label="Preview PDF"
							icon={<span></span>}
							onClick={previewPDF}
							sx={{
								height: "51px",
							}}
						/>
					</Box>
				</Box>
				{showConfirmation && <SuccessPopup message="Email Sent!" />}
			</div>
		</div>
	);
};

export default InvoiceForm;
