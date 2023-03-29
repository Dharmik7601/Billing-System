import React from 'react'
import './table.scss'
import DataTable, { createTheme } from "react-data-table-component";

const Table = ({columnsData,rowData}) => {

    const clientSummary = [
        {
            ClientID: 1,
            ClientName: "Aaron Ramsey",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p119765.png",
            LoanType: "Aston Villa",
            LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t7.png",
            Gender: "Wales",
            Age: "Jamaica",
            Interest:
                "https://www.countryflags.com/wp-content/uploads/jamaica-flag-png-large.png",
        },
        {
            ClientID: 2,
            ClientName: "Alex Telles",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p152590.png",
            LoanType: "Manchester United",
            LoanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Brazil",
            Age:
                "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
            Interest: "DEF",
        },
        {
            ClientID: 3,
            ClientName: "Allan",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p119765.png",
            LoanType: "Everton",
            LoanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t11.png",
            Gender: "England",
            Age:
                "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
            Interest: "MID",
        },
        {
            ClientID: 2,
            ClientName: "Alex Telles",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p152590.png",
            LoanType: "Manchester United",
            LoanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Brazil",
            Age:
                "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
            Interest: "DEF",
        },
        {
            ClientID: 2,
            ClientName: "Alex Telles",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p152590.png",
            LoanType: "Manchester United",
            LoanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Brazil",
            Age:
                "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
            Interest: "DEF",
        },
        {
            ClientID: 2,
            ClientName: "Alex Telles",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p152590.png",
            LoanType: "Manchester United",
            LoanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Brazil",
            Age:
                "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
            Interest: "DEF",
        },
    ]

    const columns = [
        // {
        //     name: "Client ID",
        //     selector: (row) => row.ClientID,
        //     sortable: true
        // },
        {
            name: "Client Name",
            selector: (row) => row.ClientName,
            sortable: true
        },
        // {
        //     name: "Age",
        //     selector: (row) => row.Interest,
        //     sortable: true
        // },
       
       
    ];
    return (
        <div className='table'>
            <DataTable
                        // title="Example"
                        columns={columnsData}
                        data={rowData}
                        defaultSortFieldId
                        pagination={1}
                        fixedHeader
                        fixedHeaderScrollHeight="220px"
                        // onRowClicked={handleRowClicked}
                        highlightOnHover
                    />
        </div>
    )
}


export default Table