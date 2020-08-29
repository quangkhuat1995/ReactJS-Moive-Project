import { useState, useEffect } from "react";

//** */ Share validation forms logic
function useFormValidation(
  initialState,
  validateFunc,
  sendSubmit,
  { ...props }
) {
  // console.log(props);
  // console.log(props.fetchUserLogin);

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  // trang thai truoc khi gui
  const [isNotValid, setIsNotValid] = useState(true);
  //Hàm useEffect này cần phải có để tránh trường hợp ng dùng nhập matKhau trc mà ko nhập taiKhoan
  useEffect(() => {
    console.log("i run");

    const noErrors = Object.values(errors).every((val) => val === "");
    const noValues = Object.values(values).every((val) => val === "");

    //TH đã nhập thông tin và chính xác
    if (noErrors) {
      //TH chưa nhập gì hết đã bấm gửi
      if (noValues) {
        console.log("chưa nhập gì cả");

        setIsNotValid(true);
      } else {
        console.log("i allow");
        setIsNotValid(false); // tuc la valid
      }
    } else {
      console.log("còn lỗi");
      setIsNotValid(true);
    }
  }, [errors]);

  //ham nay chi check duoc input type='text'
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    // const errorMessages = validateFunc(name, value);
    // if (errorMessages) {
    //   setErrors({
    //     ...errors,
    //     [name]: errorMessages,
    //   });
    //   setIsNotValid(true);
    // }
  };
  //check tat ca cac the loai input
  // credit to: https://github.com/jxnblk/rebass-recomposed/blob/master/src/withForm.js
  // const handleChange= (e) => {
  //   const { type, name, value, checked } = e.target
  //   const val =
  //     /number|range/.test(type)
  //     ? parseFloat(value)
  //     : /checkbox/.test(type)
  //     ? checked
  //     : /radio/.test(type) // is this needed?
  //     ? value
  //     : value
  //   setForm({
  //     ...form,
  //     [name]: val
  //   })
  // }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessages = validateFunc(name, value);
    // if (errorMessages) {
    //   setIsNotValid(true);
    // } else {
    //   setIsNotValid(false);
    // } ko cần vì error thay đổi sẽ kích hoạt effect thay đổi isNotValid
    setErrors({
      ...errors,
      [name]: errorMessages,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // kiểm tra validate rồi submit
    //vì đã set valid ở hàm onBlur chỉ cần khi hacker F12 xóa disabled
    for (const key in values) {
      // validate gia tri input, nêu xuất hiện chuỗi báo lỗi thì đưa chuỗi đó vào obj errors với key tương ứng
      const errorMessages = validateFunc(key, values[key]); //
      setErrors({
        ...errors,
        [key]: errorMessages,
      });
    }

    if (isNotValid) {
      console.log("REJECT found:", errors.taiKhoan, errors.matKhau);
      return;
    } else {
      console.log("SUBMIT authenticated!", values.taiKhoan, values.matKhau);
      console.log(props.history);

      sendSubmit(values, props.history);
      return;
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isNotValid,
  };
}

export default useFormValidation;
