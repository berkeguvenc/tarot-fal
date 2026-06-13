import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { i18nConfig } from '../../i18nConfig';

export default async function initTranslations(
    locale: string,
    namespaces: string[]
) {
    const i18nInstance = createInstance();

    i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`@/locales/${language}/${namespace}.json`)
            )
        );

    await i18nInstance.init({
        lng: locale,
        fallbackLng: i18nConfig.defaultLocale,
        supportedLngs: i18nConfig.locales,
        defaultNS: namespaces[0],
        ns: namespaces,
        preload: typeof window === 'undefined' ? i18nConfig.locales : []
    });

    return {
        i18n: i18nInstance,
        resources: i18nInstance.services.resourceStore.data,
        t: i18nInstance.t
    };
}