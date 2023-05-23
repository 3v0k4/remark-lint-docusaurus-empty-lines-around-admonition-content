import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";
import { generated } from "unist-util-generated";
const rule = lintRule({
    origin: "remark-lint:remark-lint-docusaurus-empty-lines-around-admonition-content",
    url: "https://github.com/3v0k4/remark-lint-docusaurus-empty-lines-around-admonition-content",
}, (tree, file) => {
    visit(tree, (node) => {
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
        const value = childrenArray.map((child) => child.value).join("");
        // [\s\S] matches any character including newlines
        // . matches any character except newlines
        if (/^:::\w+[\s\S]*.\n/.test(value)) {
            file.message(`Add an empty line after the admonition opening ${value.split("\n")[0]}`, node);
        }
        if (/^[\s\S]*.\n:::/.test(value)) {
            file.message(`Add an empty line before the admonition closing :::`, node);
        }
    });
});
export default rule;
