import Card from "../../../shared/components/layout/card/Card";
import CardHeader from "../../../shared/components/layout/card/CardHeader";
import CardContent from "../../../shared/components/layout/card/CardContent";
import TrainingSessionsWidget from "../remotes/TrainingSessionsWidget";
import { Container } from "@mui/material";

export default function TrainSessions() {
    return (
        <Card>
            <CardHeader
                title="Today's Sessions"
            />
            <CardContent>
                <Container maxWidth="sm">
                    <TrainingSessionsWidget />
                </Container>
            </CardContent>
        </Card>
    );
}