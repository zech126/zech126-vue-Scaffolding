---
to: "src/components/<%= h.inflection.dasherize(name) %>.unit.js"
---
<%
  const fileName = h.inflection.dasherize(name)
  const importName = h.inflection.camelize(fileName.replace(/-/g, '_'))
%>import <%= importName %> from './<%= fileName %>.vue'

describe('@/components/<%= fileName %>', () => {
  it('exports a valid component', () => {
    expect(<%= importName %>).toBeAComponent()
  })
})
