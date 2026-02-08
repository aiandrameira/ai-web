import { z } from "zod";

export const packageSchema = z.object({
    name: z.string(),
    version: z.string().optional(),
    dependencies: z.record(z.string()).optional(),
    devDependencies: z.record(z.string()).optional(),
});

export const configSchema = z.object({
    schema: z.string().optional(),
    style: z.enum(["css", "scss"]).default("css"),
    tailwind: z
        .object({
            css: z.string().default("src/styles.css"),
            baseColor: z.string().default("slate"),
            cssVariables: z.boolean().default(true),
        })
        .default({}),
    aliases: z
        .object({
            components: z.string().default("src/app/core/ui/components"),
            utils: z.string().default("src/app/core/ui/helpers"),
        })
        .default({}),
});

export type Config = z.infer<typeof configSchema>;

export function makeConfig(): Config {
    return {
        style: "css",
        tailwind: {
            css: "src/styles.css",
            baseColor: "slate",
            cssVariables: true,
        },
        aliases: {
            components: "src/app/core/ui/components",
            utils: "src/app/core/ui/helpers",
        },
    };
}

export const configCssSchema = z.object({
    style: z.enum(["css", "scss"]),
    tailwind: z.object({
        css: z.string(),
        baseColor: z.string(),
        cssVariables: z.boolean(),
    }),
    aliases: z.object({
        components: z.string(),
        utils: z.string(),
    }),
});
