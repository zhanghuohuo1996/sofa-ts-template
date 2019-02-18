/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import * as enLocaleData from 'react-intl/locale-data/en';
import * as zhLocaleData from 'react-intl/locale-data/zh';
import { DEFAULT_LOCALE } from './constants';
import * as Utils from './utils';

const zhTranslationMessages = require('../translations/zh.json');
const enTranslationMessages = require('../translations/en.json');

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

export const getLanguage = () => (Utils.getCookie('sofa-lang') ? Utils.getCookie('sofa-lang') : 'zh');

export const appLocales = [
  'zh',
  'en',
];

interface Messages {
  [key: string]: string;
}

interface MessagesMap {
  en: Messages;
  zh: Messages;
  [key: string]: any;
}

export function formatTranslationMessages(locale: string, messages: Messages): Messages {
  const defaultFormattedMessages: Messages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};

  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : '';
    return {
      ...formattedMessages,
      [key]: formattedMessage,
    }
  }, {});
};

export const translationMessages: MessagesMap = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};

export const getFormattedMessages = (locale = DEFAULT_LOCALE, key: string) => {
  const messages = translationMessages[locale];
  if (messages) {
    return messages[key] || key;
  }
  return key;
};
