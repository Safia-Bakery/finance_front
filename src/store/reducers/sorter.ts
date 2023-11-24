import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { SphereUsers } from "src/utils/types";

interface State {
  sortedData: SphereUsers[];
}

const initialState: State = {
  sortedData: [],
};

export const toggleReducer = createSlice({
  name: "sorter",
  initialState,
  reducers: {
    sortHandler: (state, { payload }: PayloadAction<SphereUsers[]>) => {
      if (!!payload?.length) {
        // Remove objects with the same user_id
        const uniqueUserIds = new Set();
        const uniqueData = payload.filter((item) => {
          const userId = item.user_id;
          if (!uniqueUserIds.has(userId)) {
            uniqueUserIds.add(userId);
            return true;
          }
          return false;
        });

        // Sort the uniqueData based on the sequence property
        const sorted = uniqueData.sort((a, b) => a.sequence - b.sequence);

        // Update the state with the sorted data
        state.sortedData = sorted;
      }
    },
  },
});

export const sortedUsers = (state: RootState) => state.sorter.sortedData;

export const { sortHandler } = toggleReducer.actions;
export default toggleReducer.reducer;
