import { Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import CustomButton from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_BASE_URL;

const ViewLeaseAgreement: React.FC = () => {
    const location = useLocation();
    const leaseData = location.state?.leaseData; 
    console.log(leaseData);
    const navigate = useNavigate();
  const handleBack = () => {
    navigate("/lease");
  }
  const downloadPDF = () => {
    const input = document.getElementById("lease-agreement");

    if (input) {
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190; // Adjust width for PDF
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
        formData.append("pdf", pdfBlob, "Lease_Agreement.pdf"); // Attach PDF
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
        await axios.post(`${BASE_URL}/api/invoice/sendInvoiceEmail`, formData, {
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
      <Paper id="lease-agreement" elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "auto", mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
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
      <CustomButton sx={{ mt: 2, display: "block", margin: "auto" }} onClick={downloadPDF}
        label="Download" />
      <CustomButton sx={{ mt: 2, display: "block", margin: "auto" }} onClick={handleBack}
        label="Back to All Lease Agreement" />
      <CustomButton sx={{ mt: 2, display: "block", margin: "auto" }} onClick={sendEmail}
        label="Send to Client" />
    </>
  );
};

export default ViewLeaseAgreement;
