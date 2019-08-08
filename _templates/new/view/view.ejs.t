---
to: "src/views/<%= h.inflection.dasherize(name) %>.vue"
---
<%
  const fileName = h.inflection.dasherize(name)
  const importName = h.inflection.camelize(fileName.replace(/-/g, '_'))
%><template>
  <div>
    <%= h.inflection.titleize(name.replace(/-/g, '_')) %>
  </div>
</template>

<script>
export default {
  name: '<%= importName %>',

  metaInfo: {
    title: '<%= importName %>'
  }
}
</script><% if (useStyles) { %>

<style lang="less">
</style><% } %>
