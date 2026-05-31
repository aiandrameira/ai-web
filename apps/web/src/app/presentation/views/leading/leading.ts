import {
    AiAlert,
    AiAvatar,
    AiAvatarGroup,
    AiBadge,
    AiBreadcrumbImports,
    AiButton,
    AiButtonToggle,
    AiButtonToggleItem,
    AiCard,
    AiCheckbox,
    AiEmpty,
    AiIcon,
    AiInput,
    AiLoader,
    AiPaginationModule,
    AiProgressBar,
    AiRadioImports,
    AiSelectImports,
    AiSeparator,
    AiSkeleton,
    AiSwitch,
    AiTab,
    AiTabsGroup,
} from "@ai-ui/components";
import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, model, signal } from "@angular/core";
import { environment } from "@env/environment.development";

@Component({
    selector: "leading",
    imports: [
        AiCard,
        AiButton,
        AiBadge,
        AiInput,
        AiCheckbox,
        AiSwitch,
        AiAvatar,
        AiAvatarGroup,
        AiProgressBar,
        AiAlert,
        AiLoader,
        AiEmpty,
        AiSkeleton,
        AiSeparator,
        AiButtonToggle,
        AiTab,
        AiTabsGroup,
        AiIcon,
        DatePipe,
        ...AiBreadcrumbImports,
        AiPaginationModule,
        ...AiSelectImports,
        ...AiRadioImports,
    ],
    templateUrl: "./leading.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Leading {
    version = environment.version;
    date = new Date();
    readonly currentPage = 2;

    email = model("");
    cardNumber = model("");
    cvv = model("");
    sameAddress = model(false);
    notifications = model(true);
    darkMode = model(false);
    selectedMonth = model("");
    selectedPlan = model("");
    computeEnv = model<string | null>(null);
    toggleView = signal("grid");

    viewItems: AiButtonToggleItem[] = [
        { value: "grid", icon: "layout-grid" },
        { value: "list", icon: "check-double" },
        { value: "table", icon: "table" },
    ];

    months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    plans = ["Starter", "Pro", "Enterprise"];
}
