import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomButton from "../../components/Button/Button";
import CustomDropdown from "../../components/DropDown/DropDown";
import { CircularProgress, Typography, Box, Alert } from "@mui/material";
import "./AiPricing.css"; // Import the CSS file
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Billboard {
	_id: string;
	location: string;
	type: string;
	size: string;
	month: string;
}

const AiPricingPage: React.FC = () => {
	const [billboards, setBillboards] = useState<Billboard[]>([]); // Store fetched billboards
	const [formData, setFormData] = useState({
		location: "",
		type: "Digital Billboard",
		size: "",
		month: "January",
		selectedBillboard: "", // This will hold the selected billboard
	});
	const [price, setPrice] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch billboards from the backend
	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/billboard/getbillboards`)
			.then((response) => {
				setBillboards(response.data);
			})
			.catch((err) => {
				console.error("Error fetching billboards:", err);
				setError("Failed to fetch billboards.");
			});
	}, []);

	// Handle form input changes
	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Handle form submission to fetch price estimate
	const handleSubmit = async () => {
		setLoading(true);
		setPrice(null);
		setError(null);

		try {
			const response = await axios.post(
				`${BASE_URL}/api/aipricing/billboardprice`,
				formData
			);
			setPrice(response.data.price);
		} catch (err) {
			console.error("Error fetching price:", err);
			setError("Failed to get price from AI.");
		} finally {
			setLoading(false);
		}
	};

	// Filter billboards based on location selected
	const availableSizes = billboards
		.filter((billboard) => billboard.location === formData.location)
		.map((billboard) => billboard.size);

	return (
		<Box
			sx={{
				padding: 4,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				maxWidth: "1200px", // Limit max width
				margin: "0 auto", // Center the container
			}}
		>
			<Typography variant="h3" gutterBottom className="aipricing-title">
				AI Pricing Estimation
			</Typography>

			<form onSubmit={(e) => e.preventDefault()} className="aipricing-form">
				{/* First Row: Location & Type */}
				<Box sx={{ display: "flex", gap: 2, width: "100%" }}>
					<CustomDropdown
						placeholder="Select location of the billboard"
						className="aipricing-dropdown"
						options={billboards
							.map((billboard) => billboard.location)
							.filter((value, index, self) => self.indexOf(value) === index)}
						label="Select Billboard Location"
						onChange={(value) => handleInputChange("location", value)}
					/>

					<CustomDropdown
						className="aipricing-dropdown"
						options={[
							"Digital Billboard",
							"Prism Billboard",
							"Banner Billboard",
						]}
						label="Select Billboard Type"
						onChange={(value) => handleInputChange("type", value)}
						placeholder="Select the type of billboard"
					/>
				</Box>

				{/* Second Row: Size & Month */}
				<Box sx={{ display: "flex", gap: 2, width: "100%", mt: 2 }}>
					<CustomDropdown
						className="aipricing-dropdown"
						options={availableSizes.filter(
							(value, index, self) => self.indexOf(value) === index
						)}
						label="Select Billboard Size"
						placeholder="Select the size of the billboard"
						onChange={(value) => handleInputChange("size", value)}
					/>

					<CustomDropdown
						className="aipricing-dropdown"
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
						label="Select Rental Month"
						placeholder="Select the month for rental"
						onChange={(value) => handleInputChange("month", value)}
					/>
				</Box>

				{/* Button Section */}
				<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
					<CustomButton
						label={loading ? "Loading..." : "Get Price Estimate"}
						onClick={handleSubmit}
						icon={
							loading ? <CircularProgress size={24} color="inherit" /> : null
						}
						className="aipricing-button"
					/>
				</Box>
			</form>

			{/* Display AI Price */}
			{price && (
				<Box className="aipricing-price-box">
					<Typography variant="h5" color="primary">
						Estimated Price: {price}
					</Typography>
				</Box>
			)}

			{/* Display Error or Success Message */}
			{error && (
				<Alert className="aipricing-error" severity="error">
					{error}
				</Alert>
			)}
		</Box>
	);
};

export default AiPricingPage;
