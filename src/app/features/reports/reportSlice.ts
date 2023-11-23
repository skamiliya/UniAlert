import { createSlice } from "@reduxjs/toolkit"
import { sampleData } from "../../api/sampleData"
import { AppReport } from "../../types/report"

type State ={
    reports: AppReport []
}

const initialState: State = {
    reports: sampleData
}

export const reportSlice = createSlice ({
    name : 'reports',
    initialState,
    reducers: {
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
  

export const {createReport,updateReport, deleteReport} = reportSlice.actions;
