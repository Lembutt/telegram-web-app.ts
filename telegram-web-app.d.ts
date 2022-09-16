export {};

interface IPopupButton {
    id?: string;
    type?: string;
    text?: string;
}

interface IPopupParams {
    title?: string;
    message: string;
    buttons?: IPopupButton[];
}

type THapticImpactOccuredStyle = 'light' 
    | 'medium'
    | 'heavy'
    | 'rigid'
    | 'soft';
 
type THapticNotificationOccured = 'error' | 'success' | 'warning';

interface IHapticFeedback {
    impactOccured: (style: THapticImpactOccuredStyle) => IHapticFeedback | {};
    notificationOccured: (type: THapticNotificationOccured) => HapticFeedback | {};
    selectionChanged: () => HapticFeedback | {};
}

interface IButton {
    isVisible: boolean;
    onClick: (callback: function) => void;
    offClick: (callback: function) => void;
    show: () => void;
    hide: () => void;
}

interface IBackButton extends IButton {}

interface IMainButton extends IButton {
    text: string;
    color: string;
    textColor: string;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive: boolean) => void;
    hideProgress: () => void;
    setParams: (params: {
        text: string;
        color: string;
        text_color: string;
        is_active: boolean;
        is_visible: boolean;
    }) => void; 
}

interface IThemeParams {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
}

interface IWebAppChat {
    id: number;
    type: string;
    title: string;
    username?: string;
    photo_url?: string;
}

interface IWebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: true;
    photo_url?: string; 
}

interface IWebAppInitData {
    query_id?: string;
    user?: IWebAppUser;
    receiver?: IWebAppUser;
    chat?: IWebAppChat;
    start_param?: string;
    can_send_after?: number;
    auth_date: number;
    hash: string;
}

type TWebAppEvents = 'themeChanged' 
    | 'viewpoerChanged' 
    | 'mainButtonClicked' 
    | 'backButtonClicked' 
    | 'settingsButtonClicked' 
    | 'invoiceClosed' 
    | 'popupClosed'

interface IWebApp {
    initData: string;
    initDataUnsafe: IWebAppInitData;
    version: string;
    colorScheme: string;
    themeParams: IThemeParams;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isClosingConfirmationEnabled: boolean;
    BackButton: IBackButton;
    MainButton: IMainButton;
    HapticFeedback: IHapticFeedback;
    isVersionAtLeast: (version: string) => boolean;
    setHeaderColor: (color: string) => void;
    setBackgroundColor: (color: string) => void;
    enableClosingConfirmation: () => void;
    disableClosingConfirmation: () => void;
    onEvent: (eventType: TWebAppEvents, eventHandler: function) => void;
    offEvent: (eventType: TWebAppEvents, eventHandler: function) => void;
    sendData: (data: any) => void;
    openLink: (url: string) => void;
    openTelegramLink: (url: string) => void;
    openInvoice: (url: string, callback?: function) => void;
    showPopup: (params: IPopupParams, callback?: function) => void;
    showAlert: (message: string, callback?: function) => void;
    showConfirm: (message: string, callback?: function) => void;
    ready: () => void;
    expand: () => void;
    close: () => void;
}

interface ITelegram {
    WebApp: IWebApp;
}

declare global {
    interface Window {
        Telegram: ITelegram;
    }
}
