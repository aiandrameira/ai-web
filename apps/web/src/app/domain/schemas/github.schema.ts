import z from "zod";

export const githubSchema = z.object({
    stargazers_count: z.number().default(0),
    forks_count: z.number().default(0),
    watchers_count: z.number().default(0),
});

export const contributorSchema = z.object({
    login: z.string().default(""),
    avatar_url: z.url().default(""),
    contributions: z.number().default(0),
    html_url: z.url().default(""),
});

export type GithubStats = z.infer<typeof githubSchema>;
export type Contributor = z.infer<typeof contributorSchema>;

export function makeGithubStats(raw: Partial<GithubStats> = {}): GithubStats {
    return githubSchema.parse(raw);
}
