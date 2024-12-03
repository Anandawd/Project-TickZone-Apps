import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomAlert from "../../components/Alert";
import CustomBreadcrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/Button";
import CustomSearchInput from "../../components/SearchInput";
import CustomTable from "../../components/TableWithAction";
import { accessTalents } from "../../const/access";
import { setNotif } from "../../redux/notif/actions";
import { fetchTalents, setKeyword } from "../../redux/talents/actions";
import { deleteData } from "../../utils/fetch";

export default function Talents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notif = useSelector((state) => state.notif);
  const talents = useSelector((state) => state.talents);

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
    Object.keys(accessTalents).forEach(function (key, index) {
      if (accessTalents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch, talents.keyword]);

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
        const res = await deleteData(`/cms/talents/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus speaker ${res.data.data.name}`
          )
        );

        dispatch(fetchTalents());
      }
    });
  };

  return (
    <Container className="mt-3">
      <CustomBreadcrumb textSecond={"Talents"} />
      {access.create && (
        <div className="mb-3">
          <CustomButton action={() => navigate(`/talents/create`)}>
            Tambah
          </CustomButton>
        </div>
      )}
      <CustomSearchInput
        query={talents.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notif.status && (
        <CustomAlert type={notif.typeNotif} message={notif.message} />
      )}
      <CustomTable
        status={talents.status}
        thead={["Nama", "Role", "Avatar", "Aksi"]}
        data={talents.data}
        tbody={["name", "role", "avatar"]}
        editUrl={access.update ? `/talents/edit` : null}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}
