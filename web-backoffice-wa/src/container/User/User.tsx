import { UniversalInput } from '../universalInput'
import { UniversalTable } from '../universalTable'
import { UniversalBackButton } from '../universalButtonBackEdit'

import '../../css/containers/User/user.css'

interface AddUserStruct {
    input: {
        email: any[],
        password: any[],
        username: any[],
        gender: any[],
    },
    loading: boolean,
    msg: string,
}

interface passedParameter {
    paramFor: string,
    dataState: AddUserStruct,
    editPassword: boolean,
    changeInput: (e: React.FormEvent<HTMLInputElement>, key: string) => void,
    universalEditSendButton: (methodParam: string) => void,
    changePasswordMode: (e: boolean) => void,
}

interface deleteStructure {
    uid: string,
    username: string
}

export function addUser(
    parameterObject: passedParameter
) {
    return UniversalInput(
        "Add",
        parameterObject,
    )
}

export const AddUser = addUser

// list user component
function listUser(
    data: Array<string>, 
    dataLoading: boolean,
    tableAction: (arg: string, uid: string, deleteData: deleteStructure) => void,
    editMode: boolean,
    parameterObject: any,
) {
    const inputParameter = !parameterObject.editPassword 
        ? {
            ...parameterObject,
            dataState: {
                ...parameterObject.dataState,
                input: {
                    email: [parameterObject.dataState.input.email[0], parameterObject.dataState.input.email[1]],
                    username: [parameterObject.dataState.input.username[0], parameterObject.dataState.input.username[1]],
                    gender: [parameterObject.dataState.input.gender[0], parameterObject.dataState.input.gender[1]],
                }
            }
        }
        : parameterObject
    if(editMode) {
        return UniversalBackButton(
            UniversalTable(
                "user",
                data, 
                dataLoading,
                (method, uid, deleteData) => tableAction(method, uid, deleteData),
            ),
            UniversalInput(
                "Edit",
                inputParameter,
            ),
            editMode,
            parameterObject.paramFor,
            (method, uid, deleteData) => tableAction(method, uid, deleteData)
        )
    }
    return UniversalTable(
        "user",
        data, 
        dataLoading,
        (method, uid, deleteData) => tableAction(method, uid, deleteData),
    )
}

export const ListUser = listUser