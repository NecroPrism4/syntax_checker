export interface TableData {
	type: "int" | "string" | "date" | "boolean";
	variable: string;
	value: number | string | Date | boolean;
}
