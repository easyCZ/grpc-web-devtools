import { ActionCreator } from 'react-redux-typescript';

export type ExtensionInit = {
    tabId: number,
    source: string,
};

export const extensionInit = new ActionCreator<'EXTENSION_INIT', ExtensionInit>('EXTENSION_INIT');
// export const extensionShow = createEmptyAction('EXTENSION_SHOW');
// export const extensionHide = createEmptyAction('EXTENSION_HIDE');

export const ExtensionActionCreators = {
    extensionInit,
    // extensionShow,
    // extensionHide,
};

export type ExtensionAction = typeof ExtensionActionCreators[keyof typeof ExtensionActionCreators];
