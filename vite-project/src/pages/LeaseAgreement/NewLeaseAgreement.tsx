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
import apiClient from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../assets/Icons/BackBlack.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const steps = ["General Lease Information", "Lease Terms & Payments", "Additional Terms & Actions"];
interface Billboard {
  _id: string;
  billboard_series: string;
  leaseEnd: string;
  location: any;
}
export default function NewLeaseAgreement() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const [clientDetails, setClientDetails] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState<any[]>([]);
  const [clientAddress, setClientAddress] = useState<any[]>([]);
  const [billboardData, setBillboardData] = useState<Billboard[]>([]);
  const [billboardLocation, setBillboardLocation] = useState<any[]>([]);


  const navigate = useNavigate();
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
    const getBillBoards = async () =>{
      try {
        const response = await axios.get(`${BASE_URL}/api/billboard/getbillboards`);
        console.log(response.data)
        setBillboardData(response.data); 
      }
      catch (error){
        console.log(error);
      }
    };
    getBillBoards();
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

  const handleStep = (step: number) => () => setActiveStep(step);

  const handleSubmit = async () => {
    console.log("Final Form Data Before Submission:", formData);
    try {
      const response = await axios.post(`${BASE_URL}/api/leaseagreement/createLeaseAgreements`, formData);
      navigate("/viewLease", { state: { leaseData: formData } });
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
        paymentAddress: clientInfo.address
      }));
    }
  };
const handleBillboardChange = (selectedBillboard: string) => {
  let billBoardInfo = billboardData.find((billboard) => billboard.billboard_series === selectedBillboard);
  if (billBoardInfo) {
    console.log(`Selected Client ID: ${billBoardInfo._id}`);
    setBillboardLocation(billBoardInfo.location.name)
    setFormData((prevState) => ({
      ...prevState,
      billboardLocation: billBoardInfo.location.name,
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
    <Box sx={{ width: "100%" , display: "flex", justifyContent: "center"}}>
        <Box
          sx={{
            width: "80%",
            backgroundColor: "#F4F2FF",
            borderRadius: "46px", 
            p: 4, 
          }}
        >
      <div className="header-container" style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom:"10px" }}>
        <img src={BackButton} alt="Back" className="back-icon" onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
        <Typography variant="h4" fontWeight="bold" >
          New Lease Agreement
        </Typography>
      </div>

      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}
             sx={{
              padding: "8px", 
              margin: "0", 
              "&:hover": {
                backgroundColor: "transparent", 
              },
            }}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 3 }}>
        {allStepsCompleted() ? (
          <Box>
            <Typography sx={{ mt: 2, mb: 1 }} fontWeight="bold" >
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
                <Typography fontWeight="bold" fontSize="20px" paddingBottom=".7rem">Client Details*</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <CustomDropdown options={clientDetails.map((client) => client.client_name)} 
                    onChange={handleClientChange} label="Choose Client"  sx={{ width: "30vw" }} />
                  <CustomTextField  value={companyName} label="Choose Company" sx={{ width: "30vw" }} />
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomDropdown options={billboardData.map((billboard) => billboard.billboard_series)} 
                    onChange={handleBillboardChange} label="Choose BillBoard"  sx={{ width: "30vw" }}/>
                  <CustomTextField value={clientAddress} label="Client Address"  sx={{ width: "30vw" }} />
                </Stack>
                <Typography>Billboard Details*</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField  value={billboardLocation} name="billboardLocation"
                    label="Billboard Location"  sx={{ width: "30vw" }}/>
                  <CustomTextField onChange={handleChange} name="legalDescription" label="Legal Description"  sx={{ width: "30vw" }}/>
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
                  <CustomTextField label="leaseStart" type="date" name="campaignStartDate" onChange={handleChange} className="date" sx={{ width: "32vw" }} />
                  <CustomTextField label="leaseEnd" type="date" name="campaignEndDate" onChange={handleChange} className="date" sx={{ width: "32vw" }} />
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField name="securityDeposit" onChange={handleChange} label="Amount of Security Deposit" sx={{ width: "32vw" }}  />
                  <CustomTextField name="rentAmount" onChange={handleChange} label="Rent Amount" sx={{ width: "32vw" }}  />
                  </Stack>
                
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <FormControl sx={{p:2}}>
                    <FormLabel>Will there be an annual increase in rent?</FormLabel>
                    <RadioGroup  onChange={handleChange}>
                      <FormControlLabel value="true" name="annualRentIncrease" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" name="annualRentIncrease" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                 
                </Stack>
                <Typography fontWeight="bold" >Pricing Details*</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField name="percentageIncrease" onChange={handleChange} label="Percentage Increase" sx={{ width: "32vw" }} />
                  <CustomTextField name="flatRateIncrease" onChange={handleChange} label="Flat Rate Increase" sx={{ width: "32vw" }} />
                </Stack>
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{p:2}}>
                <Typography fontWeight="bold" >Rental Payment Terms & Policies*</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <CustomTextField name="rentPaymentFrequency" onChange={handleChange} label="How often will you pay rent?*"  sx={{ width: "30vw" }} />
                  <CustomTextField name="lateFeeAmount" onChange={handleChange} label="Late Fee Amount"  sx={{ width: "30vw" }} />
                </Stack>
                <CustomTextField value={clientAddress} label="Payment Address / Mailing Information*"  sx={{ width: "30vw" }} />
                <Typography fontWeight="bold" >Early Lease Termination Policy*</Typography>
                <FormControl sx={{p:2}}>
                    <FormLabel>Can the Tenant Terminate the Lease Early?</FormLabel>
                    <RadioGroup onChange={handleChange}>
                      <FormControlLabel value="true" name="earlyTerminationAllowed" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" name="earlyTerminationAllowed" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{p:2}}>
                    <FormLabel>Tenant Be Required to Pay Property Insurance?</FormLabel>
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
              </Box>
            )}

            {/* Stepper Controls */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              {isLastStep() ? (
                <>
                  <CustomButton sx={{ mt: 2 }} label="Save & Preview" onClick={handleSubmit} />
                </>
              ) : (
                <Button onClick={handleNext}
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "black", 
                  },
                }}>Next</Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
    </Box>
  );
}
