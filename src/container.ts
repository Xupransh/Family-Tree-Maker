import { ContainerModule, Container } from "inversify";
import { TYPES, ConsoleLogger, LogLevel, LocalModelSource, configureModelElement, 
    SGraph, SGraphView, SNode, defaultModule, selectModule,
     moveModule, boundsModule, undoRedoModule, viewportModule,
      hoverModule, exportModule, modelSourceModule, SGraphFactory, SEdge, PolylineEdgeView, SLabel, SLabelView, edgeLayoutModule, fadeModule, routingModule, updateModule, graphModule, edgeEditModule, SRoutingHandle, SRoutingHandleView } from "sprotty";
import {
    ElkLayoutEngine, DefaultElementFilter, IElementFilter, DefaultLayoutConfigurator, ILayoutConfigurator
} from './elk-layout';
import { FamilyTreeView, CompoundNodeView } from "./view";

export default () => {
    const familyModule = new ContainerModule((bind, unbind, isBound, rebind) => {
        bind(ElkLayoutEngine).toSelf().inSingletonScope();
        bind(TYPES.IModelLayoutEngine).toDynamicValue(context => context.container.get(ElkLayoutEngine)).inSingletonScope();
        bind(IElementFilter).to(DefaultElementFilter);
        bind(ILayoutConfigurator).to(DefaultLayoutConfigurator);
        rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
        rebind(TYPES.LogLevel).toConstantValue(LogLevel.log);
        rebind(TYPES.IModelFactory).to(SGraphFactory).inSingletonScope();
        bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
        const context = { bind, unbind, isBound, rebind };
        configureModelElement(context, 'graph', SGraph, SGraphView);
        configureModelElement(context, 'node:comp', SNode, CompoundNodeView)
        configureModelElement(context, 'node', SNode, FamilyTreeView);
        configureModelElement(context, 'edge', SEdge, PolylineEdgeView);
        configureModelElement(context, 'label', SLabel, SLabelView);
        configureModelElement(context, 'routing-point', SRoutingHandle, SRoutingHandleView);
        configureModelElement(context, 'volatile-routing-point', SRoutingHandle, SRoutingHandleView);
    });

    const container = new Container();
    container.load(defaultModule, selectModule, moveModule, boundsModule, undoRedoModule,
        viewportModule, fadeModule, hoverModule, exportModule,
        updateModule, graphModule, routingModule, edgeEditModule, edgeLayoutModule, modelSourceModule, familyModule);
    return container;
};
