import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";
import { generated } from "unist-util-generated";
const isMissingPrev = (parent, child, index) => {
    if (index === null)
        return false;
    const prev = parent.children[index - 1];
    if (!prev)
        return false;
    if (!prev.position)
        return false;
    if (!child.position)
        return false;
    return (prev.position.end.line === child.position.start.line ||
        prev.position.end.line + 1 === child.position.start.line);
};
const isMissingNext = (parent, child, index) => {
    if (index === null)
        return false;
    const next = parent.children[index + 1];
    if (!next)
        return false;
    if (!next.position)
        return false;
    if (!child.position)
        return false;
    return (child.position.end.line === next.position.start.line ||
        child.position.end.line + 1 === next.position.start.line);
};
const rule = lintRule({
    origin: "remark-lint:remark-lint-docusaurus-empty-lines-around-admonition-content",
    url: "https://github.com/3v0k4/remark-lint-docusaurus-empty-lines-around-admonition-content",
}, (tree, file) => {
    visit(tree, (node, index, parent) => {
        if (generated(node)) {
            return;
        }
        if (node.type !== "paragraph") {
            return;
        }
        if (!("children" in node)) {
            return;
        }
        const childrenArray = node.children;
        childrenArray.forEach((child) => {
            if (/^:::\w+\n/.test(child.value)) {
                file.message(`Add an empty line after the admonition opening ${child.value.split("\n")[0]}`, node);
            }
            if (/\n:::/.test(child.value)) {
                file.message(`Add an empty line before the admonition closing :::`, node);
            }
            if (/^:::\w+/.test(child.value)) {
                if (isMissingNext(parent, child, index)) {
                    file.message(`Add an empty line after the admonition opening :::${child.value.slice(3)}`, node);
                }
            }
            if (/^[\n]*:::$/.test(child.value)) {
                if (isMissingPrev(parent, child, index)) {
                    file.message(`Add an empty line before the admonition closing :::`, node);
                }
            }
        });
    });
});
export default rule;
