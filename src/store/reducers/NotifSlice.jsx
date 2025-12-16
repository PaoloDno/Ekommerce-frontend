import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createNotificationAction, getUserNotificationsAction, markAllNotificationsReadAction, markNotificationReadAction, deleteNotificationAction} from "../actions/NotificationThunks";

const notificationSlice = createSlice({
  name: "notif",
  initialState: {
    notifications: [],
    unreadCount: 0,

    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,
  },
  reducers: {
    resetNotificationState: (state) => {
      state.isPending = false;
      state.isRejected = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUserNotificationsAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;

        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.read).length;
      })

      .addCase(createNotificationAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;

        state.notifications.unshift(action.payload);
        if (!action.payload.read) {
          state.unreadCount += 1;
        }
      })

      .addCase(markNotificationReadAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;

        const index = state.notifications.findIndex(
          (n) => n._id === action.payload._id
        );

        if (index !== -1 && !state.notifications[index].read) {
          state.notifications[index].read = true;
          state.unreadCount -= 1;
        }
      })

      .addCase(markAllNotificationsReadAction.fulfilled, (state) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;

        state.notifications = state.notifications.map((n) => ({
          ...n,
          read: true,
        }));
        state.unreadCount = 0;
      })

      .addCase(deleteNotificationAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;

        const deleted = state.notifications.find(
          (n) => n._id === action.payload
        );

        if (deleted && !deleted.read) {
          state.unreadCount -= 1;
        }

        state.notifications = state.notifications.filter(
          (n) => n._id !== action.payload
        );
      })

      .addMatcher(
        isPending(
          createNotificationAction,
          getUserNotificationsAction,
          markNotificationReadAction,
          markAllNotificationsReadAction,
          deleteNotificationAction
        ),
        (state) => {
          state.isPending = true;
          state.isRejected = false;
          state.isSuccess = false;
          state.error = null;
        }
      )

      .addMatcher(
        isRejected(
          createNotificationAction,
          getUserNotificationsAction,
          markNotificationReadAction,
          markAllNotificationsReadAction,
          deleteNotificationAction
        ),
        (state, action) => {
          state.isPending = false;
          state.isRejected = true;
          state.isSuccess = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { resetNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;