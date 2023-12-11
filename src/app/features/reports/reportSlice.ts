import { PayloadAction } from "@reduxjs/toolkit";
import { AppReport } from "../../types/report";
import { Timestamp } from "firebase/firestore";
import { GenericActions, GenericState, createGenericSlice } from "../../store/genericSlice";
import { auth } from "../../config/firebase";

type State = {
  data: AppReport[],
  loadedInitial: boolean
};

const initialState: State = {
  data: [],
  loadedInitial: false
};

export const reportSlice = createGenericSlice({
  name: "reports",
  initialState: initialState as GenericState<AppReport[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppReport[]>) => {
        state.data = removeDuplicates([...action.payload, ...state.data])
        state.status = 'finished'
        state.loadedInitial = true
      },
      prepare: (reports: any) => {
        let reportArray: AppReport[] = [];
        Array.isArray(reports) ? reportArray = reports : reportArray.push(reports)
        const mapped = reportArray.map((r: any) => {
          return {
            ...r,
            date: (r.date as Timestamp).toDate().toISOString(),
            isHost: auth.currentUser?.uid === r.hostUid,
            isGoing: r.userIds.includes(auth.currentUser?.uid)
          }
        });
        return { payload: mapped }
      }
    },
  }
});

export const actions = reportSlice.actions as GenericActions<AppReport[]>

function removeDuplicates(reports: AppReport[]) {
  return Array.from(new Set(reports
    .map(x => x.id)))
    .map(id => reports.find(a => a.id === id) as AppReport)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
