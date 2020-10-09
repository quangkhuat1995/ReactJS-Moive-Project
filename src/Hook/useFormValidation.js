import { useState, useEffect } from "react";

//** */ Share validation forms logic
// initialState phải là obj có key/ value='' để validate
function useFormValidation(
  initialState,
  validateFunc,
  sendSubmit,
  { ...props }
) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  // trang thai truoc khi gui
  const [isNotValid, setIsNotValid] = useState(true);

  useEffect(() => {
    // console.log("i run");

    const noErrors = Object.values(errors).every((val) => val === "");
    //vẫn có field chưa nhập
    const someValues = Object.values(values).some((val) => val === "");

    //TH ko có lỗi (thì kiểm tra lại lần nữa)
    if (noErrors) {
      //TH chưa nhập gì hết đã bấm gửi
      if (someValues) {
        // console.log("Có cái chưa nhập");

        setIsNotValid(true);
      } else {
        // console.log("i allow");

        // đã nhập thông tin đầy đủ và ko có lỗi
        setIsNotValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  //ham nay chi check duoc input type='text'
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
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

    //form đó có field matKhau2
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();

    // kiểm tra validate rồi submit

    for (const key in values) {
      const errorMessages = validateFunc(key, values[key]);
      setErrors({
        ...errors,
        [key]: errorMessages,
      });
    }

    if (isNotValid) {
      // console.log("REJECT found:", errors.taiKhoan, errors.matKhau);
      alert("Có lỗi trong việc xác thực dữ liệu");
    } else {
      // console.log("SUBMIT authenticated!", values.taiKhoan, values.matKhau);
      // console.log(props.history);

      sendSubmit(data, props.history);
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
