import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {isBrowser, isMobile, isTablet} from "react-device-detect";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <h1>HELLO {isMobile&&"A"} {isBrowser&&"B"} {isTablet&&"C"}</h1>
  </Layout>
);

export default NotFoundPage
