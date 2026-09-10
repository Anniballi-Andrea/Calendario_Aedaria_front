import DOMPurify from "dompurify";

export default function SafeHtml({ html }) {

    const cleanHtml = DOMPurify.sanitize(
        html,
        {
            ALLOWED_TAGS: [
                "strong",
                "em",
                "u",
                "br"
            ]
        }
    );

    return (
        <span
            dangerouslySetInnerHTML={{
                __html: cleanHtml
            }}
        />
    );
}