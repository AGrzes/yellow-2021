import {mapFieldDefinitionToJSONSchema} from '../../src/jira/schema'
import {expect} from 'chai'
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
  })
})
