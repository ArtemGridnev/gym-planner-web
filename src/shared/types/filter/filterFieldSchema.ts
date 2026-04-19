import type { BaseField, NumberField, SearchSelectField, SearchSelectMultipleField, SelectField, TextField } from "../form/formFieldSchema";

type SearchField = {
    type: 'search';
};

export type FilterFieldSchema = Omit<BaseField, 'rules'> 
& (SearchField | TextField | SelectField | SearchSelectField | SearchSelectMultipleField | NumberField) & {
    debounce?: number
};