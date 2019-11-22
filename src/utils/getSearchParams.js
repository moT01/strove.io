import window from './window'

export default () => new URL(window?.location?.href).searchParams
