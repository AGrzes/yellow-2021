import fetch from './jira/fetch'
import schema from './jira/schema'
import save from './terminus/save'

(async () => {
  await schema.fields()
  for await (const issue of fetch.jql('project = "Y21"')) {
    await save.save(issue)
  }
})().catch((error) =>console.error(JSON.stringify(error,null,4)))


