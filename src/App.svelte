<script>
  import DataTable from './DataTable.svelte';
  import AppMapSelector from './AppMapSelector.svelte';
  import GitHubRibbon from './GitHubRibbon.svelte';
  import ScenarioMetadata from './ScenarioMetadata.svelte';
  import { dataObjectStore } from './stores';

  let hasData = false;
  dataObjectStore.subscribe(data => hasData = data && data.length > 0);
</script>

<GitHubRibbon url="https://github.com/dustinbyrne/appmap-data-inspector"/>

<main>
  <header>
    <h1>AppMap Data Inspector</h1>
    <AppMapSelector />
  </header>

  {#if hasData}
    <h2>Metadata</h2>
    <ScenarioMetadata />

    <h2>Data Summary</h2>
    <DataTable />
  {/if}
</main>

<footer>
  <span>
    For more information, check out
    <a href="https://appland.org">appland.org</a>
  </span>
</footer>

<style type="text/scss">
  html,
  body {
    background-color: #eaeaea;
  }

  main {
    padding: 0 1em;
    margin: 0 auto;

    header {
      text-align: center;
      margin: 2rem;
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    padding: 0.5rem;
    font-size: 12px;
    background-color: #eaeaea;
    width: 100%;
    text-align: center;
  }

  h1 {
    color: #9c2fba;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
    margin-bottom: 1rem;
  }

  h2 {
    text-transform: uppercase;
    font-weight: 100;
    margin-bottom: 0.5rem;
    color: #9c2fba;
  }

  ul {
    list-style-type: none;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
