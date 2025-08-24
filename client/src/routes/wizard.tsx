
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute('/wizard')({
    component: RouteComponent,
})

function RouteComponent() {
    return (<div>hola</div>)
}

export default RouteComponent;