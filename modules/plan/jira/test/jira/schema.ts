import {mapFieldDefinitionToJSONSchema} from '../../src/jira/schema'
import {expect} from 'chai'
describe('jira', function() {
  describe('schema', function() {
    describe('mapFieldDefinitionToJSONSchema', function() {
      const common = {
        clauseNames: [],
        custom: false,
        id: 'id',
        navigable: true,
        orderable: true,
        searchable: true,
      }
      it('should map number field', function() {
        const mapped = mapFieldDefinitionToJSONSchema({
          name: 'name',
          schema: {
            type: 'number'
          },
          ...common
        })
        expect(mapped).to.have.property('type','number')
        expect(mapped).to.have.property('title','name')
      })
    })
  })
})
