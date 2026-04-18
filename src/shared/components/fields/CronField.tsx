import { Box, Typography } from "@mui/material";
import ToggleButtonGroup from "./ToggleButtonGroup";

type BaseFieldProps<T> = {
    value: T;
    onChange: (value: T) => void;
    onBlur?: () => void;
    name: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
};

type CronFieldProps = BaseFieldProps<string> & {
    fields: "weekDays"[];
};

function parseWeekDaysFromCron(value: string): string[] {
    if (!value) return [];

    const parts = value.trim().split(" ");
    const weekDayPart = parts[4];

    if (!weekDayPart || weekDayPart === "*") return [];

    return weekDayPart
        .split(",")
        .map((day) => day.trim())
        .filter(Boolean);
}

function buildCronFromWeekDays(weekDays: string[]) {
    return `0 0 * * ${weekDays.length > 0 ? weekDays.join(",") : "*"}`;
}

export default function CronField({
    fields,
    value,
    onChange,
    onBlur,
    label,
    disabled,
    error,
    helperText,
}: CronFieldProps) {
    const weekDays = parseWeekDaysFromCron(value);

    return (
        <Box>
            {label && (
                <Typography variant="subtitle1" component="label" gutterBottom>
                    {label}
                </Typography>
            )}

            {fields.map((field) => {
                switch (field) {
                    case "weekDays":
                        return (
                            <ToggleButtonGroup
                                key={field}
                                data-testid="days-toggle-button-group"
                                label="Days"
                                options={[
                                    { value: "0", name: "Sun" },
                                    { value: "1", name: "Mon" },
                                    { value: "2", name: "Tue" },
                                    { value: "3", name: "Wed" },
                                    { value: "4", name: "Thu" },
                                    { value: "5", name: "Fri" },
                                    { value: "6", name: "Sat" },
                                ]}
                                value={weekDays}
                                onChange={(values) => {
                                    onChange(buildCronFromWeekDays(values));
                                    onBlur?.();
                                }}
                                disabled={disabled}
                            />
                        );

                    default:
                        return null;
                }
            })}

            {error && helperText && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, display: "block" }}
                >
                    {helperText}
                </Typography>
            )}
        </Box>
    );
}