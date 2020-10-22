
<script>
  import { scenarioStore, urlStore } from './stores';

  let scenarioName = null;
  let appName = null;

  let metadata = {};
  urlStore.subscribe(url => metadata.url = url);
  scenarioStore.subscribe(scenarioData => {
    const scenarioMetadata = scenarioData.metadata || {};
    metadata.app = scenarioMetadata.app;
    metadata.name = scenarioMetadata.name;
  });

  $: hasMetadata = Object.values(metadata).find(v => v) !== null;
</script>

{#if hasMetadata}
  <div class="metadata">
      {#if metadata.app}
        <div class="kv-pair">
          <div class="k">Application</div>
          <div class="v">{metadata.app}</div>
        </div>
      {/if}

      {#if metadata.name}
        <div class="kv-pair">
          <div class="k">Name</div>
          <div class="v">{metadata.name}</div>
        </div>
      {/if}

      {#if metadata.url}
        <div class="kv-pair">
          <div class="k">URL</div>
          <a href={metadata.url} class="v">{metadata.url}</a>
        </div>
      {/if}
  </div>
{/if}

<style type="text/scss">
  .metadata {
    text-align: left;
    margin-bottom: 1rem;

    .kv-pair {
      margin-bottom: 0.5em;

      .k {
        text-transform: uppercase;
        font-weight: 100;
        color: #9c2fba;
        font-size: 12px;
      }

      .v {
        font-size: 14px;
      }
    }
  }
</style>
