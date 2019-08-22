// This still needs a rework
export const getbitbucketToken = async refresh_token => {
  try {
    const BITBUCKET_CLIENT_SECRET = process.env.BITBUCKET_CLIENT_SECRET
    const BITBUCKET_CLIENT_ID = process.env.BITBUCKET_CLIENT_ID

    // This won't work here, so it must be changed
    const buf = Buffer.from(
      `${BITBUCKET_CLIENT_ID}:${BITBUCKET_CLIENT_SECRET}`,
      'ascii'
    )

    const { access_token } = await fetch(
      'https://bitbucket.org/site/oauth2/access_token',
      {
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
        headers: {
          Authorization: `Basic ${buf.toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      }
    ).then(res => res.json())

    return access_token
  } catch (e) {
    return e
  }
}
