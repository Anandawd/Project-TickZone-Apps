import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomAlert from "../../components/Alert";
import CustomBreadCrumb from "../../components/Breadcrumb";
import {
  fetchListCategories,
  fetchListTalents,
} from "../../redux/lists/actions";
import { setNotif } from "../../redux/notif/actions";
import { getData, postData, putData } from "../../utils/fetch";
import Form from "./form";

export default function EventsEdit() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  const [form, setForm] = useState({
    title: "",
    date: "",
    file: "",
    avatar: "",
    about: "",
    venueName: "",
    tagline: "",
    keyPoint: [""],
    tickets: [
      {
        type: "",
        statusTicketCategories: "",
        stock: "",
        price: "",
      },
    ],
    category: null,
    talent: null,
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneEvents = async () => {
    const res = await getData(`/cms/events/${eventId}`);
    setForm({
      ...form,
      title: res.data.data.title ?? "",
      date: moment(res.data.data.date).format("YYYY-MM-DDTHH:SS") ?? "",
      file: res.data.data.image._id ?? "",
      avatar: res.data.data.image.name ?? "",
      about: res.data.data.about ?? "",
      venueName: res.data.data.venueName ?? "",
      tagline: res.data.data.tagline ?? "",
      keyPoint: res.data.data.keyPoint ?? [""],
      category: res.data.data.category
        ? {
            label: res.data.data.category.name,
            target: { name: "category", value: res.data.data.category._id },
            value: res.data.data.category._id,
          }
        : null,
      talent: res.data.data.talent
        ? {
            label: res.data.data.talent.name,
            target: { name: "talent", value: res.data.data.talent._id },
            value: res.data.data.talent._id,
          }
        : null,
      tickets: res.data.data.tickets ?? [
        {
          type: "",
          statusTicketCategories: "",
          stock: "",
          price: "",
        },
      ],
    });
    console.log(form);
  };

  useEffect(() => {
    fetchOneEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/cms/images", formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else if (e.target.name === "category" || e.target.name === "talent") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      date: form.date,
      image: form.file,
      title: form.title,
      price: form.price,
      about: form.about,
      venueName: form.venueName,
      tagline: form.tagline,
      keyPoint: form.keyPoint,
      category: form.category.value,
      talent: form.talent.value,
      status: form.statusTicketCategories,
      tickets: form.tickets,
    };

    const res = await putData(`/cms/events/${eventId}`, payload);

    if (res?.data?.data) {
      dispatch(
        setNotif(true, "success", `berhasil ubah events ${res.data.data.title}`)
      );
      navigate("/events");
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

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];

    _temp[i] = e.target.value;

    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    _temp.push("");

    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusTicket = () => {
    let _temp = [...form.tickets];
    _temp.push({
      type: "",
      statusTicketCategories: "",
      stock: "",
      price: "",
    });

    setForm({ ...form, tickets: _temp });
  };
  const handleMinusTicket = (index) => {
    let _temp = [...form.tickets];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, tickets: _temp });
  };

  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets];

    _temp[i][e.target.name] = e.target.value;

    setForm({ ...form, tickets: _temp });
  };

  return (
    <Container>
      <CustomBreadCrumb
        textSecond={"Events"}
        urlSecond={"/events"}
        textThird="Edit"
      />
      {alert.status && (
        <CustomAlert type={alert.type} message={alert.message} />
      )}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
        handleChangeTicket={handleChangeTicket}
        edit
      />
    </Container>
  );
}
