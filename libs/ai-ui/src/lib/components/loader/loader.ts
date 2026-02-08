import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../core";
import { AiLoaderProgress } from "./loader-progess";
import { AiLoaderService } from "./loader.service";
import { loaderVariants, LoaderVariants } from "./loader.variants";

@Component({
    selector: "ai-loader",
    exportAs: "aiLoader",
    imports: [AiLoaderProgress],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./loader.html",
    host: {
        "[class]": "overlay() ? 'relative' : classes()",
    },
    styles: `
        @layer utilities {
            @keyframes spinner {
                0% {
                    opacity: 1;
                }
                100% {
                    opacity: 0.15;
                }
            }

            .animate-spinner {
                animation: spinner 1.2s linear infinite;
            }
        }
    `,
})
export class AiLoader {
    #loader = inject(AiLoaderService);
    isLoading = this.#loader.isLoading;

    size = input<LoaderVariants["size"]>("default");
    type = input<LoaderVariants["type"]>("spinner");
    overlay = input<LoaderVariants["overlay"]>(false);

    class = input<ClassValue>("");

    protected bars = Array.from({ length: 12 });
    protected delay = (index: number) => `-${1.3 - index * 0.1}s`;
    protected transform = (index: number) => `rotate(${30 * index}deg) translate(146%)`;

    protected classes = computed(() => mergeClasses(loaderVariants({ type: this.type(), size: this.size() }), this.class()));

    classType = computed(() => mergeClasses(loaderVariants({ type: this.type() })));
    classSize = computed(() => loaderVariants({ size: this.size() }));
    classOverlay = computed(() => loaderVariants({ overlay: this.overlay() }));
}
