import {useEffect} from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
// 设置高亮的语言
import { jsx, javascript,} from "prism";
function CodeBlock(props: any) {
    const { language, value } = props;
    useEffect(() => {
        // 注册要高亮的语法，
        // 注意：如果不设置打包后供第三方使用是不起作用的
        SyntaxHighlighter.registerLanguage("jsx", jsx);
        SyntaxHighlighter.registerLanguage("javascript", javascript);
        SyntaxHighlighter.registerLanguage("js", javascript);
    }, [])
    return (
        <figure className="highlight">
            <SyntaxHighlighter language={language} style={xonokai}>
                {value}
            </SyntaxHighlighter>
        </figure>
    );
}

export default CodeBlock;
