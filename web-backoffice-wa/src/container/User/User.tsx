import { Fragment } from 'react'
import { Spinner, Table, Button, Input, CardTitle } from 'reactstrap'
import { Config } from '../../model/requestModel'

import '../../css/containers/User/User.css'

function addUser() {
    interface validator {
        userEmail: boolean,
        userPass: boolean,
        userName: boolean,
    }
    interface inputType {
        userEmail: string,
        userPass: string,
        userName: string,
        gender: string,
    }

    const inputValidator: validator = {
        userEmail: false,
        userPass: false,
        userName: false,
    }
    const inputList: inputType = {
        userEmail: "",
        userPass: "",
        userName: "",
        gender: "",
    }

    async function addUser(email: string, pass: string, username: string, gender: string) {
        const emailRegexp: RegExp = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let allInputIsValid = true
        if(email !== null && pass !== null && username !== null && gender !== null) {
            inputList.userEmail = email
            inputList.userPass = pass
            inputList.userName = username
            inputList.gender = gender
        }
        inputValidator.userEmail = emailRegexp.test(inputList.userEmail);
        inputValidator.userPass = inputList.userPass.length !== 0;
        inputValidator.userName = inputList.userName.length !== 0;

        // manual styling
        (document.getElementById("userEmail") as HTMLInputElement).setAttribute("style", "background-color: transparent");
        (document.getElementById("userPass") as HTMLInputElement).setAttribute("style", "background-color: transparent");
        (document.getElementById("userName") as HTMLInputElement).setAttribute("style", "background-color: transparent");
        if(!inputValidator.userEmail) {
            (document.getElementById("userEmail") as HTMLInputElement).setAttribute("style", "background-color: red")
        }
        if(!inputValidator.userPass) {
            (document.getElementById("userPass") as HTMLInputElement).setAttribute("style", "background-color: red")
        }
        if(!inputValidator.userName) {
            (document.getElementById("userName") as HTMLInputElement).setAttribute("style", "background-color: red")
        }

        // all input are valid ?
        Object.keys(inputValidator).forEach((inputBoolean) => {
            if(inputValidator[inputBoolean as keyof validator] === false) allInputIsValid = false
        });
        (document.getElementById("successMessage") as HTMLElement).setAttribute("style", "display: none");
        (document.getElementById("spinner") as HTMLInputElement).setAttribute("style", "display: none");
        if(allInputIsValid) {
            const addUrl = "http://localhost:8080/addUser";
            const email = localStorage.getItem("email");
            (document.getElementById("spinner") as HTMLInputElement).setAttribute("style", "display: block");
            (document.getElementById("addUserToDatabase") as HTMLButtonElement).disabled = true;
            if(email !== null) {
                const addUserResponse: any = await fetch(addUrl, Config("POST", {adminEmail: JSON.parse(email).email, addData: {...inputList}}))
                .then(res => res.json())
                .then(data => data)
                if(addUserResponse !== null) {
                    (document.getElementById('responseMessage') as HTMLElement).innerHTML = addUserResponse.msg;
                    (document.getElementById("spinner") as HTMLInputElement).setAttribute("style", "display: none");
                    (document.getElementById("successMessage") as HTMLElement).setAttribute("style", "display: block");
                    (document.getElementById("addUserToDatabase") as HTMLButtonElement).disabled = false;
                }
            }
        }
    }

    return (
        <Fragment>
            {Object.keys(inputList).map((databaseKey) => {
                if(databaseKey === "gender") {
                    return (
                        <div className='inputDiv' key={databaseKey}>
                            <p>{databaseKey} : </p>
                            <Input type='select' id={databaseKey}>
                                <option>
                                    Male
                                </option>
                                <option>
                                    Female
                                </option>
                            </Input>
                        </div>
                    )
                }
                return (
                    <div className='inputDiv' key={databaseKey}>
                        <p>{databaseKey} : </p>
                        <Input 
                            autoComplete='off' 
                            id={databaseKey} 
                            required 
                            aria-required 
                            placeholder={databaseKey} 
                            type= {
                                databaseKey === "userPass"
                                    ? "password"
                                    : "text"
                            }
                            style={{
                                "textTransform": databaseKey === "userEmail" 
                                    ? "lowercase"
                                    : "none"
                            }}
                        />
                    </div>
                )
            })}
            <Spinner id='spinner' style={{display: "none"}} />
            <CardTitle id='successMessage' tag="h4" style={{display: "none"}}>
                <p id='responseMessage'></p>
            </CardTitle>
            <Button block onClick={() => addUser(
                (document.getElementById("userEmail") as HTMLInputElement).value,
                (document.getElementById("userPass") as HTMLInputElement).value,
                (document.getElementById("userName") as HTMLInputElement).value,
                (document.getElementById("gender") as HTMLInputElement).value,
            )} color='primary' className='userAddButton' id='addUserToDatabase'>
                Add User
            </Button>
        </Fragment>
    )
}

export const AddUser = addUser

function deleteUser() {
    return (
        <Fragment>
            deleteUser
        </Fragment>
    )
}

export const DeleteUser = deleteUser

function editUser() {
    return (
        <Fragment>
            editUser
        </Fragment>
    )
}

export const EditUser = editUser



// list user component
function listUser() {
    interface userDataStructure {
        id: string,
        username: string,
        email: string,
        gender: string,
        created: string,
        updated: string,
    }
    let getuserList: any = localStorage.getItem("listUser")
    if (getuserList !== null) {
        getuserList = JSON.parse(getuserList) as Array<string>
    }
    return (
        <Fragment>
            user that registered on whatsapp app
            <div className='userListTable'>
                {
                    getuserList === null
                        ? <Spinner />
                        : (
                            <Table
                                borderless
                                hover
                                responsive
                                size=""
                            >
                                <thead>
                                    <tr>
                                        {Object.keys(JSON.parse(getuserList[0])).map((key) => <th key={key} style={{textAlign: "center"}}>{key}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {getuserList.map((elObject: string, index: number) => {
                                        const displayObject = JSON.parse(elObject) as userDataStructure
                                        return (
                                        <tr key={index} className='userListTableData'>
                                            <td>
                                                {displayObject.id}
                                            </td>
                                            <td>
                                                {displayObject.username}
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

export const ListUser = listUser