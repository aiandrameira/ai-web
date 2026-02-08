import { z } from "zod";

export const normalizeConfigSchema = z.object({
    hyphen: z.boolean().optional(),
    underscore: z.boolean().optional(),
    dot: z.boolean().optional(),
});

export type AiNormalizeConfig = z.infer<typeof normalizeConfigSchema>;
