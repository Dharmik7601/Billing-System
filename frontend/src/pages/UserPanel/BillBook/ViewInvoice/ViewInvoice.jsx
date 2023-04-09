// import { Container, Button } from "react-bootstrap"; 
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import { Container, Button } from "react-bcheckAuthootstrap";
import { useEffect, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Invoice from "../../../../components/Invoice/Invoice"
import { checkAuth } from '../../../../components/AdditonalFunc/checkAuth';


const ViewInvoice = () => {

	const Navigate = useNavigate()

	const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

	const { invoiceId } = useParams()

	const [invoiceDetails, setInvoiceDetails] = useState({}) 
	const [itemDetails,setItemDetails] = useState([])
	const [partyDetails, setPartyDetails] = useState({})
	const [companyDetails,setCompanyDetails] = useState({})
	
	useEffect(() => {
		getInvoiceDetails()
		isUser()
	},[])
	
    const getInvoiceDetails = async () => {

		try {
                    await axios.get(`${process.env.REACT_APP_LINK}/invoice/get/info/${invoiceId}`, {
                        withCredentials: true
					}).then(response => {;
                        setItemDetails(response.data.itemDetails)
						setInvoiceDetails(response.data.invoiceDetails)
						setPartyDetails(response.data.partyDetails)
						setCompanyDetails(response.data.companyDetails)
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
			doc.save(`${invoiceDetails.billBookType}_${invoiceDetails.billBookNumber}_${invoiceDetails.billBookFinancialYear}.pdf`);
		})
	}



	return (
		<>
			<Container fixed>
			<div className="invoiceContainer">
					<Invoice invoiceDetails={invoiceDetails} itemDetails={itemDetails} partyDetails={partyDetails} companyDetails={companyDetails} />
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