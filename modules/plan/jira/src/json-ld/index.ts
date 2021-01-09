import _ from 'lodash'

class Owl {
  Class() {
    return {'rdf:type': {'@id':'owl:Class'}}
  }
  DatatypeProperty(domain: string,range: string) {
    return {
      'rdf:type': {'@id':'owl:DatatypeProperty'},
      'rdfs:domain': {'@id':domain},
      'rdfs:range': {'@id':range}
    }
  }
  ObjectProperty(domain: string,range: string) {
    return {
      'rdf:type': {'@id':'owl:ObjectProperty'},
      'rdfs:domain': {'@id':domain},
      'rdfs:range': {'@id':range}
    }
  }
}

export const owl = new Owl()

class Rdfs {
  label(label: string) {
    return {
      'rdfs:label':{'@value':label},
    }
  }
}

export const rdfs = new Rdfs()

class Rdf {
  type(type: string) {
    return {
      'rdf:type':{'@id':type},
    }
  }
}

export const rdf = new Rdf()

export function resource(id: string,...statements: Record<string,unknown>[]): Record<string,unknown> {
  return _.assign({'@id': id},...statements)
}
