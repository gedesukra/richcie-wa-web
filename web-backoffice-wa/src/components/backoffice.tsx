import { Component, Fragment, ReactNode } from 'react'
import { Row, Col, Card, CardTitle, Spinner } from 'reactstrap'

import { ListUser, DeleteUser, EditUser, AddUser } from '../container/User/User'
import { ListUserAdmin, AddUserAdmin, EditUserAdmin, DeleteUserAdmin } from '../container/UserAdmin/UserAdmin'
import { ShowOnlineUser, RemoveOnlineUser } from '../container/Dashboard/Dashboard'

import Drawer from '../container/backoffice-drawer'

import { Config } from '../model/requestModel'

import '../css/containers/backoffice-drawer.css'
import '../css/components/backoffice.css'

// object structure
interface userList {
    ListUser: () => ReactNode,
    DeleteUser: () => ReactNode,
    EditUser: () => ReactNode,
    AddUser: () => ReactNode,
}

interface userAdminList {
    ListUserAdmin: () => ReactNode,
    AddUserAdmin: () => ReactNode,
    EditUserAdmin: () => ReactNode,
    DeleteUserAdmin: () => ReactNode,
}

interface dashboardList {
    ShowOnlineUser: () => ReactNode,
    RemoveOnlineUser: () => ReactNode,
}

interface buttonList {
    User: boolean,
    UserAdmin: boolean,
    Dashboard: boolean,
    Logout: boolean,
}

// object init
const userFunc: userList = {
    ListUser: ListUser,
    DeleteUser: DeleteUser,
    EditUser: EditUser,
    AddUser: AddUser,
}

const userAdminFunc: userAdminList = {
    ListUserAdmin: ListUserAdmin,
    DeleteUserAdmin: DeleteUserAdmin,
    AddUserAdmin: AddUserAdmin,
    EditUserAdmin: EditUserAdmin,
}

const dashboardFunc: dashboardList = {
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
        "User": userList,
        "UserAdmin": userAdminList,
        "Dashboard": dashboardList,
    },
    selected: {
        displayTitle: string,
        displayChild: string,
        displayParent: string,
    },
    data: {
        userList: Array<string>
    }
    loading: boolean,
    displayUsername: string,
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
            userList: []
        },
        loading: false,
        displayUsername: "",
    }

    public async componentDidMount() {
        const email = localStorage.getItem("email")
        const url = "http://localhost:8080/getUsername"
        const getUserUrl = "http://localhost:8080/getUserList"
        this.setState({
            loading: true
        })
        if(email !== null) {
            // get whatsapp user list
            const userListData = await fetch(getUserUrl, Config("POST", JSON.parse(email)))
                .then(res => res.json())
                .then(data => data)
            this.setState({
                data: {
                    ...this.state.data,
                    userList: userListData
                }
            })

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

    private ChildButton = (parentName: string, args: string) => {
        let selectDisplay = ""
        args.split(" ").forEach((s) => selectDisplay += s.charAt(0).toUpperCase() + s.slice(1))
        const matchIndex = /[^A-Za-z]/.exec(selectDisplay)
        if(matchIndex !== null) {
            selectDisplay = selectDisplay.slice(0, matchIndex.index)
        }
        this.setState({
            selected: {
                displayTitle: args,
                displayChild: selectDisplay,
                displayParent: parentName,
            }
        })
    }

    public render(): ReactNode {
        const buttonList = Object.keys(this.state.buttonBackOfficeList)
        const selectedBool = this.state.selected.displayTitle === ""
        let selectedElement: any = <Fragment />
        if(!selectedBool) {
            selectedElement = 
            this.state.functionalPage
            [this.state.selected.displayParent as keyof BackOfficeStates["functionalPage"]]
            [this.state.selected.displayChild as keyof (userList | userAdminList | dashboardList)]
        }
        
        // send data to user list if selected child is "ListUser"
        if(this.state.selected.displayChild === "ListUser" && this.state.data.userList.length > 0) {
            localStorage.setItem("listUser", JSON.stringify(this.state.data.userList))
        } else {
            localStorage.removeItem("listUser")
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
                                        : selectedElement()
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