import { PayloadAction } from "@reduxjs/toolkit";
import { AppReport } from "../../types/report";
import { Timestamp } from "firebase/firestore";
import { GenericActions, GenericState, createGenericSlice } from "../../store/genericSlice";
import { auth } from "../../config/firebase";

type State = {
  data: AppReport[]
};

const initialState: State = {
  data: []
};

export const reportSlice = createGenericSlice({
  name: "reports",
  initialState: initialState as GenericState<AppReport[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppReport[]>) => {
        state.data = action.payload;
        state.status = 'finished'
      },
      prepare: (reports: any) => {
        let reportArray: AppReport[] = [];
        Array.isArray(reports) ? reportArray = reports : reportArray.push(reports)
        const mapped = reportArray.map((r: any) => {
          return { 
            ...r, 
            date: (r.date as Timestamp).toDate().toISOString() ,
            isHost:auth.currentUser?.uid === r.hostUid,
            isGoing:r.userIds.includes(auth.currentUser?.uid)
          }
        });
        return { payload: mapped }
      }
    },
  }
});

export const actions = reportSlice.actions as GenericActions<AppReport[]>
