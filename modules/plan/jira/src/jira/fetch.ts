import { Issue } from '../model'
import axios, {AxiosInstance } from 'axios'

const batchSize = process.env.JIRA_BATCH_SIZE ? Number.parseInt(process.env.JIRA_BATCH_SIZE) : 500
export class Fetch {
  constructor(private client: AxiosInstance) {}

  public async* jql(jql: string): AsyncGenerator<Issue> {
    let startAt = 0
    while(true) {
      const response = await this.client.post('/rest/api/2/search', {
        jql, fields: ['*all'], maxResults: batchSize, startAt
      })
      if (response.data.issues && response.data.issues.length) {
        yield* response.data.issues
        startAt += batchSize
      } else {
        break
      }
    }

  }
}

const fetch = new Fetch(axios.create({
  baseURL:'http://jira.home.agrzes.pl:8080',
  auth: {
    username: process.env.JIRA_USERNAME,
    password: process.env.JIRA_PASSWORD
  }
}))
export default fetch
