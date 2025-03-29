import "./SuccessPopup.css";

interface SuccessPopupProps {
	message: any;
}
const SuccessPopup: React.FC<SuccessPopupProps> = ({ message }) => {
	return (
		<div className="confirmation-card">
			<div className="confirmation-content">
				<p className="confirmation-text">{message}</p>
			</div>
		</div>
	);
};
export default SuccessPopup;
