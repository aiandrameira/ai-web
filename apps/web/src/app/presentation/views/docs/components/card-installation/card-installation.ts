import { AiBadge } from "@ai-ui/components";
import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

interface iCardInstallation {
    name: string;
    image: string;
    routerLink?: string;
    available: boolean;
}

@Component({
    selector: "ai-card-installation",
    imports: [RouterLink, AiBadge, NgClass],
    template: `
        <div class="flex items-center gap-x-4">
            @for (card of cards(); track card.name) {
                <div class="flex justify-center items-center w-full h-48 rounded-md border border-border relative">
                    <a
                        [routerLink]="card.routerLink"
                        [ngClass]="[
                            'hover:bg-muted transition-colors duration-300 w-full h-full flex flex-col gap-y-2 items-center justify-center',
                            card.available ? 'pointer-events-auto opacity-100 cursor-pointer' : 'opacity-5 pointer-events-none cursor-not-allowed',
                        ]"
                    >
                        <img [src]="card.image" [alt]="card.name" width="56" class="dark:invert" />
                        <span class="text-primary font-bold text-base mb-0">{{ card.name }}</span>
                    </a>
                    @if (!card.available) {
                        <ai-badge class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4" variant="primary" fill="line">coming soon</ai-badge>
                    }
                </div>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInstallation {
    cards = signal<iCardInstallation[]>([
        { name: "Angular", image: "./img/icons/angular.svg", routerLink: "/docs/angular", available: true },
        { name: "Nx", image: "./img/icons/nx.svg", available: false },
    ]);
}
