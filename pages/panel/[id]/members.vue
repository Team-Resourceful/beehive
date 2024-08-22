<template>
  <Modal ref="editMemberModal" :header="`Edit Member`">
    <div class="modal-entry">
      <h3>Name</h3>
      <input type="text" v-model="editingMember.name" />
    </div>
    <div class="modal-entry">
      <h3>Role</h3>
      <input type="text" v-model="editingMember.role" />
    </div>
    <div class="modal-entry">
      <h3>Icon</h3>
      <input type="text" v-model="editingMember.icon" />
    </div>
    <div class="modal-entry">
      <h3>Link</h3>
      <input type="text" v-model="editingMember.link" />
    </div>
    <br>
    <div class="modal-entry">
      <div></div>
      <Button color="primary" @click="() => {
        if (editingMember.add) {
          delete editingMember.add
          allMembers.push(editingMember)
        }
        updateMembers(allMembers)
        editMemberModal.hide()
      }">
        <SaveIcon/>
        Save
      </Button>
    </div>
  </Modal>
  <div>
    <div class="card members-actions">
      <h2>Members</h2>
      <Button color="primary" @click="() => {
        editingMember = {
          add: true,
          name: '',
          role: '',
          icon: '',
          link: '',
        }
        editMemberModal.show()
      }">
        <UserPlusIcon />
        Add Member
      </Button>
    </div>
    <div v-for="member in allMembers" :key="member.name"
      class="card members-entry"
    >
      <div>
        <Avatar size="sm" :src="member.icon" circle />
        <div>
          <h3>{{ member.name }}</h3>
          <h5>{{ member.role }}</h5>
        </div>
      </div>
      <div>
        <Button @click="() => {
          editingMember = member
          editMemberModal.show()
        }">
          <EditIcon />
          Edit
        </Button>
        <Button color="danger" @click="() => {
          allMembers.splice(allMembers.indexOf(member), 1)
          updateMembers(allMembers)
        }">
          <TrashIcon />
          Remove
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {SaveIcon, EditIcon, TrashIcon, Avatar, Button, UserPlusIcon, Modal} from 'omorphia'

const route = useRoute()

const editingMember = ref(null)
const editMemberModal = ref(null)

defineProps({
  allMembers: {
    type: Array,
    default() {
      return []
    },
  },
})
0
const updateMembers = (members) => {
  fetch(`https://beehive-api.teamresourceful.com/panel/projects/${route.params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      info: {
        team: members,
      },
    }),
  })
}

</script>
<style lang="scss" scoped>
.members-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
  }
}

.members-entry {
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
