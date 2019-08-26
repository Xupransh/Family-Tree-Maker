import { SGraphSchema, SModelRootSchema, SNodeSchema, SEdgeSchema, SModelElementSchema, SLabelSchema } from "sprotty";
import data from '../data/data-format.json';

function familyToNode(element: any): SNodeSchema {
    return <SNodeSchema>{
        id: element.id,
        type: 'node',
        size: {width:200, height:200}
    };
}

function initializeModel(): SModelRootSchema {
    const children : SModelElementSchema[] = [];

    data.nodes.forEach(element => {
        if (element.type === "comp") {
            const components = element.contains!.map(familyToNode);
            children.push(<SNodeSchema> {
                    id: element.id,
                    type: 'node:comp',
                    size: { width: 500, height: 500 },
                    children: components,
                });
        } else {
            children.push(familyToNode(element))
        }
    });

    data.edges.forEach(element => {
        children.push(<SEdgeSchema>{
            id: element.id,
            type: 'edge',
            routerKind: 'manhattan',
            sourceId: element.sourceID,
            targetId: element.targetID,
            children: [<SLabelSchema> {
                id: 'label'+element.id,
                type: 'label',
                text: element.label,
                edgePlacement: {
                    position: 0.5,
                    side: 'bottom'
                }
            }]
        });
    });
    return <SGraphSchema> {
        id: 'graph',
        type: 'graph',
        children: children
    };
}

export default initializeModel;

