/**
 * Posts Slideshow Block Script
 * This is where the magic 🪄 happens
 */
((blocks, element, components) => {
  const el = element.createElement;

  // Register Block Type
  blocks.registerBlockType("psb/posts-slideshow-block", {
    title: "Posts Slideshow",
    description:
      "Custom gutenberg posts slideshow block for rtCamp assignment.",
    icon: "embed-photo",
    category: "widgets",
    attributes: {
      remotePosts: { type: "object" },
      remotePostsSaved: { type: "boolean" },
      hidePostThumb: { type: "boolean" },
      hidePostDate: { type: "boolean" },
      hidePostExcerpt: { type: "boolean" },
      perSlide: { type: "string" },
    },
    keywords: ["slider", "posts", "slideshow"],

    // Edit
    edit: (props) => {
      // Vars
      var remotePosts = props.attributes.remotePosts,
        remotePostsSaved = props.attributes.remotePostsSaved,
        hidePostThumb = props.attributes.hidePostThumb,
        hidePostDate = props.attributes.hidePostDate,
        hidePostExcerpt = props.attributes.hidePostExcerpt,
        perSlide = props.attributes.perSlide;

      // Get & Set posts
      if (!remotePosts) {
        fetch("https://wptavern.com/wp-json/wp/v2/posts")
          .then((res) => {
            return res.json();
          })
          .then((posts) =>
            props.setAttributes({ remotePosts: posts, remotePostsSaved: true })
          );
      }

      // On change
      const changeHidePostDate = () => {
        props.setAttributes({ hidePostDate: !hidePostDate });
      };
      const changeHidePostExcerpt = () => {
        props.setAttributes({ hidePostExcerpt: !hidePostExcerpt });
      };
      const changeHidePostThumb = () => {
        props.setAttributes({ hidePostThumb: !hidePostThumb });
      };
      const changePerSlide = (perSlide) => {
        props.setAttributes({ perSlide });
      };

      return el(
        "div",
        { className: "psb-editor-placeholder" },
        el(
          "div",
          { className: "psb-edit__row" },
          el("h6", { className: "psb-edit__heading" }, "Posts Slideshow Block"),
          !remotePostsSaved &&
            el(
              "div",
              null,
              el(
                "small",
                { style: { position: "relative", top: -3, color: "#A9A9A9" } },
                "Fetching Posts"
              ),
              el(components.Spinner)
            )
        ),
        el(
          "div",
          { className: "psb-edit__row" },
          el(components.ToggleControl, {
            label: "Hide Post Thumb",
            checked: hidePostThumb,
            onChange: changeHidePostThumb,
          }),
          el(components.ToggleControl, {
            label: "Hide Post Date",
            checked: hidePostDate,
            onChange: changeHidePostDate,
          }),
          el(components.ToggleControl, {
            label: "Hide Post Excerpt",
            checked: hidePostExcerpt,
            onChange: changeHidePostExcerpt,
          }),
          el("label", { style: { fontSize: 13 } }, "Posts Per Slide"),
          el(components.TextControl, {
            type: "number",
            value: perSlide,
            style: {
              width: 50,
            },
            onChange: changePerSlide,
            min: 1,
            max: 5,
          })
        )
      );
    },

    // Save
    save: (props) => {
      return null;
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.components);
