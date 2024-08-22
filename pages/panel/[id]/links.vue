<template>
  <Modal ref="editLinkModal" :header="`Edit Link`">
    <div class="modal-entry">
      <h3>Link</h3>
      <input type="text" v-model="editingLink.url"/>
    </div>
    <div class="modal-entry">
      <h3>Text</h3>
      <input type="text" v-model="editingLink.text"/>
    </div>
    <div class="modal-entry">
      <h3>Icon</h3>
      <DropdownSelect
        v-model="editingLink.icon"
        render-up
        placeholder="Select an icon"
        :options="[
          'bmac',
          'ko-fi',
          'paypal',
          'open-collective',
          'unknown',
          'issues',
          'code',
          'wiki',
          'discord',
          'patreon',
          'sponsor',
        ]"/>
    </div>
    <br>
    <div class="modal-entry">
      <div></div>
      <Button color="primary" @click="() => {
        if (editingLink.add) {
          delete editingLink.add
          project.links.push(editingLink)
        }
        updateLinks(project.links)
        editLinkModal.hide()
      }">
        <SaveIcon/>
        Save
      </Button>
    </div>
  </Modal>
  <div>
    <div class="card links-action">
      <h2>Links</h2>
      <Button color="primary" @click="() => {
        editingLink = {
          add: true,
          url: '',
          text: '',
          icon: '',
        }
        editLinkModal.show()
      }">
        <PlusIcon/>
        Add Link
      </Button>
    </div>
    <div v-for="link in project.links" :key="link.url"
         class="card links-entry"
    >
      <div>
        <h3>{{ link.text }}</h3>
        <h5>{{ link.url }}</h5>
      </div>
      <div>
        <Button @click="() => {
          editingLink = link
          editLinkModal.show()
        }">
          <EditIcon/>
          Edit
        </Button>
        <Button color="danger" @click="() => {
          project.links.splice(project.links.indexOf(link), 1)
          updateLinks(project.links)
        }">
          <TrashIcon/>
          Remove
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Button, DropdownSelect, EditIcon, Modal, PlusIcon, SaveIcon, TrashIcon} from 'omorphia'

const route = useRoute()

const editingLink = ref(null)
const editLinkModal = ref(null)

defineProps({
  project: {
    type: Object,
    default() {
      return []
    },
  },
})

const updateLinks = (links) => {
  fetch(`https://beehive-api.teamresourceful.com/panel/projects/${route.params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      info: {
        links: links,
      },
    }),
  })
}

</script>
<style lang="scss" scoped>
.links-action {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
  }
}

.links-entry {
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h3 {
    margin: 0;
  }

  h5 {
    margin: 0.5rem 0 0;
  }
}

.modal-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;

  h3 {
    margin: 0;
  }
}
</style>
