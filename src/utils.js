export const init = callback =>
  document.addEventListener('DOMContentLoaded', callback);

export const shaderTaggedTemplateLiteral = (strings, ...exprs) =>
  strings.reduce((acc, str, i) => acc.concat(str, exprs[i]), []).join('');

export const vert = shaderTaggedTemplateLiteral;
export const frag = shaderTaggedTemplateLiteral;
