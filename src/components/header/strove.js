import React from 'react'

const StroveLink = () => {
  return (
    <>
      {!isEmbed && (
        <LinkWrapper mobile={isMobileOnly}>
          <StyledLink to="/">
            {isMobileOnly ? <StyledStroveIcon /> : <LinkText>Strove</LinkText>}
          </StyledLink>
        </LinkWrapper>
      )}
    </>
  )
}

export default StroveLink
