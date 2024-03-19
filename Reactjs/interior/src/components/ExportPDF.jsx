import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Canvas, Image } from '@react-pdf/renderer';

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
    fontWeight: "light"
});
Font.register({
    family: "Roboto",
    src:
        "http://localhost:3000/font/Roboto-Bold.ttf",
    fontWeight: "bold"
});
const GetProductAPI = "https://localhost:7233/api/v1/products/get"

const ExportPDF = (Props) => {
    var totalPrice = 0
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: 'white',
            fontFamily: "Roboto"
        },
        section: {
            margin: 20,
            padding: 10,
            flexGrow: 1,

        }
    });
    const [item, setItem] =useState(Props.Data)
        useEffect(()=>{
            if(item === undefined){
                fetch(GetProductAPI, {
                    method: "GET",
                }).then((res) => {return res.json()
                }).then((data) => setItem(data.splice(0,10)))
                    .catch(err => console.log(err))
            }

        },[])
    if(item !== undefined)
    item.forEach(element => {
        totalPrice+=element.price
    });

    console.log(totalPrice)
    return (
        <Document>
            <Page size="A4" wrap style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Độc lập - Tự do - Hạnh Phúc</Text>
                    <Text style={{ textAlign: 'center' }}>-------------</Text>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>HỢP ĐỒNG THI CÔNG NỘI THẤT</Text>
                    <View style={{ margin: "0 10%" }}>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "10%", fontSize: "12" }}>BÊN A (Chủ đầu tư) :</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>Đại diện  :</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>Địa chỉ   :</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>Điện Thoại    :</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "10%", fontSize: "12" }}>BÊN B (Thi công)    :</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>Đại diện  :</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>Địa chỉ   :</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>Điện Thoại    :</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "10%", fontSize: "12" }}>ĐIỀU 1: NỘI DUNG, GIÁ TRỊ HỢP ĐỒNG:</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 5%", fontSize: "12" }}>Bên A cung cấp các loại hàng hóa cho bên B với số lượng
                            và giá cả theo chi tiết dưới đây:</Text>
                        {
                            item? item.map((value,index)=>(
                                <>
                                <View style={{ margin: "0 10%" }}>
                                <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "5%", fontSize: "12" }}>Tên: <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>
                                    {value.name}
                                </Text></Text>
                                <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: "12" }}>Giá Tiền: <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>
                                    {value.price} VND
                                </Text></Text>
                                </View>
                                </>
                            )):<></>
                        }
                            <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "5%", marginLeft:"50%", fontSize: "12" }}>Tổng giá trị hợp đồng: {totalPrice} VND</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "10%", fontSize: "12" }}>ĐIỀU 2: CHẤT LƯỢNG VÀ CÁC YÊU CẦU VẬT LIỆU:</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>

                            - Báo giá đã bao gồm phụ kiện: ray, lề, tay nắm, tay nâng,… nhãn hiệu Ivan.

                            - Bảng báo giá trên chỉ bao gồm các phần báo giá cơ bản, nếu phát sinh thêm thì sẽ có bảng báo giá kèm theo

                            Hàng hóa được cấp phải đảm bảo theo kích thước, mẫu mã, chất liệu gỗ giống như thỏa thuận giữa hai bên ghi trong hợp đồng.</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "10%", fontSize: "12" }}>ĐIỀU 3: THỜI GIAN, ĐỊA ĐIỂM GIAO NHẬN</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>


                            Thời gian giao hàng: 15 ngày kể từ ngày Bên A nhận được tiền cọc từ bên B (giao hàng ngày 30/01/2019)
                            Địa điểm giao hàng: …………….
                            Bên A giao hàng cho bên B đúng thời gian và địa điểm thỏa thuận trong hợp đồng.</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "10%", fontSize: "12" }}>ĐIỀU 4: PHƯƠNG THỨC VÀ THỜI GIAN THANH TOÁN</Text>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', margin: "0 5%", fontSize: "12" }}>4.1  Phương thức thanh toán:<Text style={{ fontWeight: 'light' }}>Thanh toán bằng tiền mặt hoặc chuyển khoản</Text></Text>
                    </View>
                </View>
                <View >
                    <View style={{ margin: "0 10%" }}>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', margin: "0 10%", fontSize: "12" }}>4.2 Tài khoản thanh toán:</Text><Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>+ Chủ TK:
                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>

                            + Số TK:

                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>

                            + Tại NH:</Text>

                        <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: "10%", marginLeft:"5%", fontSize: "12" }}>ĐIỀU 5: ĐIỀU KHOẢN CHUNG</Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>
                            6.1 Sau khi hợp đồng được ký kết, nếu 1 trong 2 bên đơn phương huỷ bỏ hợp đồng thì phải chịu bồi thường thiệt hại cho đối phương số tiền bằng 50% giá trị hợp đồng.
                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>

                            6.2 Trong quá trình thi công nếu Bên B yêu cầu làm thêm thì phải cọc thêm tiền cho những hạng mục phát sinh.
                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>

                            6.3 Trong quá trình thực hiện hợp đồng, nếu hai Bên có thoả thuận gì khác thì cùng nhau tiến hành lập Phụ lục hợp đồng. Phụ lục hợp đồng sẽ là bộ phận không tách rời của hợp đồng chính.
                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>
                            6.4 Hai bên cam kết thực hiện đúng các điều khỏan ghi trong hợp đồng. Nếu bên nào không thực hiện đúng hoặc đơn phương đình chỉ hợp đồng mà không có lý do chính đáng thì coi như vi phạm hợp đồng.


                            Trường hợp bên vi phạm hợp đồng gây thiệt hại thì phải bồi thường cho bên kia. Thời gian và mức đền bù thiệt hại do hai bên thỏa thuận để khắc phục.

                            Trong quá trình thực hiện, nếu có khó khăn vướng mắc hai bên phải thông báo cho nhau bằng văn bản và cùng bàn bạc thống nhất giải quyết trên tinh thần hợp tác. Không bên nào được quyền đơn phương sửa đổi các điều khỏan đã ghi trong hợp đồng.

                            Trong trường hợp có tranh chấp không thể tự giải quyết được, Tòa Kinh tế - Tòa án nhân dân Thành Phố là nơi để khởi kiện và bên thua kiện phải chịu mọi chi phí, án phí.
                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>
                            6.5 Trường hợp Bên B chậm thanh toán hợp đồng này thì phải chịu phạt chậm thanh toán theo mức phạt 1%/giá trị chậm thanh toán cho 01 ngày chậm trễ.
                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>
                            6.6 Hiệu lực của hợp đồng: Hợp đồng này có hiệu lực kể từ ngày ký.
                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>
                            6.7 Thanh lý hợp đồng: Sau khi hai bên thực hiện đầy đủ các nghĩa vụ nêu trong bản hợp đồng này thì mặc nhiên hợp đồng được thanh lý.
                        </Text>
                        <Text style={{ fontWeight: 'light', margin: "0 10%", fontSize: "12" }}>
                            6.8 Hợp đồng làm thành 02 bản có giá trị pháp lý như nhau, bên A giữ 01, bên B giữ 01 bản.
                        </Text>
                    </View>
                </View>
            </Page>
            <Page size="A4" wrap style={styles.page}>
                <View style={{margin: 40,
            padding: 10,
            flexGrow: 1,}} >
            <Text style={{ textAlign: 'left', fontWeight: 'bold', margin: "0 10%", fontSize: "12" }}>CHỮ KÍ BÊN A:                                                          ĐÓNG DẤU CỦA NHÀ THẦU:
                        </Text>
                        </View>
            </Page>
        </Document>
    )
}

export default ExportPDF
