
<script>
  import LabelIcons from './LabelIcons.svelte';
  import { dataObjects as dataObjectStore } from './stores';

  let dataObjects = [];
  dataObjectStore.subscribe(val => {
    dataObjects = val;
  });

  // let sortKey = 'entropy'
  let sort = { key: 'entropy', ascending: false };
  $: sortBy = (key) => {
    if (key === sort.key) {
      sort.ascending = !sort.ascending;
    }
    sort.key = key;
    dataObjects.sort(...sort);
  };

  $: dataAttrSort = (key) => {
    if (key !== sort.key) {
      return null;
    }

    return sort.ascending? 'ascending' : 'descending';
  }
</script>

{#if dataObjects.length > 0}
  <table>

    <tr>
      <th on:click={sortBy('name')} sort={dataAttrSort('name')}>Name</th>
      <th on:click={sortBy('value')} sort={dataAttrSort('value')}>Value</th>
      <th on:click={sortBy('entropy')} sort={dataAttrSort('entropy')}>Entropy</th>
    </tr>

    {#each dataObjects as dataObject}
      <tbody>
        <tr>
          <td><strong>{dataObject.name}</strong></td>
          <td class="value">{dataObject.value}</td>
          <td>{dataObject.entropy.toFixed(2)}</td>
        </tr>
        {#if dataObject.labels.size > 0}
          <tr>
            <td colspan="3">
              <LabelIcons labels={[...dataObject.labels]}></LabelIcons>
            </td>
          </tr>
        {/if}
      </tbody>
    {/each}

  </table>
{/if}

<style type="text/scss">
  .value {
    font-family: monospace;
  }

  table {
    margin: auto;
    max-width: 100vw;
    border-spacing: 0;

    th {
      $color: #1a2030;
      $background-color: #4362b1;
      $hover-lighten: 12.5%;

      font-size: 1.2rem;
      color: $color;
      cursor: pointer;
      user-select: none;
      background-color: $background-color;
      transition: all cubic-bezier(0.55, 0.055, 0.675, 0.19) 0.1s;

      &:hover {
        color: lighten($color, $hover-lighten);
        background-color: lighten($background-color, $hover-lighten);
      }

      &[sort="descending"]:before {
        font-family: 'Font Awesome 5 Free';
        content: '\f0dd';
      }

      &[sort="ascending"]:before {
        font-family: 'Font Awesome 5 Free';
        content: '\f0de';
      }
    }

    tbody:nth-child(even) {
      background-color: #c1d0f4;
    }

    td {
      padding: 1em;
      word-wrap: normal;
      word-break: break-all;

      .value {
        font-family: monospace;
      }
    }
  }

  h1 {
    margin-top: 0;
  }

  h2 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
</style>
