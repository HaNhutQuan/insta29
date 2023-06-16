import React from "react";
import { useParams, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default
  try {

    return React.createElement(component())
} catch (err) {
    return <Navigate to="/login"/>
}
};
const PageRender = () => {
  const { page, id } = useParams();
  let pageName = "";
  const auth = useSelector((state) => state.auth)
  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }


  return generatePage(pageName);
};

export default PageRender;
