import z from "zod";

export const githubSchema = z.object({
    stargazersCount: z.number(),
    forksCount: z.number(),
    watchersCount: z.number(),
});

export const contributorSchema = z.object({
    login: z.string(),
    avatarUrl: z.string(),
    contributions: z.number(),
    htmlUrl: z.string(),
});

export type GithubStatsDto = z.infer<typeof githubSchema>;
export type ContributorDto = z.infer<typeof contributorSchema>;
