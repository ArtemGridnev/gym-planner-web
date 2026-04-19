import SearchSelectMultiple from "../fields/SearchSelectMultiple";
import SearchSelect from "../fields/SearchSelect";
import Select from "../fields/Select";
import NumberField from "../fields/NumberField";
import type { FilterFieldSchema } from "../../types/filter/filterFieldSchema";
import TextInputField from "../fields/TextInputField";
import type { FieldTextUiProps } from "../../types/field/fieldTextUiProps";

export type FilterFieldProps = FilterFieldSchema & {
    value: string;
    onChange: (name: string, value: string) => void;
    textFieldProps?: FieldTextUiProps;
};

export default function FilterField(props: FilterFieldProps) {
    const {
        name,
        type,
        value,
        onChange,
        textFieldProps,
        ...otherProps
    } = props;

    switch (type) {
        case 'number':
            return (
                <NumberField
                    name={name}
                    value={+value}
                    onChange={(inputValue) => onChange(name, inputValue?.toString() || '')}
                    { ...otherProps }
                    { ...textFieldProps }
                />  
            );

        case 'select':
            return (
                <Select
                    name={name}
                    value={value}
                    onChange={(inputValue) => onChange(name, inputValue)}
                    options={props.options}
                    textFieldProps={{ ...textFieldProps }}
                />  
            );

        case 'searchSelect':
            return (
                <SearchSelect
                    name={name}
                    value={+value ?? null}
                    onChange={value => onChange(name, value?.toString() || '')}
                    options={props.options}
                    textFieldProps={{ ...textFieldProps }}
                    />
            );
        
        case 'searchSelectMultiple':
            return (
                <SearchSelectMultiple 
                    name={name}
                    value={value ? value?.split(',') : []}
                    onChange={(selectedOptions) => onChange(name, selectedOptions.join(','))}
                    options={props.options}
                    textFieldProps={{ ...textFieldProps }}
                />
            );

        case 'text': 
        case 'email':
        case 'search':
            return (
                <TextInputField
                    name={name}
                    onChange={(value) => onChange(name, value)}
                    value={value}
                    textFieldProps={{ ...textFieldProps }}
                ></TextInputField>
            );
    }
}