import { TextField, type TextFieldProps } from "@mui/material";
import SearchSelectMultiple from "../fields/SearchSelectMultiple";
import SearchSelect from "../fields/SearchSelect";
import Select from "../fields/Select";
import NumberField from "../fields/NumberField";
import type { FilterFieldSchema } from "../../types/filterFieldSchema";
import { useMemo } from "react";
import type { SearchSelectOption } from "../../types/form/formFieldSchema";

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
                    onChange={(inputValue) => onChange(name, inputValue.value)}
                    options={props.options}
                    {...inputProps}
                />  
            );

        case 'searchSelect':
            return (
                <SearchSelect
                    input={{ ...inputProps, name }}
                    value={value ? props.options.find(o => o.value === value) : null}
                    onChange={(selectedOption) => onChange(name, selectedOption?.id.toString() || '')}
                    options={props.options}
                />
            );
        
        case 'searchSelectMultiple':
            const selected = useMemo(
                () => value?.split(',').map(value => props.options.find(opt => opt.id === +value)).filter(Boolean) as SearchSelectOption[] || [],
                [value, props.options]
            );

            return (
                <SearchSelectMultiple 
                    sx={inputProps?.sx}
                    input={{ ...inputProps, name }}
                    value={selected}
                    onChange={(selectedOptions) => onChange(name, selectedOptions.map(o => o.id).join(','))}
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