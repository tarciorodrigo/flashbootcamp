import { Card, CardContent, CardHeader } from "../ui/card";

export function StatusCard() {
    return (
        <Card>
            <CardHeader>
                <h1>Total de tarefas</h1>
            </CardHeader>
            <CardContent>
                <h2>10</h2>
            </CardContent>
        </Card>
    )
}