export default {
  computed: {
    calcHeight() {
      let offsetHeight = 0
      if (this.itemsDownloaded) {
        offsetHeight = document.getElementById('summaryHeader').offsetHeight;
      }
      return {
        height: `calc(100% - ${offsetHeight}px)`
      }
      //   Vue.nextTick(() => {
      //     if (this.itemsDownloaded) {
      //       const offsetHeight = document.getElementById('summaryHeader').offsetHeight;
      //       return {
      //         height: `calc(100% - ${offsetHeight}px)`
      //       }
      //     }
      //  })
    }
  }
}