import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import CustomButton from "../../components/Button/Button";
import Typography from "@mui/material/Typography";
import CustomDropdown from "../../components/DropDown/DropDown";
import CustomTextField from "../../components/Input field/InputField";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const navigate = useNavigate();
const steps = ["General Lease Information", "Lease Terms & Payments", "Additional Terms & Actions"];

export default function NewLeaseAgreement() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const [clientDetails, setClientDetails] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState<any[]>([]);
  const [clientAddress, setClientAddress] = useState<any[]>([]);

  useEffect(() => {
    const getAllClients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/client/getclients`);
        setClientDetails(response.data.data); // Update state with client details
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    getAllClients();
  }, []);

  const [formData, setFormData] = React.useState({
    client: "",
    billboardLocation: "",
    legalDescription: "",
    campaignStartDate: "",
    campaignEndDate: "",
    securityDeposit: "",
    rentAmount: "",
    rentPaymentFrequency: "",
    lateFeeAmount: "",
    paymentAddress: "",
    annualRentIncrease: "",
    percentageIncrease: "",
    flatRateIncrease: "",
    earlyTerminationAllowed: "",
    earlyTerminationFee: "",
    maintenanceResponsibility: ""
  });

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex(( i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleStep = (step: number) => () => setActiveStep(step);

  const handleComplete = async () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleSubmit = async () => {
    console.log("Final Form Data Before Submission:", formData);
    try {
      const response = await axios.post(`${BASE_URL}/api/leaseagreement/createLeaseAgreements`, formData);
      navigate("/lease");
      console.log("Response from API:", response.data);
    } catch (error: any) {
      console.error("Error saving lease:", error);
      if (error.response) {
        console.error("Backend Error Response:", error.response.data.error);
      }
    }
  };

  const handleClientChange = (selectedClientName: string) => {
    const clientInfo = clientDetails.find((client) => client.client_name === selectedClientName);
    if (clientInfo) {
      console.log(`Selected Client ID: ${clientInfo._id}`);
      setCompanyName(clientInfo.company_name);
      setClientAddress(clientInfo.address);
      setFormData((prevState) => ({
        ...prevState,
        client: clientInfo._id,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({
      client: "",
      billboardLocation: "",
      legalDescription: "",
      campaignStartDate: "",
      campaignEndDate: "",
      securityDeposit: "",
      rentAmount: "",
      rentPaymentFrequency: "",
      lateFeeAmount: "",
      paymentAddress: "",
      annualRentIncrease: "",
      percentageIncrease: "",
      flatRateIncrease: "",
      earlyTerminationAllowed: "",
      earlyTerminationFee: "",
      maintenanceResponsibility: ""
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New Lease Agreement
      </Typography>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 3 }}>
        {allStepsCompleted() ? (
          <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Box>
        ) : (
          <Box>
            {activeStep === 0 && (
              <Box sx={{p:2}}>
                <Typography>Client Details*</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <CustomDropdown options={clientDetails.map((client) => client.client_name)} 
                    onChange={handleClientChange} label="Choose Client" />
                  <CustomTextField  value={companyName} label="Choose Company" />
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField  label="Location" />
                  <CustomTextField value={clientAddress} label="Client Address" />
                </Stack>
                <Typography>Billboard Details*</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField  onChange={handleChange} name="billboardLocation"
                    label="Billboard Location" />
                  <CustomTextField onChange={handleChange} name="legalDescription" label="Legal Description" />
                </Stack>
                <FormControl sx={{p:2}}>
                  <FormLabel>Will the Tenant be the only party allowed to use the property during this Agreement?</FormLabel>
                  <RadioGroup  onChange={handleChange} >
                    <FormControlLabel value="true" name="tenantIsOnlyUser" control={<Radio />} label="Yes, only the Tenant may use the property" />
                    <FormControlLabel  value="false" name="tenantIsOnlyUser" control={<Radio />} label="No, other parties may use or construct on the property" />
                  </RadioGroup>
                </FormControl>
                <FormControl sx={{p:2}}>
                  <FormLabel>Will the Tenant be the only party allowed to use the billboard during this Agreement, or will third parties use the billboard (e.g., rotating advertisements on one billboard)?</FormLabel>
                  <RadioGroup  onChange={handleChange}>
                    <FormControlLabel value="true" name="tenantIsUsingBillboard" control={<Radio />} label="Yes, only the Tenant may use the billboard" />
                    <FormControlLabel value="false" name="tenantIsUsingBillboard" control={<Radio />} label="No, other parties may use or construct on the property" />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField label="leaseStart" type="date" name="campaignStartDate" onChange={handleChange} className="date" />
                  <CustomTextField label="leaseEnd" type="date" name="campaignEndDate" onChange={handleChange} className="date" />
                  <CustomTextField name="securityDeposit" onChange={handleChange} label="Amount of Security Deposit" />
                </Stack>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <FormControl sx={{p:2}}>
                    <FormLabel>Will there be an annual increase in rent?</FormLabel>
                    <RadioGroup  onChange={handleChange}>
                      <FormControlLabel value="true" name="annualRentIncrease" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" name="annualRentIncrease" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                  <CustomTextField name="rentAmount" onChange={handleChange} label="Rent Amount" />
                </Stack>
                <Typography>Pricing Details*</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField name="percentageIncrease" onChange={handleChange} label="Percentage Increase" />
                  <CustomTextField name="flatRateIncrease" onChange={handleChange} label="Flat Rate Increase" />
                </Stack>
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{p:2}}>
                <Typography>Rental Payment Terms & Policies*</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField name="rentPaymentFrequency" onChange={handleChange} label="How often will you pay rent?*" />
                  <CustomTextField name="lateFeeAmount" onChange={handleChange} label="Late Fee Amount" />
                </Stack>
                <CustomTextField name="paymentAddress" onChange={handleChange} label="Payment Address / Mailing Information*" />
                <Typography>Early Lease Termination Policy*</Typography>
                <FormControl sx={{p:2}}>
                    <FormLabel>Can the Tenant Terminate the Lease Early?</FormLabel>
                    <RadioGroup onChange={handleChange}>
                      <FormControlLabel value="true" name="earlyTerminationAllowed" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" name="earlyTerminationAllowed" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{p:2}}>
                    <FormLabel>Will the Tenant Be Required to Pay an Early Termination Fee?</FormLabel>
                    <RadioGroup onChange={handleChange}>
                      <FormControlLabel value="true" name="earlyTerminationFee" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" name="earlyTerminationFee" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{p:2}}>
                    <FormLabel>Which party will be responsible for providing maintenance, such as cleaning graffiti or repairing weather damage, to the billboard?</FormLabel>
                    <RadioGroup onChange={handleChange}>
                      <FormControlLabel value="Landlord" name="maintenanceResponsibility" control={<Radio />} label="Landlord" />
                      <FormControlLabel value="Tenant" name="maintenanceResponsibility" control={<Radio />} label="Tenant" />
                    </RadioGroup>
                </FormControl>
                <CustomButton 
                sx={{ mt: 2 }} label="Save" onClick={handleSubmit} />
              </Box>
            )}

            {/* Stepper Controls */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: "inline-block" }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
