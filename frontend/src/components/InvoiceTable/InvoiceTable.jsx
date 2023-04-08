import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const InvoiceTable = ( {rowData,invoiceType} ) => {

const getTaxRate = () => {
  if (invoiceType === 'Estimate') {
      return 0.0
  }
  return 0.12
}

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, price) {
  console.log(qty, price);
  return qty * price;
}

function createRow(desc, qty, qtyType, price) {
  const rowTotal = priceRow(qty, price)
  return { desc, qty, qtyType, price,rowTotal };
}

function subtotal(items) {
  return items.map(({ rowTotal }) => rowTotal).reduce((sum, i) => sum + i, 0);
}

// const rowData = [{
//   itemName: 'Paperclips (Box)',
//   itemPrice: 100,
//   itemQuantity: 1.15,
//   itemQuantityType: 'Dozen'
// },
// {
//   itemName: 'Paperclips2222 (Box)',
//   itemPrice: 100,
//   itemQuantity: 1.15,
//   itemQuantityType: 'Dozen'
//   },
// {
//   itemName: 'Paperclips123 (Box)',
//   itemPrice: 100,
//   itemQuantity: 1.15,
//   itemQuantityType: 'Dozen'
// }]


const rows = [
  // createRow('Paperclips (Box)', 100, 1.15),
  // createRow('Paper (Case)', 10, 45.99),
  // createRow('Waste Basket', 2, 17.99),
];

const createRows = () => {
  rowData.map((singleRow) => {
    rows.push(createRow(singleRow.itemName,singleRow.itemQuantity,singleRow.itemQuantityType,singleRow.itemPrice))
  })
}

createRows()


const invoiceSubtotal = subtotal(rows);
const invoiceSubTaxes = (getTaxRate() * invoiceSubtotal) / 2
const invoiceTaxes = getTaxRate() * invoiceSubtotal;
const invoiceTotal = getInvoiceTotal();

function getInvoiceTotal() {
  if (invoiceType === 'Estimate') {
    return invoiceSubtotal
  }
  return invoiceSubtotal + invoiceTaxes
}
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 400 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Quantiy</TableCell>
            <TableCell align="right">Quantity Type</TableCell>
            <TableCell align="right">Price Per Quantity</TableCell>
            <TableCell align="right">Initial</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.qtyType}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{ccyFormat( row.rowTotal)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell colSpan={2}>CGST</TableCell>
            <TableCell align="right">{`${((getTaxRate() / 2) * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubTaxes)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell colSpan={2}>SGST</TableCell>
            <TableCell align="right">{`${((getTaxRate() / 2) * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubTaxes)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Tax Sub Total</TableCell>
            <TableCell align="right">{`${((getTaxRate()) * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
          
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvoiceTable