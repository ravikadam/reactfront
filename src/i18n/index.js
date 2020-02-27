import en from './en/messages'

const langs = {
  en
}
const getLangMessages = (lang = 'en') => {
  return langs[lang]
}

export default getLangMessages()
