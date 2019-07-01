/* This is needed due to window not being present when gatsby is building on the server side */
export default typeof window !== 'undefined' && window
