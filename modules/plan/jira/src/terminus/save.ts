import {WOQLClient, WOQL} from '@terminusdb/terminusdb-client'
import { Issue } from '../model'

export class Save {
  constructor(private client:WOQLClient) {}

  public async save(issue:Issue): Promise<void> {
    await this.client.connect()
    const query = WOQL.using('admin/jira').and(
      WOQL.add_triple(issue.key, 'scm:self', WOQL.string(issue.self)),
      WOQL.add_triple(issue.key, 'type', 'scm:issue')
    )
    await this.client.query(query, `Adding issue ${issue.key}`)
  }
}

const save = new Save(new WOQLClient('https://127.0.0.1:6363/', {
  db: 'jira',
  user: 'admin',
  key: 'password',
}))
export default save
