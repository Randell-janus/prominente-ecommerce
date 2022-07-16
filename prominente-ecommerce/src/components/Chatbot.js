// import React from "react";

// export default class Chatbot extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     (function (d, m) {
//       var kommunicateSettings = {
//         appId: "2f46f3a897c59c659ce6cb5df569836e8",
//         popupWidget: true,
//         automaticChatOpenOnNavigation: true,
//       };
//         var s = document.createElement("script");
//         s.type = "text/javascript";
//         s.async = true;
//         s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
//         var h = document.getElementsByTagName("head")[0];
//         h.appendChild(s);
//         window.kommunicate = m;
//         m._globals = kommunicateSettings;
//     })(document, window.kommunicate || {});
//   }
//   render() {
//     return <div></div>;
//   }
// }

import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "2f46f3a897c59c659ce6cb5df569836e8",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);
  return <div></div>;
};

export default Chatbot;
