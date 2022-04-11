# SharePoint Online Navigation in Teams

[Supported Clouds](https://github.com/microsoft/mwx-teams-spo-nav/wiki/Supported-Clouds)|[Documentation](https://github.com/microsoft/mwx-teams-spo-nav/wiki)|[Deployment Guide](https://github.com/microsoft/mwx-teams-spo-nav/wiki/Deployment-Guide)|[Release Notes](https://github.com/microsoft/mwx-teams-spo-nav/wiki/Release-Notes)
-|-|-|-

## Supported Versions of Office 365
Commercial|GCC|GCC High|GCC DoD
-|-|-|-
![Supported](assets/supported.png)|![Supported](assets/supported.png)|![Unknown](assets/supported.png)|![Unknown](assets/unknown-supported.png)


## SharePoint Framework Version
![version](https://img.shields.io/badge/version-1.14-green.svg)

## Overview

Adding a modern SharePoint site to Microsoft Teams as an app enables users to access all their site content without having to leave Teams. Example scenarios include:
* Add your Corporate intranet to Teams for easy discovery of news and content.
* Add the [Learning Pathways](https://aka.ms/learningpathways) solution to Teams to provide Microsoft 365 training to your users.
* Add the [New Employee Onboarding](https://docs.microsoft.com/en-us/sharepoint/provision-neo-hub) sites to Teams to empower new hires with the information they need to be successful.

Teams supresses the navigation when viewing a SharePoint site in Teams. While this behavior is desired in some scenarios (like the [Me Hub](https://aka.ms/me-hub)), there are others (like the examples previously mentioned) where users need the ability navigate within a site.  This solution addresses those scenarios by adding  the navigation back into a SharePoint site when it detects that it's running in Teams.  

## Features
* If your site has both hub and site navigation, there will be a pivot that will let you select what navigation to view.
* Url paramater that can specified to supress the navigation for those scenarios where you don't navigation. 

![Usage gif](assets/teams-spo-nav.gif)

## Parameters
The **mwx-nav** url parameter can be used to hide the navigation in Teams or show it in a SharePoint site not in Teams.  Specify a value of:
* **hide** to hide the navigation when the site is in Teams.  An example url would look like: https://contoso.sharepoint.com/sites/me?mwx-nav=hide
* **show** to show the navigation when the site is not in Teams.  An example url would look like: https://contoso.sharepoint.com/sites/me?mwx-nav=show

## Minimal Path to Awesome
1. Upload the [mwx-teams-spo-nav.sppkg](./solution/mwx-teams-spo-nav.sppkg) to your tenant's SharePoint App Catalog.
1. In the **Do you trust MWX Teams SPO Navigation** dialog
  1. Make sure **Make this site available to all in the organization** is checked
  1. Click the deploy button

![Deployment Dialog Screenshot](assets/spo-deploy-dialog.png)

Now all your SharePoint sites in Teams will have Navigation!

## Release History
Version|Published|Notes
-|-|-
1.0.0 | May 28, 2021 | Initial Release
1.0.1 | April 11, 2022 | Upgraded to SPFx 1.14 & addreesed issue with icons not always being visible

## Feedback

Thoughts? Questions? Ideas? Bugs? Share them with us [here](https://github.com/microsoft/mwx-teams-spo-nav/issues/new).

## Legal notice

This app template is provided under the [MIT License](https://github.com/microsoft/mwx-teams-spo-nav/blob/master/LICENSE) terms.  In addition to these terms, by using this app template you agree to the following:

- You, not Microsoft, will license the use of your app to users or organization. 

- This app template is not intended to substitute your own regulatory due diligence or make you or your app compliant with respect to any applicable regulations, including but not limited to privacy, healthcare, employment, or financial regulations.

- You are responsible for complying with all applicable privacy and security regulations including those related to use, collection and handling of any personal data by your app. This includes complying with all internal privacy and security policies of your organization if your app is developed to be sideloaded internally within your organization. Where applicable, you may be responsible for data related incidents or data subject requests for data collected through your app.

- Any trademarks or registered trademarks of Microsoft in the United States and/or other countries and logos included in this repository are the property of Microsoft, and the license for this project does not grant you rights to use any Microsoft names, logos or trademarks outside of this repository. Microsoft’s general trademark guidelines can be found [here](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general.aspx).

- If the app template enables access to any Microsoft Internet-based services (e.g., Office365), use of those services will be subject to the separately-provided terms of use. In such cases, Microsoft may collect telemetry data related to app template usage and operation. Use and handling of telemetry data will be performed in accordance with such terms of use.

- Use of this template does not guarantee acceptance of your app to the Teams app store. To make this app available in the Teams app store, you will have to comply with the [submission and validation process](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/publish), and all associated requirements such as including your own privacy statement and terms of use for your app.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.