import React, { Fragment } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

function PaginationComponent(
    children: any,
    paginationLength: number,
    currentPagination: number,
    loading: boolean,
    setPagination: (method: string, index: number, disabled: boolean) => void,
) {
    const disabledStateFirst = currentPagination === 0
    const disabledStateLast = currentPagination === paginationLength - 1
    return (
        <div>
            {children}
            {
                !loading
                    ? (
                        <Pagination aria-label="Page navigation example" style={{ "justifyContent": "center" }}>
                            <PaginationItem disabled={disabledStateFirst} onClick={() => setPagination("first", -1, disabledStateFirst)}>
                                <PaginationLink
                                    first
                                />
                            </PaginationItem>
                            <PaginationItem disabled={disabledStateFirst} onClick={() => setPagination("back", -1, disabledStateFirst)}>
                                <PaginationLink
                                    previous
                                />
                            </PaginationItem>
                            {Array.from(Array(paginationLength), (_, i) => {
                                return (
                                    <PaginationItem onClick={() => setPagination("set", i, false)} active={currentPagination === i} key={i}>
                                        <PaginationLink>
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })}
                            <PaginationItem disabled={disabledStateLast} onClick={() => setPagination("next", -1, disabledStateLast)}>
                                <PaginationLink
                                    next
                                />
                            </PaginationItem>
                            <PaginationItem disabled={disabledStateLast} onClick={() => setPagination("last", -1, disabledStateLast)}>
                                <PaginationLink
                                    last
                                />
                            </PaginationItem>
                        </Pagination>
                    )
                    : <Fragment />
            }

        </div>
    )
}

export default PaginationComponent