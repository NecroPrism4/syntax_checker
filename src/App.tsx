import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TableData, expresionRegular } from "./models/tableData.model";

function App() {
	const [tableData, setTableData] = useState<TableData[]>([]);
	const [textareaValue, setTextareaValue] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const handleInput = (code: string) => {
		const lines: string[] = code.split("\n"); // Dividir el contenido en líneas

		const matches = [];

		for (const line of lines) {
			let match;

			if ((match = expresionRegular.exec(line)) !== null) {
				setError(false);
				console.log(match);
				const type = match[1];
				const variable = match[2];
				let value = match[3];

				// Parsear el valor según el tipo
				if (type === "int") {
					value = parseInt(value, 10).toString();
				} else if (type === "string") {
					value = value.replace(/"/g, ""); // Eliminar comillas
				} else if (type === "date") {
					value = new Date(value.replace(/"/g, "")).toISOString();
				} else if (type === "boolean") {
					value = (value === "true").toString();
				}

				matches.push({ type, variable, value });
			} else setError(true);
		}

		// Actualizar la tabla de valores con las variables encontradas
		setTableData(matches as TableData[]);
	};

	useEffect(() => {
		console.log(tableData);
	}, [tableData]);

	return (
		<div className='main'>
			<div className='d-flex px-5'>
				<a href='https://vitejs.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<div className='d-flex flex-direction-row gap-5 m-5'>
				<div className='form-group inputArea gap-2 d-flex flex-column'>
					<h6>Type here</h6>
					<hr />
					<div className='position-relative'>
						<div className='line-numbers position-absolute'>
							{/* Genera números de línea dinámicamente */}
							{textareaValue.split("\n").map((_, index) => (
								<div key={index}>{index + 1}</div>
							))}
						</div>
						<textarea
							className={`form-control px-5 ${error ? "is-invalid" : ""}`}
							id='exampleFormControlTextarea1'
							rows={20}
							onChange={(e) => {
								handleInput(e.target.value);
								setTextareaValue(e.target.value);
							}}
							value={textareaValue}
						></textarea>
					</div>
				</div>
				<div className='actionArea gap-2 d-flex flex-column'>
					<h6>Here is shown the value's table</h6>
					<hr />
					<table className='table table-striped flex-grow-1'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>type</th>
								<th scope='col'>Variable</th>
								<th scope='col'>Value</th>
							</tr>
						</thead>
						<tbody>
							{tableData.map((data, index) => (
								<tr key={index}>
									<th scope='row'>{index + 1}</th>
									<td>{data.type}</td>
									<td>{data.variable}</td>
									<td>{data.value.toString()}</td>
								</tr>
							))}
						</tbody>
					</table>
					<button
						type='button'
						className='btn btn-primary w-100 align-self-end'
						onClick={() => {
							setTableData([]);
							setTextareaValue("");
						}}
					>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
