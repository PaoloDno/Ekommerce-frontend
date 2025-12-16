import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../features/api";

export const createNotificationAction = createAsyncThunk(
  "notification/create",
  async (notifData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.post("/notif", notifData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      console.log(data.notifications);
      return data.notification;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Create notification failed"
      );
    }
  }, 
);

export const getUserNotificationsAction = createAsyncThunk(
  "notification/getUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.get("/notif/user-order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      console.log(data.notifications);
      return data.notifications;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch notifications failed"
      );
    }
  }
);

export const markNotificationReadAction = createAsyncThunk(
  "notification/markRead",
  async (notifId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.patch(
        `/notif/${notifId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.notification;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Mark read failed"
      );
    }
  }
);


export const markAllNotificationsReadAction = createAsyncThunk(
  "notification/markAllRead",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.patch(
        "/notif/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Mark all read failed"
      );
    }
  }
);


export const deleteNotificationAction = createAsyncThunk(
  "notification/delete",
  async (notifId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      await api.delete(`/notif/${notifId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return notifId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete notification failed"
      );
    }
  }
);
