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
          @keydown.enter="postGroups"
        />
        <button
          class="bg-[#C197D2] rounded-md p-1 ml-4 hover:bg-[#DB1F48] hover:text-[#E5DDC8]"
          @click="postGroups"
        >
          Create Group
        </button>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IGroup } from "@/models/Group.interface";
import { GroupsServices } from "@/services/Group.service";

const groupName = ref("");

const categoryService = new GroupsServices();

const postGroups = () => {
  const groups: IGroup = {
    groupName: groupName.value,
  };
  categoryService.postGroup(groups).then((response) => {
    window.location.reload();
    
  });
};
</script>

<style scoped></style>
