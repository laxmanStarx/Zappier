import { z } from "zod"

export const SignupData = z.object({
    username: z.string().min(8),
    password: z.string().min(5),
    name: z.string().min(3)
})

export const SigninData = z.object({
    username: z.string(),
    password: z.string()
})

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional()
    }))
})