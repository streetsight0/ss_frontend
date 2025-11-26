import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import apiClient from "../../utils/axiosConfig";
import CustomButton from "../../components/Button/Button";
import CustomDropdown from "../../components/DropDown/DropDown";
import logo from "../../assets/logo1.png";
import noti from "../../assets/notif.mp3";
import CustomInput from "../../components/Input field/InputField";
import BackButton from "../../assets/Icons/BackBlack.png";
import { useNavigate } from "react-router-dom";
import SuccessPopup from "../../components/EmailMessage/SuccessPopup";
import { CircularProgress, Typography, Box, Alert } from "@mui/material";
import "./AiPricing.css";
import { useValidToken } from "../../hooks/useValidToken";

const AiPricingPage: React.FC = () => {
	const [formData, setFormData] = useState({
		location: "",
		type: "Digital Billboard",
		size: "",
		month: "January",
		amount: "",
		clientEmail: "",
	});
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [price, setPrice] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [pdfPreview, setPdfPreview] = useState<string | null>(null);
	const [clientEmails, setClientEmails] = useState<string[]>([]);
	const pdfRef = useRef<jsPDF | null>(null);
	const navigate = useNavigate();
	const isTokenValid = useValidToken();

	const fetchClientEmails = async () => {
		if (!isTokenValid) return;
		
		try {
			const response = await apiClient.get(`/api/client/getclients`);

			if (response.data && Array.isArray(response.data.data)) {
			if (response.data && Array.isArray(response.data.data)) {
				const emails = response.data.data.map(
					(client: { client_email: string }) => client.client_email
				);
				setClientEmails(emails);
			} else {
				console.error("Unexpected response format:", response.data);
			}
		} catch (error) {
			console.error("Error fetching client emails:", error);
		}
	};

	useEffect(() => {
		if (!isTokenValid) return;
		fetchClientEmails();
	}, [isTokenValid]);

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async () => {
		setLoading(true);
		setPrice(null);
		setError(null);

		try {
			const response = await apiClient.post(
				`/api/aipricing/billboardprice`,
				formData
			);

			setPrice(response.data.price);
			setFormData((prevState) => ({
				...prevState,
				amount: prevState.amount || response.data.price,
			}));
		} catch (err) {
			console.error("Error fetching price:", err);
			setError("Failed to get price from AI.");
		} finally {
			setLoading(false);
		}
	};

	// Generate PDF for preview & download
	const generatePDF = (includeImage = true) => {
		const doc = new jsPDF();

		if (includeImage) {
			doc.addImage(logo, "PNG", 10, 10, 40, 40);
		}
		doc.setFontSize(22);
		doc.setFont("helvetica", "bold");
		const title = "STREET SIGHT";
		const titleWidth = doc.getTextWidth(title);
		doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, 30);

		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		const companyName = "QUOTATION DETAILS";
		const companyNameWidth = doc.getTextWidth(companyName);
		doc.text(
			companyName,
			(doc.internal.pageSize.width - companyNameWidth) / 2,
			40
		);
		console.log(price);
		doc.setFontSize(10);
		const address = "Address: Langara 49th Ave, Vancouver";
		const addressWidth = doc.getTextWidth(address);
		doc.text(address, (doc.internal.pageSize.width - addressWidth) / 2, 50);

		doc.line(10, 55, 200, 55);

		doc.setFontSize(16);
		doc.text("CAMPAIGN QUOTATION DETAILS", 20, 70);
		const finalPrice = formData.amount || "N/A";
		doc.setFontSize(12);
		doc.text(`Billboard Location: ${formData.location}`, 20, 85);
		doc.text(`Billboard Type: ${formData.type}`, 20, 95);
		doc.text(`Billboard Size: ${formData.size}`, 20, 105);
		doc.text(`Month: ${formData.month}`, 20, 115);
		doc.text(`Estimated Price:$ ${finalPrice} `, 20, 125);

		doc.line(10, 185, 200, 185);
		doc.setFontSize(10);
		const footerText = [
			"STREET SIGHT",
			"Contact: StreetSight@gmail.com",
			"© 2025 STREET SIGHT. All rights reserved.",
		];

		footerText.forEach((text, index) => {
			const textWidth = doc.getTextWidth(text);
			doc.text(
				text,
				(doc.internal.pageSize.width - textWidth) / 2,
				200 + index * 10
			);
		});

		const pdfDataUrl = doc.output("dataurlstring");
		setPdfPreview(pdfDataUrl);
		pdfRef.current = doc;
	};

	const downloadPDF = () => {
		generatePDF(true);
		setTimeout(() => {
			if (pdfRef.current) {
				pdfRef.current.save("price quotation.pdf");
			}
		}, 100);
		generatePDF(false);
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

	const sendEmail = async () => {
		if (!pdfRef.current) return;

		const pdfBlob = pdfRef.current.output("blob");

		if (!formData.clientEmail) {
			alert("Please select a client email.");
			return;
		}

		const emailFormData = new FormData();
		emailFormData.append("pdf", pdfBlob, "pricing_quotation");
		emailFormData.append("to", formData.clientEmail);
		emailFormData.append("subject", "Campaign Price Quotation");
		emailFormData.append(
			"body",
			`Hi ,\nPlease find attached the quotation for billboard advertising based on your selected specifications.The Estimated Price: $ ${formData.amount}.\nFor your reference, I have attached a PDF document containing the full quotation details. If you have any questions or need modifications, please feel free to reach out.\nLooking forward to your confirmation.\nBest regards,\nTeam Steet Sight.`
		);

		try {
			await apiClient.post(
				`/api/invoice/sendInvoiceEmail`,
				emailFormData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);
			setShowConfirmation(true);
			setTimeout(() => {
				setShowConfirmation(false);

				navigate("/aipricing");
			}, 3000);
		} catch (error) {
			console.error("Error sending email:", error);
		}
	};

	return (
		<Box className="pricing-container">
			<Box className="form-section">
				<div className="ai-header">
					<img
						src={BackButton}
						alt="Back"
						className="back-icon"
						onClick={() => navigate("/home")}
					/>
					<h2>Generate Quotation</h2>
				</div>

				<CustomDropdown
					label="Billboard Location"
					placeholder="Select billboard location"
					options={["Langara", "Langley", "Surrey","Downtown"]}
					onChange={(value) => handleInputChange("location", value)}
					className="ai-dropdown"
				/>

				<CustomDropdown
					label="Billboard Type"
					options={["Digital Billboard", "Prism Billboard", "Banner Billboard"]}
					onChange={(value) => handleInputChange("type", value)}
					className="ai-dropdown"
					placeholder="select billboard type"
				/>

				<CustomDropdown
					label="Billboard Size"
					options={["10x20", "14x48", "20x60"]}
					onChange={(value) => handleInputChange("size", value)}
					className="ai-dropdown"
					placeholder="select billboard size"
				/>

				<CustomDropdown
					label="Rental Month"
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
					onChange={(value) => handleInputChange("month", value)}
					className="ai-dropdown"
					placeholder="select month"
				/>

				<CustomInput
					label="Estimated Price"
					value={formData.amount}
					onChange={(e) => handleInputChange("amount", e.target.value)}
					fullWidth
					className="ai-dropdown"
					placeholder="Ai estimated price"
				/>
				<CustomDropdown
					label="Client Email"
					options={clientEmails}
					onChange={(value) => handleInputChange("clientEmail", value)}
					className="ai-dropdown"
					placeholder="select client email"
				/>

				<Box
					className="button-container"
					sx={{
						display: "flex",
						gap: "2rem",

						alignItems: "center",
					}}
				>
					<CustomButton
						className="aibutton"
						label={loading ? "Loading..." : "Get Price"}
						onClick={handleSubmit}
						icon={loading ? <CircularProgress size={24} /> : null}
						sx={{ height: "51px", width: "145px" }}
					/>

					<CustomButton
						className="aibutton"
						label="Send Email"
						onClick={sendEmail}
						sx={{ height: "51px", width: "145px" }}
					/>
					<CustomButton
						className="aibutton"
						label="Download PDF"
						onClick={downloadPDF}
						sx={{ height: "51px", width: "14 5px" }}
					/>
				</Box>

				{error && <Alert severity="error">{error}</Alert>}
			</Box>

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
						height: "480px",
						border: "1px solid #ccc",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#f9f9f9",
						padding: 2,
						borderRadius: "10px", // Rounded corners

						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
					}}
				>
					{pdfPreview ? (
						<iframe
							src={pdfPreview}
							width="100%"
							height="100%"
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
						marginTop: 5,
					}}
				>
					<CustomButton
						label="Preview PDF"
						onClick={() => generatePDF(false)}
						className="aipreview"
						sx={{
							fontFamily: "Poppins, sans-serif !important",
							fontSize: "18px !important",
							fontWeight: "500",
							color: "#212429",
							backgroundColor: "#DDF580",
							height: "51px",
						}}
					/>
				</Box>
				{showConfirmation && <SuccessPopup message="Email Sent!" />}
			</Box>
		</Box>
	);
};

export default AiPricingPage;
