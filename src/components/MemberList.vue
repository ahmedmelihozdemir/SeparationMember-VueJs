<template>
  <div class="bg-[#004369] rounded-lg text-[#E5DDC8] m-2 p-4">
    <h1 class="flex justify-center items-center font-bold my-4 text-[#DB1F48]">
      Member List
    </h1>
    <div class="flex justify-between items-start m-auto">
      <ul>
        <li
          v-for="(member, idx) in members"
          :key="idx"
          class="grid grid-cols-4 gap-10 items-center justify-center m-6"
        >
          <div class="flex justify-start items-center">
            {{ member.name }}
          </div>
          <div class="">
            <div
              class="checkbox text-sm font-semibold flex justify-start items-start"
            >
              <div class="ul-checkbox p-1">

                <!--  <li bu gerçek
                  class="flex justify-between items-center"
                  v-for="(group, adx) in getCategories"
                  :key="adx"
                >
                  <input
                    type="checkbox"
                    :id="`${group.groupName}`"
                    :value="`${group.groupName}` + ` ` + `${member.name}`"
                    v-model="selectedCategory"
                    class="mr-2"
                  /><label
                    :for="`${group.groupName}` + ` ` + `${member.name}`"
                    >{{ group.groupName }}</label
                  >
                </li> -->

                <li
                  class="flex justify-between items-center"
                  v-for="(group, adx) in getCategories"
                  :key="adx"
                >
                  <input
                    type="checkbox"
                    :id="`${group.groupName}`"
                    :value="`${member.name}` + ` ` + `${group.groupName}`"
                    v-model="selectedCategory"
                    class="mr-2"
                    @click="memberId(member.id) /* changeCategory(member.id) */"
                  /><label
                    :for="`${group.groupName}` + ` ` + `${member.name}`"
                    >{{ group.groupName }}</label
                  >
                </li>

                <!-- <div>Categories: {{ selectedCategory }}</div> -->
                <!-- <div>memberlar:{{ selectedMember }}</div> -->
              </div>
            </div>
          </div>

          <div>
            <button
              class="material-symbols-outlined bg-[#DB1F48] rounded-md hover:bg-[#E5DDC8] text-sm font-bold hover:text-black p-2 mx-2"
              @click="listCategories(member.id)"
            >
              arrow_forward
            </button>
          </div>

          <div>
            <button
              class="material-symbols-outlined bg-[#DB1F48] rounded-md hover:bg-[#E5DDC8] text-sm font-bold hover:text-black p-2 mx-2"
              @click="deleteMember(member.id)"
            >
              delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, defineEmits } from "vue";
import { useStore } from "vuex";
import { IMember } from "@/models/Member.interface";
import { IGroup } from "@/models/Group.interface";
import { UsersService } from "@/services/User.service";
import { GroupsServices } from "@/services/Group.service";
import axios from "axios";

const store = useStore();

const emit = defineEmits(["listMember"]);


//Members service
const membersInfoService = new UsersService();
const members = reactive<IMember[]>([]);
const getMembers = async () => {
  const res = await membersInfoService.getUser();
  members.push(...res);
  console.log(res);
};

//Group service
const categoryService = new GroupsServices();
const getCategories = reactive<IGroup[]>([]);
const getCategory = async () => {
  const res = await categoryService.getGroup();
  getCategories.push(...res);
  store.state.countGroup++;
  console.log(res);
};

const selectedCategory = ref([]);

const selectedMember = ref([]);

const memberId = (z) => {
  console.log(z);
};

const listCategories = (w) => {
  store.state.categories = selectedCategory;
  selectedCategory.value.map((item) => {
    if (selectedMember.value.includes(item.split(" ")[0])) {
      return;
    } else {
      selectedMember.value.push(item.split(" ")[0]);
    }
  });

  const res = axios
    .put(`http://localhost:3000/members/${w}`, {
      name: selectedMember.value[0],
      category: selectedCategory.value.map((item) => {
        return item.split(" ")[1];
      }),
    })
    .then(() => {
      window.location.reload();
    });
};

const deleteMember = (i) => {
  const res = axios.delete(`http://localhost:3000/members/${i}`).then(() => {
    window.location.reload();
  });
};

onMounted(() => {
  getMembers();
  getCategory();
});
</script>

<style scoped lang="scss">
/* .checkbox {
  .ul-checkbox {
    list-style: none;
    padding: 10px;
  }
  .ul-checkbox li {
    display: inline;
  }
  .ul-checkbox li label {
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(139, 139, 139, 0.3);
    color: #adadad;
    border-radius: 20px;
    white-space: wrap;
    margin: 2px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: all 0.2s;
    padding: 2px;
    display: flex;
  }

  .ul-checkbox li label {
    cursor: pointer;
  }

  .ul-checkbox li label::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 600;
    font-size: 12px;
    padding: 2px;
    content: "\f067";
    transition: transform 0.3s ease-in-out;
  }

  .ul-checkbox li input[type="checkbox"]:checked + label::before {
    content: "\f00c";
    transform: rotate(-360deg);
    transition: transform 0.3s ease-in-out;
  }

  .ul-checkbox li input[type="checkbox"]:checked + label {
    border: 1px solid #1bdbf8;
    background-color: #12bbd4;
    color: #fff;
    transition: all 0.2s;
  }

  .ul-checkbox li input[type="checkbox"] {
    display: absolute;
  }
  .ul-checkbox li input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }
  l.ul-checkbox li input[type="checkbox"]:focus + label {
    border: 1px solid #e9a1ff;
  }
} */
</style>
