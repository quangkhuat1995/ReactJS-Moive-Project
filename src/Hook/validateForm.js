//https://formik.org/docs/overview#the-gist
const PARTERN_HO_TEN = new RegExp(
  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
);

const PARTERN_TAI_KHOAN = /^[a-zA-Z0-9_]+$/;
//https://regexr.com/3bfsi password
// const PARTERN_MAT_KHAU = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const PARTERN_MAT_KHAU = /^(?=.*[a-zA-Z0-9]).{6,}$/;
// const PARTERN_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PARTERN_EMAIL =
  "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
  "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

//states:object
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
    } else if (value.length < 3 || value.length > 13) {
      errorMessage = "*Tài khoản phải từ 4 đến 12 ký tự";
    } else if (!value.match(PARTERN_TAI_KHOAN)) {
      errorMessage =
        '*Tài khoản chỉ được chứa ký tự viết liền không dấu, số và "_". Vd:myNameIs_69';
    }
  }

  //valid matKhau
  if (name === "matKhau") {
    if (!value) {
      errorMessage = "*Mật khẩu không được để trống";
    } else if (value.length < 6 || value.length > 18) {
      errorMessage = "*Mật khẩu từ 6 - 12 ký tự";
    }
    // else if (!value.match(PARTERN_MAT_KHAU)) {
    //   errorMessage =
    //     "*Mật khẩu không hợp lệ! Hãy kết hợp với ký tự đặc biệt thay vì dùng Tiếng Việt có dấu";
    // }
    else if (!PARTERN_MAT_KHAU.test(value)) {
      errorMessage = "*Mật khẩu không hợp lệ! Cần có ít nhất 1 ký tự hoặc số";
    }
  }

  return errorMessage;
}

export default validateForm;
