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
        @click="isThereGroup = !isThereGroup"
      >
        close
      </span>
    </div>
    <div class="w-full flex flex-col m-2 p-2">
      <div class="flex justify-between items-center relative">
        <h3 class="font-bold text-[#DB1F48]" v-if="!edit">{{ groupName }}</h3>
        <input
          type="text"
          v-if="edit"
          placeholder="Group Name"
          class="outline-none border-2 border-[#613659] bg-transparent bg-[#613659] rounded-lg text-[#E5DDC8] w-1/2"
          v-model="groupName"
          @keydown.enter="edit = !edit"
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
            v-for="i in 5"
            :key="i"
            class="grid grid-cols-2 gap-4 items-center"
          >
            <div class="flex justify-start items-center p-1 m-2">
              {{ i }}
            </div>

            <div class="flex justify-end items-center">
              <button
                class="flex justify-center items-center bg-[#613659] rounded-md hover:bg-[#E5DDC8] text-sm hover:text-black p-1 m-2"
              >
                <span class="material-symbols-outlined"> person_remove </span>
              </button>
            </div>

            <!-- Edit'e basınca açılacak -->
            <!-- <div class="">
              <button
                class="flex justify-center items-center bg-[#613659] rounded-md hover:bg-[#E5DDC8] text-sm hover:text-black p-1 m-2"
              >
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>
            </div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const edit = ref(false);
const groupName = ref("Morning Friends");

const isThereGroup = ref(true);
const removeGroup = () => {
  console.log("removeGroup");
};
</script>

<style scoped></style>
