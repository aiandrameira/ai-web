declare global {
    interface Window {
        switchCodeTab: (event: Event, tabIndex: number) => void;
        copyCodeToClipboard: (button: HTMLButtonElement, code: string) => void;
        toggleExpandableCode: (button: HTMLButtonElement) => void;
        copyTabCode: (button: HTMLButtonElement) => void;
    }
}

window.switchCodeTab = function (event: Event, tabIndex: number) {
    event.preventDefault();

    const button = event.target as HTMLButtonElement;
    const tabsWrapper = button.closest(".code-tabs-wrapper");

    if (!tabsWrapper) return;

    const allButtons = tabsWrapper.querySelectorAll("button[data-tab]");
    const allContents = tabsWrapper.querySelectorAll(".code-tab-content");

    allButtons.forEach((btn, index) => {
        if (index === tabIndex) {
            btn.classList.add("bg-background", "text-foreground");
            btn.classList.remove("text-muted-foreground");
        } else {
            btn.classList.remove("bg-background", "text-foreground");
            btn.classList.add("text-muted-foreground");
        }
    });

    allContents.forEach((content, index) => {
        if (index === tabIndex) {
            content.classList.remove("hidden");
            content.classList.add("block");
        } else {
            content.classList.add("hidden");
            content.classList.remove("block");
        }
    });
};

window.toggleExpandableCode = function (button: HTMLButtonElement) {
    const overlay = button.closest(".expandable-overlay") as HTMLElement;
    const wrapper = overlay?.closest(".group") as HTMLElement;

    if (!overlay) return;

    if (wrapper) {
        wrapper.classList.remove("h-[250px]");
        wrapper.classList.add("h-auto");
    }
    overlay.remove();
};

function copyCodeToClipboard(button: HTMLButtonElement, code: string): void {
    const showSuccess = () => {
        const originalHTML = button.innerHTML;
        button.innerHTML = `
            <i class="ri-check-double-line text-green-500"></i>
        `;
        button.classList.add("bg-green-50", "border-green-200", "text-green-600");
        button.classList.remove("text-muted-foreground");
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove("bg-green-50", "border-green-200", "text-green-600");
            button.classList.add("text-muted-foreground");
        }, 2000);
    };

    const showError = () => {
        button.classList.add("bg-red-50", "border-red-200", "text-red-600");
        button.classList.remove("text-muted-foreground");
        setTimeout(() => {
            button.classList.remove("bg-red-50", "border-red-200", "text-red-600");
            button.classList.add("text-muted-foreground");
        }, 2000);
    };

    if (navigator.clipboard && (window as any).isSecureContext !== false) {
        navigator.clipboard.writeText(code).then(showSuccess).catch(showError);
        return;
    }

    try {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (ok) {
            showSuccess();
        } else {
            showError();
        }
    } catch {
        showError();
    }
}

window.copyTabCode = function (button: HTMLButtonElement) {
    const tabsWrapper = button.closest(".code-tabs-wrapper");
    if (!tabsWrapper) return;

    const activeContent = tabsWrapper.querySelector(".code-tab-content:not(.hidden)") as HTMLElement | null;

    let code = "";

    if (activeContent) {
        const codeEl = activeContent.querySelector("pre code") || activeContent.querySelector("code") || activeContent.querySelector("pre");
        if (codeEl) {
            code = (codeEl.textContent || "").trim();
        } else {
            const dataCodeEl = activeContent.querySelector("[data-code]") as HTMLElement | null;
            if (dataCodeEl) {
                code = (dataCodeEl.getAttribute("data-code") || "").trim();
            }
        }
    }

    if (!code) {
        const activeTabButton = tabsWrapper.querySelector("button[data-tab].bg-background") || tabsWrapper.querySelector("button[data-tab].text-foreground");
        if (activeTabButton) {
            code = (activeTabButton.getAttribute("data-code") || "").trim();
        }
    }

    if (!code) return;
    copyCodeToClipboard(button, code);
};

window.copyCodeToClipboard = copyCodeToClipboard;

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        // Add any additional initialization here if needed
    });
}

export {};
