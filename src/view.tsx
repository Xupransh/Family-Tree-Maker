/** @jsx svg */
import { svg } from 'snabbdom-jsx';
import { RenderingContext, SNode, IView, RectangularNodeView } from "sprotty";
import { VNode } from "snabbdom/vnode";
import { injectable } from 'inversify';

@injectable()
export class FamilyTreeView implements IView {
    render(node: SNode, context: RenderingContext): VNode {
        const radius = 100;
        const link = "https://icon-library.net/images/generic-person-icon/generic-person-icon-9.jpg"
        return <g>
            <clipPath id={node.id}>
        <circle cx={radius} cy={radius} r={radius} />
        </clipPath> 
            <image width={200} height={200} class-selected={node.selected} href={link} 
            style={{clipPath:"url(#"+node.id+")", boxShadow:"0px 0px 0px 5px rgba(0, 0, 255, .2);"}}/>
        </g>;
    }
}

@injectable()
export class CompoundNodeView extends RectangularNodeView {
    render(node: SNode, context: RenderingContext): VNode {
        return <g class-node={true}>
        <rect class-sprotty-node={true} class-selected={node.selected} class-mouseover={node.hoverFeedback}
              x={0} y={0}
              width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)} />
        {context.renderChildren(node)}
    </g>;
    }
}
