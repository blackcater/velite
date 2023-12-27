import { string } from './zod'

export function isodate() {
  return string()
    .refine(value => !Number.isNaN(Date.parse(value)), 'Invalid date string')
    .transform<string>(value => new Date(value).toISOString())
}
