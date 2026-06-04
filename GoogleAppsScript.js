// HƯỚNG DẪN CÀI ĐẶT GOOGLE APPS SCRIPT:
// 1. Tạo một Google Sheet mới (hoặc mở Google Sheet hiện có).
// 2. Chọn menu Tiện ích mở rộng (Extensions) -> Apps Script.
// 3. Xóa nội dung cũ và dán toàn bộ đoạn code dưới đây vào.
// 4. Bấm Lưu (biểu tượng đĩa mềm hoặc Ctrl+S).
// 5. Bấm nút Triển khai (Deploy) ở góc trên bên phải -> Chọn Triển khai mới (New deployment).
// 6. Chọn loại (Select type) là Ứng dụng web (Web app).
// 7. Ở mục Quyền truy cập (Who has access), chọn "Bất kỳ ai" (Anyone).
// 8. Bấm Triển khai (Deploy). Cấp quyền truy cập nếu được yêu cầu (Chọn tài khoản của bạn -> Nâng cao -> Đi tới dự án).
// 9. Sau khi hoàn tất, sao chép URL Ứng dụng web (Web app URL).
// 10. Mở file `src/App.tsx` trong project React, tìm dòng `const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';` và thay thế bằng URL vừa copy.

const sheetName = 'Sheet1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    // Nếu sheet chưa có tiêu đề, tạo tiêu đề
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Thời gian đăng ký', 'Số điện thoại', 'Tên thiếu nhi', 'Lớp']);
    }

    const timestamp = new Date();
    
    // Dữ liệu nhận từ form
    const phone = e.parameter.phone || '';
    const studentName = e.parameter.studentName || '';
    const studentClass = e.parameter.studentClass || '';

    // Ghi dữ liệu vào sheet
    sheet.appendRow([timestamp, phone, studentName, studentClass]);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm này dùng để hỗ trợ kiểm tra xem URL có hoạt động hay không
function doGet(e) {
  return ContentService.createTextOutput("Google Apps Script đang hoạt động! Bạn hãy sử dụng phương thức POST để gửi dữ liệu.");
}
