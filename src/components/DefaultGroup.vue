<template>
  <div
    class="bg-[#01949A] rounded-lg text-[#E5DDC8] m-2 p-4 flex font-bold relative"
    v-show="isThereGroup"
  >
    <div
      class="text-red-700 h-fit hover:text-red-900 hover:cursor-pointer absolute top-0 right-0"
    >
      <span class="material-symbols-outlined" @click="deleteGroup(cameGroupId)">
        close
      </span>
    </div>
    <div class="w-full flex flex-col m-2 p-2">
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
                @click="removeFromGroup(user)"
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
import { ref, reactive, onMounted, defineProps, computed } from "vue";
import { IMember } from "@/models/Member.interface";
import { IGroup } from "@/models/Group.interface";
import { GroupsServices } from "@/services/Group.service";
import { UsersService } from "@/services/User.service";
import axios from "axios";

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
});

const cameGroupName = ref(props.group.groupName);
const cameGroupId = ref(props.group.id);

const isThereGroup = ref(true);
const edit = ref(false);
const groupName = ref("");

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
};
const getCountGroup = getCategories.length;

const getGroupName = computed(() => {
  return getCategories.map((item: any) => item.groupName);
});

const deleteGroup = (idx: number) => {
  categoryService.deleteGroup(idx).then(() => {
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

const removeFromGroup = (idx) => {
  listedMembers.value.splice(idx, 1);
};

const membersName = members.value.map((item) => item.name);
const membersCategory = members.value.map((item) => item.category);

const listedMembers = ref([]);
const count = ref(0);
const memberListFunc = () => {
  if (count.value === 0) {
    members.value.map((item) => {
      if (item.category.includes(cameGroupName.value)) {
        listedMembers.value.push(item.name);
        count.value++;
      }
    });
  }
};

onMounted(() => {
  getCategory();
  getMembers();
});
</script>

<style scoped></style>
