import axios, {AxiosInstance } from 'axios'
import _ from 'lodash'
import { JSONSchema7, JSONSchema7Definition } from 'json-schema'


export interface FieldDefinition {
  id: string
  name: string
  custom: boolean
  orderable: boolean
  navigable: boolean
  searchable: boolean
  clauseNames: string[]
  schema?: FieldSchema
}

export interface FieldSchema {
  type: string
  system?: string
  items?: string
  custom?: string
  customId?: number
}

export interface Issuetype {
  self:        string;
  id:          string;
  description: string;
  iconUrl:     string;
  name:        string;
  subtask:     boolean;
  avatarId:    number;
}

const STRING: JSONSchema7 = {type: 'string'}
const BOOLEAN: JSONSchema7 = {type: 'boolean'}
const NUMBER: JSONSchema7 = {type: 'number'}

export const ISSUETYPE: JSONSchema7 = {
  type: 'object',
  properties: {
    self: STRING,
    id: STRING,
    description: STRING,
    iconUrl: STRING,
    name: STRING,
    subtask: BOOLEAN,
    avatarId: NUMBER
  }
}

export function mapFieldDefinitionToJSONSchema(input: FieldDefinition): JSONSchema7Definition {
  const shared: Partial<JSONSchema7Definition> = {
    title: input.name
  }
  if (input.schema) {
    if (input.schema.type) {
      switch (input.schema.type) {
        case 'number': return {
          type: 'number',
          ...shared
        }
        case 'string': return {
          type: 'string',
          ...shared
        }
        case 'datetime': return {
          type: 'string',
          format: 'date-time',
          ...shared
        }
        case 'date': return {
          type: 'string',
          format: 'date',
          ...shared
        }
        case 'array': 
          switch (input.schema.items) {
            case 'string': return {
              type: 'array',
              items: {
                type: 'string'
              },
              ...shared
            }
          }
          break
        case 'issuetype': return {
          ...ISSUETYPE,
          ...shared
        }
      }
    }
  } else if (input.id === 'thumbnail') {
    return false
  } else if (input.id === 'issuekey') {
    return {
      type: 'string',
      ...shared
    }
  }
  console.log(input)
}


export class Schema {
  constructor(private client: AxiosInstance, private map: (input: FieldDefinition) => JSONSchema7Definition ) {}

  public async fields(): Promise<JSONSchema7> {
    const fieldDefinitions:FieldDefinition[]  = (await this.client.get('/rest/api/2/field')).data
    return {
      type: 'object',
      properties: _.mapValues(_.keyBy(fieldDefinitions,'id'),this.map)
    }
  }
}

const schema = new Schema(axios.create({
  baseURL:'http://jira.home.agrzes.pl:8080',
  auth: {
    username: process.env.JIRA_USERNAME,
    password: process.env.JIRA_PASSWORD
  }
}),mapFieldDefinitionToJSONSchema)
export default schema
