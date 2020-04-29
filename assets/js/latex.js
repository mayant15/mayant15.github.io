function cleanParams(params) {
    return params.reverse().map(
        (current) => {
            return current.text;
        }
    ).join("");
}

function fixCDATA(str) {
    return str
        .replace(/% <!\[CDATA\[/g, "")
        .replace(/%\]\]>/g, "");
}

var macros = {
    /* \newcommand{\b}[1]{\mathbb{#1}} */
    "\\b": (context) => {
        const args = context.consumeArgs(1);
        const firstArg = cleanParams(args[0]);
        return `\\mathbb{${firstArg}}`;
    },

    /* \renewcommand{\v}[1]{\mathbf{#1}} */
    "\\v": (context) => {
        const args = context.consumeArgs(1);
        const firstArg = cleanParams(args[0]);
        return `\\mathbf{${firstArg}}`;
    },

    /* \newcommand{\vt}[1]{\mathbf{#1}^\top} */
    "\\vt": (context) => {
        const args = context.consumeArgs(1);
        const firstArg = cleanParams(args[0]);
        return `\\mathbf{${firstArg}}^\\top`;
    },

    /* \newcommand{\prob}[1]{\textrm{Pr}\left[ \#1 \right]} */
    "\\prob": (context) => {
        const args = context.consumeArgs(1);
        const firstArg = cleanParams(args[0]);
        return `\\textrm{Pr} \\left[ ${firstArg} \\right]`;
    }
};

$("script[type='math/tex']").replaceWith(function() {
  var tex = $(this).text();
  tex = fixCDATA(tex);
  return katex.renderToString(tex, 
    {
        displayMode: false,
        throwOnError: false,
        macros: macros,
        strict: true
    });
});

$("script[type='math/tex; mode=display']").replaceWith(function() {
  var tex = $(this).text();
  tex = fixCDATA(tex);
  console.log(tex);
  return katex.renderToString(tex, 
    {
        displayMode: true,
        throwOnError: false,
        macros: macros,
        strict: true
    });
});