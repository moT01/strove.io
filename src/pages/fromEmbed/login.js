import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { loginOptions } from 'consts'
import { NoRepoUrlInfo, ExternalLink } from 'components'
import { getRepoProvider, getWindowSearchParams, getDomain } from 'utils'

const MenuWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
  z-index: 3;
  position: relative;
  word-break: initial;
`

const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

const RedirectInfoWrapper = styled.div`
  font-size: 16px;
  text-align: center;
  width: 300px;
`

const Url = styled.span`
  font-style: italic;
  font-weight: 600;
`

const Wrapper = styled.div`
  display: flex;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const NoRedirectUrlInfo = styled.div`
  font-size: 18px;
  text-align: center;
  font-style: italic;
  margin-top: 10px;
`

const Login = () => {
  const searchParams = getWindowSearchParams()
  const repoUrl = searchParams.get('repoUrl')
  const goBackTo = searchParams.get('goBackTo')
  const repoProvider = getRepoProvider(repoUrl)
  const loginProvider = loginOptions.find(
    option => option.value === repoProvider
  )

  return (
    <Wrapper>
      <MenuWrapper invert>
        {loginProvider ? (
          <>
            <ExternalLink
              primary
              href={`${loginProvider.embedHref}?goBackTo=${goBackTo}&repoUrl=${repoUrl}`}
            >
              {loginProvider.icon}
              <LoginText invert>Login with {loginProvider.label}</LoginText>
            </ExternalLink>
            {goBackTo ? (
              <RedirectInfoWrapper>
                You'll be redirected back to <Url>{getDomain(goBackTo)}</Url>{' '}
                once you log in
              </RedirectInfoWrapper>
            ) : (
              <NoRedirectUrlInfo>
                Ops! No redirect link available!
              </NoRedirectUrlInfo>
            )}
          </>
        ) : (
          <NoRepoUrlInfo />
        )}
      </MenuWrapper>
    </Wrapper>
  )
}

export default memo(Login)
namespace.xml"},"5":{"name":"entity.name.tag.localname.xml"}},"end":"(/?>)","name":"meta.tag.xml","patterns":[{"include":"#tagStuff"}]},{"include":"#entity"},{"include":"#bare-ampersand"},{"begin":"<%@","beginCaptures":{"0":{"name":"punctuation.section.embedded.begin.xml"}},"end":"%>","endCaptures":{"0":{"name":"punctuation.section.embedded.end.xml"}},"name":"source.java-props.embedded.xml","patterns":[{"match":"page|include|taglib","name":"keyword.other.page-props.xml"}]},{"begin":"<%[!=]?(?!--)","beginCaptures":{"0":{"name":"punctuation.section.embedded.begin.xml"}},"end":"(?!--)%>","endCaptures":{"0":{"name":"punctuation.section.embedded.end.xml"}},"name":"source.java.embedded.xml","patterns":[{"include":"source.java"}]},{"begin":"<!\\[CDATA\\[","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.xml"}},"end":"]]>","endCaptures":{"0":{"name":"punctuation.definition.string.end.xml"}},"name":"string.unquoted.cdata.xml"}],"repository":{"EntityDecl":{"begin":"(<!)(ENTITY)\\s+(%\\s+)?([:a-zA-Z_][:a-zA-Z0-9_.-]*)(\\s+(?:SYSTEM|PUBLIC)\\s+)?","captures":{"1":{"name":"punctuation.definition.tag.xml"},"2":{"name":"keyword.other.entity.xml"},"3":{"name":"punctuation.definition.entity.xml"},"4":{"name":"variable.language.entity.xml"},"5":{"name":"keyword.other.entitytype.xml"}},"end":"(>)","patterns":[{"include":"#doublequotedString"},{"include":"#singlequotedString"}]},"bare-ampersand":{"match":"&","name":"invalid.illegal.bad-ampersand.xml"},"doublequotedString":{"begin":"\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.xml"}},"end":"\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.xml"}},"name":"string.quoted.double.xml","patterns":[{"include":"#entity"},{"include":"#bare-ampersand"}]},"entity":{"captures":{"1":{"name":"punctuation.definition.constant.xml"},"3":{"name":"punctuation.definition.constant.xml"}},"match":"(&)([:a-zA-Z_][:a-zA-Z0-9_.-]*|#[0-9]+|#x[0-9a-fA-F]+)(;)","name":"constant.character.entity.xml"},"internalSubset":{"begin":"(\\[)","captures":{"1":{"name":"punctuation.definition.constant.xml"}},"end":"(\\])","name":"meta.internalsubset.xml","patterns":[{"include":"#EntityDecl"},{"include":"#parameterEntity"},{"include":"#comments"}]},"parameterEntity":{"captures":{"1":{"name":"punctuation.definition.constant.xml"},"3":{"name":"punctuation.definition.constant.xml"}},"match":"(%)([:a-zA-Z_][:a-zA-Z0-9_.-]*)(;)","name":"constant.character.parameter-entity.xml"},"singlequotedString":{"begin":"'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.xml"}},"end":"'","endCaptures":{"0":{"name":"punctuation.definition.string.end.xml"}},"name":"string.quoted.single.xml","patterns":[{"include":"#entity"},{"include":"#bare-ampersand"}]},"tagStuff":{"patterns":[{"captures":{"1":{"name":"entity.other.attribute-name.namespace.xml"},"2":{"name":"entity.other.attribute-name.xml"},"3":{"name":"punctuation.separator.namespace.xml"},"4":{"name":"entity.other.attribute-name.localname.xml"}},"match":"(?:^|\\s+)(?:([-\\w.]+)((:)))?([-\\w.:]+)\\s*="},{"include":"#doublequotedString"},{"include":"#singlequotedString"}]},"comments":{"patterns":[{"begin":"<%--","captures":{"0":{"name":"punctuation.definition.comment.xml"},"end":"--%>","name":"comment.block.xml"}},{"begin":"<!--","captures":{"0":{"name":"punctuation.definition.comment.xml"}},"end":"-->","name":"comment.block.xml","patterns":[{"begin":"--(?!>)","captures":{"0":{"name":"invalid.illegal.bad-comments-or-CDATA.xml"}}}]}]}}}