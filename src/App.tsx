import { useState, useEffect, type FormEvent } from 'react'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-hidden');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const [formData, setFormData] = useState({
    phone: '',
    studentName: '',
    studentClass: '',
    agree: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // URL to the Google Apps Script Web App
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwiCkw02dhBDfeL_nyfHYLvNUzXh7dK0nq__O7oo2VBdSkYLIyrNGlxQWhnPX7UFrXs/exec';

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
      const formBody = new URLSearchParams();
      formBody.append('phone', formData.phone);
      formBody.append('studentName', formData.studentName);
      formBody.append('studentClass', formData.studentClass);

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

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
    <>
      <div className="bg-decoration"></div>
      
      <div className="app-container">
        {/* Header Card */}
        <div className="kids-card header-card header-section animate-hidden">
          <div className="header-logo-container">
            <img src="/logo.png" alt="Logo Xứ Đoàn" className="header-logo" />
            <div className="header-text-container">
              <div className="header-org">PHONG TRÀO THIẾU NHI THÁNH THỂ VIỆT NAM</div>
              <div className="header-parish">Giáo xứ Thiên Ân - Xứ Đoàn Đức Mẹ Fatima</div>
            </div>
          </div>
          
          <div className="title-badge">🌟 Dành cho thiếu nhi 6-13 tuổi</div>
          
          <h1 className="main-title">TRẠI HÈ BELEM 1</h1>
          
          <div className="sub-title-phandoan">Phân đoàn Chiên - Ấu - Thiếu</div>
          
          <p className="intro-text">
            Nhằm mục đích huấn luyện các kỹ năng sinh hoạt, phong trào, và giúp các em thiếu nhi có những ngày hè vui tươi lành mạnh, Xứ đoàn Đức Mẹ Fatima - Giáo xứ Thiên Ân tổ chức Trại Hè Huấn Luyện 2026 dành cho các em thiếu nhi.
          </p>
        </div>

        {/* Info Card */}
        <div className="kids-card info-card animate-hidden delay-1">
          <h2 className="section-title color-green">
            <span className="title-icon">🏕️</span> Thông Tin Trại
          </h2>
          <ul className="info-list">
            <li className="info-item">
              <div className="info-icon-wrapper icon-1">⛺</div>
              <div className="info-content">
                <span className="info-label">Tên trại</span>
                <span className="info-value">Belem 1</span>
              </div>
            </li>
            <li className="info-item">
              <div className="info-icon-wrapper icon-2">✝️</div>
              <div className="info-content">
                <span className="info-label">Chủ đề</span>
                <span className="info-value">Nên giống Chúa Giêsu</span>
              </div>
            </li>
            <li className="info-item">
              <div className="info-icon-wrapper icon-3">❤️</div>
              <div className="info-content">
                <span className="info-label">Tinh thần</span>
                <span className="info-value">Đoàn kết - Yêu thương - Phục vụ</span>
              </div>
            </li>
            <li className="info-item">
              <div className="info-icon-wrapper icon-4">🎵</div>
              <div className="info-content">
                <span className="info-label">Bài hát ý lực</span>
                <span className="info-value">Trong Giêsu chúng ta là tấm bánh</span>
              </div>
            </li>
            <li className="info-item">
              <div className="info-icon-wrapper icon-1">⛪</div>
              <div className="info-content">
                <span className="info-label">Địa điểm</span>
                <span className="info-value">Giáo xứ Thiên Ân</span>
              </div>
            </li>
            <li className="info-item">
              <div className="info-icon-wrapper icon-2">📅</div>
              <div className="info-content">
                <span className="info-label">Thời gian</span>
                <span className="info-value">Ngày 04 tháng 07 năm 2026</span>
              </div>
            </li>
            <li className="info-item">
              <div className="info-icon-wrapper icon-3">👦👧</div>
              <div className="info-content">
                <span className="info-label">Thành phần tham dự</span>
                <span className="info-value">Các em thiếu nhi Phân đoàn Chiên con, Ấu nhi, Thiếu 1 và 2</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Schedule Card */}
        <div className="kids-card schedule-card animate-hidden delay-2">
          <h2 className="section-title color-yellow">
            <span className="title-icon">⏰</span> Chương Trình Chi Tiết
          </h2>
          <div className="schedule-list">
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">07:00</span>
              <span className="schedule-event">Tập trung</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">07:30</span>
              <span className="schedule-event">Chào cờ</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">07:45</span>
              <span className="schedule-event">Thay đồ</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">08:15</span>
              <span className="schedule-event">Sinh hoạt vòng tròn</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">08:30</span>
              <span className="schedule-event">Hành trình sa mạc - trò chơi lớn</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">11:00</span>
              <span className="schedule-event">Ăn trưa tại Nhà sinh hoạt - Nghỉ ngơi</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">13:15</span>
              <span className="schedule-event">Xem kịch</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">14:15</span>
              <span className="schedule-event">Đố vui Kinh Thánh</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">15:00</span>
              <span className="schedule-event">Trò chơi vận động</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">16:00</span>
              <span className="schedule-event">Tổng kết - phát thưởng</span>
            </div>
            <div className="schedule-item">
              <div className="schedule-dot"></div>
              <span className="schedule-time-badge">16:30</span>
              <span className="schedule-event">Ra về</span>
            </div>
          </div>
          
          <div className="cost-highlight">
            <div style={{ fontSize: '1.2rem', color: '#d35400', marginBottom: '5px' }}>Kinh phí dự kiến:</div>
            💰 170.000đ/em
          </div>
        </div>

        {/* Form / Success Card */}
        <div className="kids-card form-card animate-hidden delay-3">
          {!isSuccess ? (
            <>
              <h2 className="section-title color-primary">
                <span className="title-icon">📝</span> Đăng Ký Tham Gia
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">📱 Số điện thoại phụ huynh</label>
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
                  <label className="form-label">👼 Tên Thánh, Họ và Tên Thiếu nhi</label>
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
                  <label className="form-label">🏫 Lớp</label>
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

                <button type="submit" className="bubbly-btn" disabled={isSubmitting}>
                  {isSubmitting ? <span className="spinner"></span> : 'Gửi Đăng Ký Ngay! 🚀'}
                </button>
              </form>
            </>
          ) : (
            <div className="success-container">
              <div className="success-icon">🎉</div>
              <div className="success-message">
                <strong>ĐĂNG KÝ THÀNH CÔNG!</strong><br/><br/>
                Sau khi phụ huynh đăng ký và đóng phí đi trại, xin quý phụ huynh liên hệ Zalo số điện thoại <strong>0985287664</strong> để nhận thông tin chi tiết.<br/><br/>
                Xin cảm ơn quý phụ huynh!
              </div>
              
              <p style={{marginBottom: '15px', fontWeight: '700', fontSize: '1.2rem', color: 'var(--color-primary)'}}>
                Vui lòng quét mã QR dưới đây để thanh toán:
              </p>
              
              <div className="qr-container">
                <img src={qrUrl} alt="Mã QR Thanh Toán" className="qr-image" />
                <div className="qr-info-box">
                  <div style={{marginBottom: '8px', fontSize: '1rem'}}>
                    <strong>Nội dung CK:</strong> <br/>
                    <span style={{color: 'var(--color-primary)', fontWeight: 'bold'}}>{qrAddInfo}</span>
                  </div>
                  <div style={{fontSize: '1rem'}}>
                    <strong>Số tiền:</strong> <span style={{color: '#d35400', fontWeight: 'bold', fontSize: '1.2rem'}}>170.000 VNĐ</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="footer-text">
          🌈 Hân hoan chào đón các em tham gia một mùa hè vui tươi - lành mạnh - đầy yêu thương trong Chúa! 🎈
        </div>
      </div>
    </>
  )
}

export default App
