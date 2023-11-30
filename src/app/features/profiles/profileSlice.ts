import { PayloadAction } from "@reduxjs/toolkit"
import { GenericState, createGenericSlice } from "../../store/genericSlice"
import { Profile } from "../../types/profile"

type State = {
    data : Profile[]
}

const initialState: State = {
    data: []

}

export const profileSlice = createGenericSlice ({
    name: 'profiles',
    initialState: initialState as GenericState<Profile[]>,
    reducers: {
        success:{
            reducer: (state, action:PayloadAction<Profile[]>)=>{
                state.data= action.payload;
                state.status = 'finished'
            },
            prepare:(profiles)=>{
                let profilesArray: Profile[]=[];
                Array.isArray(profiles)?profilesArray = profiles: profilesArray.push(profiles);
                const mapped = profilesArray.map(profile=>{
                    return {...profile, 
                        createdAt: (profile.createdAt as unknown as TimeRanges).toDate().toISOString()
                    }
                });
                return {payload :mapped}

            }  
        }
        
    }
})

export const actions = profileSlice.actions