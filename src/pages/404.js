import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {isBrowser, isMobile, isTablet} from "react-device-detect";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <h1>HELLO {isMobile===true&&"A"} {isBrowser===true&&"B"} {isTablet===true&&"C"}</h1>
      <h1>BB {isMobile===true} {isBrowser===true} {isTablet===true}</h1>
      <h1>CC {!isMobile+""} {!isBrowser+""} {!isTablet+""}</h1>
  </Layout>
);

export default NotFoundPage
