"use client";
import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

export default function Home() {
	const [tableRows, setTableRows] = useState([]);

	// check if the number is even
	const checkEven = (num) => {
		if (num % 2 === 0) {
			return true;
		} else {
			return false;
		}
	};

	// Use Get REST to get the forex rates from the api
	const fetchForexRates = async () => {
		const res = await fetch("https://api.apilayer.com/fixer/latest", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				apikey: process.env.NEXT_PUBLIC_API_KEY,
			},
		});
		const data = await res.json();
		// data.rates is an object, print the object into the table
		const rows = Object.keys(data.rates).map((key) => {
			let color = "";
			if (checkEven(data.rates[key]) || key === "HKD") {
				color = "border border-red-500";
			}
			return (
				<tr key={key} className={color}>
					<TableBodyCell>{key}</TableBodyCell>
					<TableBodyCell>{data.rates[key]}</TableBodyCell>
					<TableBodyCell>{data.rates[key] + 10.0002}</TableBodyCell>
				</tr>
			);
		});
		setTableRows(rows);
	};

	useEffect(() => {
		fetchForexRates();
	}, []);
	return (
		<main>
			<h1 className="text-3xl mb-2">Forex Rates Table</h1>
			<Table>
				<TableHead>
					<tr>
						<TableHeadCell>Name</TableHeadCell>
						<TableHeadCell>Rates</TableHeadCell>
						<TableHeadCell>New Rates</TableHeadCell>
					</tr>
				</TableHead>
				<TableBody>{tableRows}</TableBody>
			</Table>
		</main>
	);
}

const Table = tw.table`
    w-full
    border-collapse
    mb-6
`;

const TableHead = tw.thead`
    border-b
    border-[#BDBDBD]
`;

const TableHeadCell = tw.th`
    text-left
    font-medium
    text-md
    py-2
    px-4
`;

const TableBody = tw.tbody`
    border-b
    border-[#BDBDBD]
`;

const TableBodyCell = tw.td`
    text-left
    font-normal
    text-md
    py-2
    px-4
`;
