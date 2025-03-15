import { Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

const ViewLeaseAgreement: React.FC = () => {
    const location = useLocation();
    const leaseData = location.state?.leaseData; 
    console.log(leaseData);
  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Lease Agreement
      </Typography>

      <Typography variant="body1" >
        This Lease Agreement is entered into between <strong>{leaseData?.client?.client_name}</strong>, operating as <strong>{leaseData?.client?.company_name}</strong>, located in <strong>{leaseData?.client?.address}</strong>, with an address at <strong>???</strong>, hereinafter referred to as the "Tenant," and the property owner, hereinafter referred to as the "Landlord." This agreement pertains to the lease of a billboard situated at <strong>{leaseData?.billboardLocation}</strong>, legally described as <strong>{leaseData?.legalDescription}</strong>.
      </Typography>

      <Typography variant="body1" >
        <strong>Billboard Usage:</strong>
        <br />
        Under this lease agreement, <strong>{leaseData?.tenantIsOnlyUser ? "Only Tenant": "Multiple Parties "}</strong> may use the property during the lease term. Additionally, [only the Tenant/multiple parties] may use the billboard for advertisements, meaning that [rotating advertisements from third parties will/will not] be allowed.
      </Typography>

      <Typography variant="h5" fontWeight="bold" mt={3}>
        LEASE TERMS & PAYMENTS
      </Typography>

      <Typography variant="body1" >
        <strong>Lease Duration:</strong>
        <br />
        The lease shall commence on [Lease Start Date] and will remain in effect until [Lease End Date], unless otherwise terminated under the conditions specified in this agreement.
      </Typography>

      <Typography variant="body1" >
        <strong>Security Deposit:</strong>
        <br />
        Prior to the commencement of this lease, the Tenant shall provide a security deposit of [Amount], which will be held as security for the performance of all terms and conditions outlined in this agreement.
      </Typography>

      <Typography variant="body1" >
        <strong>Rent and Payment Terms:</strong>
        <br />
        The Tenant agrees to pay a rent amount of [Rent Amount]. Rent payments shall be made [Monthly/Quarterly/Annually] and will be due on the [Day of the Week/Month]. Payments must be sent to [Payment Address], as designated by the Landlord.
      </Typography>

      <Typography variant="body1" >
        A late fee of [Late Fee Amount] shall be applied if the rent is not received within [Number of Days] of the due date.
      </Typography>

      <Typography variant="body1" >
        <strong>Annual Rent Increase:</strong>
        <br />
        The rent [will/will not] be subject to an annual increase. If applicable, the rent increase will be determined by [Percentage Increase/Flat Rate Increase].
      </Typography>

      <Typography variant="body1" >
        <strong>Property Insurance Requirement:</strong>
        <br />
        The Tenant [is/is not] required to maintain property insurance on the billboard during the lease term. If required, proof of insurance must be provided before the lease commencement.
      </Typography>

      <Typography variant="h5" fontWeight="bold" mt={3}>
        ADDITIONAL TERMS & ACTIONS
      </Typography>

      <Typography variant="body1" >
        <strong>Rental Payment Policies:</strong>
        <br />
        Rent payments must be made according to the agreed schedule, and all transactions must be processed through [Payment Address/ Mailing Information]. Payments that are not received by the due date will be considered overdue, and the Landlord reserves the right to impose late fees.
      </Typography>

      <Typography variant="body1" >
        <strong>Early Lease Termination:</strong>
        <br />
        The Tenant [is/is not] permitted to terminate the lease early before the agreed-upon end date. If early termination is allowed, the Tenant must provide [Number of Days] prior written notice. The Tenant [will/will not] be required to pay an early termination fee.
      </Typography>

      <Typography variant="body1" >
        <strong>Billboard Maintenance Responsibilities:</strong>
        <br />
        The responsibility for maintaining the billboard, including cleaning graffiti, repairing weather damage, and ensuring its general upkeep, will fall upon [The Landlord/The Tenant].
      </Typography>
    </Paper>
  );
};

export default ViewLeaseAgreement;
