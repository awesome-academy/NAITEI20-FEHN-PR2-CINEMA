<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p
                class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap"
              >
                Khách hàng
              </p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p
                class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap"
              >
                Phim
              </p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p
                class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap"
              >
                Rạp & Giờ chiếu
              </p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p
                class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap"
              >
                Ghế
              </p>
            </th>
            <th class="px-5 py-3 text-left w-1/22 sm:px-6">
              <p
                class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap"
              >
                Trạng thái
              </p>
            </th>
            <th class="px-5 py-3 text-left w-3/22 sm:px-6">
              <p
                class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap"
              >
                Tổng tiền
              </p>
            </th>
            <th class="px-5 py-3 text-left w-1/11 sm:px-6"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(ticket, index) in tickets"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <!-- Customer info -->
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 overflow-hidden rounded-full">
                  <img
                    :src="
                      ticket.customer.avatar ||
                      '/images/user/default-avatar.jpg'
                    "
                    :alt="ticket.customer.name"
                  />
                </div>
                <div>
                  <span
                    class="block font-medium text-gray-800 text-theme-sm dark:text-white/90"
                  >
                    {{ ticket.customer.name }}
                  </span>
                  <span
                    class="block text-gray-500 text-theme-xs dark:text-gray-400"
                  >
                    {{ ticket.customer.email }}
                  </span>
                </div>
              </div>
            </td>

            <!-- Movie info -->
            <td class="px-5 py-4 sm:px-6">
              <p
                class="font-medium text-gray-800 text-theme-sm dark:text-white/90"
              >
                {{ ticket.movie.title }}
              </p>
              <p class="text-gray-500 text-theme-xs dark:text-gray-400">
                {{ ticket.movie.duration }} phút
              </p>
            </td>

            <!-- Theater & Showtime -->
            <td class="px-5 py-4 sm:px-6">
              <p
                class="font-medium text-gray-800 text-theme-sm dark:text-white/90"
              >
                {{ ticket.theater.name }}
              </p>
              <p class="text-gray-500 text-theme-xs dark:text-gray-400">
                {{ formatDateTime(ticket.showtime) }}
              </p>
            </td>

            <!-- Seats -->
            <td class="px-5 py-4 sm:px-6">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="(seat, seatIndex) in ticket.seats"
                  :key="seatIndex"
                  class="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  {{ seat.row }}-{{ seat.number }}
                </span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-5 py-4 sm:px-6">
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-xs tracking-tighter font-medium whitespace-nowrap block text-center',
                  {
                    'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                      ticket.status === 'Đã thanh toán',
                    'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                      ticket.status === 'Đang xử lý',
                    'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                      ticket.status === 'Đã huỷ',
                  },
                ]"
              >
                {{
                  ticket.status === "Đã thanh toán"
                    ? "PAID"
                    : ticket.status === "Đang xử lý"
                    ? "PENDING"
                    : "CANCELLED"
                }}
              </span>
            </td>

            <!-- Total price -->
            <td class="px-5 py-4 sm:px-6">
              <p
                class="font-medium text-gray-800 text-theme-sm whitespace-nowrap"
              >
                {{ formatCurrency(ticket.total) }}
              </p>
              <p class="text-gray-500 text-theme-xs dark:text-gray-400">
                {{ ticket.paymentMethod }}
              </p>
            </td>

            <!-- Actions -->
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-2">
                <button
                  class="p-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                  @click="editTicket(ticket.id)"
                  title="Sửa vé"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  class="p-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors"
                  @click="confirmDeleteTicket(ticket.id)"
                  title="Xóa vé"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <Modal v-if="isEditModalOpen" @close="closeEditModal">
      <template #body>
        <div
          class="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8"
        >
          <!-- Close button -->
          <button
            @click="closeEditModal"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <!-- Modal Header -->
          <div class="px-2 pr-14 mb-6">
            <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">
              Chỉnh sửa vé #{{ editingTicket.id }}
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Cập nhật thông tin vé xem phim
            </p>
          </div>

          <!-- Form Content -->
          <form @submit.prevent="saveTicket" class="flex flex-col">
            <div class="px-2 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <!-- Customer Info -->
                <div class="lg:col-span-2">
                  <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Thông tin khách hàng
                  </h5>
                  <div class="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2">
                    <div>
                      <label
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Tên khách hàng
                      </label>
                      <input
                        v-model="editingTicket.customer.name"
                        type="text"
                        class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                      />
                    </div>
                    <div>
                      <label
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Email
                      </label>
                      <input
                        v-model="editingTicket.customer.email"
                        type="email"
                        class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                      />
                    </div>
                  </div>
                </div>

                <!-- Movie & Theater Info -->
                <div>
                  <label
                    class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Phim
                  </label>
                  <select
                    v-model="selectedMovieId"
                    @change="updateMovie"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  >
                    <option value="" disabled>Chọn phim</option>
                    <option
                      v-for="movie in movies"
                      :key="movie.id"
                      :value="movie.id"
                    >
                      {{ movie.title }}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Suất chiếu
                  </label>
                  <select
                    v-model="selectedShowtimeId"
                    @change="updateShowtime"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                    :disabled="!selectedMovieId"
                  >
                    <option value="" disabled>Chọn suất chiếu</option>
                    <option
                      v-for="showtime in availableShowtimes"
                      :key="showtime.id"
                      :value="showtime.id"
                    >
                      {{ getCinemaName(showtime.cinema_id) }} -
                      {{ formatDateTime(showtime.start_time) }} -
                      {{ showtime.hall }}
                    </option>
                  </select>
                </div>

                <!-- Seats -->
                <div class="lg:col-span-2">
                  <label
                    class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Ghế đã chọn
                  </label>
                  <div
                    class="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-lg dark:border-gray-700"
                  >
                    <div
                      v-for="(seat, index) in editingTicket.seats"
                      :key="index"
                      class="flex gap-2 items-center"
                    >
                      <div class="flex gap-1">
                        <input
                          v-model="seat.row"
                          type="text"
                          class="w-12 h-9 rounded border border-gray-300 px-2 py-1 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                          placeholder="Hàng"
                        />
                        <input
                          v-model="seat.number"
                          type="text"
                          class="w-12 h-9 rounded border border-gray-300 px-2 py-1 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                          placeholder="Số"
                        />
                      </div>
                      <button
                        type="button"
                        @click="removeTicketSeat(index)"
                        class="p-1 text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      type="button"
                      @click="addTicketSeat"
                      class="h-fit p-1 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Food Items -->
                <div class="lg:col-span-2">
                  <label
                    class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Đồ ăn & Thức uống
                  </label>
                  <div
                    class="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-lg dark:border-gray-700"
                  >
                    <div
                      v-for="(food, index) in editingTicket.foods"
                      :key="index"
                      class="flex gap-2 items-center"
                    >
                      <div class="flex gap-2 items-center">
                        <select
                          v-model="food.id"
                          @change="updateFoodItem(index, $event)"
                          class="w-48 h-9 rounded border border-gray-300 px-2 py-1 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                        >
                          <option value="" disabled>
                            Chọn đồ ăn/thức uống
                          </option>
                          <option
                            v-for="item in foodItems"
                            :key="item.id"
                            :value="item.id"
                          >
                            {{ item.name }} ({{ formatCurrency(item.price) }})
                          </option>
                        </select>
                        <input
                          v-model.number="food.quantity"
                          type="number"
                          min="1"
                          max="10"
                          class="w-16 h-9 rounded border border-gray-300 px-2 py-1 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                          placeholder="SL"
                        />
                      </div>
                      <button
                        type="button"
                        @click="removeTicketFood(index)"
                        class="p-1 text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      type="button"
                      @click="addTicketFood"
                      class="h-fit p-1 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Payment Info -->
                <div>
                  <label
                    class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Tổng tiền
                  </label>
                  <input
                    v-model="editingTicket.total"
                    type="number"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  />
                </div>
                <div>
                  <label
                    class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Phương thức thanh toán
                  </label>
                  <select
                    v-model="editingTicket.paymentMethod"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  >
                    <option value="VNPAY">VNPAY</option>
                    <option value="MoMo">MoMo</option>
                    <option value="ZaloPay">ZaloPay</option>
                  </select>
                </div>

                <!-- Status -->
                <div class="lg:col-span-2">
                  <label
                    class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Trạng thái
                  </label>
                  <div class="flex gap-4">
                    <div class="flex items-center">
                      <input
                        id="status-paid"
                        type="radio"
                        name="status"
                        value="Đã thanh toán"
                        v-model="editingTicket.status"
                        class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                      />
                      <label
                        for="status-paid"
                        class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Đã thanh toán
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="status-pending"
                        type="radio"
                        name="status"
                        value="Đang xử lý"
                        v-model="editingTicket.status"
                        class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500"
                      />
                      <label
                        for="status-pending"
                        class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Đang xử lý
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="status-cancelled"
                        type="radio"
                        name="status"
                        value="Đã huỷ"
                        v-model="editingTicket.status"
                        class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                      />
                      <label
                        for="status-cancelled"
                        class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Đã huỷ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex items-center gap-3 mt-6 lg:justify-end">
              <button
                @click="closeEditModal"
                type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Huỷ
              </button>
              <button
                type="submit"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import { formatCurrency } from "~/utils/format";
import Modal from "~/components/admin/Modal.vue";
// Add import for the checkout store
import { useCheckoutStore } from "~/stores/checkout";

const movies = ref([]);
const cinemas = ref([]);
const showtimes = ref([]);
const foodItems = ref([]);
const isLoading = ref(true);

const selectedMovieId = ref("");
const selectedShowtimeId = ref("");

const isEditModalOpen = ref(false);
const editingTicket = ref(null);

// Initialize the store
const checkout = useCheckoutStore();

// Format date and time (combining existing formatting functions)
function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return "";

  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

const availableShowtimes = computed(() => {
  if (!selectedMovieId.value) return [];
  return showtimes.value.filter(
    (show) => show.movie_id == selectedMovieId.value
  );
});

// Replace the hardcoded tickets array with this:
const tickets = ref([]);

// Add this fetchTickets function and call it in onMounted
async function fetchTickets() {
  try {
    isLoading.value = true;
    const response = await fetch("http://localhost:5000/tickets");
    if (!response.ok) {
      throw new Error(`Failed to fetch tickets: ${response.status}`);
    }
    tickets.value = await response.json();
  } catch (error) {
    console.error("Error fetching ticket data:", error);
    // Use sample data as fallback
    setFallbackTicketData();
  } finally {
    isLoading.value = false;
  }
}

// And update your onMounted function:
onMounted(async () => {
  try {
    isLoading.value = true;

    // Fetch all required data in parallel
    const [moviesRes, showsRes, foodsRes, cinemasRes, ticketsRes] =
      await Promise.all([
        fetch("http://localhost:5000/movies"),
        fetch("http://localhost:5000/showtimes"),
        fetch("http://localhost:5000/foods"),
        fetch("http://localhost:5000/cinemas"),
        fetch("http://localhost:5000/tickets"),
      ]);

    movies.value = await moviesRes.json();
    showtimes.value = await showsRes.json();
    foodItems.value = await foodsRes.json();
    cinemas.value = await cinemasRes.json();
    tickets.value = await ticketsRes.json();
  } catch (error) {
    console.error("Error loading data:", error);
    setFallbackTicketData();
  } finally {
    isLoading.value = false;
  }
});

// Get cinema name helper function
function getCinemaName(cinemaId) {
  const cinema = cinemas.value.find((c) => c.id === cinemaId);
  return cinema ? cinema.name : "Unknown Cinema";
}

// Update ticket data when movie selection changes
function updateMovie() {
  if (!selectedMovieId.value) return;

  const movie = movies.value.find((m) => m.id == selectedMovieId.value);
  if (movie) {
    editingTicket.value.movie = {
      id: movie.id,
      title: movie.title,
      duration: movie.duration,
    };
  }

  // Reset showtime when movie changes
  selectedShowtimeId.value = "";
  editingTicket.value.theater = { name: "" };
  editingTicket.value.showtime = "";
}

// Update ticket data when showtime selection changes
function updateShowtime() {
  if (!selectedShowtimeId.value) return;

  const showtime = showtimes.value.find(
    (s) => s.id == selectedShowtimeId.value
  );
  if (showtime) {
    const cinema = cinemas.value.find((c) => c.id === showtime.cinema_id);

    // Store both showtime_id and the time
    editingTicket.value.showtime_id = showtime.id;
    editingTicket.value.theater = {
      id: cinema?.id,
      name: cinema ? cinema.name : "Unknown Cinema",
    };
    editingTicket.value.showtime = showtime.start_time;
    editingTicket.value.hall = showtime.hall;

    console.log(
      `Updated showtime to ID: ${showtime.id}, time: ${showtime.start_time}`
    );
  }
}

// Food item management
function addTicketFood() {
  editingTicket.value.foods.push({ id: "", name: "", price: 0, quantity: 1 });
}

function removeTicketFood(index) {
  editingTicket.value.foods.splice(index, 1);
  updateTotalPrice();
}

function updateFoodItem(index, event) {
  const selectedId = event.target.value;
  const food = foodItems.value.find((f) => f.id == selectedId);

  if (food) {
    editingTicket.value.foods[index] = {
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: editingTicket.value.foods[index].quantity || 1,
    };

    updateTotalPrice();
  }
}

// Update total price based on tickets and food
function updateTotalPrice() {
  let total = 0;

  // Add seat costs using pricing from store
  editingTicket.value.seats.forEach((seat) => {
    // Check if seat type exists in the pricing
    const type = seat.type || "standard";
    total += checkout.pricing[type] || checkout.pricing.standard;
  });

  // Add food costs
  editingTicket.value.foods.forEach((food) => {
    if (food.price && food.quantity) {
      total += food.price * food.quantity;
    }
  });

  // Set the new total
  editingTicket.value.total = total;
}
// When opening the edit modal, set the dropdown values
function editTicket(ticketId) {
  // Find the ticket to edit
  const ticketToEdit = tickets.value.find((ticket) => ticket.id === ticketId);

  if (ticketToEdit) {
    console.log("Editing ticket:", ticketToEdit);

    // Create a deep copy to avoid direct mutation
    editingTicket.value = JSON.parse(JSON.stringify(ticketToEdit));

    // First find and set the movie
    const matchedMovie = movies.value.find(
      (m) =>
        m.id === ticketToEdit.movie.id || m.title === ticketToEdit.movie.title
    );

    if (matchedMovie) {
      console.log("Found matching movie:", matchedMovie.title);
      selectedMovieId.value = matchedMovie.id;

      // After setting movie, find the showtime
      // Need to use nextTick to ensure computed properties refresh
      nextTick(() => {
        // First try exact ID match
        const exactShowtime = showtimes.value.find(
          (s) => s.id === ticketToEdit.showtime_id
        );

        if (exactShowtime) {
          selectedShowtimeId.value = exactShowtime.id;
          console.log("Found exact showtime match");
        } else {
          // Try fuzzy matching on multiple properties
          const fuzzyShowtime = showtimes.value.find(
            (s) =>
              s.movie_id == matchedMovie.id &&
              (new Date(s.start_time).getTime() ===
                new Date(ticketToEdit.showtime).getTime() ||
                formatDateTime(s.start_time) ===
                  formatDateTime(ticketToEdit.showtime))
          );

          if (fuzzyShowtime) {
            selectedShowtimeId.value = fuzzyShowtime.id;
            console.log("Found fuzzy showtime match");
          }
        }

        // Update food items with matches by ID or name
        if (ticketToEdit.foods && ticketToEdit.foods.length > 0) {
          editingTicket.value.foods = ticketToEdit.foods.map((food) => {
            // Try to find food by ID first, then by name
            const matchedFood = foodItems.value.find(
              (f) => f.id === food.id || f.name === food.name
            );

            if (matchedFood) {
              console.log("Found matching food:", matchedFood.name);
              return {
                id: matchedFood.id,
                name: matchedFood.name,
                price: matchedFood.price,
                quantity: food.quantity,
              };
            }

            // Return original if no match
            return food;
          });
        }
      });
    }

    isEditModalOpen.value = true;
  }
}

// Add helper function to find cinema ID by name
function getCinemaIdByName(name) {
  const cinema = cinemas.value.find((c) => c.name === name);
  return cinema?.id;
}

function addTicketSeat() {
  editingTicket.value.seats.push({ row: "", number: "" });
}

function removeTicketSeat(index) {
  editingTicket.value.seats.splice(index, 1);
}

// Replace this function
async function saveTicket() {
  try {
    // Make sure showtime_id is included
    if (selectedShowtimeId.value && !editingTicket.value.showtime_id) {
      editingTicket.value.showtime_id = selectedShowtimeId.value;
    }

    // Make sure food items have correct data
    editingTicket.value.foods = editingTicket.value.foods.map((food) => {
      if (!food.id && food.name) {
        const matchedFood = foodItems.value.find((f) => f.name === food.name);
        if (matchedFood) {
          food.id = matchedFood.id;
          food.price = matchedFood.price;
        }
      }
      return food;
    });

    // Prepare the ticket data, ensuring it matches the expected format
    const ticketData = {
      ...editingTicket.value,
      // Add any additional formatting or validation here
    };

    if (ticketData.id) {
      // Update existing ticket
      await updateTicket(ticketData.id, ticketData);
    } else {
      // Create new ticket (if you add a "New Ticket" feature)
      await createTicket(ticketData);
    }

    // Close the modal
    closeEditModal();
  } catch (error) {
    console.error("Error saving ticket:", error);
    alert("Failed to save changes. Please try again.");
  }
}

// Add these new API functions
async function createTicket(ticketData) {
  try {
    const response = await fetch("http://localhost:5000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create ticket: ${response.status}`);
    }

    const newTicket = await response.json();
    tickets.value.push(newTicket);
    return newTicket;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
}

async function updateTicket(ticketId, ticketData) {
  try {
    const response = await fetch(`http://localhost:5000/tickets/${ticketId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ticket: ${response.status}`);
    }

    const updatedTicket = await response.json();
    const index = tickets.value.findIndex((t) => t.id === ticketId);
    if (index !== -1) {
      tickets.value[index] = updatedTicket;
    }
    return updatedTicket;
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
}

// Replace the existing delete function
async function deleteTicket(ticketId) {
  try {
    const response = await fetch(`http://localhost:5000/tickets/${ticketId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ticket: ${response.status}`);
    }

    tickets.value = tickets.value.filter((ticket) => ticket.id !== ticketId);
    return true;
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw error;
  }
}

// Update the confirmDeleteTicket function
function confirmDeleteTicket(ticketId) {
  if (confirm(`Bạn có chắc chắn muốn xóa vé ${ticketId}?`)) {
    deleteTicket(ticketId).catch((error) => {
      console.error("Error in delete operation:", error);
      alert("Failed to delete ticket. Please try again.");
    });
  }
}

function closeEditModal() {
  isEditModalOpen.value = false;
  editingTicket.value = null;
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
