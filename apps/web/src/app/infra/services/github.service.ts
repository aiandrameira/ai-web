import { httpResource } from "@angular/common/http";
import { computed, Injectable } from "@angular/core";
import { Contributor, GithubStats, makeGithubStats } from "@domain/schemas";
import { environment } from "@env/environment.development";
import { GithubMapper } from "@infra/mappers";

@Injectable({
    providedIn: "root",
})
export class GithubService {
    #api = environment.apiGithub;

    #githubResource = httpResource<GithubStats>(() => this.#api, { defaultValue: makeGithubStats() });
    #contributorsResource = httpResource<Contributor[]>(() => `${this.#api}/contributors`, { defaultValue: [] });

    startsCount = computed(() => GithubMapper.toGithubStats(this.#githubResource.value()).stargazersCount || 0);
    contributors = computed(() => GithubMapper.toContributors(this.#contributorsResource.value()) || []);
}
