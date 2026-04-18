import type { ElementType } from "react";
import type { RegisterOptions } from "react-hook-form";

export type SelectOption = {
    value: string;
    label: string;
};

export type SearchSelectOption<T = any> = {
    id: number;
    value: T;
    label: string;
};

type BaseField = {
    name: string;
    label: string;
    rules?: RegisterOptions;
    disabled?: boolean;
    startAdornment?: ElementType | string;
    endAdornment?: ElementType | string;
};

type TextField = BaseField & { type: "text" | "email" | "password" | "textarea" };

type NumberField = BaseField & {
    type: "number";
    step?: number;
    unit?: string;
};

type SelectField = BaseField & {
    type: "select";
    options: SelectOption[];
};

type SearchSelectField = BaseField & {
    type: "searchSelect";
    options: SearchSelectOption[];
};

type SearchSelectMultipleField = BaseField & {
    type: "searchSelectMultiple";
    options: SearchSelectOption[];
};

type CronField = BaseField & {
    type: "cron";
    fields: "weekDays"[];
};

export type FormFieldSchema =
    | TextField
    | NumberField
    | SelectField
    | SearchSelectField
    | SearchSelectMultipleField
    | CronField;