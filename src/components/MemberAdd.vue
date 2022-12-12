<template>
  <div class="flex justify-center items-center m-2">
    <div class="">
      <h1 class="text-[#DB1F48] font-bold flex justify-start my-2">
        Member Name
      </h1>
      <label for="name" class="">
        <input
          type="text"
          placeholder="Enter member"
          :name="name"
          v-model="name"
          class="outline-none border-2 border-[#DB1F48] rounded-md p-1"
          @keydown.enter="postMember"
        />
        <button
          class="bg-[#C197D2] rounded-md p-1 mx-4 hover:bg-[#DB1F48] hover:text-[#E5DDC8]"
          @click="postMember"
        >
          Create Member
        </button>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IMember } from "@/models/Member.interface";

import { UsersService } from "@/services/User.service";

const membersService = new UsersService();

const name = ref("");

const postMember = () => {
  const members: IMember = {
    id: Date.now(),
    name: name.value,
    category: [],
  };
  membersService.postUser(members).then((response) => {
    window.location.reload();
  });
  name.value = "";
};
</script>

<style scoped></style>
