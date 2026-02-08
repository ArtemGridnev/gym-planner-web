import { useEffect, useState } from "react";
import ToggleButtonGroup from "./ToggleButtonGroup";
import { Typography } from "@mui/material";

type CronFieldProps = {
    fields: ('weekDays')[];
    onChange: (cron: string) => void;
    value: string;
    label: string;
    disabled?: boolean;
};

export default function CronField({ fields, onChange, value, label, disabled }: CronFieldProps) {
    const [weekDays, setWeekDays] = useState<string[]>([]);

    useEffect(() => {
        const cron = `0 0 * * ${weekDays.length > 0 ? weekDays.join(',') : '*'}`;

        if (cron !== value) {
            onChange(cron);
        }
    }, [weekDays]);

    useEffect(() => {
        if (!value) return;

        const parts = value?.trim()?.split(' ');
        const valueWeekDays = !parts[4] || parts[4] === '*' ? [] : parts[4].replaceAll('*', '').split(',').filter(str => str !== '');

        if (valueWeekDays.join(',') !== weekDays.join(',')) {
            setWeekDays(valueWeekDays);
        }
    }, [value]);

    return (
        <>
            <Typography variant="subtitle1" component="label">{label}</Typography>
            {fields.map((field) => {
                switch (field) {
                    case 'weekDays':
                        return (
                            <ToggleButtonGroup
                                key={field}
                                label="Days"
                                options={[
                                    { value: '0', name: 'Sun' },
                                    { value: '1', name: 'Mon' },
                                    { value: '2', name: 'Tue' },
                                    { value: '3', name: 'Wed' },
                                    { value: '4', name: 'Thu' },
                                    { value: '5', name: 'Fri' },
                                    { value: '6', name: 'Sat' }
                                ]}
                                value={weekDays}
                                onChange={(values) => setWeekDays(values)}
                                disabled={disabled}
                            />
                        );
                }
            })}
        </>
    );
}