import { useState, FormEvent } from 'react'

function App() {
  const [formData, setFormData] = useState({
    phone: '',
    studentName: '',
    studentClass: '',
    agree: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // URL to the Google Apps Script Web App
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbylRB85Mzy47GxLNLJZA-wOZtjD9EvFJ8LrMdx20KmeZteMTwtlUtggB2lppE9GQBxg/exec';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Vui lòng đồng ý cho thiếu nhi tham dự trại hè.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real scenario without setting up CORS perfectly on Apps Script, 
      // we might use no-cors or a hidden form iframe, but a standard fetch with JSON or URL encoded is best if script is set to allow anyone.
      // We will send data via GET or POST depending on GAS setup. Let's assume the GAS handles POST with urlencoded data.
      
      const formBody = new URLSearchParams();
      formBody.append('phone', formData.phone);
      formBody.append('studentName', formData.studentName);
      formBody.append('studentClass', formData.studentClass);

      if (SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formBody,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      } else {
        // Mocking submission if user hasn't put the URL yet
        console.log("Mock submission:", Object.fromEntries(formBody));
        await new Promise(r => setTimeout(r, 1000));
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate VietQR URL
  const qrAddInfo = `${formData.phone}_${formData.studentName}_${formData.studentClass}`;
  const qrUrl = `https://img.vietqr.io/image/tpbank-80985287664-compact2.png?amount=170000&addInfo=${encodeURIComponent(qrAddInfo)}&accountName=DANG%20ANH%20TUAN`;

  return (
    <div className="app-container">
      {/* Header Card */}
      <div className="glass-card header-section">
        <div className="header-org">PHONG TRÀO THIẾU NHI THÁNH THỂ VIỆT NAM</div>
        <div className="header-parish">Giáo xứ Thiên Ân - Xứ Đoàn Đức Mẹ Fatima</div>
        <div className="title-badge">Dành cho thiếu nhi 6-13 tuổi</div>
        <h1 className="main-title">TRẠI HÈ BELEM 1</h1>
        <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>PHÂN ĐOÀN CHIÊN - ẤU - THIẾU</div>
        
        <p className="intro-text">
          Nhằm mục đích huấn luyện các kỹ năng sinh hoạt, phong trào, và giúp các em thiếu nhi có những ngày hè vui tươi lành mạnh, Xứ đoàn Đức Mẹ Fatima - Giáo xứ Thiên Ân tổ chức Trại Hè Huấn Luyện 2026 dành cho các em thiếu nhi.
        </p>
      </div>

      {/* Info Card */}
      <div className="glass-card">
        <h2 className="section-title">🏕️ Thông Tin Trại</h2>
        <ul className="info-list">
          <li className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-label">Tên trại:</div>
            <div className="info-value">Belem 1</div>
          </li>
          <li className="info-item">
            <div className="info-icon">✝️</div>
            <div className="info-label">Chủ đề:</div>
            <div className="info-value">Nên giống Chúa Giêsu</div>
          </li>
          <li className="info-item">
            <div className="info-icon">❤️</div>
            <div className="info-label">Tinh thần:</div>
            <div className="info-value">Đoàn kết - Yêu thương - Phục vụ</div>
          </li>
          <li className="info-item">
            <div className="info-icon">🎵</div>
            <div className="info-label">Bài hát:</div>
            <div className="info-value">Trong Giêsu chúng ta là tấm bánh</div>
          </li>
          <li className="info-item">
            <div className="info-icon">⛪</div>
            <div className="info-label">Địa điểm:</div>
            <div className="info-value">Giáo xứ Thiên Ân</div>
          </li>
          <li className="info-item">
            <div className="info-icon">📅</div>
            <div className="info-label">Thời gian:</div>
            <div className="info-value">Ngày 04 tháng 07 năm 2026</div>
          </li>
          <li className="info-item">
            <div className="info-icon">👥</div>
            <div className="info-label">Tham dự:</div>
            <div className="info-value">Các em thiếu nhi Phân đoàn Chiên con, Ấu nhi, Thiếu 1 và 2</div>
          </li>
        </ul>
      </div>

      {/* Schedule Card */}
      <div className="glass-card">
        <h2 className="section-title">📋 Chương Trình Chi Tiết</h2>
        <div className="schedule-list">
          <div className="schedule-item"><span className="schedule-time">07:00</span> <span className="schedule-event">Tập trung</span></div>
          <div className="schedule-item"><span className="schedule-time">07:30</span> <span className="schedule-event">Chào cờ</span></div>
          <div className="schedule-item"><span className="schedule-time">07:45</span> <span className="schedule-event">Thay đồ</span></div>
          <div className="schedule-item"><span className="schedule-time">08:15</span> <span className="schedule-event">Sinh hoạt vòng tròn</span></div>
          <div className="schedule-item"><span className="schedule-time">08:30</span> <span className="schedule-event">Hành trình sa mạc - trò chơi lớn</span></div>
          <div className="schedule-item"><span className="schedule-time">11:00</span> <span className="schedule-event">Ăn trưa tại Nhà sinh hoạt - Nghỉ ngơi</span></div>
          <div className="schedule-item"><span className="schedule-time">13:15</span> <span className="schedule-event">Xem kịch</span></div>
          <div className="schedule-item"><span className="schedule-time">14:15</span> <span className="schedule-event">Đố vui Kinh Thánh</span></div>
          <div className="schedule-item"><span className="schedule-time">15:00</span> <span className="schedule-event">Trò chơi vận động</span></div>
          <div className="schedule-item"><span className="schedule-time">16:00</span> <span className="schedule-event">Tổng kết - phát thưởng</span></div>
          <div className="schedule-item"><span className="schedule-time">16:30</span> <span className="schedule-event">Ra về</span></div>
        </div>
        
        <div className="cost-highlight">
          <div style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '5px' }}>Kinh phí dự kiến:</div>
          💰 170.000đ/em
        </div>
      </div>

      {/* Form / Success Card */}
      <div className="glass-card">
        {!isSuccess ? (
          <>
            <h2 className="section-title">📝 Đăng Ký Tham Gia</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Số điện thoại phụ huynh</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-input" 
                  placeholder="Ví dụ: 0912345678" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Tên Thánh, Họ và Tên Thiếu nhi</label>
                <input 
                  type="text" 
                  name="studentName"
                  className="form-input" 
                  placeholder="Ví dụ: Maria Nguyễn Văn A" 
                  value={formData.studentName}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Lớp</label>
                <input 
                  type="text" 
                  name="studentClass"
                  className="form-input" 
                  placeholder="Ví dụ: Thiếu 1" 
                  value={formData.studentClass}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="agree" 
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label htmlFor="agree">
                  Tôi đồng ý cho thiếu nhi tham dự trại hè này và cam kết đóng đủ kinh phí.
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner"></span> : 'Đăng Ký Ngay'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <div className="success-icon">✅</div>
            <div className="success-message">
              SAU KHI PHỤ HUYNH ĐĂNG KÝ VÀ ĐÃ ĐÓNG PHÍ ĐI TRẠI THÌ XIN QUÝ PHỤ HUYNH LIÊN HỆ ZALO SỐ ĐIỆN THOẠI <strong>0985287664</strong> ĐỂ NHẬN THÔNG TIN CHI TIẾT.<br/><br/>
              XIN CẢM ƠN QUÝ PHỤ HUYNH!
            </div>
            
            <p style={{marginBottom: '15px', fontWeight: '600'}}>Vui lòng quét mã QR dưới đây để thanh toán:</p>
            
            <div className="qr-container">
              <img src={qrUrl} alt="Mã QR Thanh Toán" className="qr-image" />
              <div style={{marginTop: '10px', fontSize: '0.9rem'}}>
                <strong>Nội dung CK:</strong> <br/>
                {qrAddInfo}
              </div>
              <div style={{marginTop: '5px', fontSize: '0.9rem', color: 'var(--primary-color)'}}>
                <strong>Số tiền:</strong> 170.000 VNĐ
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="footer-text">
        Hân hoan chào đón các em tham gia một mùa hè vui tươi - lành mạnh - đầy yêu thương trong Chúa!
      </div>
    </div>
  )
}

export default App
