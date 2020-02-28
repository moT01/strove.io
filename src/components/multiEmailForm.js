import React, { useState } from 'react'
import { ReactMultiEmail } from 'react-multi-email'

const MultiEmailForm = ({ onSubmit }) => {
  const [emails, setEmails] = useState([])
  return (
    <form>
      <ReactMultiEmail
        placeholder="Input your email"
        emails={emails}
        onChange={values => {
          setEmails({ emails: values })
        }}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          )
        }}
      />
    </form>
  )
}

export default MultiEmailForm
