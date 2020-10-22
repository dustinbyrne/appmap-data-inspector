
<script>
  import { onMount } from 'svelte';
  import { dataObjects } from './stores';
  import { getUrl } from './lib/util';

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
      dataObjects.data(data);
    });

    urlButton.addEventListener('click', (e) => {
      urlInputActive = !urlInputActive;
      if (urlInputActive) {
        const url = getUrl();
        if (url) {
          urlInput.value = url;
        }
      }
      e.preventDefault();
    });
  });
</script>

<div class="appmap-selector">
  <div class="description">
    <p>
      <a href="#" id="upload-btn">Upload an appmap</a>
      or
      <a href="#" id="url-btn">enter a URL</a>
    </p>

    <form id="url-form" method="get" class="form-group {urlInputActive ? 'active' : ''}">
      <input type="url" name="url" placeholder="https://" autocomplete="off">
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
      &p {
        margin-bottom: 0;
      }
    }

    .form-group {
      display: none;
      margin: auto;

      &.active {
        display: block;
      }
    }
  }
</style>
