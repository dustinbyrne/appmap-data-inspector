
<script>
  import '@fortawesome/fontawesome-free/js/all';
  import { getLabel, Labels } from './lib/labels';

  export let labels = [];

  const iconTable = {
    [Labels.Database.id]: 'fas fa-database',
    [Labels.HighEntropy.id]: 'fa fa-bolt',
    [Labels.PersonalInformation.id]: 'fas fa-id-badge',
    [Labels.UserProvided.id]: 'fas fa-disease',
    [Labels.Encrypted.id]: 'fas fa-lock',
    [Labels.Credential.id]: 'fas fa-key',
    [Labels.JSON.id]: 'fas fa-file',
    [Labels.URL.id]: 'fas fa-link',
    [Labels.Stdout.id]: 'fas fa-terminal',
    [Labels.HTML.id]: 'fas fa-file-code',
    [Labels.LowEntropy.id]: 'fas fa-battery-empty',
    [Labels.Unencrypted.id]: 'fas fa-unlock-alt',
    [Labels.Hex.id]: 'fas fa-font',
  }

  $: labelIcons = labels
    .map(l => Object.assign({ class: iconTable[l] }, getLabel(l)))
    .filter(l => l.class);
</script>

<div class="icon-list">
  <ul>
  {#each labelIcons as label}
    <li>
      <i class={label.class}></i>
      <span>{label.desc}</span>
    </li>
    <!-- <li>{label}</li> -->
  {/each}
  </ul>
</div>

<style type="text/scss">
  .icon-list {
    text-align: left;
    color: rgba(26, 32, 48, 0.75);

    .svg-inline--fa {
      margin-right: 1rem;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;

      li {
        word-break: break-word;
        margin-bottom: 0.25rem;
      }
    }
  }
</style>
