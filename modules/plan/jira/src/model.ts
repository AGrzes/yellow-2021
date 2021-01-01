type IssueField = string | number | Record<string,unknown>

export interface Issue {
  expand: string
  id: string
  self: string
  key: string
  fields: Record<string,IssueField>
}
