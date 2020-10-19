export default {
  watch: {
    'itemsDownloaded'(newItemsDownload, oldItemsDownload) {
      let offsetHeight = 0
      if (newItemsDownload) {
        this.$nextTick(() => {
          offsetHeight = document.getElementById('summaryHeader').offsetHeight;
          let style = {
            height: `calc(100vh - ${offsetHeight}px)`
          }
          this.scrollAreaHeight = style
        })
      }
    }
  }
}