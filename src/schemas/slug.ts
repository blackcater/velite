import { string } from './zod'

/**
 * generate a slug schema
 * @param by unique by this, used to create a unique set of slugs
 * @param reserved reserved slugs, will be rejected
 * @returns slug schema
 */
export function slug(by: string = 'global', reserved: string[] = []) {
  return string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, 'Invalid slug')
    .refine(value => !reserved.includes(value), 'Reserved slug')
    .superRefine((value, { path, meta: { file, config }, addIssue }) => {
      const key = `schemas:slug:${by}:${value}`
      if (config.cache.has(key))
        addIssue({ code: 'custom', message: `duplicate slug '${value}' in '${file.path}:${path.join('.')}'` })
      else
        config.cache.set(key, file.path)
    })
}
