import {create} from "zustand";

export const useStudentStore = create<{
    updateData: any,
    open: boolean,
    isUpdate: boolean,
    setOpen: (open: boolean) => void
    setIsUpdate: (isUpdate: boolean) => void
    setUpdateData: (updateData: any) => void
}>(set => ({
    updateData: {},
    open: false,
    isUpdate: false,
    setOpen: (open: boolean) => set((state): any => ({...state, open})),
    setIsUpdate: (isUpdate: boolean) => set((state): any => ({...state, isUpdate})),
    setUpdateData: (updateData: any) => set((state): any => ({...state, updateData})),
}))

export const useTeacherStore = create<{
    updateData: any,
    open: boolean,
    isUpdate: boolean,
    setOpen: (open: boolean) => void
    setIsUpdate: (isUpdate: boolean) => void
    setUpdateData: (updateData: any) => void
}>(set => ({
    updateData: {},
    open: false,
    isUpdate: false,
    setOpen: (open: boolean) => set((state): any => ({...state, open})),
    setIsUpdate: (isUpdate: boolean) => set((state): any => ({...state, isUpdate})),
    setUpdateData: (updateData: any) => set((state): any => ({...state, updateData})),
}))

export const useResetRowSelectStore = create<{
    setRow: boolean,
    resetRow: (set: boolean) => void
}>(set => ({
    setRow: false,
    resetRow: (setRow: boolean) => set((state): any => ({...state, setRow})),
}))


export const useClassStore = create<{
    updateData: any,
    open: boolean,
    isUpdate: boolean,
    setOpen: (open: boolean) => void
    setIsUpdate: (isUpdate: boolean) => void
    setUpdateData: (updateData: any) => void
}>(set => ({
    updateData: {},
    open: false,
    isUpdate: false,
    setOpen: (open: boolean) => set((state): any => ({...state, open})),
    setIsUpdate: (isUpdate: boolean) => set((state): any => ({...state, isUpdate})),
    setUpdateData: (updateData: any) => set((state): any => ({...state, updateData})),
}))