export default function HtmlForNubs() {

    const htmlTags = [
        {
            name: "Grassetto",
            code: "<strong></strong>"
        },
        {
            name: "Corsivo",
            code: "<em></em>"
        },
        {
            name: "Sottolineato",
            code: "<u></u>"
        },
        {
            name: "A capo",
            code: "<br/>"
        }
    ];

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="d-block d-lg-flex mb-4">
            {htmlTags.map((tag) => (
                <div key={tag.code}>

                    <button
                        type="button"
                        className="btn btn-sm btn-warning me-4"
                        onClick={() => copyToClipboard(tag.code)}
                    >
                        {tag.name}
                    </button>
                </div>
            ))}

        </div>
    );
}