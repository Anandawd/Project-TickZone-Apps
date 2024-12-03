import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomAlert from "../../components/Alert";
import CustomBreadCrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/Button";
import CustomTable from "../../components/TableWithAction";
import { accessCategories } from "../../const/access";
import { fetchCategories } from "../../redux/categories/actions";
import { setNotif } from "../../redux/notif/actions";
import { deleteData } from "../../utils/fetch";

export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const categories = useSelector((state) => state.categories);
  const [access, setAccess] = useState({
    create: false,
    delete: false,
    update: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    const access = { create: false, delete: false, update: false };
    Object.keys(accessCategories).forEach(function (key, index) {
      if (accessCategories[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/categories/${id}`);
        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus kategori ${res.data.data.name}`
          )
        );
        dispatch(fetchCategories());
      }
    });
  };

  return (
    <Container className="mt-3">
      <CustomBreadCrumb textSecond={"Categories"} />

      {access.create && (
        <CustomButton
          className={"mb-3"}
          action={() => navigate("/categories/create")}
        >
          Tambah
        </CustomButton>
      )}

      {notif.status && (
        <CustomAlert type={notif.typeNotif} message={notif.message} />
      )}

      <CustomTable
        status={categories.status}
        thead={["Nama", "Aksi"]}
        data={categories.data}
        tbody={["name"]}
        editUrl={access.update ? `/categories/edit` : null}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}
