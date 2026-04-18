import { TextField, type TextFieldProps } from "@mui/material";
import SearchSelectMultiple from "../fields/SearchSelectMultiple";
import SearchSelect from "../fields/SearchSelect";
import Select from "../fields/Select";
import NumberField from "../fields/NumberField";
import type { FilterFieldSchema } from "../../types/filterFieldSchema";

export type FilterFieldProps = FilterFieldSchema & {
    value: string;
    onChange: (name: string, value: string) => void;
    inputProps?: Omit<TextFieldProps, 'value' | 'onChange' | 'type'>
};

export default function FilterField(props: FilterFieldProps) {
    const {
        name,
        type,
        value,
        onChange,
        inputProps,
        ...otherProps
    } = props;

    switch (type) {
        case 'number':
            return (
                <NumberField
                    name={name}
                    value={+value}
                    onChange={(inputValue) => onChange(name, inputValue?.toString() || '')}
                    {...otherProps}
                    {...inputProps}
                />  
            );

        case 'select':
            return (
                <Select
                    name={name}
                    value={value}
                    onChange={(inputValue) => onChange(name, inputValue)}
                    options={props.options}
                    {...inputProps}
                />  
            );

        case 'searchSelect':
            return (
                <SearchSelect
                    name={name}
                    textFieldProps={{ ...inputProps }}
                    value={value ?? null}
                    onChange={value => onChange(name, value || '')}
                    options={props.options}
                />
            );
        
        case 'searchSelectMultiple':
            return (
                <SearchSelectMultiple 
                    name={name}
                    sx={inputProps?.sx}
                    textFieldProps={{ ...inputProps }}
                    value={value ? value?.split(',') : []}
                    onChange={(selectedOptions) => onChange(name, selectedOptions.join(','))}
                    options={props.options}
                />
            );

        case 'text': 
        case 'email':
        case 'search':
            return (
                <TextField
                    name={name}
                    type={type}
                    onChange={({ target: { value: inputValue } }) => onChange(name, inputValue)}
                    value={value}
                    {...inputProps}
                ></TextField>
            );
    }
}