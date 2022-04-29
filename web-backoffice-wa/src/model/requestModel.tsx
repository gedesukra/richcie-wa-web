interface requestStructure {
    method: string,
    headers: {
        'Accept': string,
        'Content-Type': string,
    },
    body?: string
}

let baseStructure : requestStructure  = {
    method: "",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
}

let requestConfig = (argMethod: string, data?: object) : requestStructure => {
    if(argMethod === "POST") {
        return {
            ...baseStructure,
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
