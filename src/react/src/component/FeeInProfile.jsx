import React, {Component} from 'react'
import {Table} from 'reactstrap'
import {
    FINISH_GET_FEE_DETAIL,
    FEE_COLUMNS,
    FEE_PHAI_THU,
    FEE_THUC_THU
} from '../action/ActionTypes'

export class FeeInProfile extends Component {
    displayFee() {
        if(this.props.action) {
            const action = this.props.action
            // TransformArr chua obj {MucDichThu, Loai, Tien}
            //Thu tu tuong uong voi MucDichThuArr
            const TransformArr = []
            const MucDichThuArr = []
            if(action.type === FINISH_GET_FEE_DETAIL) {
                const transform = action.payload.map(obj => {
                    return {
                        MucDichThu: `${obj[FEE_COLUMNS[3]]} ${obj[FEE_COLUMNS[5]]} kỳ ${obj[FEE_COLUMNS[4]]}`,
                        Loai: obj[FEE_COLUMNS[3]].trim(),
                        MucDich: obj[FEE_COLUMNS[5]],
                        HocKy: obj[FEE_COLUMNS[4]],
                        Tien: parseInt(obj[FEE_COLUMNS[2]],10)
                    }
                })
                transform.forEach(obj => {
                    // var 
                    const index = MucDichThuArr.findIndex((val) => {
                        return val === obj.MucDichThu
                    })
                    if(index >= 0) {
                        TransformArr[index].Tien += obj.Tien 
                    } else {
                        MucDichThuArr.push(obj.MucDichThu)
                        TransformArr.push(obj)
                    }
                })
                const PhaiThuArr = TransformArr.filter((obj) => {
                    return obj.Loai === FEE_PHAI_THU
                })
                const ThucThuArr = TransformArr.filter((obj) => {
                    return obj.Loai === FEE_THUC_THU
                })
                return PhaiThuArr 
                    .sort((obj1, obj2) => {
                    return (obj1.HocKy < obj2.HocKy) || (obj1.MucDich.length > obj2.MucDich.length)
                    })
                    .map((val, index) => {
                    const MucDichThucThu = ThucThuArr.find((obj) => {
                        return (obj.HocKy === val.HocKy && obj.MucDich === val.MucDich)
                    })
                    return (
                        <tr key={index}>
                            <td>{val.MucDichThu}</td>
                            <td>{this.numberWithCommas(val.Tien)}</td>
                            <td>{MucDichThucThu ? MucDichThucThu.MucDichThu : 
                                `${FEE_THUC_THU} ${val.MucDich} kỳ ${val.HocKy}`}</td>
                            <td>{MucDichThucThu ? this.numberWithCommas(MucDichThucThu.Tien) : 0}</td>
                        </tr>
                    )
                })
            }            
        } else {
            return (
                <tr>
                    <td>LOADING...</td>
                </tr>
    )
        }
    }

    numberWithCommas = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Phải thu </th>
                        <th> Số tiền  </th>
                        <th> Thực thu </th>
                        <th> Số tiền  </th>
                    </tr>
                </thead>
                <tbody>
                    {this.displayFee()}
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