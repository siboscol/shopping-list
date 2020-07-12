<template>
  <q-page padding class="bg-white">
    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show items in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="showItemsInOneList" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-select
          class="full-width"
          outlined
          v-model="currency"
          :options="currencies"
          label="Currency"
        />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('settings', ['settings']),
    showItemsInOneList: {
      get() {
        return this.settings.showItemsInOneList
      },
      set(value) {
        this.setShowItemsInOneList(value)
      }
    },
    currencies() {
      return this.settings.currencies
    },
    currency() {
      return this.settings.currency
    }
  },
  methods: {
    ...mapActions('settings', ['setShowItemsInOneList'])
  }
}
</script>
