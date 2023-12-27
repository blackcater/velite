import { isRelativePath, processAsset } from '../assets'
import type { Image } from '../assets'
import { string } from './zod'

export interface ImageOptions {
  /**
   * allow non-relative path
   * @default false
   */
  allowNonRelativePath?: boolean
}

/**
 * A image path relative to this file.
 */
export function image({ allowNonRelativePath = false }: ImageOptions = {}) {
  return string().transform<Image>((value, { meta: { file, config }, addIssue }) => {
    if (allowNonRelativePath && !isRelativePath(value))
      return { src: value, width: 0, height: 0, blurDataURL: '', blurWidth: 0, blurHeight: 0 }
    return processAsset(value, file.path, config.output.name, config.output.base, true).catch((err) => {
      addIssue({ code: 'custom', message: err.message })
      return null as never
    })
  })
}
