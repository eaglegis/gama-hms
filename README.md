#gama-hms

### Prerequisites
- node v0.12.9 +
- npm v3 + (see #3)
- typescript (1.8.10 +)
- Microsoft .NET Core 1.0.0 - SDK Preview 2
- .NET Command Line Tools (1.0.0-preview3-003223)

### Optional but recommended
- Visual Studio Code (1.4.0 +) for debugging
  - Extensions:
    - [C# for Visual Studio Code (powered by OmniSharp)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
  - If running using Visual Studio Code for editing, run the following to ensure .ts files are compiled to .js and .js.map files:
````
$ tsc --watch
````

- Atom (1.9.9 +) for editing
  - Extensions:
    - [atom-typescript](https://atom.io/packages/atom-typescript) (10.1.6 +) (for auto-creating .js and .js.map files)

Inspiration: http://blog.nbellocam.me/2016/03/14/asp-net-core-and-angular-2/

Running on MacOSX
-----------------

````
% npm install -g gulp typescript
% git clone git@github.com:eaglegis/gama-hms.git
% cd gama-hms/src
% dotnet restore
% npm install
% dotnet build
% dotnet ef database update
% gulp copy-deps
% tsc
% dotnet run
````

Running on IIS on Windows
-------------------------

References:

- https://docs.asp.net/en/latest/publishing/iis.html
- https://www.iis.net/learn/extensions/url-rewrite-module/reverse-proxy-with-url-rewrite-v2-and-application-request-routing

- Download [.NET Core Windows Server Hosting](https://go.microsoft.com/fwlink/?LinkID=827547)
- Download [NodeJS](https://nodejs.org/en/download/)
- Prerequisites:
  - URL Rewrite Module
  - [Application Request Routing (ARR)](https://www.iis.net/downloads/microsoft/application-request-routing)
- Add the following rewrite rules to IIS's root ```web.config```.
```
<rule name="Reverse Proxy to gama-hms" stopProcessing="true">
    <match url="^hms/(.*)" />
    <action type="Rewrite" url="http://localhost:5001/{R:1}" />
</rule>
```

````
npm install -g gulp typescript
git clone git@github.com:eaglegis/gama-hms.git
cd gama-hms/src
dotnet restore
npm install
dotnet build
dotnet ef database update
gulp copy-deps
tsc
dotnet run
````
