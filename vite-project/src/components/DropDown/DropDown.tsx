import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

interface DropdownProps {
	options: string[];
	label?: string;
	onChange?: (value: string) => void; // Make onChange optional
}

const CustomDropdown: React.FC<DropdownProps> = ({
	options,
	label = "Select",
	onChange,
}) => {
	const [selectedOption, setSelectedOption] = useState<string>("");

	const handleChange = (event: any) => {
		const value = event.target.value;
		setSelectedOption(value);
		if (onChange) {
			onChange(value); // Only call onChange if it exists
		}
	};

	return (
		<FormControl fullWidth>
			{selectedOption === "" && <InputLabel>{label}</InputLabel>}
			<Select
				value={selectedOption}
				onChange={handleChange}
				displayEmpty
				sx={{
					borderRadius: "12px",
					backgroundColor: "white",
					"& .MuiSelect-select": {
						padding: "12px 14px",
						borderRadius: "12px",
					},
				}}
				MenuProps={{
					PaperProps: {
						sx: {
							borderRadius: "12px",
							boxShadow: 3,
						},
					},
				}}
			>
				{options.map((option) => (
					<MenuItem
						key={option}
						value={option}
						sx={{
							"&:hover": {
								backgroundColor: "#e6d9fc",
							},
						}}
					>
						{option}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default CustomDropdown;
