
<script>
  import { onMount } from 'svelte';
  import { urlStore, scenarioStore } from './stores';

  let urlInputActive = false;

  onMount(() => {
    const urlButton = document.querySelector('#url-btn');
    const urlForm = document.querySelector('#url-form');
    const urlInput = urlForm.querySelector('input[type="url"]');
    const uploadButton = document.querySelector('#upload-btn');
    const uploadInput = document.querySelector('#file-input');

    uploadButton.addEventListener('click', (e) => {
      uploadInput.click();
      e.preventDefault();
    });

    uploadInput.addEventListener('change', async (e) => {
      const data = await uploadInput.files[0].text();
      scenarioStore.set(data);
      urlStore.set(null);
    });

    urlButton.addEventListener('click', (e) => {
      urlInputActive = !urlInputActive;
      e.preventDefault();
    });

    urlForm.addEventListener('submit', (e) => {
      urlStore.set(urlInput.value);
      e.preventDefault();
    })

    urlStore.subscribe(url => urlInput.value = url);
  });
</script>

<div class="appmap-selector">
  <div class="description">
    <p>
      <a href="#" id="upload-btn">Import an AppMap file</a>
      or
      <a href="#" id="url-btn">enter a URL</a>
    </p>

    <form id="url-form" class="form-group {urlInputActive ? 'active' : ''}">
      <input type="url" placeholder="https://" autocomplete="off">
      <input type="submit" value="Load">
    </form>

    <small>Your data is never uploaded remotely and will not be stored anywhere.</small>
  </div>
  <input id="file-input" type="file" accept="application/json" style="display:none"> 
</div>

<style type="text/scss">
  .appmap-selector {
    margin-bottom: 1rem;

    .description {
      p {
        margin-bottom: 0.5rem;
      }
    }

    .form-group {
      display: none;
      margin: auto;

      &.active {
        display: block;
      }

      input[type="url"] {
        min-width: 75vw;
      }
    }
  }
</style>
