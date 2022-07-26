import React, { Fragment } from 'react'
import { Spinner, Table, Button } from 'reactstrap'
import '../css/containers/universalTable.css'

interface deleteStructure {
    uid: string,
    username: string,
    role: string,
    email: string,
}

function universalTable(
    paramFor: string,
    displayData: Array<string>, 
    loading: boolean,
    tableActionButton: (methodParam: string, uid: string, deleteData: deleteStructure) => void,
) {
    interface userDataStructure {
        id: string,
        username: string,
        email: string,
        gender: string,
        created: string,
        updated: string,
    }
    const avatarUrl: String = "http://localhost:8080/img/";

    return (
        <Fragment>
            {paramFor} that registered on whatsapp app
            <div className='userListTable'>
                {
                    loading
                        ? <Spinner className='spinner' />
                        : (
                            <Table
                                borderless
                                hover
                                responsive
                                size=""
                            >
                                <thead>
                                    <tr>
                                        {
                                            Object.keys(JSON.parse(displayData[0])).map(
                                                (key) => {
                                                    if(key !== "id") {
                                                        return(
                                                            <th key={key} style={{ textAlign: "center" }}>{key}</th>
                                                        )
                                                    }
                                                    return <Fragment key={key} />
                                                })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayData.map((elObject: string, index: number) => {
                                        const displayObject: any = JSON.parse(elObject) as userDataStructure
                                        const username = paramFor === "user" ? displayObject.username : displayObject.adminname
                                        return (
                                            <tr key={index} className='userListTableData'>
                                                {
                                                    paramFor === "admin"
                                                        ? (
                                                            <td>
                                                                {JSON.stringify(displayObject.authenticated)}
                                                            </td>
                                                        )
                                                        : (
                                                            <td>
                                                                <img src={avatarUrl + displayObject.avatar + ".jpg"} style={{
                                                                    width: 45,
                                                                    height: 45,
                                                                    borderRadius: "50%",
                                                                    verticalAlign: "middle",
                                                                    objectFit: 'scale-down',
                                                                }} />
                                                            </td>
                                                        )
                                                }
                                                <td>
                                                    {username}
                                                </td>
                                                <td>
                                                    {displayObject.email}
                                                </td>
                                                <td>
                                                    {displayObject.gender}
                                                </td>
                                                <td>
                                                    {displayObject.created}
                                                </td>
                                                <td>
                                                    {displayObject.updated}
                                                </td>
                                                <td>
                                                    <Button 
                                                        color="info"
                                                        style={{color: "white", textTransform: "uppercase"}}
                                                        onClick={() => tableActionButton("edit", displayObject.id, {
                                                            uid: displayObject.id,
                                                            username: username,
                                                            role: paramFor,
                                                            email: displayObject.email,
                                                        })}
                                                    >
                                                        Edit
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button 
                                                        color="danger"
                                                        style={{color: "white", textTransform: "uppercase"}}
                                                        onClick={() => tableActionButton("delete", displayObject.id, {
                                                            uid: displayObject.id,
                                                            username: username,
                                                            role: paramFor,
                                                            email: displayObject.email,
                                                        })}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

                        )
                }
            </div>
        </Fragment>
    )
}

export const UniversalTable = universalTable