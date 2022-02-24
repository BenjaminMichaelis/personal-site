import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import SEO from "../components/seo.js"

// markup
const IndexPage = () => {
  return (
    <Layout>
    <SEO title="Home" />
    <h1 class="title">Benjamin Michaelis</h1>
    <p>I'm a full-time software engineering student based in Pullman, Washington at WSU-Pullman and part-time adventure seeker/traveler. In my free time I love the outdoors, being active, as well as connecting with friends and family.</p>
  </Layout>
  )
}

export default IndexPage
