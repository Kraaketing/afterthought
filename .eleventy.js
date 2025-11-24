const { minify } = require("html-minifier-terser");
const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/css/");
  // Passthrough paths
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy("src/css/bundle.css");

  // Markdown filter
  eleventyConfig.addFilter("markdown", function (content) {
    if (typeof content !== "string") {
      return "";
    }
    return md.render(content);
  });

  // Minify html output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      const minified = minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
