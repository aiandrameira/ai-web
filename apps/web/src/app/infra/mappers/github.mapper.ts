import { ContributorDto, GithubStatsDto } from "@domain/dtos";
import { Contributor, GithubStats } from "@domain/schemas";

export class GithubMapper {
    static toGithubStats(raw: GithubStats): GithubStatsDto {
        return {
            stargazersCount: raw.stargazers_count,
            forksCount: raw.forks_count,
            watchersCount: raw.watchers_count,
        };
    }

    static toContributor(raw: Contributor): ContributorDto {
        return {
            login: raw.login,
            avatarUrl: raw.avatar_url,
            contributions: raw.contributions,
            htmlUrl: raw.html_url,
        };
    }

    static toContributors(raw: Contributor[]): ContributorDto[] {
        return raw.map(contributor => this.toContributor(contributor));
    }

    static fromGithubStats(raw: GithubStatsDto): GithubStats {
        return {
            stargazers_count: raw.stargazersCount,
            forks_count: raw.forksCount,
            watchers_count: raw.watchersCount,
        };
    }

    static fromContributor(raw: ContributorDto): Contributor {
        return {
            login: raw.login,
            avatar_url: raw.avatarUrl,
            contributions: raw.contributions,
            html_url: raw.htmlUrl,
        };
    }
}
