
import {createActionCreator} from "react-redux-typescript/module/create-action-creator";
import {ActionCreator} from "react-redux-typescript";

export type ExtensionInit = {
    tabId: number,
    source: string,
};


export const extensionInit = new ActionCreator<'EXTENSION_INIT', ExtensionInit>('EXTENSION_INIT');
export const extensionShow = createActionCreator<'EXTENSION_SHOW'>('EXTENSION_SHOW');
export const extensionHide = createActionCreator<'EXTENSION_HIDE'>('EXTENSION_HIDE');

export const ExtensionActionCreators = {
    extensionInit,
    extensionShow,
    extensionHide,
};

export type ExtensionAction = typeof ExtensionActionCreators[keyof typeof ExtensionActionCreators];