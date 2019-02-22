/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from '../../utils/constants';

import { selectLang } from '../../state/selectors';

interface IProps {
  locale?: string;
  messages?: IMessages;
  children: any;
}

interface IMessages {
  [key: string]: string,
}

class LanguageProvider extends React.PureComponent<IProps, object> {
  render() {
    const { locale, messages = {} } = this.props;
    const msg: string = messages[locale] as string;
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={msg}
        defaultLocale={DEFAULT_LOCALE}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

export default connect(createSelector(
  selectLang,
  locale => ({ locale }),
))(LanguageProvider);
