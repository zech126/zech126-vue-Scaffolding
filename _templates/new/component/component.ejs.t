---
to: "src/components/<%= h.inflection.dasherize(name) %>.vue"
---
<%
const fileName = h.inflection.dasherize(name)
const importName = h.inflection.camelize(fileName.replace(/-/g, '_'))

if (blocks.indexOf('template') !== -1) {
%><template>
  <div><%= importName %></div>
</template>
<%
}

if (blocks.indexOf('script') !== -1) {
%>
<script>
export default {
  name: '<%= importName %>'<% if (blocks.indexOf('template') === -1) { %>,

  render(h) {
    return <div><%= importName %></div>
  }<% } %>
}
</script>
<%
}
if (blocks.indexOf('style') !== -1) {
%>
<style lang="less">
</style><%
}
%>
