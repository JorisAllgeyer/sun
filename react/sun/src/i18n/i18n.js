// https://oprearocks.medium.com/how-to-manage-i18n-translation-files-for-web-applications-c71d6f832eab
export const getTranslations = (lang, component) => {
    const safeLang = lang.toLowerCase();
    const safeComponent = component.toLowerCase();
    return require(`./${safeLang}/${safeComponent}.json`)
}