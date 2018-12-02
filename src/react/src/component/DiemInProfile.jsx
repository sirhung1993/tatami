import React, {Component} from 'react'
import {Table} from 'reactstrap'
import {
    FINISH_GET_DIEM_DETAIL,
    DIEM_COLUMNS_DISPLAY,
} from '../action/ActionTypes'

export class DiemInProfile extends Component {

    diemTitle() {
        return (
            <tr>
                <th>STT</th>
                {
                    DIEM_COLUMNS_DISPLAY.map((val, index) => {
                        switch(index) {
                            case 0: 
                                return (
                                    <th key={index}>Mã môn học</th>
                                )
                            case 1: 
                                return (
                                    <th key={index}>Tên môn học</th>
                                )
                            case 2: 
                                return (
                                    <th key={index}>Điểm giữa kỳ</th>
                                )
                            case 3: 
                                return (
                                    <th key={index}>Điểm chuyên cần </th>
                                )
                            case 4: 
                                return (
                                    <th key={index}>Điểm cuối kỳ </th>
                                )
                            case 5: 
                                return (
                                    <th key={index}>Điểm tổng kết  </th>
                                )
                            default:
                                return (
                                    <th key={index}>Không xác định </th>
                                )
                        }
                    })
                }
            </tr>
        )
    }

    displayDiem() {
        if(this.props.action) {
            const action = this.props.action
            if(action.type === FINISH_GET_DIEM_DETAIL) {
                return action.payload.map((obj, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            {
                                DIEM_COLUMNS_DISPLAY.map((val, count) => {
                                    return (
                                        <td key={`${index}-${count}`}>{obj[val]}</td>
                                    )
                                })
                            }
                        </tr>
                )

                })
            }
        }
        
        return (
            <tr>
                <td>LOADING</td>
            </tr>
        )
    }

    render() {
        return (
            <Table striped bordered hover>
            <thead>
                {this.diemTitle()}
            </thead>
            <tbody>
                {this.displayDiem()}
            </tbody>
            </Table>
        )
    }
}

// function select(store) {
//     return {
//         getFee: store.getFee
//     }
// }
// export default connect(select)(FeeInProfile)