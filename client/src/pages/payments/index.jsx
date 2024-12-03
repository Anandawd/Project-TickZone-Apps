import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomAlert from "../../components/Alert";
import CustomBreadCrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/Button";
import CustomTable from "../../components/TableWithAction";
import { accessPayments } from "../../const/access";
import { setNotif } from "../../redux/notif/actions";
import { fetchPayments } from "../../redux/payments/actions";
import { deleteData } from "../../utils/fetch";

export default function Payments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const payments = useSelector((state) => state.payments);

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
    Object.keys(accessPayments).forEach(function (key, index) {
      if (accessPayments[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchPayments());
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
        const res = await deleteData(`/cms/payments/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus kategori ${res.data.data.type}`
          )
        );

        dispatch(fetchPayments());
      }
    });
  };

  return (
    <Container className="mt-3">
      <CustomBreadCrumb textSecond={"Payments"} />

      {access.create && (
        <CustomButton
          className={"mb-3"}
          action={() => navigate("/payments/create")}
        >
          Tambah
        </CustomButton>
      )}

      {notif.status && (
        <CustomAlert type={notif.typeNotif} message={notif.message} />
      )}
      <CustomTable
        status={payments.status}
        thead={["Type", "Avatar", "Aksi"]}
        data={payments.data}
        tbody={["type", "avatar"]}
        editUrl={access.update ? `/payments/edit` : null}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}
