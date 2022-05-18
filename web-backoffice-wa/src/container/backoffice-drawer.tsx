import React, { Fragment } from 'react'
import { Button } from 'reactstrap'

import '../css/containers/backoffice-drawer.css'

interface childButton {
  "User": [boolean, string[]],
  "UserAdmin": [boolean, string[]],
  "Dashboard": [boolean, string[]],
  "Logout": [boolean, string[]]
}

  function backofficeDrawer(
    argsBool: boolean, 
    args: string, emitStates: (param: string) => void, 
    childEmit: (parent:string, child: string) => void
  ) {
  const childButton: childButton = {
    "User": [argsBool, ["List user", "Add user"]],
    "UserAdmin": [argsBool, ["List user admin", "Add user admin"]],
    "Dashboard": [argsBool, ["Show online user", "Remove online user (logout user)"]],
    "Logout": [false, []],
  }
  const selectedElement = childButton[args as keyof typeof childButton]
  let background: string = "secondary"

  if (args === "Logout") {
    background = "danger"
  }
  return (
    <Fragment key={args}>
      <Button className='button' block color={background} onClick={() => emitStates(args)}>
        {args}
      </Button>
      {
        selectedElement[1].map((childButton) => {
          if (selectedElement[0]) {
            return (
              <Fragment key={childButton}>
                <Button block className='button-child' color='primary' onClick={() => childEmit(args, childButton)}>
                  {childButton}
                </Button>
              </Fragment>
            )
          }
          return <Fragment key={childButton}></Fragment>
        })
      }
    </Fragment>
  )
}

export default backofficeDrawer