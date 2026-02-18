import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { ScrollDirective, ScrollItemDirective } from "@core/directives";
import { installations } from "@domain/constants";
import { InstallDto, NavigationConfigDto } from "@domain/dtos";
import { Content, Heading, Step } from "@views/shared";

@Component({
    selector: "ai-install",
    imports: [Content, Heading, ScrollDirective, Step, ScrollItemDirective],
    templateUrl: "./install.html",
})
export class Install implements OnInit {
    #activatedRoute = inject(ActivatedRoute);
    #router = inject(Router);
    #destroyRef = inject(DestroyRef);

    installation = signal<InstallDto | null>(null);

    navigations = signal<NavigationConfigDto>({
        items: [{ id: "environment", label: "Environments", type: "core" }],
    });
    activeSummary?: string;

    ngOnInit() {
        this.#activatedRoute.params.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
            this._load();
        });
    }

    private _load() {
        const nameRoute = this.#activatedRoute.snapshot.paramMap.get("env");

        const data = installations.find((item: InstallDto) => item.env === nameRoute);
        if (!data) this.#router.navigateByUrl("/docs/installation");
        else this.installation.set(data);
    }
}
