---
to: src/store/modules/<%= h.inflection.dasherize(name) %>.unit.js
---
<%
  const fileName = h.inflection.dasherize(name)
  const importName = h.inflection.camelize(fileName.replace(/-/g, '_'), true) + 'Module'
%>import * as <%= importName %> from './<%= fileName %>'

describe('@/store/modules/<%= fileName %>', () => {
  it('exports a valid Vuex module', () => {
    expect(<%= importName %>).toBeAVuexModule()
  })
})
