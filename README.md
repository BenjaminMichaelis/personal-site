# Personal-Site

ideas:

- [x] NUnit/etc explanation - the microsoft docs changes
- [x] 6.0.37 patch on runner but not otherwise
- [ ] file systems - docker stuff
- [ ] ASP.Net getting controller routes
- [ ] Dumb Nuget Push with Azure Artifacts.......
  - Recommended path:

  - https://github.com/actions/setup-dotnet?tab=readme-ov-file#azure-artifacts
  - https://learn.microsoft.com/azure/devops/artifacts/quickstarts/github-actions?view=azure-devops&pivots=pat&WT.mc_id=8B97120A00B57354#create-a-new-yaml-file-1
  - https://learn.microsoft.com/nuget/concepts/security-best-practices?WT.mc_id=8B97120A00B57354#nuget-configuration
  - https://learn.microsoft.com/nuget/consume-packages/configuring-nuget-behavior?WT.mc_id=8B97120A00B57354
  - https://learn.microsoft.com/nuget/consume-packages/configuring-nuget-behavior?WT.mc_id=8B97120A00B57354#settings-walkthrough
    $env:PWD = $(Get-Location).Path

Chat sent to someone about this:

"
Ok so wondering if you can point me in the direction of the right team to talk to about a fun little problem we ran into.

So here is the setup. We have repo with a nuget.config in it. It is setup with a single source to Azure DevOps artifacts feed, and a clear, very similar to the best practices here: [Best practices for a secure software supply chain | Microsoft Learn](https://learn.microsoft.com/en-us/nuget/concepts/security-best-practices#nuget-configuration)

The repo and the pipeline live on GitHub. Inside of our GitHub actions we are running a dotnet pack in job1, and a dotnet nuget push command in job2. The authentication in job2 was done with a setup .NET action similar to this:

```YAML
      - name: Setup .NET
        uses: actions/setup-dotnet@v5
        with:
          dotnet-version: '8.x'
          source-url: https://pkgs.dev.azure.com/intelliTect/_packaging/Foo/nuget/v3/index.json
        env:
          NUGET_AUTH_TOKEN: ${{secrets.AZURE_DEVOPS_PAT}}
```

This was all working fine, until one of our devs added - uses: actions/checkout@v5 to the job that was running dotnet nuget push. After this point you are guaranteed to have that command always die with a 401.

After a lot of digging we have figured out what is going on (and I am not really sure who is to blame for it).

- the setup-dotnet action writes a nuget.config one directory above your repository. https://github.com/actions/setup-dotnet/blob/740310365d5065c44c30d213e7963107ebfd22d5/src/authutil.ts#L19-L23.
- nuget.exe then proceeds to follow its normal process for loading files. [Common NuGet configurations | Microsoft Learn](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior?WT.mc_id=8B97120A00B57354#settings-walkthrough) This is fine-ish except if you follow the best practices to include a <clear/.> in your NuGet.config as that means that the one in your repo will clear the stuff above it. Making that file from the setup-dotnet action meaningless.
- The problem is a bit further compounded by Azure DevOps actions not being willing to accept a token from the command line. [Publish NuGet packages with dotnet CLI - Azure Artifacts | Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/artifacts/nuget/dotnet-exe?view=azure-devops&tabs=projectscoped&WT.mc_id=8B97120A00B57354#publish-packages-to-a-feed-in-the-same-organization)

All of this to say that the combination of it feels really problematic. Now that we understand what is happening, we can work around it. I realize this isn't really in your direct area, but I was wondering if you could direct me to the nuget team and/or who own the setup-dotnet action, and/or docs team because the combination of all three feels off.

and/or Azure Artifacts folks because i would love to understand why we can't use an API key on the command line, but plain text in a config file is ok.
"
