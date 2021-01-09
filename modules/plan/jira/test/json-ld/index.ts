import {owl, rdf, rdfs, resource} from '../../src/json-ld'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
const {expect} = chai.use(chaiAsPromised).use(sinonChai)

describe('json-ld', function() {
  describe('Owl', function() {
    describe('Class', function() {
      it('it should return statement about class', function() {
        expect(owl.Class()).to.be.deep.equals({'rdf:type': {'@id':'owl:Class'}})
      })
    })
    describe('DatatypeProperty', function() {
      it('it should return DatatypeProperty type statement', function() {
        expect(owl.DatatypeProperty('a','b')).to.be.have.nested.property('rdf:type.@id','owl:DatatypeProperty')
      })
      it('it should return domain statement', function() {
        expect(owl.DatatypeProperty('a','b')).to.be.have.nested.property('rdfs:domain.@id','a')
      })
      it('it should return range statement', function() {
        expect(owl.DatatypeProperty('a','b')).to.be.have.nested.property('rdfs:range.@id','b')
      })
    })
    describe('ObjectProperty', function() {
      it('it should return ObjectProperty type statement', function() {
        expect(owl.ObjectProperty('a','b')).to.be.have.nested.property('rdf:type.@id','owl:ObjectProperty')
      })
      it('it should return domain statement', function() {
        expect(owl.ObjectProperty('a','b')).to.be.have.nested.property('rdfs:domain.@id','a')
      })
      it('it should return range statement', function() {
        expect(owl.ObjectProperty('a','b')).to.be.have.nested.property('rdfs:range.@id','b')
      })
    })
  })
  describe('Rdfs', function() {
    describe('label', function() {
      it('it should return label statement', function() {
        expect(rdfs.label('a')).to.be.have.nested.property('rdfs:label.@value','a')
      })
    })
  })
  describe('Rdf', function() {
    describe('type', function() {
      it('it should return type statement', function() {
        expect(rdf.type('a')).to.be.have.nested.property('rdf:type.@id','a')
      })
    })
  })
  describe('resource', function() {
    it('it should return id statement', function() {
      expect(resource('a')).to.be.have.property('@id','a')
    })
    it('it should return additional statements', function() {
      expect(resource('a',{b: 'c'})).to.be.have.property('b','c')
    })
  })
})
