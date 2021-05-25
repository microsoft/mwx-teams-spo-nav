import * as React from "react";
import * as strings from 'NavigationPanelApplicationCustomizerStrings';
import styles from './NavigationPanel.module.scss';
import { INavigationPanelState } from './INavigationPanelState';
import { INavigationPanelProps } from './INavigationPanelProps';
import { IHubSiteDataResult, IHubSiteData,ISiteNavigationResult, INavigation } from './INavigation';
import TeamsCommandBarButton from './TeamsCommandBarButton';
import { ICommandBarItemProps, CommandBar } from '@fluentui/react/lib/CommandBar';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Nav, INavLinkGroup, INavLink, INavStyles, INavProps } from '@fluentui/react/lib/Nav';
import { ThemeProvider, PartialTheme } from "@fluentui/react/lib/Theme";
import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration } from '@microsoft/sp-http';

export default class NavigationPanel extends React.Component<INavigationPanelProps, INavigationPanelState> {  
  private _showNavigation: boolean;    

  constructor(props: INavigationPanelProps) {
    super(props);
    
    const inTeams = (window.self !== window.top);        
    const currentUrl = window.location.href.toLocaleLowerCase();        
    this._showNavigation = ((inTeams) && (currentUrl.indexOf('sho=noteams') == -1)) || ((!inTeams) && (currentUrl.indexOf('sho=sp') != -1));
  
    this.state = {
      isOpen: false,
      hubLinks: [] as INavLinkGroup[],
      siteLinks: [] as INavLinkGroup[]
    };
  }

  public componentDidMount(): void {    
    if (this._showNavigation) {
      this._getHubLinks();
      this._getSiteLinks();
    }
  } 

  public render(): JSX.Element { 
    
    // If we shouldn't show the navigation or if there is no navigation to show, return null
    if ((!this._showNavigation) || ((this.state.hubLinks.length == 0) && (this.state.siteLinks.length == 0))) {
      return null;
    }    
    
    return (
      <ThemeProvider>
        <div>
          <div className={"ms-bgColor-themeDark ms-fontColor-white"}>
            <CommandBar 
              items={this._getMainCommandBarItems()} 
              farItems={this._getMainCommandBarFarItems()} 
              buttonAs={TeamsCommandBarButton} >
            </CommandBar>
          </div>
          <Panel
            //headerText={strings.PanelTitle}            
            isOpen={this.state.isOpen}
            onDismiss={() => this.setState({ isOpen: false })}
            type={PanelType.customNear}
            customWidth='600px'
            className={styles.yinzNavigationPanel}          
            // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
            closeButtonAriaLabel="Close">            
            { this._getNavArea() }
          </Panel>
        </div>
      </ThemeProvider>
    );
  }
  
  private _getMainCommandBarItems = () : ICommandBarItemProps[] => {
    

    const items: ICommandBarItemProps[] = [
      {
          key: 'showNav',
          name: '',
          title: strings.ShowPanelButtonTitle,
          ariaLabel: strings.ShowPanelButtonTitle,          
          cacheKey: 'showNav',
          iconProps: {
              iconName: 'GlobalNavButton'
          },
          split: true,
          onClick: () => {this.setState({ isOpen: true });}
      }
    ];

    return items;
  }
  
  private _getMainCommandBarFarItems = () : ICommandBarItemProps[] => {
    

    const items: ICommandBarItemProps[] = [    
      // {
      //   key: 'showNav',
      //   name: '',
      //   title: strings.ShowPanelButtonTitle,
      //   ariaLabel: strings.ShowPanelButtonTitle,          
      //   cacheKey: 'showNav',
      //   iconProps: {
      //       iconName: 'GlobalNavButton'
      //   },
      //   split: true,
      //   onClick: () => {this.setState({ isOpen: true });}
      // },       
      {
        key: 'navBack',
        name: '',
        title: strings.BackNavButtonText,
        ariaLabel: strings.BackNavButtonText,
        cacheKey: 'navBack',
        split: false,
        iconProps: {
            iconName: 'Back'
        },
        onClick: () => { this.setState({ isOpen: false }); window.history.back();  }
      },
      {
        key: 'navForward',
        name: '',
        title: strings.ForwardNavButtonText,
        ariaLabel: strings.ForwardNavButtonText,
        cacheKey: 'navForward',        
        iconProps: {
            iconName: 'Forward'
        },
        onClick: () => { this.setState({ isOpen: false }); window.history.forward();  }
      },
      {
        key: 'refresh',
        name: '',
        title: 'Refresh',
        ariaLabel: 'Refresh',
        cacheKey: 'refresh',        
        iconProps: {
            iconName: 'Refresh'
        },
        onClick: () => { this.setState({ isOpen: false }); window.location.reload();  }
      }
    ];

    return items;
  }

  private _getNavArea() : JSX.Element {
    
    var control : JSX.Element = null;

    if ((this.state.hubLinks.length > 0) && (this.state.siteLinks.length > 0)) {
      control = 
        <Pivot aria-label="Navigation">
          <PivotItem headerText="Hub">
            <br />
            { this._getNavControl("Hub Navigation", this.state.hubLinks) }
          </PivotItem>
          <PivotItem headerText="Site">
          <br />
            { this._getNavControl("Site Navigation", this.state.siteLinks) }
          </PivotItem>          
        </Pivot>;
    }
    else if (this.state.hubLinks.length > 0) {
      control = this._getNavControl("Hub Navigation", this.state.hubLinks);
    }
    else if (this.state.siteLinks.length > 0) {
      control = this._getNavControl("Site Navigation", this.state.siteLinks);
    }

    return control;
  }

  private _getNavControl = (ariaLabel: string, items: INavLinkGroup[]) : JSX.Element => {  
    return (      
      <Nav 
        ariaLabel={ ariaLabel } 
        className={ styles.yinzNav } 
        groups={ items }         
        selectedKey= { null }
      />      
    );
  } 

  private _getHubLinks = () : void => {
    this.props.spClient.get(`${this.props.siteUrl}/_api/web/HubSiteData`,
      SPHttpClient.configurations.v1,
      {
        headers: [
          ['accept', 'application/json;odata.metadata=none']
        ]
      })
    .then((response: SPHttpClientResponse): Promise<IHubSiteDataResult> => {            
      return response.json();  
    })
    .then((response: IHubSiteDataResult) : void => {      
      const hubSiteData : IHubSiteData = JSON.parse(response.value);
      //console.log(hubSiteData);
      this._getNavLinksFromHubSiteData(hubSiteData);
    });        
  }

  private _getNavLinksFromHubSiteData = (hubSiteData : IHubSiteData) : void => {
    const links: INavLinkGroup[] = [ { links: [] } ];

    const hasLink : boolean = (hubSiteData.url != null && hubSiteData.url.indexOf('linkless.header/') == -1);

    if (!hubSiteData.hideNameInNavigation) {
      links[0].links.push({ 
        name: hubSiteData.name,
        title: hubSiteData.name,        
        url: hubSiteData.url,     
        disabled: !hasLink, 
        links: []
      });
    }

    for (var index = 0; index < hubSiteData.navigation.length; index++) {
      links[0].links.push(this._getNavLinkFromNavigation(hubSiteData.navigation[index], 1));
      
      // links.push( {links: [] });
      // links[index + 1].links.push(this._getNavLinkFromNavigation(hubSiteData.navigation[index], 1));
    }

    //console.log(links);

    this.setState({ hubLinks: links});
  }

  private _getSiteLinks = () : void => {
    this.props.spClient.get(`${this.props.siteUrl}/_api/web/navigation/QuickLaunch?$expand=children/children/children/children`,
      SPHttpClient.configurations.v1,
      {
        headers: [
          ['accept', 'application/json;odata.metadata=none']
        ]
      })
    .then((response: SPHttpClientResponse): Promise<ISiteNavigationResult> => {            
      
      return response.json();  
    })
    .then((result: ISiteNavigationResult) : void => {      
        this._getNavLinksFromSiteNavigationResult(result);
    });        
  }

  private _getNavLinksFromSiteNavigationResult = (result : ISiteNavigationResult) : void => {
    console.log(result);
    
    const links: INavLinkGroup[] = [ { links: [] } ];
    
    for (var index = 0; index < result.value.length; index++) {
      if (result.value[index].IsVisible && result.value[index].Url != "") {
        links[0].links.push(this._getNavLinkFromNavigation(result.value[index], 1));
      }      
    }    

    console.log(links);
    this.setState({ siteLinks: links});
  } 
  
  private _getNavLinkFromNavigation = (siteNavigation : INavigation, linkLevel: number) : INavLink => {    
    
    //console.log(siteNavigation);
    
    const hasLink : boolean = (siteNavigation.Url != null && siteNavigation.Url.indexOf('linkless.header') == -1);

    const link : INavLink = {
      name: siteNavigation.Title,
      title: siteNavigation.Title,
      url: siteNavigation.Url,
      key: `${siteNavigation.Id}`,
      target: (siteNavigation.IsExternal) ? "_blank" : "",
      links: [],
      disabled: !hasLink
    };

    //console.log(`Children: ${hubNavigation.Children.length}`);
    if (siteNavigation.Children != null) {
      for (var index = 0; index < siteNavigation.Children.length; index++) {
        if ((siteNavigation.Children[index].IsVisible == null) || (siteNavigation.Children[index].IsVisible)) {        
          link.links.push(this._getNavLinkFromNavigation(siteNavigation.Children[index], linkLevel + 1));
        }
      }
    }

    return link;
  }

}

