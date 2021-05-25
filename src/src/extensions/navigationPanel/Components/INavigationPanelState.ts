import { INavLinkGroup } from '@fluentui/react/lib/Nav';

export interface INavigationPanelState {
    isOpen: boolean;
    hubLinks: INavLinkGroup[];
    siteLinks: INavLinkGroup[];
}