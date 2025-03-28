<template>
  <div class="p-4">
    <div class="grid grid-cols-1 gap-6">
      <div class="grid grid-cols-1 gap-1 lg:grid-cols-1 mb-2">
        <Graph class="justify-between items-center flex mb-4" />
      </div>

      <div class="flex flex-col items-center mb-4">
        <div
          class="flex flex-col md:flex-row md:justify-center items-center mb-4"
        >
          <h1 class="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
            ข้อมูลประกาศงาน
          </h1>
          <button
            @click="togglePopup"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 md:ml-4"
          >
            เพิ่มประกาศงาน
          </button>
        </div>

        <Add
          v-if="showAddPopup"
          @close="showAddPopup = false"
          @addPosted="fetchPosts"
        />

        <div class="flex justify-center mb-4 w-full">
          <div class="relative w-full md:w-auto">
            <input
              type="text"
              v-model="searchText"
              placeholder="ค้นหาบริษัท..."
              class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
              @input="searchPostsByCompany"
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto bg-white rounded-md shadow">
        <table class="w-full table-auto">
          <thead>
            <tr
              class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">ลำดับ</th>
              <th class="py-3 px-6 text-left">บริษัท</th>
              <th class="py-3 px-6 text-left">หัวข้อ</th>
              <th class="py-3 px-6 text-left">ตำแหน่ง</th>
              <th class="py-3 px-6 text-left">วันที่ประกาศ</th>
              <th class="py-3 px-6 text-left">วันที่ปิดประกาศ</th>
              <th class="py-3 px-6 text-left">สถานะ</th>
              <th class="py-3 px-6 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr v-for="(post, index) in paginatedPosts" :key="post._id">
              <td class="py-3 px-6 text-left whitespace-nowrap">
                {{ index + 1 }}
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                {{ post.company }}
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                {{ post.header }}
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                {{ post.department }}
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                {{ formatDate(post.post_date) }}
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                {{ formatDate(post.end_date) }}
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <label class="switch">
                  <input
                    type="checkbox"
                    @abort="new Date(post.end_date) < new Date()"
                    @click="togglePostStatus(post)"
                    :checked="post.post_status === 'เปิดรับสมัคร'"
                    class="slider"
                  />
                  <span class="slider round"></span>
                </label>
              </td>

              <td class="py-3 px-6 text-center">
                <div class="flex justify-center items-center space-x-2">
                  <button
                    @click="openDetailsPopup(post)"
                    class="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <View
                    v-if="showViewPopup"
                    :post="selectedPost"
                    @close="showViewPopup = false"
                  />
                  <button
                    @click="openEditModal(post)"
                    class="text-yellow-500 hover:text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      ></path>
                      <path
                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      ></path>
                    </svg>
                  </button>
                  <Edit
                    v-if="showEditPopup"
                    :post="postToEdit"
                    @close="showEditPopup = false"
                    @editedPost="fetchPosts"
                  />
                  <button
                    @click="deletePost(post)"
                    class="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      ></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="flex justify-between items-center mt-4 sm:flex-row sm:space-x-2"
      >
        <div class="w-full sm:w-auto text-sm text-gray-600">
          Showing {{ (currentPage - 1) * perPage + 1 }} to
          {{ Math.min(currentPage * perPage, filteredPosts.length) }} of
          {{ filteredPosts.length }}
        </div>
        <div
          class="flex items-center space-x-2 sm:space-x-0 sm:flex-1 sm:flex sm:justify-center"
        >
          <button
            v-if="currentPage > 1"
            @click="currentPage--"
            class="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 sm:w-auto sm:ml-2"
          >
            Previous
          </button>
          <div class="flex flex-wrap space-x-2 sm:space-x-0 sm:w-auto">
            <button
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              @click="currentPage = pageNumber"
              :class="{
                'bg-purple-600 text-white': pageNumber === currentPage,
                'bg-gray-200 text-gray-600 hover:bg-gray-300':
                  pageNumber !== currentPage,
              }"
              class="px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 sm:w-auto"
            >
              {{ pageNumber }}
            </button>
          </div>
          <button
            v-if="currentPage < totalPages"
            @click="currentPage++"
            class="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 sm:w-auto sm:mr-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import Add from "./PostAdd.vue";
import Edit from "./PostEdit.vue";
import View from "./PostView.vue";
import Graph from "./Graph.vue";

export default {
  components: {
    Add,
    Edit,
    View,
    Graph,
  },
  data() {
    return {
      posts: [],
      originalPosts: [],
      searchText: "",
      showAddPopup: false,
      showViewPopup: false,
      showEditPopup: false,
      postToEdit: null,
      selectedPost: null,
      perPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    filteredPosts() {
      return this.searchText.trim()
        ? this.originalPosts.filter((post) =>
            post.company.includes(this.searchText)
          )
        : this.originalPosts;
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredPosts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.perPage);
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    async togglePostStatus(post) {
      const today = new Date();
      const endDate = new Date(post.end_date);

      if (endDate < today && post.post_status === "ปิดรับสมัคร") {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถเปิดโพสต์ได้",
          text: "วันที่สิ้นสุดการรับสมัครได้ผ่านไปแล้ว กรุณาแก้ไขวันที่ปิดประกาศก่อน",
        });
        return;
      }

      const newStatus =
        post.post_status === "เปิดรับสมัคร" ? "ปิดรับสมัคร" : "เปิดรับสมัคร";

      try {
        await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/post/update-post/${post._id}`,
          {
            post_status: newStatus,
          }
        );

        const index = this.posts.findIndex((item) => item._id === post._id);
        if (index !== -1) {
          this.posts[index].post_status = newStatus;
        }

        Swal.fire({
          icon: "success",
          title: "สถานะของโพสต์ถูกเปลี่ยนแล้ว",
          text: `โพสต์ "${post.Header}" ได้เปลี่ยนสถานะเป็น "${newStatus}"`,
        });
      } catch (error) {
        console.error("Error updating post status:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเปลี่ยนสถานะของโพสต์ได้",
        });
      }
    },

    async fetchPosts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/post/getall`
        );
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          this.posts = response.data.data.slice().reverse();
          this.originalPosts = response.data.data.slice().reverse();
          console.log(this.posts);
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
        // console.log(this.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        this.posts = [];
        this.originalPosts = [];
      }
    },
    togglePopup() {
      this.showAddPopup = !this.showAddPopup;
    },
    openEditModal(post) {
      this.postToEdit = post;
      this.showEditPopup = true;
    },
    openDetailsPopup(post) {
      this.selectedPost = post;
      this.showViewPopup = true;
    },
    async deletePost(post) {
      Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this post?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(
              `${import.meta.env.VITE_VUE_APP_DECCAN}/post/delete-post/${post._id}`
            );
            Swal.fire("Deleted!", "The post has been deleted.", "success");
            this.posts = this.posts.filter((item) => item._id !== post._id);
            this.originalPosts = this.originalPosts.filter(
              (item) => item._id !== post._id
            );
          } catch (error) {
            console.error("Error deleting post:", error);
            Swal.fire("Error!", "Failed to delete the post.", "error");
          }
        }
      });
    },
    searchPostsByCompany() {
      if (this.searchText.trim()) {
        this.posts = this.originalPosts.filter(
          (post) =>
            post.company &&
            post.company.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else {
        this.posts = [...this.originalPosts];
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
<style scoped>
/* Add your component's style here */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 20px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
