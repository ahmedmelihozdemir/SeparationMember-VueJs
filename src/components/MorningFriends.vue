<template>
  <div
    class="bg-[#01949A] rounded-lg text-[#E5DDC8] m-2 p-4 flex font-bold relative"
    v-show="isThereGroup"
  >
    <div
      class="text-red-700 h-fit hover:text-red-900 hover:cursor-pointer absolute top-0 right-0"
    >
      <span
        class="material-symbols-outlined"
        @click="deleteGroup(props.group.id)"
      >
        close
      </span>
    </div>
    <div class="w-full flex flex-col m-2 p-2">
      <div>Members:{{ ali }}</div>
      <div class="flex justify-between items-center relative">
        <h3 class="font-bold text-[#DB1F48] drop-shadow-lg" v-if="!edit">
          {{ cameGroupName }}
        </h3>
        <input
          type="text"
          v-if="edit"
          placeholder="Group Name"
          class="outline-none border-2 border-[#613659] bg-transparent bg-[#613659] rounded-lg text-[#E5DDC8] w-1/2"
          v-model="cameGroupName"
          @keydown.enter="editGroupName"
          @keydown.esc="edit = !edit"
          :autofocus="edit"
        />
        <div
          class="material-symbols-outlined hover:cursor-pointer hover:text-black absolute right-0"
          @click="edit = !edit"
        >
          edit
        </div>
      </div>

      <div class="p-2 my-2">
        <ul>
          <!-- <li
            v-for="(user, idx) in members"
            :key="idx"
            class="grid grid-cols-2 gap-4 items-center"
          >
            <div class="flex justify-start items-center p-1 m-2">
              {{ user.name }}-{{ user.category }}
            </div>

            <div class="flex justify-end items-center">
              <button
                class="flex justify-center items-center bg-[#613659] rounded-md hover:bg-[#E5DDC8] text-sm hover:text-black p-1 m-2"
              >
                <span class="material-symbols-outlined"> person_remove </span>
              </button>
            </div>
          </li> -->

          <!-- <li
            v-for="(user, idx) in members"
            :key="idx"
            class="grid grid-cols-2 gap-4 items-center"
          >
            <div class="flex justify-start items-center p-1 m-2">
              {{ user.name }}-{{ user.category }}
            </div>

            <div class="flex justify-end items-center">
              <button
                class="material-symbols-outlined flex justify-center items-center bg-[#613659] rounded-md hover:bg-[#E5DDC8] text-sm hover:text-black p-1 m-2"
                @click="
                  /* removeFromGroup(user.id,user.name) */ ekmek(
                    cameGroupName,
                    user.name,
                    user.category
                  )
                "
              >
                person_remove
              </button>
            </div>
          </li> -->

          <li
            v-for="(user, idx) in listedMembers"
            :key="idx"
            class="grid grid-cols-2 gap-4 items-center"
          >
            <div class="flex justify-start items-center p-1 m-2">
              {{ user }}
            </div>

            <div class="flex justify-end items-center">
              <button
                class="material-symbols-outlined flex justify-center items-center bg-[#613659] rounded-md hover:bg-[#E5DDC8] text-sm hover:text-black p-1 m-2"
                @click="
                  /* removeFromGroup(user.id,user.name)  /* ekmek(
                    cameGroupName,
                    user.name,
                    user.category
                  ) */
                  removeFromGroup(user, idx)
                "
              >
                person_remove
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <button
      class="bg-[#2E765E] rounded-lg flex w-fit items-center relative bottom-0 right-0"
      @click="memberListFunc()"
    >
      Get List
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, computed, watch } from "vue";
import { useStore } from "vuex";
import { IMember } from "@/models/Member.interface";
import { IGroup } from "@/models/Group.interface";
import { GroupsServices } from "@/services/Group.service";
import { UsersService } from "@/services/User.service";
import axios from "axios";

const store = useStore();

const props = defineProps({
  group: {
    type: Object,
  },
  idx: {
    type: Number,
  },
  getCategories: {
    type: Array,
  },
  cameSelectedMember: {
    type: Array,
  },
});
const cameGroupName = ref(props.group.groupName);
const cameSelectedMember = ref(props.cameSelectedMember);

const isThereGroup = ref(true);
const edit = ref(false);
const groupName = ref("");

/* const editGroupName = async () => {
  const group: IGroup = {
    id: props.group.id,
    groupName: cameGroupName.value,
    members: props.group.members,
  };
  const res = await GroupsServices.updateGroup(group);
  if (res) {
    edit.value = !edit.value;
  }
};
 */

const membersInfoService = new UsersService();
const members = ref<IMember[]>([]);
const getMembers = async () => {
  const res = await membersInfoService.getUser();
  members.value.push(...res);
};

//Categories from API
const categoryService = new GroupsServices();
const getCategories = reactive<IGroup[]>([]);
const getCategory = async () => {
  const res = await categoryService.getGroup();
  getCategories.push(...res);
  store.state.countGroup++;
};
const getCountGroup = getCategories.length;

const getGroupName = computed(() => {
  return getCategories.map((item: any) => item.groupName);
});

const deleteGroup = (idx: number) => {
  const res = axios.delete(`http://localhost:3000/groups/${idx}`).then(() => {
    window.location.reload();
  });
};

const editGroupName = () => {
  const res = axios
    .put(`http://localhost:3000/groups/${props.group.id}`, {
      groupName: cameGroupName.value,
    })
    .then(() => {
      window.location.reload();
    });
};

/* const removeFromGroup = (idx: number, n) => {
  const res = axios
    .put(`http://localhost:3000/members/${idx}`, {
      name: n,
      category: [],
    })
    .then(() => {
      window.location.reload();
    });
}; */

const removeFromGroup = (idx) => {
  listedMembers.value.splice(idx, 1);
};

const membersName = members.value.map((item) => item.name);
const membersCategory = members.value.map((item) => item.category);

/* const namx = ref([]);
const ekmek = (e, nam, cat) => {
  cat.map((item) => {
    if (item === e) {
      console.log(nam, item, "sa", membersName);
      return namx.value.push(nam);
    }
  });
};  */

const listedMembers = ref([]);
const count = ref(0);
const memberListFunc = () => {
  if(count.value === 0 ){
    members.value.map((item) => {
    if (item.category.includes(cameGroupName.value)) {
      listedMembers.value.push(item.name);
      count.value++;
    }
  })
  }
  /*  members.value.map((item) => {
    if (item.category.includes(cameGroupName.value)) {
      listedMembers.value.push(item.name);
    }
  }); */
};

onMounted(() => {
  getCategory();
  getMembers();
});
</script>

<style scoped></style>
