import { custom } from './zod'

export interface ExcerptOptions {
  // /**
  //  * Excerpt separator.
  //  * @default 'more'
  //  * @example
  //  * s.excerpt({ separator: 'preview' }) // split excerpt by `<!-- preview -->`
  //  */
  // separator?: string
  /**
   * Excerpt length.
   * @default 260
   */
  length?: number
}

export function excerpt({ length = 260 }: ExcerptOptions = {}) {
  return custom<string>().transform<string>(async (value, { meta: { file } }) => {
    if (value == null && file.data.plain != null)
      value = file.data.plain

    return value.slice(0, length)
  })
}
