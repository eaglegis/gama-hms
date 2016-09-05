# aspnetcoreangular2

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

Awesome feature - entities frontend


- Atom (1.9.9 +) for editing
  - Extensions:
    - [atom-typescript](https://atom.io/packages/atom-typescript) (10.1.6 +) (for auto-creating .js and .js.map files)

Running through http://blog.nbellocam.me/2016/03/14/asp-net-core-and-angular-2/ on MacOSX

````
% git clone git@github.com:leighghunt/aspnetcoreangular2.git
% cd aspnetcoreangular2/WebApplication
% dotnet restore
% npm install
% dotnet build
% dotnet ef database update
% gulp copy-deps
% tsc
% dotnet run
````
