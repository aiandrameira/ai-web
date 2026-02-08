import { Component, computed, inject, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ClipboardUtil } from "../../../core";
import { AiEmpty } from "../../empty";
import { AiToastService } from "../../toast/toast.service";
import { ICON_CATEGORIES, ICON_CATEGORY_ORDER, IconCategory } from "../icon-categories";
import { AiIcon } from "../icon.component";
import { AI_ICONS } from "../icons";

@Component({
    imports: [AiIcon, AiEmpty, ReactiveFormsModule],
    template: `
        <div class="flex w-full flex-col gap-y-6">
            <p class="text-sm font-medium text-justify">
                Os ícones abaixo podem ser pesquisados por nome ou filtrados por categoria. Clique em um ícone para copiar seu nome para a área de transferência. Eles são baseados
                na biblioteca <a href="https://remixicon.com/" target="_blank" class="hover:text-primary hover:underline font-bold">Remix Icon</a>.
            </p>
            <div class="relative">
                <input
                    class="w-145 py-2.5 border text-sm border-border rounded px-4 text-muted-foreground"
                    type="text"
                    id="search"
                    [value]="search()"
                    placeholder="Pesquisar por ícones"
                    (input)="onSearchChange($event)"
                />

                <ai-icon size="lg" icon="search" class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div class="flex flex-wrap gap-2">
                <button
                    type="button"
                    class="rounded-full border border-border px-3 py-1 text-xs transition-colors"
                    [class.bg-primary]="selectedCategory() === 'All'"
                    [class.text-primary-foreground]="selectedCategory() === 'All'"
                    (click)="selectCategory('All')"
                >
                    Todas ({{ totalIcons }})
                </button>

                @for (category of categories; track category) {
                    <button
                        type="button"
                        class="rounded-full border border-border px-3 py-1 text-xs transition-colors"
                        [class.bg-primary]="selectedCategory() === category"
                        [class.text-primary-foreground]="selectedCategory() === category"
                        (click)="selectCategory(category)"
                    >
                        {{ category }} ({{ getCategoryCount(category) }})
                    </button>
                }
            </div>

            <div class="text-muted-foreground text-sm">
                {{ filteredIcons().length }} of {{ totalIcons }} icons
                @if (selectedCategory() !== "All") {
                    <span>em {{ selectedCategory() }}</span>
                }
            </div>

            <div class="grid max-h-150 grid-cols-2 gap-4 overflow-y-auto pr-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                @for (iconName of filteredIcons(); track iconName) {
                    <button
                        shape="default"
                        class="group border border-border rounded-lg cursor-pointer flex h-auto min-h-17.5 w-full flex-col items-center justify-center gap-2 px-3 py-2"
                        (click)="onCopy(iconName)"
                    >
                        <ai-icon [icon]="iconName" class="shrink-0 transition-transform group-hover:scale-110" />
                        <span class="group-hover:text-foreground w-full text-center text-xs leading-relaxed wrap-break-word hyphens-auto transition-colors">
                            {{ iconName }}
                        </span>
                    </button>
                }
            </div>

            @if (filteredIcons().length === 0) {
                <ai-empty icon="code-block" title="Nenhum ícone encontrado" description="Tente ajustar sua consulta de pesquisa ou verifique a ortografia." />
            }
        </div>
    `,
})
export class DemoIconSearchableComponent {
    #toast = inject(AiToastService);
    search = signal<string>("");
    selectedCategory = signal<IconCategory | "All">("All");

    icons: Array<keyof typeof AI_ICONS> = Object.keys(AI_ICONS) as Array<keyof typeof AI_ICONS>;
    categories = ICON_CATEGORY_ORDER;
    totalIcons = this.icons.length;

    filteredIcons = computed<Array<keyof typeof AI_ICONS>>(() => {
        const query = this.search().toLowerCase().trim();
        const category = this.selectedCategory();
        const iconList: Array<keyof typeof AI_ICONS> = category === "All" ? this.icons : ((ICON_CATEGORIES[category] ?? []) as Array<keyof typeof AI_ICONS>);

        if (!query) {
            return iconList;
        }

        return iconList.filter(name => name.toLowerCase().includes(query));
    });

    getCategoryCount(category: IconCategory) {
        return ICON_CATEGORIES[category]?.length ?? 0;
    }

    selectCategory(category: IconCategory | "All") {
        this.selectedCategory.set(category);
    }

    onSearchChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.search.set(input.value);
    }

    async onCopy(item: string) {
        await ClipboardUtil.copy(item);
        this.#toast.default({ message: "Ícone copiado", description: item, icon: "check-double", position: "bottom-right" });
    }
}
