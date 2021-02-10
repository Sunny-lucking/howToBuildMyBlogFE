import ReactMarkdown from 'react-markdown'
import CodeBlock from 'components/CodeBlock'
interface ReactMarkProps {
    content: string
}
function ReactMarkdownContainer(props:ReactMarkProps) {
    return (
        <ReactMarkdown
            source={props.content}
            renderers={{
                code: CodeBlock
            }}
            escapeHtml={false}></ReactMarkdown>
    )
}

export default ReactMarkdownContainer

