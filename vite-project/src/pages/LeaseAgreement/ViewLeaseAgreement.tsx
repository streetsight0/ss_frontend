import { Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import CustomButton from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";

const ViewLeaseAgreement: React.FC = () => {
    const location = useLocation();
    const leaseData = location.state?.leaseData; 
    console.log(leaseData);
    const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }
  const downloadPDF = () => {
    const input = document.getElementById("lease-agreement");

    if (input) {
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190; 
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            pdf.save("Lease_Agreement.pdf");
        });
    }
  }; 
  
  const sendEmail = async () => {
    const input = document.getElementById("lease-agreement");

    if (!input) {
        console.log("Failed to generate PDF. Please try again.");
        return;
    }

    try {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

        // Convert PDF to Blob
        const pdfBlob = new Blob([pdf.output("blob")], { type: "application/pdf" });

        // Prepare FormData
        const formData = new FormData();
        formData.append("pdf", pdfBlob, "Lease_Agreement.pdf"); 
        formData.append("to", "maraheemkhanazher@gmail.com");
        formData.append("subject", "Lease Agreement");
        formData.append(
            "body",
            `Hi ${leaseData?.client?.client_name},
              Please find the attached lease agreement for your review.

            Best regards,  
            Team Street Sight`
        );

        // Send email
        await apiClient.post("/api/invoice/sendInvoiceEmail", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Invoice email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        console.log("Failed to send invoice email. Please try again.");
    }
};


  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <>
      <Paper id="lease-agreement" elevation={3} sx={{ padding: 4,
          maxWidth: 1000,
          borderRadius: "16px",
          border: "2px solid #D9D9D9",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor:"#F4F2FF",
          margin:"0 auto"}}>
        <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
          Lease Agreement
        </Typography>

        <Typography variant="body1" >
          This Lease Agreement is entered into between <strong>{leaseData?.client?.client_name}</strong>, operating as <strong>{leaseData?.client?.company_name}</strong>, located in <strong>{leaseData?.client?.address}</strong>, hereinafter referred to as the "Tenant," and the property owner, hereinafter referred to as the "Landlord." This agreement pertains to the lease of a billboard situated at <strong>{leaseData?.billboardLocation}</strong>, legally described as <strong>{leaseData?.legalDescription}</strong>.
        </Typography>

        <Typography variant="body1" >
          <strong>Billboard Usage:</strong>
          <br />
          Under this lease agreement, <strong>{leaseData?.tenantIsOnlyUser ? "Only Tenant": "Multiple Parties "}</strong> may use the property during the lease term. Additionally, <strong>{leaseData?.tenantIsOnlyUser ? "Only Tenant": "Multiple Parties "}</strong> may use the billboard for advertisements, meaning that <strong>{leaseData?.tenantIsUsingBillboard ? "rotating advertisements with third parties will": "rotating advertisements with third parties will not "}</strong> be allowed.
        </Typography>

        <Typography variant="h5" fontWeight="bold" mt={3}>
          LEASE TERMS & PAYMENTS
        </Typography>

        <Typography variant="body1" >
          <strong>Lease Duration:</strong>
          <br />
          The lease shall commence on <strong>{formatDate(leaseData?.campaignStartDate)}</strong> and will remain in effect until <strong>{formatDate(leaseData?.campaignEndDate)}</strong>, unless otherwise terminated under the conditions specified in this agreement.
        </Typography>

        <Typography variant="body1" >
          <strong>Security Deposit:</strong>
          <br />
          Prior to the commencement of this lease, the Tenant shall provide a security deposit of <strong>{leaseData?.securityDeposit}</strong>, which will be held as security for the performance of all terms and conditions outlined in this agreement.
        </Typography>

        <Typography variant="body1" >
          <strong>Rent and Payment Terms:</strong>
          <br />
          The Tenant agrees to pay a rent amount of <strong>{leaseData?.rentAmount}</strong>. Rent payments shall be made <strong>{leaseData?.rentPaymentFrequency}</strong> and will be due on the every month end. Payments must be sent to <strong>{leaseData?.paymentAddress}</strong>, as designated by the Landlord.
        </Typography>

        <Typography variant="body1" >
          A late fee of <strong>{leaseData?.lateFeeAmount}</strong> shall be applied if the rent is not received within the same month of the due date.
        </Typography>

        <Typography variant="body1" >
          <strong>Annual Rent Increase:</strong>
          <br />
          The rent <strong>{leaseData?.annualRentIncrease ? "will": "will not "}</strong> be subject to an annual increase. If applicable, the rent increase will be determined by Percentage Increase:<strong> {leaseData?.percentageIncrease}%</strong> OR Flat Rate Increase: <strong>{leaseData?.flatRateIncrease}</strong>.
        </Typography>

        <Typography variant="h5" fontWeight="bold" mt={3}>
          ADDITIONAL TERMS & ACTIONS
        </Typography>

        <Typography variant="body1" >
          <strong>Rental Payment Policies:</strong>
          <br />
          Rent payments must be made according to the agreed schedule, and all transactions must be processed through <strong>{leaseData?.paymentAddress}</strong> Payments that are not received by the due date will be considered overdue, and the Landlord reserves the right to impose late fees.
        </Typography>

        <Typography variant="body1" >
          <strong>Early Lease Termination:</strong>
          <br />
          The Tenant <strong>{leaseData?.earlyTerminationAllowed ? "is": "is not "}</strong> permitted to terminate the lease early before the agreed-upon end date. If early termination is allowed, the Tenant must provide [Number of Days] prior written notice. The Tenant <strong>{leaseData?.earlyTerminationFee ? "will": "will not "}</strong> be required to pay an early termination fee.
        </Typography>

        <Typography variant="body1" >
          <strong>Billboard Maintenance Responsibilities:</strong>
          <br />
          The responsibility for maintaining the billboard, including cleaning graffiti, repairing weather damage, and ensuring its general upkeep, will fall upon <strong>{leaseData?.maintenanceResponsibility}</strong>.
        </Typography>
      </Paper>
        <Paper
        sx={{
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          border: "2px solid #D9D9D9",
          backgroundColor:"#F4F2FF",
          width: "920px",
          margin: "20px auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Your document is ready
        </Typography>
        <CustomButton
          sx={{
            display: "block",
            margin: "10px auto",
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
          onClick={downloadPDF}
          label="Download"
        />
        <CustomButton
          sx={{
            display: "block",
            margin: "10px auto",
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
          onClick={sendEmail}
          label="Send Mail"
        />
        <CustomButton
          sx={{
            display: "block",
            margin: "10px auto",
            border: "1px solid black",
            color: "black",
            backgroundColor: "white",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={handleBack}
          label="Back"
        />
      </Paper>
    </>
  );
};

export default ViewLeaseAgreement;
