import React, { Fragment } from 'react';
import './TermsAndConditionsPage.css';

const TermsAndConditionsPage = () => {
    return (
        <Fragment>
            <div className="setting-homepage-link-bar">
                <a href='/home' className='setting-homepage-link'> Về trang chủ</a>
            </div>
            <div className="terms-container">
                <h1 className='terms-container-heading'>Điều khoản và Điều kiện</h1>
                <p>Chào mừng bạn đến với trang web của chúng tôi! Những điều khoản và điều kiện này quy định các quy tắc và quy định cho việc sử dụng trang web của chúng tôi.</p>

                <h2 className='terms-container-title'>1. Quyền sở hữu trí tuệ</h2>
                <p> Chúng tôi sở hữu quyền sở hữu trí tuệ cho toàn bộ nội dung trên trang web này, trừ khi có quy định khác. Bạn không được sao chép, bán, cho thuê hoặc tái sản xuất bất kỳ phần nào của trang web này mà không có sự đồng ý bằng văn bản của chúng tôi.</p>

            <h2 className='terms-container-title'>2. Hạn chế</h2>
            <p>Bạn bị hạn chế cụ thể từ:</p>
            <ul>
                <li>Sử dụng trang web này bằng bất kỳ cách nào có thể gây hại cho trang web hoặc làm giảm tính khả dụng của nó;</li>
                <li>Sử dụng trang web này bằng bất kỳ cách nào vi phạm pháp luật, bất hợp pháp hoặc gây hại;</li>
                <li>Sử dụng trang web này để tham gia vào bất kỳ hình thức quảng cáo hoặc tiếp thị nào mà không có sự đồng ý bằng văn bản của chúng tôi.</li>
            </ul>

            <h2 className='terms-container-title'>3. Miễn trừ trách nhiệm</h2>
            <p>Tất cả thông tin trên trang web này được cung cấp "như đã có" và chúng tôi không đưa ra bất kỳ đại diện hay bảo đảm nào về tính chính xác, đủ độ, đáng tin cậy hoặc đầy đủ của bất kỳ thông tin nào.</p>

            <h2 className='terms-container-title'>4. Giới hạn trách nhiệm</h2>
            <p>Trong bất kỳ trường hợp nào, chúng tôi cũng không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, phát sinh hoặc trừng phạt nào phát sinh từ việc sử dụng trang web này.</p>

            <h2 className='terms-container-title'>5. Luật áp dụng</h2>
            <p>Các điều khoản và điều kiện này được điều chỉnh và hiểu theo luật pháp của quốc gia bạn.</p>

            <h2 className='terms-container-title'>6. Thay đổi Điều khoản và Điều kiện</h2>
            <p>Chúng tôi có quyền sửa đổi hoặc thay thế các điều khoản và điều kiện này bất kỳ lúc nào mà không cần thông báo trước. Bằng cách tiếp tục sử dụng trang web này, bạn đồng ý tuân thủ các điều khoản và điều kiện đã được cập nhật.</p>

            <h2 className='terms-container-title'>7. Thông tin liên hệ</h2>
            <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về các điều khoản và điều kiện này, vui lòng liên hệ với chúng tôi qua địa chỉ info@birdcageshop.com.</p>
        </div>
        </Fragment >
    );
};

export default TermsAndConditionsPage;
