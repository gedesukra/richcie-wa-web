import { Component, Fragment, ReactNode } from 'react'
import { Row, Col, Card, CardTitle, Spinner } from 'reactstrap'

import Pagination from '../container/Backoffice_table_pagination/pagination'

import { ListUser, DeleteUser, EditUser, AddUser } from '../container/User/user'
import { ListUserAdmin, AddUserAdmin, EditUserAdmin, DeleteUserAdmin } from '../container/UserAdmin/userAdmin'
import { ShowOnlineUser, RemoveOnlineUser } from '../container/Dashboard/dashboard'

import Drawer from '../container/backoffice-drawer'

import { Config } from '../model/requestModel'

import '../css/containers/backoffice-drawer.css'
import '../css/components/backoffice.css'

const email = localStorage.getItem("email")
const url = "http://localhost:8080/getUsername"
const getUserListWithScope = "http://localhost:8080/getUserListWithScope"
const getAdminListWithScope = "http://localhost:8080/getAdminListWithScope"
const getUserListLength = "http://localhost:8080/getUserListLength"
const getAdminListLength = "http://localhost:8080/getAdminListLength"
const initialInput = {
    email: ["", false],
    password: ["", false],
    username: ["", false],
    gender: ["Male", true],
}

interface deleteStructure {
    uid: string,
    username: string,
    role: string,
}

interface buttonList {
    User: boolean,
    UserAdmin: boolean,
    Dashboard: boolean,
    Logout: boolean,
}

// object init
const userFunc: any = {
    ListUser: ListUser,
    DeleteUser: DeleteUser,
    EditUser: EditUser,
    AddUser: AddUser,
}

const userAdminFunc: any = {
    ListUserAdmin: ListUserAdmin,
    DeleteUserAdmin: DeleteUserAdmin,
    AddUserAdmin: AddUserAdmin,
    EditUserAdmin: EditUserAdmin,
}

const dashboardFunc: any = {
    ShowOnlineUser: ShowOnlineUser,
    RemoveOnlineUser: RemoveOnlineUser,
}

// component structure
interface BackOfficeProps {
    handleLogout: (param: boolean) => void,
}

interface BackOfficeStates {
    buttonBackOfficeList: buttonList,
    functionalPage: {
        "User": typeof userFunc,
        "UserAdmin": typeof userAdminFunc,
        "Dashboard": typeof dashboardFunc,
    },
    selected: {
        displayTitle: string,
        displayChild: string,
        displayParent: string,
        role: string,
    },
    data: {
        userList: Array<string>,
        loading: boolean,
        msg: string,
    },
    pagination: {
        currentPagination: number,
        paginationLength: number,
        paginationScope: number[],
    },
    universalInputData: {
        input: {
            email: any[],
            password: any[],
            username: any[],
            gender: any[],
        },
        selectedIndex: number,
        loading: boolean,
        msg: string,
    },
    loading: boolean,
    displayUsername: string,
    editMode: boolean,
}

class BackOffice extends Component<BackOfficeProps, BackOfficeStates> {
    public state = {
        buttonBackOfficeList: {
            User: false,
            UserAdmin: false,
            Dashboard: false,
            Logout: false
        },
        functionalPage: {
            "User": userFunc,
            "UserAdmin": userAdminFunc,
            "Dashboard": dashboardFunc,
        },
        selected: {
            displayTitle: "",
            displayChild: "",
            displayParent: "",
            role: "",
        },
        data: {
            userList: [],
            loading: true,
            msg: "",
        },
        pagination: {
            currentPagination: 0,
            paginationLength: 0,
            paginationScope: [1, 5],
        },
        universalInputData: {
            input: {
                email: ["", false],
                password: ["", false],
                username: ["", false],
                gender: ["Male", true],
            },
            selectedIndex: -1,
            loading: false,
            msg: "",
        },
        loading: true,
        displayUsername: "",
        editMode: false,
    }

    private urlList = () => this.state.selected.role === "admin"
        ? getAdminListWithScope
        : getUserListWithScope

    private urlListLength = () => this.state.selected.role === "admin"
        ? getAdminListLength
        : getUserListLength

    private sendData = () => {
        if (this.state.universalInputData.selectedIndex < 0) {
            return ({
                "email": this.state.universalInputData.input.email[0],
                "password": this.state.universalInputData.input.password[0],
                "username": this.state.universalInputData.input.username[0],
                "gender": this.state.universalInputData.input.gender[0],
            })
        }
        return ({
            "uid": JSON.parse(this.state.data.userList[this.state.universalInputData.selectedIndex]).id,
            "email": this.state.universalInputData.input.email[0],
            "password": this.state.universalInputData.input.password[0],
            "username": this.state.universalInputData.input.username[0],
            "gender": this.state.universalInputData.input.gender[0],
        })
    }

    private async assignPagination() {
        if (email !== null) {
            // get whatsapp user list
            const universalListData = await fetch(this.urlList(), Config("POST", { email: JSON.parse(email).email, pagScope: this.state.pagination.paginationScope }))
                .then(res => res.json())
                .then(data => data)
            console.log(JSON.parse(universalListData[0]))

            const universalPaginationLength = await fetch(this.urlListLength(), Config("POST", { email: JSON.parse(email).email }))
                .then(data => data.json())
                .then(res => res)
            
            const finalPagination = {
                result: 0
            }

            finalPagination.result += Math.floor(universalPaginationLength.paginationLength / 5)
            if (universalPaginationLength.paginationLength % 5 !== 0) {
                finalPagination.result += 1
            }
            if (universalListData.length > 0) {
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationLength: finalPagination.result,
                    },
                })
            }
        }
    }

    public async componentDidMount() {
        if (email !== null) {
            // get username
            const getUsernameAdmin = await fetch(url, Config("POST", { email: JSON.parse(email).email }))
                .then(res => res.json())
            this.setState({
                loading: false,
                displayUsername: getUsernameAdmin,
            })
        }
    }

    private ParentButton = (args: string) => {
        if (args === "Logout") {
            this.props.handleLogout(false)
        } else {
            this.setState({
                buttonBackOfficeList: {
                    ...this.state.buttonBackOfficeList,
                    [args]: !this.state.buttonBackOfficeList[args as keyof buttonList]
                }
            })
        }
    }

    private changePagination = async (argChange: number) => {
        const data = await this.updateUserData(this.state.pagination.paginationScope)
        if (data.length > 0) {
            this.setState({
                data: {
                    ...this.state.data,
                    userList: data,
                    loading: false,
                },
                pagination: {
                    ...this.state.pagination,
                    currentPagination: argChange,
                }
            })
        }
    }

    private ChildButton = (parentName: string, args: string) => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                msg: "",
            },
            universalInputData: {
                ...this.state.universalInputData,
                input: initialInput,
                msg: "",
            },
            editMode: false,
        })
        let selectDisplay = ""
        args.split(" ").forEach((s) => selectDisplay += s.charAt(0).toUpperCase() + s.slice(1))
        const matchIndex = /[^A-Za-z]/.exec(selectDisplay)
        const paginationCalculate = [1, 5]
        const assignRole = selectDisplay.toLowerCase().includes("admin")
            ? "admin"
            : "user"
        if (matchIndex !== null) {
            selectDisplay = selectDisplay.slice(0, matchIndex.index)
        }

        this.setState({
            selected: {
                displayTitle: args,
                displayChild: selectDisplay,
                displayParent: parentName,
                role: assignRole,
            },
            pagination: {
                ...this.state.pagination,
                currentPagination: 0,
                paginationScope: paginationCalculate,
            }
        }, () => {
            this.setState({
                data: {
                    ...this.state.data,
                    loading: true,
                },
            })
            this.assignPagination()
            this.changePagination(0)
        })
    }

    private async updateUserData(scope: number[]): Promise<Array<string>> {
        if (email !== null) {
            const updateData: any = fetch(this.urlList(), Config("POST", { email: JSON.parse(email).email, pagScope: scope }))
                .then(res => res.json())
                .then(data => data)
            return updateData
        }
        return []
    }

    private async paginationControl(method: string, index: number, disabled: boolean) {
        const scopeIncrementDecrement: [number, number] = [5, 5]
        if (!disabled && this.state.pagination.currentPagination !== index) {
            this.setState({
                data: {
                    ...this.state.data,
                    loading: true,
                    msg: "",
                }
            })
            if (method === "set" && index >= 0) {
                const initialScope: [number, number] = [1, 5]
                const paginationCalculate = [initialScope[0] + (scopeIncrementDecrement[0] * index), initialScope[1] + (scopeIncrementDecrement[1] * index)]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(index))
            }

            if (method === "next") {
                const paginationCalculate = [this.state.pagination.paginationScope[0] + scopeIncrementDecrement[0], this.state.pagination.paginationScope[1] + scopeIncrementDecrement[1]]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(this.state.pagination.currentPagination + 1))
            }

            if (method === "back") {
                const paginationCalculate = [this.state.pagination.paginationScope[0] - scopeIncrementDecrement[0], this.state.pagination.paginationScope[1] - scopeIncrementDecrement[1]]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(this.state.pagination.currentPagination - 1))
            }

            if (method === "first") {
                const paginationCalculate = [1, 5]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(0))
            }

            if (method === "last") {
                const initialScope: [number, number] = [1, 5]
                const finalIndex = this.state.pagination.paginationLength - 1
                const paginationCalculate = [initialScope[0] + (scopeIncrementDecrement[0] * finalIndex), initialScope[1] + (scopeIncrementDecrement[1] * finalIndex)]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(finalIndex))
            }
        }
    }

    private async changeAddInput(e: React.FormEvent<HTMLInputElement>, key: string) {
        if (e !== null && key !== null) {
            e?.preventDefault()
            this.setState({
                universalInputData: {
                    ...this.state.universalInputData,
                    input: {
                        ...this.state.universalInputData.input,
                        [key]: [e?.currentTarget.value.trim(), false]
                    }
                }
            }, () => {
                let checkBoolean: boolean
                if (key === "email" && key !== null) {
                    const emailRegexp: RegExp = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                    checkBoolean = emailRegexp.test(this.state.universalInputData.input.email[0] as string)
                } else {
                    const inputValid = this.state.universalInputData.input[key as keyof BackOfficeStates["universalInputData"]["input"]][0] as string
                    checkBoolean = inputValid.length > 0
                }
                this.setState({
                    universalInputData: {
                        ...this.state.universalInputData,
                        input: {
                            ...this.state.universalInputData.input,
                            [key]: [this.state.universalInputData.input[key as keyof BackOfficeStates["universalInputData"]["input"]][0], checkBoolean]
                        }
                    }
                })
            })
        }
    }

    private async universalButton(method: string) {
        if (email !== null) {
            const listBool: boolean[] = []
            Object.keys(this.state.universalInputData.input).forEach(
                k => listBool.push(this.state.universalInputData.input[k as keyof BackOfficeStates["universalInputData"]["input"]][1] as any as boolean)
            )
            if (listBool.every((el: any) => el === true)) {
                const addEditUrl = (this.state.selected.role === "user" && method === "Add")
                    ? "http://localhost:8080/addUser"
                    : (this.state.selected.role === "user" && method === "Edit")
                        ? "http://localhost:8080/editUser"
                        : (this.state.selected.role === "admin" && method === "Add")
                            ? "http://localhost:8080/addAdmin"
                            : (this.state.selected.role === "admin" && method === "Edit")
                                ? "http://localhost:8080/editAdmin"
                                : "";
                this.setState({
                    universalInputData: {
                        ...this.state.universalInputData,
                        loading: true
                    }
                })
                const addEditResponse: any = await fetch(addEditUrl, Config("POST", { adminEmail: JSON.parse(email).email, addEditData: { ...this.sendData() } }))
                    .then(res => res.json())
                    .then(data => data)
                if (addEditResponse !== null) {
                    this.assignPagination()
                    this.setState({
                        universalInputData: {
                            ...this.state.universalInputData,
                            loading: false,
                            msg: addEditResponse.msg
                        }
                    }, () => {
                        this.assignPagination()
                        this.changePagination(this.state.pagination.currentPagination)
                    })
                }
            }
        }
    }

    private async universalTableAction(action: string, uid: string, paramData: deleteStructure) {
        this.setState({
            universalInputData: {
                ...this.state.universalInputData,
                msg: "",
            }
        })
        if (action === "edit") {
            if (!this.state.editMode && uid !== "") {
                const nameColumn = this.state.selected.role === "user"
                    ? "username"
                    : "adminname"
                const selectedDataIndex: number = this.state.data.userList.map(obj => JSON.parse(obj).id).indexOf(uid)
                const inputData = {
                    email: JSON.parse(this.state.data.userList[selectedDataIndex]).email,
                    password: "",
                    username: JSON.parse(this.state.data.userList[selectedDataIndex])[nameColumn],
                    gender: JSON.parse(this.state.data.userList[selectedDataIndex]).gender,
                }
                inputData.gender = inputData.gender === "m"
                    ? "Male"
                    : "Female"
                this.setState({
                    universalInputData: {
                        ...this.state.universalInputData,
                        input: {
                            ...this.state.universalInputData.input,
                            email: [inputData.email, true],
                            password: [inputData.password, false],
                            username: [inputData.username, true],
                            gender: [inputData.gender, true],
                        },
                        selectedIndex: selectedDataIndex,
                    }
                })
            }
            this.setState({
                editMode: !this.state.editMode
            })
        }

        if (action === "delete" && paramData !== null) {
            this.setState({
                data: {
                    ...this.state.data,
                    loading: true,
                }
            })
            if (email !== null) {
                const deleteUrl = paramData.role === "user"
                    ? "http://localhost:8080/deleteUser"
                    : "http://localhost:8080/deleteAdmin"
                const deleteRes = await fetch(deleteUrl, Config("POST", { adminEmail: JSON.parse(email).email, deleteData: { ...paramData } }))
                    .then(res => res.json())
                    .then(data => data)
                if(deleteRes !== null) {
                    this.setState({
                        data: {
                            ...this.state.data,
                            loading: false,
                            msg: deleteRes.msg
                        },
                        pagination: {
                            ...this.state.pagination,
                            paginationScope: [1, 5]
                        }
                    }, () => {
                        this.changePagination(0)
                        this.assignPagination()
                    })
                }
            }
        }
    }

    public render(): ReactNode {
        interface passedParameter {
            paramFor: string,
            dataState: BackOfficeStates["universalInputData"],
            changeInput: (e: React.FormEvent<HTMLInputElement>, key: string) => void,
            universalEditSendButton: (methodParam: string) => void
        }

        const buttonList = Object.keys(this.state.buttonBackOfficeList)
        const selectedBool = this.state.selected.displayTitle === ""
        const childAddDisplay = this.state.selected.displayChild.toLowerCase().includes("useradmin") ? "admin" : "user"
        const inputParameter: passedParameter = {
            paramFor: childAddDisplay,
            dataState: this.state.universalInputData,
            changeInput: (e: React.FormEvent<HTMLInputElement>, key: string) => this.changeAddInput(e, key),
            universalEditSendButton: (methodParam: string) => this.universalButton(methodParam)
        }

        let selectedElement: any = <Fragment />
        if (!selectedBool) {
            selectedElement =
                this.state.functionalPage
                [this.state.selected.displayParent as keyof BackOfficeStates["functionalPage"]]
                [this.state.selected.displayChild as keyof (typeof userFunc | typeof userAdminFunc | typeof dashboardFunc)]
        }

        return (
            <div className='hideOverflow'>
                <Row>
                    <Col lg="3" className='divMargin buttonStyle' key="tes">
                        {
                            buttonList.map(
                                (buttonKeys) => Drawer(
                                    this.state.buttonBackOfficeList[buttonKeys as keyof buttonList],
                                    buttonKeys,
                                    (param) => this.ParentButton(param),
                                    (parent: string, child: string) => this.ChildButton(parent, child)
                                )
                            )
                        }
                    </Col>
                    <Col lg="9" className='cardBody'>
                        <Card body>
                            <CardTitle tag="h5">
                                {
                                    selectedBool
                                        ? this.state.loading ? <Spinner /> : `${this.state.displayUsername}! Welcome to admin backoffice`
                                        : this.state.selected.displayTitle
                                }
                            </CardTitle>
                            <div>
                                {
                                    selectedBool
                                        ? "As admin, you allowed to manage user admin, whatsapp user and view online users"
                                        : this.state.selected.displayChild === "AddUser" || this.state.selected.displayChild === "AddUserAdmin"
                                            ? selectedElement(
                                                inputParameter,
                                            )
                                            : (
                                                this.state.pagination.paginationLength >= 1 && !this.state.editMode
                                                    ? Pagination(
                                                        selectedElement(
                                                            this.state.data.userList,
                                                            this.state.data.loading,
                                                            (arg: string, uid: string, deleteData: deleteStructure) => this.universalTableAction(arg, uid, deleteData),
                                                            this.state.editMode,
                                                            inputParameter,
                                                        ),
                                                        this.state.pagination.paginationLength,
                                                        this.state.pagination.currentPagination,
                                                        this.state.data.loading,
                                                        (method, pagIndex, disabled) => this.paginationControl(
                                                            method,
                                                            pagIndex,
                                                            disabled
                                                        )
                                                    )
                                                    : selectedElement(
                                                        this.state.data.userList,
                                                        this.state.data.loading,
                                                        (arg: string, uid: string, deleteData: deleteStructure) => this.universalTableAction(arg, uid, deleteData),
                                                        this.state.editMode,
                                                        inputParameter,
                                                    )
                                            )
                                }
                                {
                                    this.state.data.msg.length > 0
                                        ? <CardTitle className='deleteMessage'>{this.state.data.msg}</CardTitle>
                                        : <Fragment />
                                }
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export const Dashboard = BackOffice