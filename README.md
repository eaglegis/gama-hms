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

- Prerequisites:
  - [.NET Core Windows Server Hosting](https://go.microsoft.com/fwlink/?LinkID=827547)
  - [NodeJS](https://nodejs.org/en/download/)

- Steps to take to configure to use IIS, rather than dotnet/kestrel:
- Update ```appsettings.json``` to point to correct DB path:
  - ```"DefaultConnection": "Data Source=App_Data\\WebApplication.db"```

````
npm install -g gulp typescript
git clone git@github.com:eaglegis/gama-hms.git
cd gama-hms/src
dotnet restore
npm install
dotnet build
dotnet ef database update
tsc
gulp copy-deps
dotnet run
dotnet publish
````

- Copy contents of ```src/bin/Debug/netcoreapp1.0/publish/``` into ```c:/inetpub/hms/```.
- Create ```App_Data``` folder and copy ```WebApplication.db``` file into it.
- Add **Modify** permissions to ```IIS APPPOOL\api``` user (ensure local machine is selected when checking name) to ```App_Data``` folder.

- Development Mode
  - If needed, you can set the ```ASPNETCORE_ENVIRONMENT``` environment variable to ```Development``` as detailed in [this article](http://stackoverflow.com/questions/31049152/publish-to-iis-setting-environment-variable/36836533#36836533). **N.B.** you will need to create a ```project.json``` file in the application directory.
