import createContainer from "./container";
import { TYPES, LocalModelSource } from "sprotty";
import initializeModel from "./graphFromTree";
import { ElkFactory } from "./elk-layout";
import ElkConstructor from "elkjs";

export default function runStandalone() {
    const DEFAULT = '100';
    const container = createContainer();
    container.bind(ElkFactory).toConstantValue(() => new ElkConstructor({
        defaultLayoutOptions: {
            'elk.spacing.nodeNode': DEFAULT,
            'elk.spacing.edgeEdge': DEFAULT,
            'elk.layered.spacing.edgeNode': DEFAULT,
            'elk.spacing.edgeNode': DEFAULT,
            'elk.layered.thoroughness': DEFAULT,
            'elk.alg.layered.options.LayeringStrategy': 'COFFMAN_GRAHAM',
            'elk.layered.spacing.edgeNodeBetweenLayers': DEFAULT,
            'elk.layered.priority.direction': DEFAULT,
            'elk.layered.mergeHierarchyEdges': 'false',
            'elk.layered.spacing.nodeNodeBetweenLayers': DEFAULT
        },
        algorithms: ['layered']
    }));
    const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
    modelSource.setModel(initializeModel());
}
