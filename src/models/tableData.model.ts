export interface TableData {
	type: "int" | "string" | "date" | "boolean";
	variable: string;
	value: number | string | Date | boolean;
}

// Expresión regular para buscar declaraciones de variable válidas en cada línea
export const expresionRegular =
	/^(int|string|date|boolean)\s+([a-zA-Z_]\w*)\s*=\s*(\d+|".*"|new Date\(".*"\)|true|false)\s*;\s*$/g;
