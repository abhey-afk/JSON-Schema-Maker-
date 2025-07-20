export interface SchemaField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'nested';
  defaultValue?: string | number;
  children?: SchemaField[];
}

export interface FormField {
  name: string;
  type: 'string' | 'number' | 'nested';
  children?: FormField[];
}