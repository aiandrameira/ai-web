import { ComponentRef, Directive, effect, ElementRef, inject, input, OnDestroy, Renderer2, ViewContainerRef } from "@angular/core";
import { Markdown } from "@views/shared";

interface ComponentInfo {
    element: HTMLElement;
    placeholder: Comment;
    componentRef?: ComponentRef<any>;
}

@Directive({
    selector: "[aiDynamicComponent]",
})
export class DynamicComponentDirective implements OnDestroy {
    #elementRef = inject(ElementRef);
    #viewContainer = inject(ViewContainerRef);
    #renderer = inject(Renderer2);

    htmlContent = input<string>("", { alias: "aiDynamicComponent" });

    #components: ComponentInfo[] = [];

    constructor() {
        effect(() => {
            const content = this.htmlContent();
            if (!content) return;
            this._processContent(content);
        });
    }

    private _processContent(htmlContent: string): void {
        this._clearComponents();

        const element = this.#elementRef.nativeElement as HTMLElement;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;

        this._processAiMarkdownElements(tempDiv);
        element.innerHTML = tempDiv.innerHTML;
        this._createDynamicComponents();
    }

    private _processAiMarkdownElements(container: HTMLElement): void {
        let html = container.innerHTML;

        const aiMarkdownRegex = /&lt;ai-markdown\s+markdownUrl=["']([\s\S]+?)["']\s*\/&gt;/gi;

        html = html.replace(aiMarkdownRegex, (_, urlContent) => {
            let cleanUrl = urlContent.replace(/<[^>]+>/g, "");

            const tempElement = document.createElement("div");
            tempElement.innerHTML = cleanUrl;
            cleanUrl = tempElement.textContent || cleanUrl;

            cleanUrl = cleanUrl.trim();

            return `<ai-markdown data-markdown-url="${cleanUrl}"></ai-markdown>`;
        });

        container.innerHTML = html;
    }

    private _createDynamicComponents(): void {
        const element = this.#elementRef.nativeElement as HTMLElement;

        const aiMarkdownElements = element.querySelectorAll("ai-markdown");

        aiMarkdownElements.forEach(aiElement => {
            const markdownUrl = aiElement.getAttribute("data-markdown-url");

            if (markdownUrl) {
                const placeholder = this.#renderer.createComment("ai-markdown-placeholder");

                aiElement.parentNode?.insertBefore(placeholder, aiElement);
                aiElement.remove();

                const componentRef = this.#viewContainer.createComponent(Markdown);
                componentRef.setInput("markdownUrl", markdownUrl);
                placeholder.parentNode?.insertBefore(componentRef.location.nativeElement, placeholder);

                this.#components.push({
                    element: componentRef.location.nativeElement,
                    placeholder,
                    componentRef,
                });
            }
        });
    }

    private _clearComponents() {
        this.#components.forEach(({ componentRef }) => {
            if (!componentRef) return;
            componentRef.destroy();
        });
        this.#components = [];
    }

    ngOnDestroy() {
        this._clearComponents();
    }
}
