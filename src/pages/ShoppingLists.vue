<template>
  <q-page class="bg-white">
    <template v-if="listsDownloaded">
      <q-list
        v-if="lists"
        class="bg-white scroll"
        separator
        bordered
        :style="scrollAreaHeight"
      >
        <List
          v-for="(list, key) in lists"
          :key="key"
          :list="list"
          :id="key"
        />
      </q-list>
      <div v-else class="row justify-center absolute-center">
        <q-icon name="list_alt" size="5em" />
        <div>Create a new Shopping List.</div>
      </div>
    </template>
    <template v-else>
      <span class="absolute-center">
        <q-spinner-oval color="primary" size="3em" />
      </span>
    </template>
    <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
      <q-btn
        round
        color="primary"
        size="lg"
        icon="add"
        @click.stop="createList()"
        class="all-pointer-events"
      />
    </div>
  </q-page>
</template>

<script>
import List from '../components/Items/ListItem'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'ShoppingsLists',
  components: { List },
  data() {
    return {
      scrollAreaHeight: {},
      newList: {
        name: '',
        items: {}
      }
    }
  },
  computed: {
    ...mapState('lists', ['listsDownloaded', 'lists'])
  },
  methods: {
    ...mapActions('lists', ['addList']),
    createList() {
      this.$q
        .dialog({
          title: 'Create new shopping list',
          message: 'Which name do you want to give it?',
          prompt: {
            model: '',
            type: 'text'
          },
          ok: 'create',
          cancel: true,
          persistent: true
        })
        .onOk(listName => {
          this.newList.name = listName
          this.addList(this.newList)
        })
    }
  },
  mounted() {
    this.$nextTick(() => {
      const offsetHeight = document.getElementsByTagName('header')[0]
        .offsetHeight
      let style = {
        height: `calc(100vh - ${offsetHeight}px)`
      }
      this.scrollAreaHeight = style
    })
  }
}
</script>
