import React from "react"
import { Link } from "gatsby"

import { Button } from "semantic-ui-react"

const NavLinks = () => {
  return (
    <>
      <Button as={Link} color="blue" to="/">
        Home
      </Button>
      <Button as={Link} color="blue" to="/about/">
        About Me
      </Button>
    </>
  )
}

export default NavLinks