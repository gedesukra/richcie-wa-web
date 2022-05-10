import { Component, Fragment, ReactNode } from 'react'
import { Row, Col, Card, CardTitle, Spinner } from 'reactstrap'

import Pagination from '../container/Backoffice_table/pagination'

import { ListUser, DeleteUser, EditUser, AddUser } from '../container/User/user'
import { ListUserAdmin, AddUserAdmin, EditUserAdmin, DeleteUserAdmin } from '../container/UserAdmin/userAdmin'
import { ShowOnlineUser, RemoveOnlineUser } from '../container/Dashboard/dashboard'

import Drawer from '../container/backoffice-drawer'

import { Config } from '../model/requestModel'

import '../css/containers/backoffice-drawer.css'
import '../css/components/backoffice.css'

const email = localStorage.getItem("email")
const url = "http://localhost:8080/getUsername"
const getUserUrlScope = "http://localhost:8080/getUserListWithScope"
const getUserListLength = "http://localhost:8080/getUserListLength"
const initialInput = {
    email: ["", false],
    password: ["", false],
    username: ["", false],
    gender: ["Male", true],
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
    },
    data: {
        userList: Array<string>,
        loading: boolean,
    },
    pagination: {
        currentPagination: number,
        paginationLength: number,
        paginationScope: number[],
    },
    addUniversal: {
        input: {
            email: any[],
            password: any[],
            username: any[],
            gender: any[],
        },
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
        },
        data: {
            userList: [],
            loading: false,
        },
        pagination: {
            currentPagination: 0,
            paginationLength: 0,
            paginationScope: [1, 5],
        },
        addUniversal: {
            input: {
                email: ["", false],
                password: ["", false],
                username: ["", false],
                gender: ["Male", true],
            },
            loading: false,
            msg: "",
        },
        loading: false,
        displayUsername: "",
        editMode: false,
    }

    private sendData = {
        "email": this.state.addUniversal.input.email[0],
        "password": this.state.addUniversal.input.password[0],
        "username": this.state.addUniversal.input.username[0],
        "gender": this.state.addUniversal.input.gender[0],
    }

    public async componentDidMount() {
        this.setState({
            data: {
                ...this.state.data,
                loading: true,
            },
            loading: true
        })
        if(email !== null) {
            // get whatsapp user list
            const userListData = await fetch(getUserUrlScope, Config("POST", {email: JSON.parse(email).email, pagScope: this.state.pagination.paginationScope}))
                .then(res => res.json())
                .then(data => data)
            const paginationItemLength = await fetch(getUserListLength, Config("POST", {email: JSON.parse(email).email}))
                .then(data => data.json())
                .then(res => res)
            paginationItemLength.paginationLength = Math.floor(paginationItemLength.paginationLength / 5)
            if(paginationItemLength.paginationLength % 5 !== 0) {
                paginationItemLength.paginationLength += 1
            }
            if(userListData.length >= 0) {
                this.setState({
                    data: {
                        ...this.state.data,
                        userList: userListData,
                        loading: false,
                    },
                    pagination: {
                        ...this.state.pagination,
                        paginationLength: paginationItemLength.paginationLength,
                    }
                })
            }

            // get username
            const getUsernameAdmin = await fetch(url, Config("POST", {email: JSON.parse(email).email}))
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
        this.setState({
            data: {
                ...this.state.data,
                userList: data,
                loading: false,
            },
            pagination: {
                ...this.state.pagination,
                currentPagination: argChange
            }
        })
    }

    private ChildButton = (parentName: string, args: string) => {
        this.setState({
            addUniversal: {
                ...this.state.addUniversal,
                input: initialInput
            }
        })
        let selectDisplay = ""
        args.split(" ").forEach((s) => selectDisplay += s.charAt(0).toUpperCase() + s.slice(1))
        const matchIndex = /[^A-Za-z]/.exec(selectDisplay)
        const paginationCalculate = [1, 5]
        if(matchIndex !== null) {
            selectDisplay = selectDisplay.slice(0, matchIndex.index)
        }
        
        this.setState({
            selected: {
                displayTitle: args,
                displayChild: selectDisplay,
                displayParent: parentName,
            },
            pagination: {
                ...this.state.pagination,
                currentPagination: 0,
                paginationScope: paginationCalculate,
            }
        }, () => this.changePagination(0))
    }

    private async updateUserData(scope: number[]): Promise<Array<string>> {
        if(email !== null) {
            const updateData: any = fetch(getUserUrlScope, Config("POST", {email: JSON.parse(email).email, pagScope: scope}))
                .then(res => res.json())
                .then(data => data)
            return updateData
        }
        return []
    }

    private async paginationControl(method: string, index: number, disabled: boolean) {
        const scopeIncrementDecrement: [number, number] = [5, 5]
        if(!disabled && this.state.pagination.currentPagination !== index) {
            this.setState({
                data: {
                    ...this.state.data,
                    loading: true,
                }
            })

            if(method === "set" && index >= 0) {
                const initialScope: [number, number] = [1, 5]
                const paginationCalculate = [initialScope[0] + (scopeIncrementDecrement[0] * index), initialScope[1] + (scopeIncrementDecrement[1] * index)]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(index))
            }

            if(method === "next") {
                const paginationCalculate = [this.state.pagination.paginationScope[0] + scopeIncrementDecrement[0] , this.state.pagination.paginationScope[1] + scopeIncrementDecrement[1]]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(this.state.pagination.currentPagination + 1))
            }

            if(method === "back") {
                const paginationCalculate = [this.state.pagination.paginationScope[0] - scopeIncrementDecrement[0] , this.state.pagination.paginationScope[1] - scopeIncrementDecrement[1]]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(this.state.pagination.currentPagination - 1))
            }

            if(method === "first") {
                const paginationCalculate = [1, 5]
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        paginationScope: paginationCalculate,
                    }
                }, () => this.changePagination(0))
            }

            if(method === "last") {
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
        if(e !== null && key !== null) {
            e?.preventDefault()
            this.setState({
                addUniversal: {
                    ...this.state.addUniversal,
                    input: {
                        ...this.state.addUniversal.input,
                        [key]: [e?.currentTarget.value.trim(), false]
                    }
                }
            }, () => {
                let checkBoolean: boolean
                if(key === "email" && key !== null) {
                    const emailRegexp: RegExp = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                    checkBoolean = emailRegexp.test(this.state.addUniversal.input.email[0] as string)
                } else {
                    const inputValid = this.state.addUniversal.input[key as keyof BackOfficeStates["addUniversal"]["input"]][0] as string
                    checkBoolean = inputValid.length > 0
                }
                this.setState({
                    addUniversal: {
                        ...this.state.addUniversal,
                        input: {
                            ...this.state.addUniversal.input,
                            [key]: [this.state.addUniversal.input[key as keyof BackOfficeStates["addUniversal"]["input"]][0], checkBoolean]
                        }
                    }
                })
            })
        }
    }

    private async universalButton(role: string, method: string) {
        if(email !== null) {
            const listBool: boolean[] = []
            Object.keys(this.state.addUniversal.input).forEach(
                k => listBool.push(this.state.addUniversal.input[k as keyof BackOfficeStates["addUniversal"]["input"]][1] as any as boolean)
            )
            if(listBool.every((el: any) => el === true)) {
                const addUserUrl = (role == "user" && method == "Add") ? "http://localhost:8080/addUser" : "";
                this.setState({
                    addUniversal: {
                        ...this.state.addUniversal,
                        loading: true
                    }
                })
                const addUserResponse: any = await fetch(addUserUrl, Config("POST", {adminEmail: JSON.parse(email).email, addData: {...this.sendData}}))
                    .then(res => res.json())
                    .then(data => data)
                if(addUserResponse !== null) {
                    this.setState({
                        addUniversal: {
                            ...this.state.addUniversal,
                            loading: false,
                            msg: addUserResponse.msg
                        }
                    })
                }
            }
        }
    }

    private universalTableAction(action: string) {
        if(action === "edit") {
            this.setState({
                editMode: !this.state.editMode
            })
        }
    }

    public render(): ReactNode {
        interface passedParameter {
            paramFor: string,
            dataState: BackOfficeStates["addUniversal"],
            changeInput: (e: React.FormEvent<HTMLInputElement>, key: string) => void,
            universalEditSendButton: (role: string, methodParam: string) => void
        }

        const buttonList = Object.keys(this.state.buttonBackOfficeList)
        const selectedBool = this.state.selected.displayTitle === ""
        const childAddDisplay = this.state.selected.displayChild.toLowerCase().includes("useradmin") ? "admin" : "user"
        const inputParameter: passedParameter = {
            paramFor: childAddDisplay,
            dataState: this.state.addUniversal,
            changeInput: (e: React.FormEvent<HTMLInputElement>, key: string) => this.changeAddInput(e, key),
            universalEditSendButton: (role: string, methodParam: string) => this.universalButton(role, methodParam)
        }

        let selectedElement: any = <Fragment />
        if(!selectedBool) {
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
                                                        (arg: string) => this.universalTableAction(arg),
                                                        this.state.editMode,
                                                        inputParameter,

                                                    ), 
                                                    this.state.pagination.paginationLength, 
                                                    this.state.pagination.currentPagination,
                                                    (method, pagIndex, disabled) => this.paginationControl(
                                                        method, 
                                                        pagIndex, 
                                                        disabled
                                                    )
                                                )
                                                : selectedElement(
                                                    this.state.data.userList, 
                                                    this.state.data.loading,
                                                    (arg: string) => this.universalTableAction(arg),
                                                    this.state.editMode,
                                                    inputParameter,
                                                )
                                            )
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