// import { Container, Button } from "react-bootstrap"; 
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Invoice from "../../../../components/Invoice/Invoice"


const ViewInvoice = () => {

	const Navigate = useNavigate()

	const { userId, email, loanId } = useParams()

	const [sanctionLetterDetails,setSanctionLetterDetails] = useState({})
	
	useEffect(() => {
		// getSanctionLetterDetails()
	},[])
	
	const getSanctionLetterDetails = async () => {
		try {
                    await axios.get(`http://localhost:5000/api/v1/admin/getUser/loan/details/saction/letter/details/${userId}/${email}/${loanId}`, {
                        withCredentials: true
                    }).then(response => {
                        setSanctionLetterDetails(response.data)
                    })
                } catch (err) {
                    if (err.response) {
						alert(err.response.data.msg)
						// Navigate('/')
                        return
                    } else {
						alert('Something went wrong!!')
					}
			Navigate('/')
			return
                }
	}

	const [loader, setLoader] = useState(false);

	const downloadPDF = () => {
		const capture = document.querySelector('.invoiceContainer');
		setLoader(true);
		html2canvas(capture).then((canvas) => {
			const imgData = canvas.toDataURL('img/png');
			const doc = new jsPDF('p', 'mm', 'a4');
			const componentWidth = doc.internal.pageSize.getWidth();
			const componentHeight = doc.internal.pageSize.getHeight();
			doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
			setLoader(false);
			console.log(doc);
			doc.save('sanction-letter-.pdf');
		})
	}



	return (
		<>
			<Container fixed>
			<div className="invoiceContainer">
				<Invoice />
			</div>
				<div className="text-center p-3 mb-3">
					<Button
						//className="receipt-modal-download-button"
						onClick={downloadPDF}
						disabled={!(loader === false)}
					>
						{loader ? (
							<span>Downloading</span>
						) : (
							<span>Download</span>
						)}

					</Button>
				</div>
				</Container>
		</>
	);
}

export default ViewInvoice