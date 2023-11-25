import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppReport } from "../../types/report"
import { Timestamp } from "firebase/firestore"

type State ={
    reports: AppReport []
}

const initialState: State = {
    reports:  []
}

export const reportSlice = createSlice ({
    name : 'reports',
    initialState,
    reducers: {
        setReports:{
            reducer: (state,action: PayloadAction<AppReport[]>) =>{
                state.reports = action.payload
            },
            prepare: (reports:any) =>{
                const mapped = reports.map((r:any) => {
                    return {...r,date: (r.date as Timestamp).toDate().toDateString()}

                });
                return {payload:mapped}
            }
        },

        createReport: (state, action) => {
            state.reports.push(action.payload);
        },
        updateReport:(state,action)=>{
            state.reports[state.reports.findIndex(rpt =>rpt.id === action.payload.id)] = action.payload;
        },
        deleteReport: (state,action)=>{
            state.reports.splice(state.reports.findIndex(rpt=>rpt.id ===action.payload),1)
        }
    }
})
  

export const {createReport,updateReport, deleteReport, setReports} = reportSlice.actions;
