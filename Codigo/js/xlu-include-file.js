async function xLuIncludeFile() {
    let z = document.getElementsByTagName("*");

    for (let i = 0; i < z.length; i++) {
        if (z[i].getAttribute("xlu-include-file")) {
            let a = z[i].cloneNode(false);
            let file = z[i].getAttribute("xlu-include-file");

            try {
                let response = await fetch(file);
                if (response.ok) {
                    let content = await response.text();

                    if (file.includes("-template.html")) {
                        content = replaceTemplatePlaceholders(content, z[i]);
                    }

                    a.removeAttribute("xlu-include-file");
                    a.innerHTML = content;
                    z[i].parentNode.replaceChild(a, z[i]);
                    xLuIncludeFile();
                }
            } catch (error) {
                console.error("Error fetching file:", error);
            }

            return;
        }
    }
}

function replaceTemplatePlaceholders(content, element) {
    const attrs = element.attributes;
    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (attr.name.startsWith("data-")) {
            const key = attr.name.replace("data-", "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            const regex = new RegExp("\\{\\{" + key + "\\}\\}", "g");
            content = content.replace(regex, attr.value ?? "");
        }
    }
    return content;
}

function redirectToPage(event, element, targetPage) {
    event.preventDefault();
    let params = new URLSearchParams();
    const attrs = element.attributes;
    for (let i = 0; i < attrs.length; i++) {
        if (attrs[i].name.startsWith("data-")) {
            const key = attrs[i].name.replace("data-", "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            params.append(key, attrs[i].value || "");
        }
    }
    window.location.href = targetPage + "?" + params.toString();
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }
    return result;
}

function loadTemplateFromURL(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const params = getQueryParams();
    let content = container.innerHTML;
    for (const key in params) {
        content = content.replaceAll("{{" + key + "}}", params[key]);
    }
    container.innerHTML = content;
}