import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomAlert from "../../components/Alert";
import CustomBreadCrumb from "../../components/Breadcrumb";
import { setNotif } from "../../redux/notif/actions";
import { getData, putData } from "../../utils/fetch";
import Form from "./form";

export default function CategoryEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchOneCategories = async () => {
    const res = await getData(`/cms/categories/${categoryId}`);
    setForm({ ...form, name: res.data.data.name });
  };

  useEffect(() => {
    fetchOneCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await putData(`/cms/categories/${categoryId}`, form);

    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil ubah kategori ${res.data.data.name}`
        )
      );
      navigate("/categories");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container className="mt-3">
      <CustomBreadCrumb
        textSecound={"Categories"}
        urlSecound={"/categories"}
        textThird="Edit"
      />
      {alert.status && (
        <CustomAlert type={alert.type} message={alert.message} />
      )}
      <Form
        edit
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
