import isInDom from "./is-in-dom";


export default function hasParent(element: any, root: any) {
    return root && root.contains(element) && isInDom(element)
}