import { useMemo } from "react";
import Card from "../../../shared/components/layout/card/Card";
import type { Train } from "../types/train";
import { AddOutlined, DeleteOutline, EditOutlined, SportsMartialArtsOutlined } from "@mui/icons-material";
import { cronToDays } from "../../../shared/utils/cron";
import type { DataCardListColumnProps, DataCardListRowProps } from "../../../shared/components/dataCardList/DataCardList";
import { Box } from "@mui/material";
import CardHeader from "../../../shared/components/layout/card/CardHeader";
import CardContent from "../../../shared/components/layout/card/CardContent";
import DataCardListSkeleton from "../../../shared/components/dataCardList/skeleton/DataCardListSkeleton";
import DataCardList from "../../../shared/components/dataCardList/DataCardList";
import { useNavigate } from "react-router-dom";
import ListState from "../../../shared/components/list/ListState";

type TrainsCardProps = {
    trains?: Train[];
    isLoading: boolean;
    error: string | null;
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onFiltersChange: (filters: Record<string, string>) => void;
};

const columns: DataCardListColumnProps[] = [
    { field: 'weekDays', name: 'Recurrence Days', fullWidth: true }
];

export default function TrainsCard({ trains, isLoading, error, onAdd, onEdit, onDelete }: TrainsCardProps) {
    const navigate = useNavigate();

    const rows = useMemo<DataCardListRowProps[] | null>(() => {
        if (!trains) return [];

        return trains?.map(train => ({
            icon: SportsMartialArtsOutlined,
            title: train.name,
            data: {
                weekDays: cronToDays(train.recurrenceCron)
            },
            menuItems: [
                { 
                    icon: EditOutlined, 
                    text: 'edit', 
                    onClick: () => onEdit(train.id),
                    testid: `edit-train-button`
                },
                { 
                    icon: DeleteOutline, 
                    text: 'delete', 
                    onClick: () => onDelete(train.id),
                    testid: `delete-train-button` 
                },
            ],
            onClick: () => navigate(`/managment/trains/${train.id}`)
        }));
    }, [trains])

    return (
        <Card data-testid="trains-page">
            <CardHeader 
                title="Trainings"
                actions={[
                    {
                        icon: AddOutlined,
                        label: 'Create Training',
                        tooltip: 'Create Training',
                        onClick: onAdd,
                        testid: 'create-train-button'
                    }
                ]}
            />
            <CardContent>
                <Box 
                    sx={{ 
                        height: '100%',
                        padding: 2,
                        overflowY: isLoading ? 'hidden' : 'auto'
                    }}
                >
                    <ListState 
                        errors={error ? [error] : []} 
                        isLoading={isLoading} 
                        isEmpty={rows ? rows.length === 0 : false}
                        skeleton={<DataCardListSkeleton columns={1} rows={8} icon={true} menuItems={true} />}
                        emptyMessage="No trainings here… yet."
                    >
                        {rows && (
                            <DataCardList data-testid="trains-list" columns={columns} rows={rows} />
                        )}
                    </ListState>
                </Box>
            </CardContent>
        </Card>
    );
}