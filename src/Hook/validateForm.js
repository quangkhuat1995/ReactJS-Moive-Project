//https://formik.org/docs/overview#the-gist

const PARTERN_HO_TEN = new RegExp(
  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
);
const PARTERN_SODT = /((09|03|07|08|05)+([0-9]{8})\b)/; //10 số đầu số 0
const PARTERN_TAI_KHOAN = /^[a-zA-Z0-9_]+$/;
//https://regexr.com/3bfsi password
// const PARTERN_MAT_KHAU = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const PARTERN_MAT_KHAU = /^(?=.*[a-zA-Z0-9]).{6,}$/;
// const PARTERN_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PARTERN_EMAIL =
  "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
  "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

let passwordRef_1 = "";
let passwordRef_2 = "";

function validateForm(name, value) {
  //dung sw-case không xét được hết tất cả trường hợp

  let errorMessage = "";
  //valid email
  if (name === "email") {
    if (!value) {
      errorMessage = "Email không được để trống";
    } else if (!value.match(PARTERN_EMAIL)) {
      //điều kiện else if này errorMessage= null hoặc array
      errorMessage = "Email không hợp lệ";
    }
  }

  //valid taiKhoan
  if (name === "taiKhoan") {
    if (!value) {
      errorMessage = "*Tài khoản không được để trống";
    } else if (value.length < 4 || value.length > 13) {
      errorMessage = "*Tài khoản phải từ 4 đến 12 ký tự";
    } else if (!value.match(PARTERN_TAI_KHOAN)) {
      errorMessage =
        '*Tài khoản chỉ được chứa ký tự viết liền không dấu, số và "_". Vd:myNameIs_69';
    }
  }

  //valid matKhau
  if (name === "matKhau" || name === "matKhau2") {
    if (!value) {
      errorMessage = "*Mật khẩu không được để trống";
    } else if (value.length < 6 || value.length > 18) {
      errorMessage = "*Mật khẩu từ 6 - 12 ký tự";
    } else if (!PARTERN_MAT_KHAU.test(value)) {
      errorMessage = "*Mật khẩu không hợp lệ! Cần có ít nhất 1 ký tự hoặc số";
    }

    // Sau khi nhập đúng thông tin mk thì lưu vào biến passwordRef. Hàm này đc gọi khi blur nên value được lưu là value "hoàn thiện" sau khi người dùng nhập xong.
    if (name === "matKhau") {
      passwordRef_1 = value; //value này là của mk1
    } else if (name === "matKhau2") {
      passwordRef_2 = value; //value này là của mk2
    }

    //các lỗi chung đã pass rồi mới xét đến lỗi confirm
    if (
      passwordRef_2 &&
      passwordRef_1 &&
      errorMessage === "" &&
      passwordRef_2 !== passwordRef_1
    ) {
      errorMessage = "Xác thực mật khẩu không chính xác";
    }
  }

  //valid soDt
  if (name === "soDt") {
    if (!value) {
      errorMessage = "*Số điện thoại không được để trống";
    } else if (!PARTERN_SODT.test(value)) {
      errorMessage =
        "*Số điện không hợp lệ! Hãy chắc rằng bạn nhập đúng 10 số. (VD: 0934567890)";
    }
  }

  //valid ho, ten
  if (name === "ho" || name === "ten") {
    if (!value) {
      errorMessage = "*Xin hãy điền thông tin";
    } else if (!PARTERN_HO_TEN.test(value)) {
      errorMessage = "*Họ tên không được chứa ký tự đặc biệt";
    } else if (value.length < 3) {
      errorMessage = "*Xin hãy nhập đúng thông tin";
    }
  }

  return errorMessage;
}

export default validateForm;
