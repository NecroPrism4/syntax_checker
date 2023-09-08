export interface TableData {
  type: "int" | "string" | "date" | "boolean";
  variable: string;
  value: number | string | Date | boolean;
}

export const typeActions = {
  int: (value: string) => parseInt(value, 10).toString(),
  string: (value: string) => value.replace(/"/g, ""),
  date: (value: string) => new Date(value.replace(/"/g, "")).toISOString(),
  boolean: (value: string) => (value === "true").toString(),
};

export const checkType = /(string|int|boolean|date)/;

// Expresión regular para buscar declaraciones de variable válidas en cada línea
export const regexes = {
  int: /^(int)\s+([a-zA-Z_]\w*)\s*=\s*(\d+)\s*;\s*$/,
  string: /^(string)\s+([a-zA-Z_]\w*)\s*=\s*(".+")\s*;\s*$/,
  date: /^(date)\s+([a-zA-Z_]\w*)\s*=\s*new Date\(".+"\)\s*;\s*$/,
  boolean: /^(boolean)\s+([a-zA-Z_]\w*)\s*=\s*(true|false)\s*;\s*$/,
};

export const reasignacionRegex = /^\s*([a-zA-Z_]\w*)\s*=\s*(.*);/;

/* export const expresionRegular =
	/^(int|string|date|boolean)\s+([a-zA-Z_]\w*)\s*=\s*(\d+|".*"|new Date\(".+"\)|true|false)\s*;\s*$/g; */
