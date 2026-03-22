import { IconButton, Tooltip } from "@mui/material";
import type { ElementType } from "react";

export type CardHeaderActionProps = {
    icon: ElementType;
    label: string;
    tooltip?: string;
    onClick: () => void;
    testid?: string;
    disabled?: boolean;
};

export default function CardHeaderAction({ icon: Icon, label, tooltip, onClick, testid, disabled }: CardHeaderActionProps) {
    return (
        <Tooltip 
            title={tooltip || ""} 
            data-testid={testid}
        >
            <IconButton onClick={() => onClick()} aria-label={label} disabled={disabled}>
                <Icon />
            </IconButton>
        </Tooltip>
    );
}