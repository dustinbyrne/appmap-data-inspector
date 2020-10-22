<script>
  import DataTable from './DataTable.svelte';
  import AppMapSelector from './AppMapSelector.svelte';
  import GitHubRibbon from './GitHubRibbon.svelte';
</script>

<main>
  <GitHubRibbon url="https://github.com/dustinbyrne/appmap-data-inspector"/>
  <h1>AppMap Data Inspector</h1>
  <AppMapSelector></AppMapSelector>
  <DataTable></DataTable>
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
    text-align: center;
    padding: 1em;
    margin: 0 auto;
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
