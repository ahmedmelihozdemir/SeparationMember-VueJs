<template>
  <div class="flex justify-center items-center m-2">
    <div class="">
      <h1 class="text-[#DB1F48] font-bold flex justify-start my-2">
        Create Group
      </h1>
      <label for="name" class="">
        <input
          type="text"
          placeholder="Enter group name"
          :name="groupName"
          v-model="groupName"
          class="outline-none border-2 border-[#DB1F48] rounded-md p-1"
          @keydown.enter="/* createGroup, */postGroups"
        />
        <button
          class="bg-[#C197D2] rounded-md p-1 ml-4 hover:bg-[#DB1F48] hover:text-[#E5DDC8]"
          @click="postGroups"
        >
          Post Group
        </button>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useStore } from "vuex";
import { IGroup } from "@/models/Group.interface";
import { GroupsServices } from "@/services/Group.service";
import axios from "axios";


const store = useStore();
/* const categoryService = new GroupsServices();
 */
const groupName = ref("");
/* const getCategories = reactive<IGroup[]>([]); */

const emit = defineEmits(["groupName"]);


const createGroup = () => {
  const group: IGroup = {
    id: Date.now(),
    groupName: groupName.value,
  };
  store.state.groups.push(group);
  localStorage.setItem("group", JSON.stringify(group));
  store.state.countGroup++;
  //emit("groupName", group.name);
  groupName.value = "";
  localStorage.setItem("countGroup", JSON.stringify(store.state.countGroup));
};


const postGroups = () => {
  const groups: IGroup = {
    groupName: groupName.value,
  };
  const res = axios
    .post("http://localhost:3000/groups", groups)
    .then((response) => {
      console.log(response);
    });
  window.location.reload();
  groupName.value = "";
};


</script>

<style scoped></style>
