interface requestStructure {
    method: string,
    headers: {
        'Accept': string,
        'Content-Type': string,
    },
    body?: string
}

const baseStructure : requestStructure  = {
    method: "",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
    },
}

let requestConfig = (argMethod: string, data?: object, customHeaders?: object) : requestStructure => {
    if(argMethod === "POST") {
        return {
            ...baseStructure,
            headers: {
                ...baseStructure.headers,
                ...customHeaders,
            },
            method: argMethod,
            body: JSON.stringify({
                ...data
            })
        }
    }
    return {
        ...baseStructure,
        method: argMethod
    }
}

export const Config = requestConfig
