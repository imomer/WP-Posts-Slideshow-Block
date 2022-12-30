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
      fetchingPosts: { type: "boolean" },
      apiURL: { type: "string" },
      hidePostThumb: { type: "boolean" },
      hidePostDate: { type: "boolean" },
      hidePostExcerpt: { type: "boolean" },
      perSlide: { type: "string" },
    },
    keywords: ["slider", "posts", "slideshow"],

    // Edit
    edit: (props) => {
      // Vars
      var fetchingPosts = props.attributes.fetchingPosts,
        apiURL = props.attributes.apiURL,
        hidePostThumb = props.attributes.hidePostThumb,
        hidePostDate = props.attributes.hidePostDate,
        hidePostExcerpt = props.attributes.hidePostExcerpt,
        perSlide = props.attributes.perSlide || 2;

      // Get & Set posts
      const getSetPosts = () => {
        props.setAttributes({ fetchingPosts: true });

        // APU URL field should not be empty or undefined
        if (apiURL == "" || apiURL == undefined) {
          alert("Please input API endpoint before fetching.");
          return;
        }

        // API URL should be a valid URL
        if (!isValidApiUrl(apiURL)) {
          alert("Please input a valid API endpoint before fetching.");
          return;
        }

        // If all good, go and fetch boy 🐶
        fetch(apiURL)
          .then((res) => {
            return res.json();
          })
          .then((posts) =>
            props.setAttributes({ remotePosts: posts, fetchingPosts: false })
          );
      };

      // Validate API URL
      const isValidApiUrl = (apiURL) => {
        var apiUrlPattern = new RegExp(
          "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
          "i"
        );
        return !!apiUrlPattern.test(apiURL);
      };

      // On change
      const changeApiUrl = (apiURL) => {
        props.setAttributes({ apiURL });
      };
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
          fetchingPosts &&
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
          {
            className: "psb-edit__row psb-edit__row-api-field",
            style: { marginBottom: 10 },
          },
          el(components.TextControl, {
            placeholder: "API URL",
            value: apiURL,
            onChange: changeApiUrl,
          }),
          el(
            "button",
            {
              className: "components-button is-primary",
              style: {
                height: 32,
                marginLeft: 5,
                marginRight: 15,
                justifyContent: "center",
              },
              onClick: getSetPosts,
              disabled: fetchingPosts,
            },
            "Fetch Posts"
          ),
          el(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            el("label", { style: { fontSize: 13 } }, "Posts Per Slide"),
            el(components.TextControl, {
              type: "number",
              value: perSlide,
              style: {
                width: 50,
                marginLeft: 7,
              },
              onChange: changePerSlide,
              min: 1,
              max: 5,
            })
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
