import ToggleButtonGroup from "./ToggleButtonGroup";
import type { BaseFieldProps } from "../../types/field/baseFieldProps";
import { Box, Typography } from "@mui/material";

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
  name,
  fields,
  value,
  onChange,
  onBlur,
  label,
  required,
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
                name={name}
                data-testid="days-toggle-button-group"
                label={"Days"}
                required={required}
                disabled={disabled}
                error={error}
                helperText={helperText}
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
                onBlur={onBlur}
                onChange={(values) => {
                  onChange(buildCronFromWeekDays(values));
                }}
              />
            );

          default:
            return null;
        }
      })}
    </Box>
  );
}