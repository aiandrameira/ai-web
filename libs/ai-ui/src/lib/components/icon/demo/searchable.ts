import { Component, computed, inject, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ClipboardUtil } from "../../../core";
import { AiEmpty } from "../../empty";
import { AiSelectImports } from "../../form-field";
import { AiSeparator } from "../../separator";
import { AiToastService } from "../../toast/toast.service";
import { ICON_CATEGORIES, ICON_CATEGORY_ORDER, IconCategory } from "../icon-categories";
import { AiIcon } from "../icon.component";
import { AI_ICONS } from "../icons";

const CATEGORY_ICONS: Record<IconCategory | "All", keyof typeof AI_ICONS> = {
    All: "apps",
    Arrows: "arrow-right-long",
    Buildings: "building-4",
    Business: "briefcase",
    Communication: "chat-1",
    Design: "pencil",
    Development: "code",
    Device: "smartphone",
    Document: "file-text",
    Editor: "edit",
    Finance: "money-dollar-circle",
    Food: "restaurant",
    "Game & Sports": "gamepad",
    "Health & Medical": "heart-pulse",
    Logos: "window",
    Map: "map-pin",
    Media: "image",
    System: "settings-3",
    "User & Faces": "user",
    Weather: "sun",
    Others: "more",
};

@Component({
    imports: [AiIcon, AiEmpty, ReactiveFormsModule, AiSelectImports, AiSeparator],
    template: `
        <div class="flex max-w-xs sm:max-w-sm md:max-w-full flex-col gap-y-6">
            <p class="text-sm font-medium text-justify">
                Os ícones abaixo podem ser pesquisados por nome ou filtrados por categoria. Clique em um ícone para copiar seu nome para a área de transferência. Eles são baseados
                na biblioteca <a href="https://remixicon.com/" target="_blank" class="hover:text-primary hover:underline font-bold">Remix Icon</a>.
            </p>

            <div
                class="flex items-center w-full md:w-145 rounded-md border border-input bg-transparent shadow-xs overflow-hidden focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow]"
            >
                <ai-select
                    class="w-38 md:w-48 shrink-0 [&>button]:border-0 [&>button]:shadow-none [&>button]:rounded-none [&>button]:bg-transparent focus-within:ring-0 data-active:border-0 data-active:ring-0"
                    [placeholder]="categoryPlaceholder()"
                    [(value)]="selectedCategory"
                    (valueChange)="onCategoryChange($event)"
                >
                    <ai-select-item value="All">
                        <div class="flex items-center gap-2">
                            <ai-icon [icon]="categoryIcons['All']" class="hidden md:block" />
                            <span class="text-xs md:text-sm">Todas ({{ totalIcons }})</span>
                        </div>
                    </ai-select-item>
                    @for (category of categories; track category) {
                        <ai-select-item [value]="category">
                            <div class="flex items-center gap-2">
                                <ai-icon [icon]="categoryIcons[category]" class="hidden md:block" />
                                <span class="text-xs md:text-sm">{{ category }} ({{ getCategoryCount(category) }})</span>
                            </div>
                        </ai-select-item>
                    }
                </ai-select>

                <ai-separator orientation="vertical" class="h-5 bg-border shrink-0" />

                <div class="relative flex-1">
                    <input
                        class="w-full bg-transparent py-2 pl-4 pr-9 text-sm text-muted-foreground outline-none placeholder:text-muted-foreground"
                        type="text"
                        [value]="search()"
                        placeholder="Pesquisar..."
                        (input)="onSearchChange($event)"
                    />
                    <ai-icon size="lg" icon="search" class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
            </div>

            <div class="text-muted-foreground text-sm">
                {{ filteredIcons().length }} de {{ totalIcons }} ícones
                @if (selectedCategory() !== "All") {
                    <span
                        >em <strong class="text-foreground">{{ selectedCategory() }}</strong></span
                    >
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
    categoryIcons = CATEGORY_ICONS;

    categoryPlaceholder = computed(() => {
        const cat = this.selectedCategory();
        return cat === "All" ? `Todas (${this.totalIcons})` : `${cat} (${this.getCategoryCount(cat as IconCategory)})`;
    });

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

    onCategoryChange(category: unknown) {
        this.selectedCategory.set(category as IconCategory | "All");
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
