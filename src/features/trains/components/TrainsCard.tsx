import { Box, Skeleton, Typography } from "@mui/material";
import Card from "../../../shared/components/layout/card/Card";
import type { Train } from "../types/train";
import { AddOutlined, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { cronToDays } from "../../../shared/utils/cron";
import CardHeader from "../../../shared/components/layout/card/CardHeader";
import CardContent from "../../../shared/components/layout/card/CardContent";
import { useNavigate } from "react-router-dom";
import ListState from "../../../shared/components/list/ListState";
import DataCard from "../../../shared/components/dataCardList/DataCard";
import DataCardSkeleton from "../../../shared/components/dataCardList/skeleton/DataCardSkeleton";
import DataCardListBase from "../../../shared/components/dataCardList/DataCardListBase";

type TrainsCardProps = {
    trains?: Train[];
    isLoading: boolean;
    error: string | null;
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onFiltersChange: (filters: Record<string, string>) => void;
};

const SKELETON_COUNT = 8;

export default function TrainsCard({ trains, isLoading, error, onAdd, onEdit, onDelete }: TrainsCardProps) {
    const navigate = useNavigate();

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
                        testid: 'create-train-button',
                    },
                ]}
            />
            <CardContent>
                <Box
                    sx={{
                        height: '100%',
                        padding: 2,
                        overflowY: isLoading ? 'hidden' : 'auto',
                    }}
                >
                    <ListState
                        errors={error ? [error] : []}
                        isLoading={isLoading}
                        isEmpty={trains ? trains.length === 0 : false}
                        skeleton={
                            <DataCardListBase>
                                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                    <DataCardSkeleton key={i} menuItems>
                                        <Skeleton variant="text" width="60%" sx={{ fontSize: '0.75rem' }} />
                                    </DataCardSkeleton>
                                ))}
                            </DataCardListBase>
                        }
                        emptyMessage="No trainings here… yet."
                    >
                        {trains && (
                            <DataCardListBase data-testid="trains-list">
                                {trains.map(train => {
                                    const weekDays = cronToDays(train.recurrenceCron);
                                    return (
                                        <DataCard
                                            key={train.id}
                                            title={train.name}
                                            onClick={() => navigate(`/managment/trains/${train.id}`)}
                                            menuItems={[
                                                {
                                                    icon: EditOutlined,
                                                    text: 'edit',
                                                    onClick: () => onEdit(train.id),
                                                    testid: `edit-train-button`,
                                                },
                                                {
                                                    icon: DeleteOutline,
                                                    text: 'delete',
                                                    onClick: () => onDelete(train.id),
                                                    testid: `delete-train-button`,
                                                },
                                            ]}
                                        >
                                            {weekDays && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {weekDays}
                                                </Typography>
                                            )}
                                        </DataCard>
                                    );
                                })}
                            </DataCardListBase>
                        )}
                    </ListState>
                </Box>
            </CardContent>
        </Card>
    );
}
