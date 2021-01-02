import {mapFieldDefinitionToJSONSchema, Schema} from '../../src/jira/schema'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { AxiosInstance } from 'axios'
const {expect} = chai.use(chaiAsPromised).use(sinonChai)

describe('jira', function() {
  describe('schema', function() {
    describe('mapFieldDefinitionToJSONSchema', function() {
      const common = {
        name: 'name',
        clauseNames: [],
        custom: false,
        id: 'id',
        navigable: true,
        orderable: true,
        searchable: true,
      }
      it('should map number field', function() {
        const mapped = mapFieldDefinitionToJSONSchema({
          schema: {
            type: 'number'
          },
          ...common
        })
        expect(mapped).to.have.property('type','number')
        expect(mapped).to.have.property('title','name')
      })
      it('should map string field', function() {
        const mapped = mapFieldDefinitionToJSONSchema({
          schema: {
            type: 'string'
          },
          ...common
        })
        expect(mapped).to.have.property('type','string')
        expect(mapped).to.have.property('title','name')
      })
      it('should map datetime field', function() {
        const mapped = mapFieldDefinitionToJSONSchema({
          schema: {
            type: 'datetime'
          },
          ...common
        })
        expect(mapped).to.have.property('type','string')
        expect(mapped).to.have.property('format','date-time')
        expect(mapped).to.have.property('title','name')
      })
      it('should map date field', function() {
        const mapped = mapFieldDefinitionToJSONSchema({
          schema: {
            type: 'date'
          },
          ...common
        })
        expect(mapped).to.have.property('type','string')
        expect(mapped).to.have.property('format','date')
        expect(mapped).to.have.property('title','name')
      })
      it('should map issuekey field', function() {
        const mapped = mapFieldDefinitionToJSONSchema({
          ...common,
          id: 'issuekey'
        })
        expect(mapped).to.have.property('type','string')
        expect(mapped).to.have.property('title','name')
      })
      it('should map thumbnail field', function() {
        const mapped = mapFieldDefinitionToJSONSchema({
          ...common,
          id: 'thumbnail'
        })
        expect(mapped).to.be.false
      })
    })
    describe('Schema', function() {
      const common = {
        name: 'name',
        clauseNames: [],
        custom: false,
        id: 'id',
        navigable: true,
        orderable: true,
        searchable: true,
      }
      it('should retrieve fields',async function() {
        const client = {
          get: sinon.stub().resolves({data:[]})
        } as unknown as AxiosInstance
        const map = sinon.stub()
        const schema = new Schema(client,map)
        await schema.fields()
        expect(client.get).to.be.calledWith('/rest/api/2/field')
      })
      it('should map fields',async function() {
        const client = {
          get: sinon.stub().resolves({data:[{id:'a'}]})
        } as unknown as AxiosInstance
        const map = sinon.stub().returns('b')
        const schema = new Schema(client,map)
        const result = await schema.fields()
        expect(map).to.be.calledWith({id:'a'})
        expect(result).to.have.property('type','object')
        expect(result).to.have.deep.property('properties',{a:'b'})
      })
    })
  })
})
